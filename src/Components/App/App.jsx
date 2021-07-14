import React from 'react';
import { fetchImages } from '../../Services/api';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Spinner from '../Loader/Loader';

import s from '../App/App.module.css';
// import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';


class App extends React.Component {
    state = {
        imageName: null,
        images: [],
        reqStatus: 'idle',
        page: 1,
        showModal: false,
        fullImg: null,
    };
     
    toggleModal = props => {
        this.setState(({ showModal}) => ({
            showModal: !showModal,
            fullImg: props,
        }));
    }

    handleFormSubmit = imageName => {
        this.setState({ imageName });
    }

    onCloseModal = () => {
        this.setState({
            fullImg: null,
            showModal: false,
        })
    };

    onClickBtn = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }));
    };
    async componentDidUpdate(_, prevState) {
        const { imageName, page} = this.state;
        const isPageUpdate = prevState.page !== page;
        const updateStringQuery = prevState.imageName !== imageName;

        try {
            if (updateStringQuery || isPageUpdate) {
            this.setState({ reqStatus: 'pending'});
            const images = await fetchImages(imageName, page);
            this.setState({ reqStatus: 'resolve'});

            if (isPageUpdate) {
                this.setState(prevState => {
                    return {
                        images: [...prevState.images, ...images],
                    }
                })
            } 
            if (updateStringQuery || page === 1 ) {
                this.setState({images, page: 1})
                }
            }
        }
        catch {
            console.error();
        }
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    }
    
    render() {
        const { images, showModal, fullImg, reqStatus } = this.state;
        const isLoading = reqStatus === 'pending';
        const showImagesGallery = images.length >= 1 && !isLoading;
        
        return (
            <div className={s.App}>
                {showModal && <Modal fullImg={fullImg} onClick={this.onCloseModal}/>}
                <Searchbar onSubmit={this.handleFormSubmit} />
                {reqStatus === 'pending' && <Spinner/>}
                {showImagesGallery && <ImageGallery images={images} onClick={this.toggleModal} />}
                {showImagesGallery && <Button onClick={this.onClickBtn} />}
                {/* <Toaster/> */}
            </div>
        )
    }
}

export default App;