import * as React from 'react';
import {useContext, useEffect} from 'react';
import DefaultBackground from '../shared/defaultBackground';
import {Text} from 'react-native';

function InitialLoadScreen({navigation}) {
  useEffect(() => {
    navigation.navigate('Initial Screen');
  });

  return (
    <DefaultBackground>
      <Text>LOADING...</Text>
    </DefaultBackground>
  );
}

export default InitialLoadScreen;
