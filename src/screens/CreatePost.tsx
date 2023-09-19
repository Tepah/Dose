import {Text, View} from 'react-native';
import {AppButton} from '../components/Button';
import {useNavigation} from '@react-navigation/native';

export const PostScreen = ({route}: any) => {
  const {habit} = route;
  const navigation = useNavigation();
  const onPress = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Text>{habit}</Text>
      <AppButton onPress={onPress} title={'back'} />
    </View>
  );
};
