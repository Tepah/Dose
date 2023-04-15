import * as React from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import styles from '../Styles';
import HomeScreen from '../../screens/Home';
import SocialScreen from '../../screens/Social';
import StatsScreen from '../../screens/Stats';
import ProfileScreen from '../../screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotificationsScreen from '../../screens/Notifications';
import SearchScreen from '../../screens/Search';
import {useContext, useEffect} from 'react';
import UserContext from '../../Contexts/UserContext';
import {AllHabitsScreen} from '../../screens/AllHabits';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Navigator = () => {
  const {username, profile} = useContext(UserContext);
  const [loading, setLoading] = React.useState(true);
  const [imageUrl, setImageUrl] = React.useState<string>(profile?.profilePic);
  const [imageLoaded, setImageLoaded] = React.useState<Boolean>(false);

  useEffect(() => {
    console.log('When there is an image: ' + username);
    setImageUrl(profile?.profilePic);
    if (imageUrl !== '') {
      setLoading(false);
    }
  }, [profile]);

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
        name="HomeStack"
        component={HomeStackNavigator}
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
          username: username,
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

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Add Habits"
        component={AllHabitsScreen}
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

const ProfileStackNavigator = () => {
  const {username} = useContext(UserContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
        initialParams={{
          user: username,
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
