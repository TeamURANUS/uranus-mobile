import * as React from 'react';
import type {Node} from 'react';
import {Dimensions} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {FireBaseProvider} from './src/context/fireBaseProvider';

const NavigationTab = createMaterialTopTabNavigator();
const NavigationStack = createNativeStackNavigator();

import InitialScreen from './src/screens/initialScreen';
import InitialLoadScreen from './src/screens/initialLoadScreen';
import SignUpScreen from './src/screens/authentication/signUpScreen';
import SignInScreen from './src/screens/authentication/signInScreen';
import HomeScreen from './src/screens/home/homeScreen';
import ClassScreen from './src/screens/home/classAndCommunities/classScreen';
import CalendarScreen from './src/screens/home/calendarScreen';
import NotificationScreen from './src/screens/home/notificationScreen';
import ProfileScreen from './src/screens/home/profileScreen';
import CourseScreen from './src/screens/home/Course/CourseScreen';
import DetailedPostScreen from './src/screens/home/Course/detailedCoursePost';
import NewsScreen from './src/screens/home/news/newsScreen';
import DetailedNewsScreen from './src/screens/home/news/detailedNewsScreen';
import ContactsScreen from './src/screens/home/chat/contactsScreen';
import ChatScreen from './src/screens/home/chat/chatScreen';
import MessagesScreen from './src/screens/home/chat/messagesScreen';
import CourseAssignments from './src/screens/home/Course/courseAssignments';

function HomeContainer() {
  return (
    <NavigationTab.Navigator
      initialRouteName="Home"
      tabBarPosition="bottom"
      initialLayout={{width: Dimensions.get('window').width}}
      screenOptions={{
        tabBarActiveTintColor: '#3B7AF9',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {backgroundColor: '#c0c0c0', height: '10%'},
      }}>
      <NavigationTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="school" color={color} size={26} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <NavigationTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="calendar-month"
              color={color}
              size={26}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <NavigationTab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="newspaper-variant-multiple"
              color={color}
              size={26}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <NavigationTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <NavigationTab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="message-text-outline"
              color={color}
              size={26}
            />
          ),
          tabBarShowLabel: false,
        }}
      />

      <NavigationTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
          tabBarShowLabel: false,
        }}
      />
    </NavigationTab.Navigator>
  );
}

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <NavigationStack.Navigator initialRouteName="Load Screen">
        <NavigationStack.Screen
          name={'Load Screen'}
          component={InitialLoadScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <NavigationStack.Screen
          name="Initial Screen"
          component={InitialScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <NavigationStack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <NavigationStack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <NavigationStack.Screen
          name="Home Container"
          component={HomeContainer}
          options={{headerShown: false}}
        />
        <NavigationStack.Screen
          name="Detailed News"
          component={DetailedNewsScreen}
          options={({route}) => ({title: route.params.name})}
        />
        <NavigationStack.Screen
          name="Chat"
          component={ChatScreen}
          options={({route}) => ({title: route.params.name})}
        />
        <NavigationStack.Screen name="Contacts" component={ContactsScreen} />
        <NavigationStack.Screen
          name="Class"
          component={ClassScreen}
          options={({route}) => ({title: route.params.name})}
        />

        <NavigationStack.Screen
          name="Course"
          component={CourseScreen}
          options={{headerShown: false}}
        />

        <NavigationStack.Screen
          name="Detailed Post"
          component={DetailedPostScreen}
          options={{headerShown: false}}
        />

        <NavigationStack.Screen
          name="Assignments"
          component={CourseAssignments}
          options={{headerShown: false}}
        />
      </NavigationStack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <FireBaseProvider>
      <App />
    </FireBaseProvider>
  );
};
