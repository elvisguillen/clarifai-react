import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TweenMax from 'gsap';

class ImagePreview extends Component {
  componentWillEnter(callback) {
    const el = this.container;
    TweenMax.fromTo(el, 0.6, { alpha: 0, display: 'block' },
      {
        alpha: 1, display: 'block', onComplete: callback,
      });
  }

  componentWillLeave(callback) {
    const el = this.container;
    TweenMax.fromTo(el, 0.6, { display: 'block', alpha: 1 },
      {
        alpha: 0, display: 'block', onComplete: callback,
      });
  }

  render() {
    const { preview } = this.props;
    return (
      <img className='preview img-fluid' ref={(c) => { this.container = c; }} src={preview} alt='face-detection-preview' />
    );
  }
}

ImagePreview.propTypes = {
  preview: PropTypes.string.isRequired,
};

export default ImagePreview;
