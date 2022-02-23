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
