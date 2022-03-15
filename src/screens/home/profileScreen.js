import * as React from 'react';
import {useContext} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Avatar, Button, Subheading, Title} from 'react-native-paper';

import DefaultBackground from '../../shared/defaultBackground';
import LogoutButton from '../../shared/buttons/logoutButton';

import FireBaseContext from '../../context/fireBaseProvider';
import {firebase} from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function ProfileScreen({navigation}) {
  const {logoutUser} = useContext(FireBaseContext);
  const user = firebase.auth().currentUser;

  const initials = user.displayName
    .split(' ')
    .map(n => n[0])
    .join('.');

  return (
    <DefaultBackground>
      <Text style={styles.header}>PROFILE</Text>
      <View style={styles.container}>
        <Avatar.Text label={initials.toUpperCase()} style={styles.avatar} />
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
        <TouchableHighlight style={styles.resetPasswordButton}>
          <View style={styles.resetPasswordButtonView}>
            <Text style={styles.resetPasswordText}>Reset Password</Text>
          </View>
        </TouchableHighlight>
      </View>
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
    marginTop: 50,
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
    marginTop: 100,
  },

  addGoogleAccountText: {
    fontWeight: '500',
    color: '#3e25ab',
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
    marginTop: 30,
  },

  resetPasswordText: {
    fontWeight: '500',
    color: '#3e25ab',
    fontSize: 18,
  },
});
