import React, {Component} from 'react'
import TweenMax, { TimelineMax } from 'gsap';

class ImagePreview extends Component {
    componentWillEnter (callback) {
        const el = this.container;
        TweenMax.fromTo(el, 0.3, {y: 100, alpha: 0}, {y: 0, alpha: 1, onComplete: callback});
    }

    componentWillLeave (callback) {
        const el = this.container;
        TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback});
    }
    
    render() {
        return(
            <img className='preview img-fluid' ref={c => this.container = c} src={this.props.preview}/>
        )
    }
}

export default ImagePreview