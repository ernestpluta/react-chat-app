import { getFirestore } from '@firebase/firestore';
import { initializeApp} from 'firebase/app';
// import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
require('dotenv').config({path:'./.env'})

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,

};
// initialize firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app)
export { db, auth };
