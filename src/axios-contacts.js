import axios from 'axios';

const instance = axios.create({
	baseURL : 'https://practice-contact-list-default-rtdb.firebaseio.com/'
});

export default instance;
