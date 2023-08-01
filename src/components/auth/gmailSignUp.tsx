import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';
import firestore from '@react-native-firebase/firestore';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

export const gmailSignUp = (
  navigation: NativeStackNavigationProp<ParamListBase>,
) => {
  GoogleSignin.configure({
    webClientId: Config.GOOGLE_CLIENT_ID,
  });

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices();
      // Get the users ID token
      const userInfo = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );

      const usersWithEmail = await firestore()
        .collection('Users')
        .where('email', '==', userInfo.user.email)
        .get();
      if (usersWithEmail.docs.length > 0) {
        return auth().signInWithCredential(googleCredential);
      }
      navigation.navigate('Gmail Sign Up', {
        user: userInfo.user,
        googleCredential: googleCredential,
      });
    } catch (error) {
      console.log('gmailSignUp.tsx: gmailSignUp() error: ', error);
    }
  }
  onGoogleButtonPress();
};
