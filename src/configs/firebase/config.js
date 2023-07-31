import firebase from '@react-native-firebase/app';

const firebaseInit = async () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAcf77XokuJN_yvmhn53Ll2m_GOfXSLkzA',
    authDomain: 'dose-1a0df.firebaseapp.com',
    projectId: 'dose-1a0df',
    storageBucket: 'dose-1a0df.appspot.com',
    messagingSenderId: '603937311096',
    appId: '1:603937311096:ios:f66685a665bb39e699a08d',
  };

  if (!firebase.apps.length) {
    await firebase.initializeApp(firebaseConfig);
    console.log('Firebase Initialized');
  }
};
export default firebaseInit;
