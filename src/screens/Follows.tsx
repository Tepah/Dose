import React, {useContext, useEffect} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import Styles from '../components/Styles';
import {CloseButton} from '../components/Close';
import {ProfileType, ShortProfileType} from '../components/types';
import firestore from '@react-native-firebase/firestore';
import UserContext from '../Contexts/UserContext';

export const FollowsScreen = ({route, navigation}: any) => {
  const {user, headerText} = route.params;
  const [loading, setLoading] = React.useState<boolean>(true);
  const [follows, setFollows] = React.useState<ShortProfileType[] | undefined>(
    undefined,
  );

  useEffect(() => {
    const getFollows = async () => {
      try {
        const userRef = firestore().collection('Users').doc(user);
        const userDoc = await userRef.get();
        let userFollows = [];
        if (headerText === 'Followers') {
          userFollows = userDoc.data()?.followers;
        } else {
          userFollows = userDoc.data()?.following;
        }
        const followsRef = firestore().collection('Users');
        setFollows([]);
        for (let i = 0; i < userFollows.length; i++) {
          const followDoc = await followsRef.doc(userFollows[i]).get();
          const followData = followDoc.data();
          const follow: ShortProfileType = {
            username: followData?.username,
            name: followData?.name,
            profilePic: followData?.profilePic,
          };
          // @ts-ignore
          setFollows(prev => [...prev, follow]);
        }
      } catch (err) {
        console.log('Error getting follows: ' + err);
      }
    };
    if (follows === undefined) {
      getFollows();
    } else {
      setLoading(false);
    };
  }, [follows]);

  if (loading) {
    return (
      <View style={Styles.app}>
        <Header headerText={headerText} navigation={navigation} />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={Styles.app}>
      <Header headerText={headerText} navigation={navigation} />
      <FollowList profiles={follows} navigation={navigation} />
    </View>
  );
};

const Header = ({headerText, navigation}: any) => {
  return (
    <View style={Styles.header}>
      <Text style={[Styles.text, Styles.notificationHeaderText]}>
        {headerText}
      </Text>
      <CloseButton type={'back'} closeFunction={() => navigation.goBack()} />
    </View>
  );
};

const FollowList = ({profiles, navigation}: any) => {
  const {username} = useContext(UserContext);
  return (
    <ScrollView style={Styles.searchResults}>
      {profiles.map((profile: ProfileType, index: number) => {
        if (profile.username === username) {
          return null;
        }
        return (
          <Pressable
            key={index}
            style={Styles.searchResultContainer}
            onPress={() =>
              navigation.navigate('Profile', {user: profile.username})
            }>
            <Image
              style={Styles.resultImage}
              source={{uri: profile.profilePic}}
            />
            <View style={Styles.searchResultText}>
              <Text style={[Styles.paragraphText]}>{profile.username}</Text>
              <Text style={[Styles.paragraphText]}>{profile.name}</Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};
