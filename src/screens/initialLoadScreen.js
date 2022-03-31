import * as React from 'react';
import {useContext, useEffect} from 'react';
import DefaultBackground from '../shared/defaultBackground';
import {Text} from 'react-native';
import FireBaseContext from '../context/fireBaseProvider';

function InitialLoadScreen({navigation}) {
  const {user, getUserDetails} = useContext(FireBaseContext);

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        // TODO check for additional information about users documents
        navigation.navigate('Home Container');
        getUserDetails();
      } else {
        navigation.navigate('Verification');
      }
    } else {
      navigation.navigate('Initial Screen');
    }
  }, []);

  return (
    <DefaultBackground>
      <Text>LOADING...</Text>
    </DefaultBackground>
  );
}

export default InitialLoadScreen;
