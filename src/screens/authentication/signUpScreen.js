import * as React from 'react';
import {StyleSheet, Text} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DefaultBackground from '../../shared/defaultBackground';

function SignUpScreen({navigation}) {
  return (
    <DefaultBackground>
      <KeyboardAwareScrollView>
        <Text style={styles.logoText}> Sign Up! </Text>
      </KeyboardAwareScrollView>
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

export default SignUpScreen;
