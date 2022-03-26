import * as React from 'react';
import DefaultBackground from '../../shared/defaultBackground';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import VerificationButton from '../../shared/buttons/verificationButton';
import {useContext, useState} from 'react';
import FireBaseContext from '../../context/fireBaseProvider';

function UserDetailsFormScreen({navigation}) {
  const {addUserDetails} = useContext(FireBaseContext);
  const [userColleague, setUserColleague] = useState('');
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');

  const refInput2 = React.useRef();
  const refInput3 = React.useRef();

  return (
    <DefaultBackground>
      <Text style={styles.logoText}> Enter Details! </Text>

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
          style={styles.input}
        />
      </View>

      <View style={styles.bottomContainer}>
        <VerificationButton
          displayText="Add Information & Sign In"
          onPress={() =>
            addUserDetails({userColleague, userName, userLastName, navigation})
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
