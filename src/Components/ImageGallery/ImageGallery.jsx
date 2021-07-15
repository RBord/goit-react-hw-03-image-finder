import React, { PureComponent } from 'react';
import s from '../ImageGallery/ImageGallery.module.css';

class ImageGallery extends PureComponent {
    
    render() {
        const { images, onClick } = this.props;
        
        return (
        <ul className={s.ImageGallery}>
            {images.map(image => (
                <li key={image.id}><img src={image.webformatURL} alt="" onClick={(e => {
                    e.preventDefault()
                    onClick(image.webformatURL);
                })}/></li>
            ))}
        </ul>
    )
    }
}
export default ImageGallery;