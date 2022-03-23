import * as React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useContext, useState} from 'react';

import FireBaseContext from '../../context/fireBaseProvider';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DefaultBackground from '../../shared/defaultBackground';
import SignUpButton from '../../shared/buttons/signUpButton';

function ForgotPasswordScreen({navigation}) {
  const {passwordResetUser} = useContext(FireBaseContext);

  const [email: string, setEmail] = useState('');

  return (
    <DefaultBackground>
      <KeyboardAwareScrollView>
        <Text style={styles.logoText}> Reset your password! </Text>

        <View style={styles.formContainer}>
          <TextInput
            placeholder="email"
            placeholderTextColor="grey"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onChangeText={t => {
              setEmail(t);
            }}
            style={styles.input}
          />
        </View>

        <View style={styles.bottomContainer}>
          <SignUpButton
            displayText="Reset my password!"
            onPress={async () =>
              await passwordResetUser({
                email,
                navigation,
              })
            }
          />
        </View>
      </KeyboardAwareScrollView>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  logoText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
  },
  formContainer: {
    marginTop: 20,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  input: {
    elevation: 11,
    borderBottomWidth: 5,
    borderColor: '#3B7AF9',
    fontSize: 20,
    padding: 10,
    margin: 10,
    width: 300,
    backgroundColor: '#eeeeee',
    color: 'black',
    shadowOffset: {height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  agreementContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    padding: 5,
  },
  checkbox: {
    alignSelf: 'center',
    margin: 5,
  },
  agreementLink: {
    color: '#0172af',
    fontSize: 20,
    marginTop: 8,
    marginLeft: 5,
  },
  bottomContainer: {
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

export default ForgotPasswordScreen;
