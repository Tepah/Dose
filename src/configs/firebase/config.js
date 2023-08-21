import firebase from '@react-native-firebase/app';
import Config from 'react-native-config';

const firebaseInit = async () => {
  const firebaseConfig = {
    apiKey: Config.FIREBASE_API_KEY,
    authDomain: Config.FIREBASE_AUTH_DOMAIN,
    projectId: Config.FIREBASE_PROJECT_ID,
    storageBucket: Config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
    appId: Config.FIREBASE_APP_ID,
  };

  if (!firebase.apps.length) {
    await firebase.initializeApp(firebaseConfig);
    console.log('Firebase Initialized');
  }
};
export default firebaseInit;
