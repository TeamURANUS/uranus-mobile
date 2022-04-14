import * as React from 'react';
import {useContext} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import DefaultBackground from '../../../shared/defaultBackground';
import FireBaseContext from '../../../context/fireBaseProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';

const windowWidth = Dimensions.get('window').width;

function ProfileScreen({navigation}) {
  const {user, userDetails, logoutUser} = useContext(FireBaseContext);
  const [photo, setPhoto] = React.useState(null);

  const initials = userDetails.userName ? userDetails.userName[0] : '';

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
        <View style={styles.defaultProfilePicture}>
          <Text style={styles.initials}>{initials.toUpperCase()}</Text>
        </View>
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
            <Text style={styles.username}>
              {userDetails.userName} {userDetails.userLastname}
            </Text>
          </View>
        </View>

        <View style={styles.settingUnit}>
          <Text style={styles.settingText}>{user.email}</Text>
        </View>

        <TouchableOpacity style={styles.googleUnit} onPress={handleChoosePhoto}>
          <Text style={styles.googleText}>Add Google Account</Text>
          <MaterialCommunityIcons
            name="google"
            size={30}
            style={styles.googleIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => logoutUser({navigation})}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
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
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#000000',
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
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000000',
  },

  googleUnit: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-between',
    marginVertical: 10,
    paddingVertical: 10,
    shadowOffset: {height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.25,
  },

  googleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007dff',
  },

  googleIcon: {
    color: '#ff0000',
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
  defaultProfilePicture: {
    width: windowWidth * 0.22,
    height: windowWidth * 0.22,
    backgroundColor: '#fb84ff',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.22,
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
  signOutButtonText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#b01e1e',
    marginTop: 10,
    marginLeft: 10,
  },
  passwordResetForm: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
  initials: {
    fontSize: windowWidth * 0.1,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
});
