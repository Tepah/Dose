import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {gmailSignUp} from './auth/gmailSignUp';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';

export const GoogleButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={() => gmailSignUp(navigation)}
    />
  );
};
