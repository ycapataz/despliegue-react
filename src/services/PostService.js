import axios from "axios";

const Url_post = 'https://vpetsoft.onrender.com/api/Post';

class PostService {
    getAllPosts() {
        return axios.get(`${Url_post}/all`);
    }

    getIdPost(id) {
        return axios.get(`${Url_post}/Get/${id}`);
    }

    createPost(postData) {
        return axios.post(`${Url_post}/create`, postData);
    }

    updatePost(id, updatedData) {
        return axios.put(`${Url_post}/update/${id}`, updatedData);
    }
}

export default new PostService();