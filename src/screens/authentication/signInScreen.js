import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import DefaultBackground from '../../shared/defaultBackground';

function SignInScreen({navigation}) {
  return (
    <DefaultBackground>
      <Text style={styles.logoText}> educatied </Text>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  logoText: {
    marginTop: 150,
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SignInScreen;
