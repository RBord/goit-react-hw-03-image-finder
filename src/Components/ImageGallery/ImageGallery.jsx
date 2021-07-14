import React from 'react';
import s from '../ImageGallery/ImageGallery.module.css';

const ImageGallery = ({images, onClick}) => {
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
};
export default ImageGallery;