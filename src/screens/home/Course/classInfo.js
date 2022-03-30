import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';

import DefaultBackground from '../../../shared/defaultBackground';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showSuccessPopup} from '../../../services/popup';
import {Popup} from 'popup-ui';

const windowHWidth = Dimensions.get('window').width;

var MEMBERS = [
  {
    id: '1',
    name: 'name1 lastname1',
  },
  {
    id: '2',
    name: 'name2 lastname2',
  },
  {
    id: '3',
    name: 'name3 lastname3',
  },
  {
    id: '4',
    name: 'name4 lastname4',
  },
  {
    id: '5',
    name: 'name5 lastname5',
  },
  {
    id: '6',
    name: 'name6 lastname6',
  },
  {
    id: '7',
    name: 'name7 lastname7',
  },
];

const ListItem = ({item}) => (
  <View style={styles.memberView}>
    <Text style={styles.memberName}>{item.name}</Text>
  </View>
);

export default function ClassInfo({route, navigation}) {
  const {course} = route.params;

  async function leaveGroupPressed() {
    await AsyncAlert(
      'You are leaving group ' + course.title + '. Are you sure?',
      '',
    );
    showSuccessPopup({
      Popup: Popup,
      title: 'You leaved group' + course.title + ' succesfully',
      textBody: '',
    });
    navigation.navigate('Home Container');
  }

  const AsyncAlert = async (title, message) =>
    new Promise(resolve => {
      Alert.alert(title, message, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            resolve('YES');
          },
        },
      ]);
    });

  async function shutdownGroupPressed() {
    //alertFunction().then();
    await AsyncAlert(
      'You are shutting down group ' + course.title + '. Are you sure?',
      'This will delete everything about this group irreversibly',
    );
    showSuccessPopup({
      Popup: Popup,
      title: 'You shutdown group ' + course.title + ' succesfully',
      textBody: '',
    });
    navigation.navigate('Home Container');
  }

  return (
    <DefaultBackground>
      <ScrollView style={styles.container}>
        <View style={styles.adminsHeaderView}>
          <Text style={styles.sectionHeader}>Administrator(s):</Text>
        </View>

        <View style={styles.adminCardView}>
          <MaterialCommunityIcons name="account" style={styles.adminIconView} />
          <Text style={styles.adminName}>{course.admin}</Text>
        </View>

        <View style={styles.membersHeaderView}>
          <Text style={styles.sectionHeader}>Members ({MEMBERS.length})</Text>
        </View>
        {MEMBERS.map((item, index) => {
          return <ListItem item={item} />;
        })}

        <View style={styles.decisionsHeaderView}>
          <Text style={styles.sectionHeader}>Decisions</Text>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={leaveGroupPressed}
            style={styles.leaveButtonTO}>
            <Text style={styles.leaveButtonText}>Leave</Text>
            <MaterialCommunityIcons name="exit-run" style={styles.buttonIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={shutdownGroupPressed}
            style={styles.shutdownButtonTO}>
            <Text style={styles.shutdownButtonText}>Shutdown</Text>
            <MaterialCommunityIcons
              name="grave-stone"
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    fontSize: 35,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a6a5a5',
    color: '#fcfcfc',
  },
  adminsHeaderView: {
    alignItems: 'flex-start',
    borderBottomWidth: 3,
    borderBottomColor: '#07198c',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    borderBottomWidth: 2,
    marginTop: 40,
    backgroundColor: '#07198c',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 5,
    width: '50%',
    textAlign: 'center',
  },
  adminCardView: {
    flexDirection: 'row',
    marginTop: 7,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
  },
  adminIconView: {color: '#4b4b4b', fontSize: 25},
  buttonView: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  adminName: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 7,
    color: '#4b4b4b',
  },
  membersHeaderView: {
    alignItems: 'flex-start',
    borderBottomWidth: 3,
    borderBottomColor: '#07198c',
  },
  decisionsHeaderView: {
    alignItems: 'flex-start',
    borderBottomWidth: 3,
    borderBottomColor: '#07198c',
  },
  leaveButtonTO: {
    backgroundColor: '#ff7979',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: windowHWidth * 0.3,
  },
  leaveButtonText: {fontWeight: '600', fontSize: 17, color: '#ffffff'},
  buttonIcon: {
    color: '#ffffff',
    fontSize: 25,
  },
  shutdownButtonTO: {
    backgroundColor: '#4378ff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: windowHWidth * 0.3,
  },

  shutdownButtonText: {fontWeight: '600', fontSize: 17, color: '#ffffff'},
  memberView: {
    backgroundColor: '#c4c4c4',
    borderRadius: 10,
    margin: 10,
    padding: 7,
    height: 50,
    justifyContent: 'center',
  },
  memberName: {
    fontSize: 17,
    fontWeight: '400',
    color: '#4b4b4b',
    marginLeft: 10,
  },
});
