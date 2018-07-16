Clarifai Frontend Coding Challenge - Elvis Guillen

This repo contains the source code and documentation powering my static Clarifai client-side application for the coding challenge portion of my interview.

Install Prerequisites:

* Node (I recommend using v8.2.0 or higher)
* [Gatsby CLI](https://www.gatsbyjs.org/docs/) -  npm install --global gatsby-cli 

Run Locally:

cd clarifai-react
npm install
gatsby develop

Site will run locally on localhost:8000

Site Structure:

/src/pages/index.js - Main page component file that has all the image processing and face detection logic, it also renders the main front end.
/src/components - Smaller components used to render parts of the front end including, image and bounding box elements.
/src/layout/index.js - Layout component that renders the page component, includes sidebar and body layout elements.

/styles/global/* - SASS files that are global including initial variables, animations, initial text and layout styling.
/styles/home.scss - Main styling for the main page elements.

Objective:

Create a client-side browser application that interacts with the Clarifai API and does the following:
	•	Allows a user to send an image to the Predict service, using the "Face Detection" model
	•	Displays the number of faces detected
	•	Uses the returned bounding boxes (if any) to draw a box around each face in the uploaded image

The app supports drag and drop functionality to upload images locally, then pre-processes them to base64 for the AI to infer and render bounding boxes and faces detected. 

Tools Used:

React - Best framework for state based layouts, also part of Clarifai’s workflow.
Bootstrap - Easy prototyping with class based components for responsiveness.
GatsbyJS - Static site generator that is focused on React and provides a PWA based framework using Webpack and GraphQL. Simple to implement SASS and offline functionality.
SASS - Favorite CSS preprocessor, I take advantage of variables, nesting, and loopable styles for staggering css.
GSAP & React Transition Group - Animation frameworks for interactions between intentions.
React Dropzone - Component library that implements a file upload, drag and drop interface.
ESLint - Javascript Linter used to maintain code quality, I use Airbnb’s style guide with minor modifications. 

Edge Cases:

There were a few issues I kept in mind while creating this:

- Percentage based bounding boxes for a fluid layout
- Image sizes with a max-height between vertical and horizontal images
- Correct handling when the AI returns 0 faces.
- Grammatical conditions when it tells you how many faces it sees.

Roadmap and Future Features:

- Currently only uses the Face Detection Model, would love to add a dropdown to choose between different models. 
- Cutting out the bounding box region from the image using canvas and rendering them in the sidebar, similar to the example on the documentation site: 
  https://clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection#documentation
- Being able to train a new model with the application.

