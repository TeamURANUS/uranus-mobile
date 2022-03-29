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
import {onChangePasswordPress} from '../../services/authentication';

function ProfileScreen({navigation}) {
  const {logoutUser} = useContext(FireBaseContext);
  const user = firebase.auth().currentUser;
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [photo, setPhoto] = React.useState(null);
  const [verificationState, setVerificationState] = React.useState(false);

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

  function verifyButtonPressed() {
    setVerificationState(!verificationState);
  }

  return (
    <DefaultBackground>
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
        <Button onPress={() => logoutUser({navigation})}>Sign Out</Button>
        {verificationState ? (
          <View style={styles.verifiedView}>
            <Button
              onPress={verifyButtonPressed}
              style={styles.verifyButton}
              color={'#04d72f'}
              labelStyle={styles.verifyButtonLabel}>
              Verified
            </Button>
            <MaterialCommunityIcons name="check" style={styles.checkIcon} />
          </View>
        ) : (
          <View style={styles.verifiedView}>
            <Button
              onPress={verifyButtonPressed}
              style={styles.verifyButton}
              color={'#f54242'}
              labelStyle={styles.verifyButtonLabel}>
              Verify Profile
            </Button>
            <MaterialCommunityIcons
              name="exclamation-thick"
              size={28}
              style={styles.exclamationIcon}
            />
          </View>
        )}

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
          onPress={() =>
            onChangePasswordPress(user, newPassword, currentPassword)
          }>
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
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  avatar: {
    marginTop: 20,
  },
  signoutButton: {
    fontSize: 20,
    fontWeight: '500',
  },

  verifyButton: {
    marginRight: -5,
  },

  verifyButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },

  verifiedView: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 2,
  },

  checkIcon: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 28,
    backgroundColor: '#65d200',
    borderRadius: 14,
  },

  exclamationIcon: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 25,
    backgroundColor: '#de0101',
    borderRadius: 14,
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
    marginTop: 30,
    marginBottom: 30,
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
    backgroundColor: 'white',
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
    marginTop: 10,
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
