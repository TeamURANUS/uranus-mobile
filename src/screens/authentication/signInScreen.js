import * as React from 'react';
import {useState, useContext} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import DefaultBackground from '../../shared/defaultBackground';
import SignInButton from '../../shared/buttons/signInButton';
import ForgotPasswordButton from '../../shared/buttons/forgotPasswordButton';
import FireBaseContext from '../../context/fireBaseProvider';

function SignInScreen({navigation}) {
  const {loginUser} = useContext(FireBaseContext);
  const [email: string, setEmail] = useState('');
  const [password: string, setPassword] = useState('');

  const refInput2 = React.useRef();

  return (
    <DefaultBackground>
      <Text style={styles.logoText}> Sign In!</Text>

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
          onSubmitEditing={() => refInput2.current.focus()}
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
          ref={refInput2}
          style={styles.input}
        />
      </View>

      <View style={styles.bottomContainer}>
        <SignInButton
          displayText="Sign In!"
          onPress={async () =>
            await loginUser({
              email,
              password,
              navigation,
            })
          }
        />
        <ForgotPasswordButton
          displayText="Forgot your password?"
          onPress={() => navigation.navigate('ForgotPassword')}
        />
      </View>
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

export default SignInScreen;
