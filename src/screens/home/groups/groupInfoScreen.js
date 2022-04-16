import React, {useContext} from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import DefaultBackground from '../../../shared/defaultBackground';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getGroupAdminId, getGroupMembers} from '../../../services/groups';
import {groupsAPI, userAPI} from '../../../api/utils';
import RedButton from '../../../shared/buttons/redButton';
import FireBaseContext from '../../../context/fireBaseProvider';
import {showDangerPopup, showSuccessPopup} from '../../../services/popup';
import {clearStackAndNavigate} from '../../../services/navigation';

const ListItem = ({item}) => (
  <View style={styles.userCardView}>
    <MaterialCommunityIcons name="account" style={styles.userIconView} />
    <Text style={styles.userInfoText}>
      {item && item.userName} {item && item.userLastname}
    </Text>
  </View>
);

const renderListItem = ({item}) => {
  return <ListItem item={item} />;
};

export default function GroupInfoScreen({route, navigation}) {
  const {user, Popup} = useContext(FireBaseContext);
  const {group} = route.params;
  const groupAdminId = getGroupAdminId(group);

  const [groupAdmin, setGroupAdmin] = useState();
  const [groupMembers, setGroupMembers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  async function fetchGroupAdmin() {
    const response = await userAPI.get(groupAdminId);
    setGroupAdmin(response.data[0]);
  }

  async function fetchGroupMembers() {
    setIsFetching(true);
    let memberList = [];
    const groupMemberIds = getGroupMembers(group.groupMembers);
    for (let i = 0; i < groupMemberIds.length; i++) {
      const response = await userAPI.get(groupMemberIds[i]);
      const newMember = response.data[0];
      if (newMember) {
        memberList = [...memberList, newMember];
      }
    }
    setGroupMembers(memberList);
    setIsFetching(false);
  }

  useEffect(() => {
    setGroupMembers([]);
    fetchGroupAdmin();
    fetchGroupMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultBackground>
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeader}>Administrator(s):</Text>
      </View>

      <View style={styles.userCardView}>
        <MaterialCommunityIcons name="account" style={styles.userIconView} />
        <Text style={styles.userInfoText}>
          {groupAdmin && groupAdmin.userName}{' '}
          {groupAdmin && groupAdmin.userLastname}
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

      <RedButton
        displayText="Leave"
        onPress={() => {
          const members = getGroupMembers(group.groupMembers);
          const index = members.indexOf(user.uid);
          members.splice(index, 1);
          groupsAPI
            .put(group.id, {
              ...group,
              groupMembers: members,
            })
            .then(() =>
              showSuccessPopup({
                Popup,
                title: 'Successfully Left',
                textBody: '',
              }),
            )
            .catch(() =>
              showDangerPopup({Popup, title: 'Unable to leave', textBody: ''}),
            );
          clearStackAndNavigate({navigation, screenName: 'Home Container'});
        }}
      />
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
});
