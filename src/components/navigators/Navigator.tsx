import * as React from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import styles from '../Styles';
import HomeScreen from '../../screens/Home';
import SocialScreen from '../../screens/Social';
import StatsScreen from '../../screens/Stats';
import ProfileScreen from '../../screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {mockProfileList} from '../../test/mockProfile1';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotificationsScreen from '../../screens/Notifications';
import SearchScreen from '../../screens/Search';
import firestore from '@react-native-firebase/firestore';
import {useEffect} from 'react';
import Styles from '../Styles';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Navigator = ({user}: {user: string}) => {
  const [loading, setLoading] = React.useState(true);
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [imageLoaded, setImageLoaded] = React.useState<Boolean>(false);
  const [fullChanges, setFullChanges] = React.useState<Boolean>(false);
  console.log('On user sign in the user is: ' + user);

  useEffect(() => {
    console.log('When there is an image: ' + user);
    if (imageUrl !== '') {
      setLoading(false);
    }
  }, [imageUrl]);

  useEffect(() => {
    // Get profile picture when loading, and when there are changes
    getImage();
  }, [fullChanges]);

  const getImage = async () => {
    // Gets profile picture of current user for navigation bar
    try {
      const docSnapshot = await firestore().collection('Users').doc(user).get();
      if (docSnapshot.exists) {
        const picUrl = await docSnapshot.data()?.profilePic;
        setImageUrl(picUrl);
      } else {
        console.log('No profile picture?' + ' Current user is: ' + user);
        return '';
      }
    } catch (err) {
      console.error('Error getting profile pic: ', err);
    }
  };
  getImage();

  if (loading) {
    return null;
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.navigator,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.iconFocused : null}>
              <Image
                source={require('../../icons/home.png')}
                style={styles.icons}
                resizeMode="contain"
              />
            </View>
          ),
          headerShown: false,
        }}
        initialParams={{username: user}}
      />
      <Tab.Screen
        name="Social"
        component={SocialStackNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.iconFocused : null}>
              <Image
                source={require('../../icons/social.png')}
                style={styles.icons}
                resizeMode="contain"
              />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.iconFocused : null}>
              <Image
                source={require('../../icons/stats.png')}
                style={[styles.icons]}
                resizeMode="contain"
              />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MainProfile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.iconFocused : null}>
              {!imageLoaded ? (
                <ActivityIndicator
                  size="small"
                  color="grey"
                  style={[styles.icons]}
                />
              ) : null}
              {loading ? null : (
                <Image
                  source={{uri: imageUrl}}
                  style={[styles.icons, styles.userPostImage]}
                  resizeMode="contain"
                  onLoad={() => setImageLoaded(true)}
                />
              )}
            </View>
          ),
          headerShown: false,
        }}
        initialParams={{
          user: user,
          currentUser: user,
          setFullChanges: setFullChanges,
        }}
      />
    </Tab.Navigator>
  );
};

const SocialStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={SocialScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileSearch"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = ({route}: any) => {
  const {user, currentUser} = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
        initialParams={{
          username: user,
          currentUser: currentUser,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
