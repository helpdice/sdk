import { default as firebase } from 'firebase/compat/app';
import { Env } from './Env.js';

// Initialize Firebase (Make sure you replace the config with your Firebase project config)
const firebaseConfig = {
  apiKey: Env.firebase.FIREBASE_API_KEY,
  authDomain: Env.firebase.FIREBASE_AUTH_DOMAIN,
  projectId: Env.firebase.FIREBASE_PROJECT_ID,
  storageBucket: Env.firebase.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Env.firebase.FIREBASE_MESSAGING_SENDER_ID,
  appId: Env.firebase.FIREBASE_APP_ID,
  measurementId: Env.firebase.FIREBASE_MEASUREMENT_ID
};

const app = firebase.default.initializeApp(firebaseConfig);

export default app;