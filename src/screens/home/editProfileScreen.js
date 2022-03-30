import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import DefaultBackground from '../../shared/defaultBackground';
import {firebase} from '@react-native-firebase/auth';
import {onChangePasswordPress} from '../../services/authentication';

function EditProfileScreen({navigation}) {
  const user = firebase.auth().currentUser;
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');

  return (
    <DefaultBackground>
      <View style={styles.container}>
        <View style={styles.formView}>
          <View style={styles.passwordResetForm}>
            <TextInput
              style={styles.newPasswordTextInput}
              placeholder={'Current Password'}
              secureTextEntry={true}
              onChangeText={text => {
                setCurrentPassword(text);
              }}
            />
            <TextInput
              style={styles.newPasswordTextInput}
              placeholder={'New Password'}
              secureTextEntry={true}
              onChangeText={text => {
                setNewPassword(text);
              }}
            />
            <TouchableHighlight
              onPress={() =>
                onChangePasswordPress(user, newPassword, currentPassword)
              }>
              <View style={styles.resetPasswordButtonView}>
                <Text style={styles.resetPasswordButtonText}>
                  Reset Password
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </DefaultBackground>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: '500',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    color: '#0b128c',
    paddingLeft: 20,
    paddingTop: 10,
  },
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formView: {
    padding: 20,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#d3d3d3',
    height: '80%',
    width: '80%',
  },
  input: {
    borderRadius: 7,
    borderColor: '#bdbdbd',
    borderWidth: 2,
    paddingHorizontal: 10,
  },
  inputTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#626262',
  },
  formUnit: {
    margin: 10,
  },
  submitButtonTO: {
    alignSelf: 'center',
    backgroundColor: '#011d83',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 30,
    width: '60%',
  },
  submitButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  passwordResetForm: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
  newPasswordTextInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#8f8f8f',
    flexDirection: 'row',
    height: 50,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: 'white',
  },
  resetPasswordButtonView: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#090000',
    flexDirection: 'row',
    height: 50,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#2411af',
  },
  resetPasswordButtonText: {
    fontWeight: '500',
    color: '#ffffff',
    fontSize: 18,
  },
});
