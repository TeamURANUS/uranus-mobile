import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function ForgotPasswordScreen({displayText, onPress, disabled}) {
  return (
    <View style={styles.text}>
      <Text>Forgot your password? will edit there.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
    elevation: 10,
    width: 300,
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.25,
    borderColor: '#000',
  },
  text: {
    flex: 1,
    fontSize: 18,
    color: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
  },
});

export default ForgotPasswordScreen;
