# Clarifai React Project

This repo contains the source code and documentation powering my static Clarifai React site.

It follows the [JAMstack architecture](https://jamstack.org) by using Git as a single source, [Gatsby](https://www.gatsbyjs.org/) as a static site generator, and [Netlify](netlify.com) for continuous deployment, and CDN distribution.

## Getting Started

### Prerequisites

* Node (I recommend using v8.2.0 or higher)
* [Gatsby CLI](https://www.gatsbyjs.org/docs/)

### Run Locally

```sh
git clone https://github.com/elvisguillen/clarifai-react.git
cd clarifai-react
npm install
gatsby develop
```

Site will run locally on localhost:8000

## Objective

Create a simple static web application that uses the Clarfai Javascript API to classify images. The app supports drag and drop functionality to upload images locally, then pre-processes them to base64 for the AI to infer and render concepts. I built this experience with React, Bootstrap, GatsbyJS, Webpack, SASS, and GSAP to animate interactions between intentions.


## Roadmap and Future Features

- Currently only uses the Generic Model, would love to add a dropdown to choose between different models. 
- My inititial intention was a chatbot that communicated what it sees so maybe linking it with a different NLP AI for generating responses based on concepts returned.
- Being able to train the model within the application. I'm thinking of use cases and metrics like Social Media Feed Quality that can determine wether your Instagram's feed aesthetic is on point. 
