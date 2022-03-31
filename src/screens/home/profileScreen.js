import * as React from 'react';
import {useContext} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  ScrollView,
  Dimensions,
} from 'react-native';
import DefaultBackground from '../../shared/defaultBackground';
import FireBaseContext from '../../context/fireBaseProvider';
import {firebase} from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';

const windowWidth = Dimensions.get('window').width;

function ProfileScreen({navigation}) {
  const {logoutUser} = useContext(FireBaseContext);
  const user = firebase.auth().currentUser;
  const phone = '+903246239466';
  const [photo, setPhoto] = React.useState(null);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const initials = user.displayName
    ? user.displayName
        .split(' ')
        .map(n => n[0])
        .join('')
    : '';

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      if (response && response.assets) {
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
        <Text
          style={{
            width: windowWidth * 0.22,
            height: windowWidth * 0.22,
            backgroundColor: '#5129c7',
            color: 'white',
            fontSize: windowWidth * 0.1,
            fontWeight: '700',
            textAlign: 'center',
            textAlignVertical: 'center',
            borderRadius: windowWidth * 0.22,
          }}>
          {initials.toUpperCase()}
        </Text>
      );
    }
  };

  return (
    <DefaultBackground>
      <View>
        <Text style={styles.header}>Profile & Settings</Text>
      </View>
      <ScrollView
        behavior={'position'}
        keyboardVerticalOffset={70}
        contentContainerStyle={styles.container}>
        <View style={styles.upperView}>
          <View>
            {insertProfilePic()}
            <TouchableOpacity style={styles.ppEdit} onPress={handleChoosePhoto}>
              <MaterialCommunityIcons
                name="pen"
                size={18}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.username}>{user.displayName}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.email}>{phone}</Text>
          </View>
        </View>

        <View style={styles.settingUnit}>
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
            trackColor={{false: '#c5c5c5', true: '#c5c5c5'}}
            thumbColor={'#676767'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.settingUnit}>
          <Text style={styles.settingText}>Add Google Account</Text>
          <TouchableOpacity style={styles.edit} onPress={handleChoosePhoto}>
            <MaterialCommunityIcons
              name="google"
              size={30}
              style={styles.googleIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.settingUnit}>
          <Text style={styles.settingText}>Account Settings</Text>
          <TouchableOpacity
            style={styles.edit}
            onPress={() =>
              navigation.navigate('Account Settings', {navigation: navigation})
            }>
            <MaterialCommunityIcons
              name="pen"
              size={30}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => logoutUser({navigation})}>
          <Text style={styles.signoutButtonText}>Signout</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingLeft: 20,
    paddingTop: 10,
  },
  container: {
    alignContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
  },
  upperView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: '#101010',
    textAlign: 'left',
    marginLeft: 20,
  },
  email: {
    fontSize: 15,
    fontWeight: '400',
    color: '#101010',
    textAlign: 'left',
    marginLeft: 20,
  },
  settingUnit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#bdbdbd',
    marginVertical: 10,
    paddingVertical: 10,
  },
  passwordSettingUnit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-between',
    marginTop: 10,
    paddingVertical: 10,
  },
  passwordView: {
    borderBottomWidth: 1,
    borderColor: '#bdbdbd',
    marginBottom: 10,
  },
  settingText: {
    fontSize: 17,
    fontWeight: '300',
    color: '#000000',
  },

  googleIcon: {
    color: '#000000',
    borderRadius: 15,
  },

  edit: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  editIcon: {
    fontSize: 20,
    color: '#000000',
  },
  profilePicture: {
    marginTop: 10,
    width: windowWidth * 0.22,
    height: windowWidth * 0.22,
    borderRadius: windowWidth * 0.22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ppEdit: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    height: windowWidth * 0.07,
    width: windowWidth * 0.07,
    borderRadius: windowWidth * 0.07,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: '#7a7a7a',
  },

  signoutButtonText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#b01e1e',
    marginTop: 10,
  },
  passwordResetForm: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
});
