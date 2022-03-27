import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

import {Root, Popup} from 'popup-ui';
import {showDangerPopup, showSuccessPopup} from '../services/popup';
import {clearStackAndNavigate} from '../services/navigation';
const FireBaseContext = React.createContext();

export const FireBaseProvider = ({children}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function registerUser({userName, email, password, navigation}) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async UserCredentials => {
        await UserCredentials.user
          .updateProfile({displayName: userName})
          .then(async () => {
            showSuccessPopup({
              Popup,
              title: `Welcome ${userName}`,
              textBody: '',
            });
            clearStackAndNavigate({
              navigation,
              screenName: 'Home Container',
            });
          })
          .catch(error => {
            showDangerPopup({
              Popup,
              title: 'Sign Up Failed',
              textBody: error.code,
            });
          });
      })
      .catch(error => {
        showDangerPopup({
          Popup: Popup,
          title: `${error.code}`,
          textBody: 'Please try again',
        });
      });
  }

  function onAuthStateChanged(user_data) {
    setUser(user_data);
    if (initializing) {
      setInitializing(false);
    }
  }

  function loginUser({email, password, navigation}) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        clearStackAndNavigate({navigation, screenName: 'Home Container'});
      })
      .catch(error => {
        showDangerPopup({Popup, title: 'Sign In Failed', textBody: error.code});
      });
  }

  function logoutUser({navigation}) {
    auth()
      .signOut()
      .then(() => {
        clearStackAndNavigate({navigation, screenName: 'Initial Screen'});
      })
      .catch(error => {
        showDangerPopup({Popup, title: 'Logout Failed', textBody: error.code});
      });
  }

  function resetUsersPassword({email, navigation}) {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        clearStackAndNavigate({navigation, screenName: 'SignIn'});
      })
      .catch(error => {
        showDangerPopup({
          Popup,
          title: 'Password Reset Failed',
          textBody: error.code,
        });
      });
  }

  useEffect(() => {
    // noinspection UnnecessaryLocalVariableJS
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }

  const actions = {
    user: user,
    Popup: Popup,
    registerUser: registerUser,
    logoutUser: logoutUser,
    resetUsersPassword: resetUsersPassword,
    loginUser: loginUser,
  };

  return (
    <Root>
      <FireBaseContext.Provider value={actions}>
        {children}
      </FireBaseContext.Provider>
    </Root>
  );
};

export default FireBaseContext;
