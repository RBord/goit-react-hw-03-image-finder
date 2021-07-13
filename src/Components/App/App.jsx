import React from 'react';
import { fetchImages } from '../../Services/api';
import Searchbar from '../Searchbar/Searchbar';



class App extends React.Component {
    state = {
        imageName: null,
        images: [],
        reqStatus: 'idle',
        page: 1,
    };

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
        return (
            <div>
                <Searchbar onSubmit={this.handleFormSubmit}/>
            </div>
        )
    }
}

export default App;