import * as React from 'react';
import {useContext} from 'react';
import {Text} from 'react-native';

import DefaultBackground from '../../shared/defaultBackground';
import LogoutButton from '../../shared/buttons/logoutButton';

import FireBaseContext from '../../context/fireBaseProvider';

function ProfileScreen({navigation}) {
  const {logoutUser} = useContext(FireBaseContext);

  return (
    <DefaultBackground>
      <Text>PROFILE</Text>

      <LogoutButton
        onPress={() => logoutUser({navigation})}
        displayText="Logout"
      />
    </DefaultBackground>
  );
}

export default ProfileScreen;
