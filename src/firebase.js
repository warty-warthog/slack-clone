import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';



const firebaseConfig = {
    apiKey: "AIzaSyC7HieojyCX3nBzjD62-iqMo7SOIUNNPSk",
    authDomain: "react-slack-clone-9f4b1.firebaseapp.com",
    databaseURL: "https://react-slack-clone-9f4b1.firebaseio.com",
    projectId: "react-slack-clone-9f4b1",
    storageBucket: "react-slack-clone-9f4b1.appspot.com",
    messagingSenderId: "777209938554",
    appId: "1:777209938554:web:eb4f9720c73da9084cb1c3",
    measurementId: "G-3CPTJ1Q5W3"
  };

  firebase.initializeApp(firebaseConfig);

  

  export default firebase;