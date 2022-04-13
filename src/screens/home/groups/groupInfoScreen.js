import React from 'react';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  Switch,
  FlatList,
} from 'react-native';

import DefaultBackground from '../../../shared/defaultBackground';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showSuccessPopup} from '../../../services/popup';
import {Popup} from 'popup-ui';
import {getGroupAdminId, getGroupMembers} from '../../../services/groups';
import {userAPI} from '../../../api/utils';

const windowHWidth = Dimensions.get('window').width;

const ListItem = ({item}) => (
  <View style={styles.userCardView}>
    <MaterialCommunityIcons name="account" style={styles.userIconView} />
    <Text style={styles.userInfoText}>
      {item && item.userName}
      {item && item.userLastName}
    </Text>
  </View>
);

const renderListItem = ({item}) => {
  return <ListItem item={item} />;
};

export default function GroupInfoScreen({route, navigation}) {
  const {group} = route.params;
  const groupAdminId = getGroupAdminId(group);

  const [groupAdmin, setGroupAdmin] = useState();
  const [groupMembers, setGroupMembers] = useState([]);
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const toggleSwitch = () =>
    setIsSwitchEnabled(previousState => !previousState);

  async function fetchGroupAdmin() {
    const response = await userAPI.get(groupAdminId);
    setGroupAdmin(response.data[0]);
  }

  async function fetchAndAddGroupMember(userId, endFetching) {
    const response = await userAPI.get(userId);
    const newMember = response.data[0];
    if (newMember) {
      const exists = groupMembers.some(member => member.id === newMember.id);
      if (!exists) {
        setGroupMembers([...groupMembers, newMember]);
      } else {
        const index = groupMembers.findIndex(
          member => member.id === newMember.id,
        );
        setGroupMembers(groupMembers.splice(index, 1, newMember));
      }
      setIsFetching(!endFetching);
    }
  }

  function fetchGroupMembers() {
    setIsFetching(true);
    const groupMemberIds = getGroupMembers(group.groupMembers);
    groupMemberIds.forEach((userId, index) => {
      fetchAndAddGroupMember(userId, index === groupMemberIds.length - 1);
    });
  }

  useEffect(() => {
    setGroupMembers([]);
    fetchGroupAdmin();
    fetchGroupMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function leaveGroupPressed() {
    await AsyncAlert(
      `You are leaving group ${group.groupName} Are you sure?`,
      '',
    );
    showSuccessPopup({
      Popup: Popup,
      title: `You leaved group ${group.groupName} succesfully`,
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
      'You are shutting down group ' + group.groupName + '. Are you sure?',
      'This will delete everything about this group irreversibly',
    );
    showSuccessPopup({
      Popup: Popup,
      title: 'You shutdown group ' + group.groupName + ' succesfully',
      textBody: '',
    });
    navigation.navigate('Home Container');
  }

  return (
    <DefaultBackground>
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeader}>Administrator(s):</Text>
      </View>

      <View style={styles.userCardView}>
        <MaterialCommunityIcons name="account" style={styles.userIconView} />
        <Text style={styles.userInfoText}>
          {groupAdmin && groupAdmin.userName}
          {groupAdmin && groupAdmin.userLastName}
        </Text>
      </View>

      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeader}>
          Members ({groupMembers.length})
        </Text>
      </View>

      <FlatList
        data={groupMembers}
        onRefresh={fetchGroupMembers}
        refreshing={isFetching}
        renderItem={item => renderListItem(item)}
        keyExtractor={item => item.id}
      />

      <View style={styles.sectionHeaderContainer}>
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
      <View style={styles.notificationView}>
        <Text style={styles.notificationText}>Notifications: </Text>
        <Switch
          trackColor={{false: '#c5c5c5', true: '#c5c5c5'}}
          thumbColor={'#676767'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isSwitchEnabled}
        />
      </View>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    alignItems: 'flex-start',
    borderBottomWidth: 3,
    borderBottomColor: '#07198c',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#07198c',
    padding: 5,
    textAlign: 'center',
  },
  userCardView: {
    flexDirection: 'row',
    margin: 10,
  },
  userIconView: {
    color: '#4b4b4b',
    fontSize: 25,
  },
  buttonView: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  userInfoText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 7,
    color: '#4b4b4b',
  },
  groupMember: {
    flexDirection: 'row',
    margin: 5,
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
    backgroundColor: '#e1e1e1',
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
  notificationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
  },
  notificationText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    marginRight: 20,
  },
});
