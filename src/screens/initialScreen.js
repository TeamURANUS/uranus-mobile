import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DefaultBackground from '../shared/defaultBackground';
import SignUpButton from '../shared/buttons/signUpButton';
import SignInButton from '../shared/buttons/signInButton';

function InitialScreen({navigation}) {
  return (
    <DefaultBackground>
      <Text style={styles.logoText}> educatied </Text>

      <View style={styles.buttonContainer}>
        <SignInButton
          displayText={'Sign In'}
          onPress={() => navigation.navigate('SignIn')}
        />
        <SignUpButton
          displayText={'Sign Up'}
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>

      <View style={styles.googleButtonContainer} />
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  logoText: {
    top: 150,
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    top: 200,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  googleButtonContainer: {
    top: 225,
    width: '80%',
    marginLeft: '10%',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderColor: 'rgba(185,185,185,0.6)',
  },
});

export default InitialScreen;
