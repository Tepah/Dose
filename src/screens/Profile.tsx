import * as React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import Styles from '../components/Styles';
import {mockProfile1} from '../test/mockProfile1';

const ProfileScreen = () => {
  const profileInfo = (
    <View style={Styles.profileHeader}>
      <View style={Styles.profileHeaderUser}>
        <Image source={mockProfile1.profilePic} style={Styles.profilePicture} />
        <Text style={[Styles.text, Styles.profileNameText]}>
          {mockProfile1.username}
        </Text>
      </View>
      <View style={Styles.followContainer}>
        <Text style={[Styles.text, Styles.profileHeaderText]}>Habits</Text>
        <Text style={[Styles.text, Styles.followCount]}>20</Text>
      </View>
      <View style={Styles.followContainer}>
        <Text style={[Styles.text, Styles.profileHeaderText]}>
          Following
        </Text>
        <Text style={[Styles.text, Styles.followCount]}>20</Text>
      </View>
      <View style={Styles.followContainer}>
        <Text style={[Styles.text, Styles.profileHeaderText]}>
          Followers
        </Text>
        <Text style={[Styles.text, Styles.followCount]}>20</Text>
      </View>
    </View>
  );

  return (
    <View style={Styles.app}>
      <View style={Styles.profileContainer}>
        {profileInfo}
      </View>
    </View>
  );
};

export default ProfileScreen;
