import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey            : 'AIzaSyAi2X6R2sYpAfFa2O9gPX_J04107naHYTM',
	authDomain        : 'practice-contact-list.firebaseapp.com',
	databaseURL       : 'https://practice-contact-list-default-rtdb.firebaseio.com',
	projectId         : 'practice-contact-list',
	storageBucket     : 'practice-contact-list.appspot.com',
	messagingSenderId : '473645827389',
	appId             : '1:473645827389:web:abd3068e5de9e5d07df154',
	measurementId     : 'G-P9DT8WWE12'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const signInWithGoogle = () => {
	let provider = new firebase.auth.GoogleAuthProvider();
	auth
		.signInWithPopup(provider)
		.then((res) => {
			// console.log(res.user);
		})
		.catch((err) => {
			console.error(err);
		});
};

export default firebase;
