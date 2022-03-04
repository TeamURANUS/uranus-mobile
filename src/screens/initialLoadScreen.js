import * as React from 'react';
import {useContext, useEffect} from 'react';
import DefaultBackground from '../shared/defaultBackground';
import {Text} from 'react-native';
import FireBaseContext from '../context/fireBaseProvider';

function InitialLoadScreen({navigation}) {
  const {user} = useContext(FireBaseContext);

  useEffect(() => {
    if (user) {
      navigation.navigate('Home Container');
    } else {
      navigation.navigate('Initial Screen');
    }
  });

  return (
    <DefaultBackground>
      <Text>LOADING...</Text>
    </DefaultBackground>
  );
}

export default InitialLoadScreen;
