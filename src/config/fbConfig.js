import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

/**
 * Firebase configuration
 */
var config = {
	apiKey: 'AIzaSyCDQX_UAYLg44oOF40BGMT14Uk4prHJ5Hk',
	authDomain: 'kanjiapp-8f121.firebaseapp.com',
	databaseURL: 'https://kanjiapp-8f121.firebaseio.com',
	projectId: 'kanjiapp-8f121',
	storageBucket: 'kanjiapp-8f121.appspot.com',
	messagingSenderId: '623404513654'
};

firebase.initializeApp(config);
firebase.firestore().settings({});

export default firebase;
