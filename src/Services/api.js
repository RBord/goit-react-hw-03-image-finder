import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const YOUR_ACCESS_KEY = '21772018-ea8d686ef9c180e6d9f46e4e4';

export const fetchImages = async (imageName, page) => {
    return await axios.get(`?q=${imageName}&page=${page}&key=${YOUR_ACCESS_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(res => {
            page += 1
            return res.data.hits
    })
};