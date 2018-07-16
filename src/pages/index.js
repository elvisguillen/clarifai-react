import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Clarifai from 'clarifai';
import Dropzone from 'react-dropzone';
import { TimelineMax } from 'gsap';
import TransitionGroupPlus from 'react-transition-group-plus';

import ImagePreview from '../components/imagePreview';
import BoundingBox from '../components/boundingBox';

import iconDrop from '../images/drag-icon.svg';
import loadingImage from '../images/puff.svg';

// Initialize Clarifai API with API Key

const clarifai = new Clarifai.App({
  apiKey: 'eaa0d4411be143bf9a6d3e3d48045229',
});

// Create main page component.

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      files: [],
      loading: '',
      loaded: '',
    };

    this.onDrop = this.onDrop.bind(this);
  }

  // Start initial copy animations when component loads using GSAP.
  componentDidMount() {
    const response = document.getElementsByClassName('response');
    const dragDrop = document.getElementsByClassName('drag-drop');
    const dragDropIcon = document.getElementsByClassName('drag-drop-icon');
    const moduleEnter = new TimelineMax();

    moduleEnter
      .staggerFromTo(response, 0.5, {
        autoAlpha: 0, x: '0', y: '40px', z: '0',
      }, {
        autoAlpha: 1, x: '0', y: '0px', z: '0',
      }, 1, 0)
      .staggerFromTo(dragDropIcon, 0.5, {
        autoAlpha: 0, x: '0', y: '40px', z: '0',
      }, {
        autoAlpha: 1, x: '0', y: '0px', z: '0',
      }, 1, 0)
      .staggerFromTo(dragDrop, 0.5, {
        autoAlpha: 0, x: '0', y: '40px', z: '0',
      }, {
        autoAlpha: 1, x: '0', y: '0px', z: '0',
      }, 0.2, 1);
  }

  // Main function that runs when an image is dropped into the Dropzone.
  // - This runs our preprocessing function.
  // - Then runs our face detection function inside it's callback with the correct base64 data.
  onDrop(files) {
    this.setState({
      files,
      loading: 'loading',
      data: [],
      loaded: 'loaded',
    });

    const file = files[0].preview;

    const component = this;

    this.getDataUri(file, (dataUri) => {
      component.faceDetection(dataUri);
    });
  }

  // Preprocessing function.
  // - Retrieves the uploaded image file and preprocesses it to base64 using Canvas for our API.
  // - Also, retrieves our image height and width and stores them in state.
  getDataUri(url, callback) {
    const image = new Image();

    image.onload = function onload() {
      const canvas = document.createElement('canvas');

      canvas.getContext('2d').drawImage(this, 0, 0);
      callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
    };

    image.src = url;
  }

  // Bounding Box function.
  // - Loops through our data and calculates the correct face bounding box by multiplying
  //   the float values between 0 - 1 by 100 to get the percentage. I initially multipled
  //   with our height or width for pixels but needed percentage for a fluid layout.
  // - Stores the percentage values in a new array which then gets sent to our state.
  getBoundingBoxes() {
    const { data } = this.state;
    const facesToPercentage = [];

    for (let i = 0; i < data.length; i += 1) {
      const top = data[i].top_row * 100;
      const left = data[i].left_col * 100;
      const bottom = data[i].bottom_row * 100;
      const right = data[i].right_col * 100;

      const box = {
        top, left, bottom, right,
      };

      facesToPercentage.push(box);
    }

    this.setState({
      data: facesToPercentage,
    });
  }

  // Main Face Detection function.
  // - Interacts with Clarifai's API using the Face Detect Model
  // - Then loop through bounding box data and stores it in state.
  // - Finally runs our getBoundingBoxes function at the very end of the successful response.
  // - It also updates the loading state to remove loading animation when complete.
  faceDetection(image) {
    clarifai.models.predict(Clarifai.FACE_DETECT_MODEL, { base64: image }).then(
      (response) => {
        // Commenting out concepts for general models.
        // let Response = response.outputs[0].data.concepts
        const { data } = this.state;
        const Response = response.outputs[0].data.regions;
        const newFaceData = data.slice();

        if (Response != null) {
          for (let i = 0; i < Response.length; i += 1) {
            newFaceData.push(Response[i].region_info.bounding_box);
          }

          this.setState({
            data: newFaceData,
            loading: '',
          });

          this.getBoundingBoxes();
        } else {
          this.setState({
            loading: '',
          });
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }


  // React's Render function for displaying the front end.

  render() {
    const {
      data,
      files,
      loading,
      loaded,
    } = this.state;


    console.log(data);

    return (

      <div className='main-container'>
        <Container>
          <Row>
            <Col sm='12' md='8'>
              <div className='innerdiv fadeInUp'>

                {/* Ternary condition for displaying initial copy before an image is loaded */}

                {loaded === 'loaded'
                  ? ''
                  : (
                    <div>
                      <h1 className='response'>
                        Hello, I’m Clarifai.
                      </h1>
                      <h2 className='d-none d-lg-block response'>
                        Drop or select an image and I’ll show you faces I see.
                      </h2>
                      <h2 className='d-block d-lg-none response'>
                        Upload an image and I’ll show you faces I see.
                      </h2>
                    </div>)
                }

                {/* This is our main view for displaying the uploading image and any bounding boxes
                    if it detects faces.
                    - Wrapped in Transition Group component to animate the image and bounding boxes.
                    - Renders the uploaded image with the ImagePreview component
                    - Maps through our face data stored in state and renders the bounding box using
                      our BoundingBox component.
                */}

                <div className='main-view image-wrapper'>
                  <TransitionGroupPlus component='div' transitionMode='out-in'>
                    {files.map(f => <ImagePreview key={f.name} preview={f.preview} />)}

                  </TransitionGroupPlus>
                  <TransitionGroupPlus component='div' transitionMode='out-in'>
                    {data.map((face, i) => (
                      <BoundingBox
                        key={i}
                        height={`${face.bottom - face.top}%`}
                        width={`${face.right - face.left}%`}
                        top={`${face.top}%`}
                        right={`${face.right}%`}
                        bottom={`${face.bottom}%`}
                        left={`${face.left}%`}
                      />
                    ))}

                  </TransitionGroupPlus>
                </div>

                {/* This is our main file drop area component using
                    the react-dropzone component. */}
                <Dropzone className='dropzone d-flex justify-content-center align-items-center' onDrop={this.onDrop}>
                  {loaded === 'loaded'
                    ? (
                      <div>
                        <div className='button-circular'>
                          +
                        </div>

                        <p className='drag-drop'>
                          Try another image.
                        </p>
                      </div>
                    ) : (
                      <Col className='d-flex flex-column text-center justify-content-center'>
                        <img className='d-none d-lg-block drag-drop-icon' src={iconDrop} alt='drop-icon' />
                        <div className='d-block d-lg-none button-circular'>
                          +
                        </div>
                        <h3 className='d-none d-lg-block drag-drop'>
                          Drag & Drop
                        </h3>
                        <h3 className='d-flex d-lg-none drag-drop'>
                          Click & Select an Image
                        </h3>
                        <p className='d-none d-lg-block drag-drop'>
                          an image  or click to browse
                        </p>
                      </Col>
                    )
                  }
                </Dropzone>
              </div>
            </Col>

            {/* This is our sidebar module which tells you how many faces it detects by
                counting how many faces is in our data array. In the future I'd love to
                cut out the bounding box region from the image using canvas and rendering
                them here, similar to the example on the documentation site:
                https://clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection#documentation
            */}

            <Col sm='12' md='4'>
              <div className='innerdiv thinking d-flex flex-column'>
                <h3>
                  What I See | Probability
                </h3>

                {loading === 'loading'
                  ? (
                    <img className='align-self-center' src={loadingImage} alt='loading' />
                  ) : (
                    <p>
                      {`I detected ${data.length} ${data.length < 2 && data.length !== 0 ? 'face' : 'faces'}.`}
                    </p>
                  )
                }
                {/*
                Excluded concept rendering for the general model since face detection
                doesn't return concepts.

                {  this.state.data.map((concept, i) =>
                  <div key={i}>
                    <p className='fadeInUp'>
                      {concept.name} | {Math.round(concept.value * 100) + '%'}
                    </p>
                  </div>)
                } */}

              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default IndexPage;
