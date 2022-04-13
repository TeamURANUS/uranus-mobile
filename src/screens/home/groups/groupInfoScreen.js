import React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import DefaultBackground from '../../../shared/defaultBackground';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getGroupAdminId, getGroupMembers} from '../../../services/groups';
import {userAPI} from '../../../api/utils';

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

export default function GroupInfoScreen({route}) {
  const {group} = route.params;
  const groupAdminId = getGroupAdminId(group);

  const [groupAdmin, setGroupAdmin] = useState();
  const [groupMembers, setGroupMembers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

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
