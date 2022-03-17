import * as React from 'react';
import {useContext} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Button, Subheading, Title} from 'react-native-paper';
import DefaultBackground from '../../shared/defaultBackground';
import FireBaseContext from '../../context/fireBaseProvider';
import {firebase} from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {showDangerPopup, showSuccessPopup} from '../../services/popup';
import {Popup} from 'popup-ui';

function ProfileScreen({navigation}) {
  const {logoutUser} = useContext(FireBaseContext);
  const user = firebase.auth().currentUser;
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [photo, setPhoto] = React.useState(null);

  const initials = user.displayName
    ? user.displayName
        .split(' ')
        .map(n => n[0])
        .join('')
    : '';

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      if (response) {
        setPhoto(response.assets[0].uri);
      } else {
      }
    });
  };

  const insertProfilePic = () => {
    if (photo) {
      return <Image source={{uri: photo}} style={styles.profilePicture} />;
    } else {
      return (
        <Avatar.Text
          label={initials.toUpperCase()}
          size={100}
          style={styles.avatar}
        />
      );
    }
  };

  const reauthenticate = () => {
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    return user.reauthenticateWithCredential(cred);
  };

  // Changes user's password...
  const onChangePasswordPress = () => {
    reauthenticate()
      .then(() => {
        user
          .updatePassword(newPassword)
          .then(() => {
            showSuccessPopup({
              Popup,
              title: 'Password changed succesfully',
              textBody: '',
            });
          })
          .catch(error => {
            showDangerPopup({
              Popup,
              title: 'Password change failed',
              textBody: error.message,
            });
          });
      })
      .catch(error => {
        showDangerPopup({
          Popup,
          title: 'Password change failed',
          textBody: error.message,
        });
      });
  };

  return (
    <DefaultBackground>
      <Text style={styles.header}>PROFILE</Text>

      <KeyboardAvoidingView
        behavior={'position'}
        keyboardVerticalOffset={70}
        contentContainerStyle={styles.container}>
        <View>
          {insertProfilePic()}
          <TouchableOpacity style={styles.edit} onPress={handleChoosePhoto}>
            <MaterialCommunityIcons name="pen" size={18} />
          </TouchableOpacity>
        </View>
        <Title>{user.displayName}</Title>
        <Subheading>{user.email}</Subheading>
        <Button
          onPress={() => logoutUser({navigation})}
          style={styles.signoutButton}>
          Sign Out
        </Button>
        <TouchableHighlight style={styles.addGoogleAccountButton}>
          <View style={styles.addGoogleAccountButtonView}>
            <Text style={styles.addGoogleAccountText}>Add Google Account</Text>
            <MaterialCommunityIcons
              name="google"
              size={30}
              style={styles.googleIcon}
            />
          </View>
        </TouchableHighlight>
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
          style={styles.resetPasswordButton}
          onPress={onChangePasswordPress}>
          <View style={styles.resetPasswordButtonView}>
            <Text style={styles.resetPasswordButtonText}>Reset Password</Text>
          </View>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    </DefaultBackground>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: '500',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    color: '#000000',
    paddingBottom: 20,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signoutButton: {
    fontSize: 20,
    fontWeight: '500',
  },
  addGoogleAccountButton: {
    flexDirection: 'column',
  },
  addGoogleAccountButtonView: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#090000',
    flexDirection: 'row',
    height: 50,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 40,
  },

  addGoogleAccountText: {
    fontWeight: '500',
    color: '#7137c4',
    fontSize: 18,
  },

  googleIcon: {
    marginLeft: 20,
    color: '#070000',
  },
  resetPasswordButton: {
    flexDirection: 'column',
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
    marginTop: 10,
  },

  resetPasswordButtonText: {
    fontWeight: '500',
    color: '#7137c4',
    fontSize: 18,
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
  },
  icon: {
    backgroundColor: '#ccc',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  edit: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d5d5d5',
    height: 30,
    width: 30,
    borderRadius: 15,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: '#7a7a7a',
  },
  profilePicture: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
