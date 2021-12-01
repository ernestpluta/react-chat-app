import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
// require('firebase/auth')


const firebaseConfig = {
    apiKey: "AIzaSyBHQAfh5z6zDtvJ3dx5PvmwvI3_1k6tivU",
    authDomain: "cooking-site-912c9.firebaseapp.com",
    projectId: "cooking-site-912c9",
    storageBucket: "cooking-site-912c9.appspot.com",
    messagingSenderId: "266087791187",
    appId: "1:266087791187:web:5450fc2a061a87dd1b64a6"
  };
    // initialize firebase
   const db = firebase.initializeApp(firebaseConfig)


    const auth = db.auth()
    export { db, auth }
  