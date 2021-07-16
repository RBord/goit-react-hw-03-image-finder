import React, {PureComponent} from 'react';
import { fetchImages } from '../../Services/api';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Spinner from '../Loader/Loader';

import s from '../App/App.module.css';
import 'react-toastify/dist/ReactToastify.css';


class App extends PureComponent {
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
    onScroll = () => {
        const ulEl = document.querySelector('ul');
        window.scrollTo({
            top: ulEl.scrollHeight,
            behavior: 'smooth',
        });
    }
    onClickBtn = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }));
    };

    async componentDidUpdate(_, prevState) {
        const { imageName, page} = this.state;
        const isPageUpdate = prevState.page !== page;
        const updateStringQuery = prevState.imageName !== imageName;
        if (updateStringQuery || isPageUpdate) {
            this.setState({ reqStatus: 'pending' })
            try {
                const images = await fetchImages(imageName, page).then(this.setState({ reqStatus: 'resolved' }));

                if (isPageUpdate && page !== 1) {
                    this.setState(prevState => {
                        return {
                            images: [...prevState.images, ...images],
                        }
                    })
                    setTimeout(()=> {
                        this.onScroll();
                    }, 500)
                }
                if (updateStringQuery || page === 1) {
                    this.setState({ images, page: 1});
                }
                
            }
            catch {
                console.error();
            }
        }
    }
        
    render() {
        const { images, showModal, fullImg, reqStatus} = this.state;
        const isLoading = reqStatus === 'pending';
        
        const showImagesGallery = images.length > 1 && !isLoading;
        
        return (
            <div className={s.App}>
                {showModal && <Modal fullImg={fullImg} onClick={this.onCloseModal}/>}
                <Searchbar onSubmit={this.handleFormSubmit} />
                {reqStatus === 'pending' && <Spinner/>}
                {showImagesGallery && <ImageGallery images={images} onClick={this.toggleModal} />}
                {showImagesGallery && <Button onClick={this.onClickBtn} />}
            </div>
        )
    }
}

export default App;