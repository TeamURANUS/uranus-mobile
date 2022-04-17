import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Root, Popup} from 'popup-ui';
import {authAPI, userAPI} from '../api/utils';
import {
  showDangerPopup,
  showSuccessPopup,
  showWarningPopup,
} from '../services/popup';
import {clearStackAndNavigate} from '../services/navigation';
import messaging from '@react-native-firebase/messaging';
const FireBaseContext = React.createContext();

export const FireBaseProvider = ({children}) => {
  const [user, setUser] = useState();
  const [userDetails, setUserDetails] = useState({});
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user_data) {
    setUser(user_data);
    if (initializing) {
      setInitializing(false);
    }
  }

  async function getUserDetails() {
    const response = await userAPI.get(`${user.uid}`);
    setUserDetails(response.data[0]);
  }

  async function fetchUserChanges() {
    await auth().currentUser.reload();
    setUser(auth().currentUser);
  }

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '641761728473-2hf089r2v3esj1put929vsgtac1rrr0n.apps.googleusercontent.com',
    });
    // noinspection UnnecessaryLocalVariableJS
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }

  async function registerUser({email, password, navigation}) {
    await authAPI
      .post('register/', {email, password})
      .then(() => {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            clearStackAndNavigate({navigation, screenName: 'Verification'});
          })
          .catch(error => {
            showDangerPopup({
              Popup,
              title: 'Register Failed',
              textBody: error.code,
            });
          });
      })
      .catch(error => {
        showDangerPopup({
          Popup,
          title: 'Register Failed',
          textBody: error.response.data.message,
        });
      });
  }

  async function checkVerification({navigation}) {
    await fetchUserChanges();
    if (!user.emailVerified) {
      showWarningPopup({
        Popup,
        title: 'Verification Error',
        textBody: 'You are still appearing to be unverified',
      });
      return;
    }
    navigation.navigate('User Details Form');
  }

  async function addUserDetails({
    userColleague,
    userName,
    userLastName,
    userPhoneNumber,
    navigation,
  }) {
    const dataJson = {
      userColleague: userColleague,
      userId: user.uid,
      userLastName: userLastName,
      userName: userName,
      fcmToken: await messaging().getToken(),
      userPhoneNumber: userPhoneNumber,
    };
    await userAPI
      .post('', dataJson)
      .then(() => {
        navigation.navigate('Home Container');
      })
      .catch(error => {
        showDangerPopup({
          Popup,
          title: 'User Information Error',
          textBody: error.response.data.message,
        });
      });
  }

  function loginUser({email, password, navigation}) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        clearStackAndNavigate({navigation, screenName: 'Home Container'});
        showSuccessPopup({Popup, title: 'Welcome!', textBody: ''});
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

  async function linkGoogleAccount() {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    const userInfo = await GoogleSignin.signIn();
    await auth().currentUser.linkWithCredential(userInfo.user);
  }

  const actions = {
    user: user,
    Popup: Popup,
    registerUser: registerUser,
    logoutUser: logoutUser,
    resetUsersPassword: resetUsersPassword,
    loginUser: loginUser,
    checkVerification: checkVerification,
    addUserDetails: addUserDetails,
    userDetails: userDetails,
    getUserDetails: getUserDetails,
    linkGoogleAccount: linkGoogleAccount,
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
