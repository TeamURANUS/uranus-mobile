import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {useContext, useState} from 'react';

import FireBaseContext from '../../context/fireBaseProvider';

import CheckBox from '@react-native-community/checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DefaultBackground from '../../shared/defaultBackground';
import SignUpButton from '../../shared/buttons/signUpButton';
import {checkAndRegisterUser} from '../../services/authentication';

function SignUpScreen({navigation}) {
  const {registerUser, Popup} = useContext(FireBaseContext);

  const [userName: string, setUserName] = useState('');
  const [email: string, setEmail] = useState('');
  const [password: string, setPassword] = useState('');
  const [confirmationPassword: string, setConfirmationPassword] = useState('');
  const [isAccepted: boolean, setAccepted] = useState(false);

  const refInput2 = React.useRef();
  const refInput3 = React.useRef();
  const refInput4 = React.useRef();

  return (
    <DefaultBackground>
      <KeyboardAwareScrollView>
        <Text style={styles.logoText}> Sign Up! </Text>

        <View style={styles.formContainer}>
          <TextInput
            placeholder="user name"
            placeholderTextColor="grey"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onChangeText={t => setUserName(t)}
            onSubmitEditing={() => refInput2.current.focus()}
            style={styles.input}
          />

          <TextInput
            placeholder="email"
            placeholderTextColor="grey"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onChangeText={t => {
              setEmail(t);
            }}
            ref={refInput2}
            onSubmitEditing={() => refInput3.current.focus()}
            style={styles.input}
          />

          <TextInput
            placeholder="password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onChangeText={t => {
              setPassword(t);
            }}
            ref={refInput3}
            onSubmitEditing={() => refInput4.current.focus()}
            style={styles.input}
          />

          <TextInput
            placeholder="password again"
            placeholderTextColor="grey"
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onChangeText={t => {
              setConfirmationPassword(t);
            }}
            ref={refInput4}
            style={styles.input}
          />

          <View style={styles.agreementContainer}>
            <CheckBox
              value={isAccepted}
              onValueChange={setAccepted}
              style={styles.checkbox}
            />
            <TouchableOpacity>
              <Text style={styles.agreementLink}>
                I agree with privacy policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <SignUpButton
            displayText="Sign Up!"
            onPress={async () =>
              await checkAndRegisterUser({
                Popup,
                userName,
                email,
                password,
                confirmationPassword,
                registerUser,
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

export default SignUpScreen;
