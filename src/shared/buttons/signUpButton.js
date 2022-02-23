import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function SignUpButton({displayText, onPress, disabled}) {
  const gradientColors = ['#41ACFF', '#3B7AF9', '#00CFDC'];
  const gradientStart = {x: 0, y: 0};
  const gradientEnd = {x: 1, y: 0};

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={styles.button}>
        <LinearGradient
          start={gradientStart}
          end={gradientEnd}
          colors={gradientColors}
          style={styles.button}>
          <Text style={styles.buttonText}>{displayText}</Text>
        </LinearGradient>
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
    borderRadius: 10,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.25,
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SignUpButton;
