import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {

    apiKey: "",
    authDomain: "kanjiapp-8f121.firebaseapp.com",
    databaseURL: "https://kanjiapp-8f121.firebaseio.com",
    projectId: "kanjiapp-8f121",
    storageBucket: "kanjiapp-8f121.appspot.com",
    messagingSenderId: "623404513654"
  };

  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true })

  export default firebase
