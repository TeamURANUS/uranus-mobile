import * as React from 'react';
import DefaultBackground from '../../shared/defaultBackground';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import VerificationButton from '../../shared/buttons/verificationButton';
import {useContext, useState} from 'react';
import FireBaseContext from '../../context/fireBaseProvider';

function UserDetailsFormScreen({navigation}) {
  const {addUserDetails} = useContext(FireBaseContext);
  const [userColleague, setUserColleague] = useState('');
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');

  const refInput2 = React.useRef();
  const refInput3 = React.useRef();
  const refInput4 = React.useRef();

  return (
    <DefaultBackground>
      <Text style={styles.logoText}> Enter Details! </Text>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Colleague"
            placeholderTextColor="grey"
            autoCorrect={false}
            returnKeyType="next"
            onChangeText={t => {
              setUserColleague(t);
            }}
            onSubmitEditing={() => refInput2.current.focus()}
            style={styles.input}
          />
          <TextInput
            placeholder="User Name"
            placeholderTextColor="grey"
            autoCorrect={false}
            returnKeyType="next"
            onChangeText={t => {
              setUserName(t);
            }}
            ref={refInput2}
            onSubmitEditing={() => refInput3.current.focus()}
            style={styles.input}
          />
          <TextInput
            placeholder="User Last Name"
            placeholderTextColor="grey"
            autoCorrect={false}
            returnKeyType="next"
            onChangeText={t => {
              setUserLastName(t);
            }}
            ref={refInput3}
            onSubmitEditing={() => refInput4.current.focus()}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone Number (555 333 22 11)"
            placeholderTextColor="grey"
            autoCorrect={false}
            returnKeyType="next"
            onChangeText={t => {
              setUserPhoneNumber(t);
            }}
            keyboardType="number-pad"
            ref={refInput4}
            style={styles.input}
          />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.bottomContainer}>
        <VerificationButton
          displayText="Add Information & Sign In"
          onPress={() =>
            addUserDetails({
              userColleague,
              userName,
              userLastName,
              userPhoneNumber: '+90' + userPhoneNumber,
              navigation,
            })
          }
        />
      </View>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  logoText: {
    marginTop: '15%',
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
  },
  bottomContainer: {
    width: '80%',
    marginLeft: '10%',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    padding: 10,
    top: '2%',
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
    borderColor: '#67b62d',
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
});

export default UserDetailsFormScreen;
