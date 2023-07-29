import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';

export const gmailSignUp = () => {
  GoogleSignin.configure({
    webClientId: Config.GOOGLE_CLIENT_ID,
  });

  async function onGoogleButtonPress() {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('gmailSignUp.tsx: gmailSignUp() error: ', error);
    }
  }
  onGoogleButtonPress();
};
