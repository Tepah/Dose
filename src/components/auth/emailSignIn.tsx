import auth from '@react-native-firebase/auth';

export const emailSignIn = (email: string, password: string) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('emailSignIn.tsx: emailSignIn() success');
    })
    .catch(error => {
      console.log('emailSignIn.tsx: emailSignIn() error: ', error);
    });
};
