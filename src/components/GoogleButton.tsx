import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {gmailSignUp} from './auth/gmailSignUp';

export const GoogleButton = () => {
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={gmailSignUp}
    />
  );
};
