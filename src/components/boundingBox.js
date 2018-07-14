import React, { Component } from 'react';
import TweenMax from 'gsap';

class boundingBox extends Component {
  componentWillEnter(callback) {
    const el = this.container;
    TweenMax.fromTo(el, 0.6, { alpha: 0, display: 'block', delay: 0.5 }, { alpha: 1, display: 'block', delay: 0.5, onComplete: callback });
  }

  componentWillLeave(callback) {
    const el = this.container;
    TweenMax.fromTo(el, 0.2, { alpha: 1, display: 'block' }, { alpha: 0, display: 'block', onComplete: callback });
  }

  render() {
    const {
      top,
      left,
      bottom,
      right,
      height,
      width,
    } = this.props;

    return (
      <div
        ref={(c) => { this.container = c; }}
        className='box'
        style={{
          top: top,
          left: left,
          bottom: bottom,
          right: right,
          height: height,
          width: width,
        }}
      />
    );
  }
}

export default boundingBox;
