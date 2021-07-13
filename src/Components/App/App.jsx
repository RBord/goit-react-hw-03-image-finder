import React from 'react';
import { fetchImages } from '../../Services/api';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';

import s from '../App/App.module.css';



class App extends React.Component {
    state = {
        imageName: null,
        images: [],
        reqStatus: 'idle',
        page: 1,
        showModal: false,
    };
     
    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    }

    handleFormSubmit = imageName => {
        this.setState({ imageName });
    }

    async componentDidUpdate(_, prevState) {
        if (prevState.imageName !== this.state.imageName) {
            const images = await fetchImages(this.state.imageName, this.state.page);
            this.setState({ images });
        } 
    }

    render() {
        const { images, showModal } = this.state;
        const showImagesGallery = images.length >= 1;
        return (
            <div className={s.App}>
                {showModal && <Modal/>}
                <Searchbar onSubmit={this.handleFormSubmit} />
                {showImagesGallery && <ImageGallery images={images} onClick={this.toggleModal}/>}
            </div>
        )
    }
}

export default App;