import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

function ForgotPasswordButton({displayText, onPress, disabled}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{displayText}</Text>
      </View>
    </TouchableOpacity>
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
  },
  buttonText: {
    fontSize: 14,
    color: '#039BE5',
  },
});

export default ForgotPasswordButton;
