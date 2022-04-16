import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import DefaultBackground from '../../shared/defaultBackground';
import {getTitleStyle} from '../../services/dynamicStyles';
import {FAB} from 'react-native-paper';
import {getAllGroups} from '../../services/groups';
import {groupBy} from 'lodash';
import {GroupListItem} from '../../shared/components/groupListItem';
import FireBaseContext from '../../context/fireBaseProvider';

const renderListItem = ({item, navigation}) => (
  <GroupListItem item={item} navigation={navigation} />
);

function HomeScreen({navigation}) {
  const {user} = useContext(FireBaseContext);

  const [classData, setClassData] = useState([]);
  const [communityData, setCommunityData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const [showClasses, setShowClasses] = useState(true);

  async function fetchGroups() {
    const groupsData = await getAllGroups(user.uid);
    const seperatedGroupsData = groupBy(groupsData, 'groupIsCommunity');
    setClassData(seperatedGroupsData.false || []);
    setCommunityData(seperatedGroupsData.true || []);
    setIsFetching(false);
  }

  async function onRefresh() {
    setIsFetching(true);
    fetchGroups();
  }

  useEffect(() => {
    fetchGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultBackground>
      <View style={styles.topListNavigator}>
        <TouchableOpacity onPress={() => setShowClasses(true)}>
          <Text style={getTitleStyle({showClasses}).classContainerTitle}>
            Classes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowClasses(false)}>
          <Text style={getTitleStyle({showClasses}).communityContainerTitle}>
            Communities
          </Text>
        </TouchableOpacity>
      </View>

      {showClasses && (
        <View>
          <FlatList
            height={'100%'}
            data={classData}
            onRefresh={onRefresh}
            refreshing={isFetching}
            renderItem={({item}) => renderListItem({item, navigation})}
            keyExtractor={item => item.id}
          />
        </View>
      )}

      {!showClasses && (
        <View>
          <FlatList
            height={'100%'}
            data={communityData}
            onRefresh={onRefresh}
            refreshing={isFetching}
            renderItem={({item}) => renderListItem({item, navigation})}
            keyExtractor={item => item.id}
          />
        </View>
      )}
      <FAB
        icon="plus"
        style={styles.floatingButton}
        onPress={() => console.log('open sheet')}
      />
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  topListNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  floatingButton: {
    position: 'absolute',
    backgroundColor: '#3B7AF9',
    bottom: 16,
    right: 16,
  },
});

export default HomeScreen;
