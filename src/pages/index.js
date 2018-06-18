import React, { Component } from 'react'
import {Col, Row, Container} from 'reactstrap'
import Link from 'gatsby-link'
import Clarifai from 'clarifai'
import Dropzone from 'react-dropzone'
import TweenMax, { TimelineMax } from 'gsap';
import TransitionGroupPlus from 'react-transition-group-plus'

import ImagePreview from '../components/imagePreview'
import Concept from '../components/concepts'

import iconDrop from '../images/drag-icon.svg'
import loading from '../images/puff.svg'



const clarifai = new Clarifai.App({
    apiKey: 'eaa0d4411be143bf9a6d3e3d48045229'
})

const transitionStyles = {
  entering: {
    opacity: 0,
    transform: 'translateY(-10%)'
  },
  entered: {
    opacity: 1,
    transform: 'translateY(0)'
  },
  exiting: {
    opacity: 0,
    transform: 'translateY(-10%)'
  }
}

class IndexPage extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      files: [],
      imageData: '',
      loading: '',
      loaded: ''
    }
    this.onDrop = this.onDrop.bind(this)
  }
  
  componentDidMount() {
    const headline = document.getElementsByClassName('headline')
    const response = document.getElementsByClassName('response')
    const dragDrop = document.getElementsByClassName('drag-drop')
    const dragDropIcon = document.getElementsByClassName('drag-drop-icon')
    
    const moduleEnter = new TimelineMax();
    moduleEnter
      .staggerFromTo(response, .5, {autoAlpha: 0, x: '0', y: '40px', z: '0'}, {autoAlpha: 1, x: '0', y: '0px', z: '0'}, 1, 0)
      .staggerFromTo(dragDropIcon, .5, {autoAlpha: 0, x: '0', y: '40px', z: '0'}, {autoAlpha: 1, x: '0', y: '0px', z: '0'}, 1, 0)
      .staggerFromTo(dragDrop, .5, {autoAlpha: 0, x: '0', y: '40px', z: '0'}, {autoAlpha: 1, x: '0', y: '0px', z: '0'}, .2, 1)
    }

  componentDidUpdate() {

  }

  onDrop(files) {
    this.setState({
      files: files,
      loading: 'loading',
      data: [],
      loaded: 'loaded'
    })

    let file = files[0].preview

    function getDataUri(url, callback) {
      var image = new Image();
  
      image.onload = function () {
          var canvas = document.createElement('canvas');
          canvas.width = this.naturalWidth; 
          canvas.height = this.naturalHeight; 
  
          canvas.getContext('2d').drawImage(this, 0, 0);
  
          callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
      };
  
      image.src = url;
    }

    const component = this
  
    getDataUri(file, function(dataUri) {
      console.log(dataUri)
      
      clarifai.models.predict(Clarifai.GENERAL_MODEL, {base64: dataUri}  ).then(
        response => {
          let Response = response.outputs[0].data.concepts

          console.log(Response)
          
          component.setState({
            data: Response,
            loading: ''
          })
          
        },
        err => {
          console.log(err)
        }
      )
    })
    
  }

  render() {
    
    const concepts = this.state.data
    const isLoading = this.state.loading

    return(

      <div className='main-container'>
        <Container>
        <Row>
          <Col sm='12' md='8'>
            <div className='innerdiv fadeInUp'>

              {this.state.loaded === 'loaded' ? 
              '' : 
                <div>
                  <h1 className='response'>Hello, I’m Clarifai.</h1>
                  <h2 className='response'>Drop or select an image and I’ll tell you what I see.</h2>
                </div>
              }

                <TransitionGroupPlus>
                  {
                    this.state.files.map(f => <ImagePreview key={f.name} preview={f.preview}/>)
                  }
                </TransitionGroupPlus>
                
                <Dropzone className='dropzone d-flex justify-content-center align-items-center' onDrop={this.onDrop}>
                  {this.state.loaded === 'loaded' ? 
                    <div>
                      <div className='button-circular'>
                        +
                      </div>
                      
                      <p className='drag-drop'>Try another image.</p> 
                    </div>
                    : 
                    <Col sm='5' className='d-flex flex-column text-center justify-content-center'>
                      <img className='drag-drop-icon' src={iconDrop}/>
                      <h3 className='drag-drop'>Drag & Drop</h3>
                      <p className='drag-drop'>an image  or click to browse</p>
                    </Col>
                  }    
                </Dropzone>
            </div>
            
          </Col>
          <Col sm='12' md='4'>
            <div className='innerdiv thinking d-flex flex-column'>
              <h3>What I See | Probability</h3>
              
              {isLoading === 'loading' ? <img className='align-self-center' src={loading}/> : ''}
              
              <TransitionGroupPlus component="div" transitionMode="in-out">
                {
                  this.state.data.map((concept, i) => 
                  <div key={i}>
                    <p className='fadeInUp'>{concept.name} | {Math.round(concept.value * 100) + '%'}</p>
                  </div>)
                }
              </TransitionGroupPlus>
            </div>
          </Col>
         </Row>
         </Container>
      </div>
    )
  }
}

export default IndexPage
