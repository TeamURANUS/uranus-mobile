import * as React from 'react';
import {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import DefaultBackground from '../../shared/defaultBackground';
import {getTitleStyle} from '../../services/dynamicStyles';
import {FAB} from 'react-native-paper';
import {getAllGroups, getNonmemberGroups} from '../../services/groups';
import {groupBy} from 'lodash';
import {GroupListItem} from '../../shared/components/groupListItem';
import {EnrollableGroupListItem} from '../../shared/components/enrollableGroupListItem';
import FireBaseContext from '../../context/fireBaseProvider';
import BottomSheet from 'react-native-gesture-bottom-sheet';

const windowHeight = Dimensions.get('window').height;

const renderSheetListItem = ({item, bottomSheet, onSheetRefresh}) => (
  <EnrollableGroupListItem
    item={item}
    bottomSheet={bottomSheet}
    onSheetRefresh={onSheetRefresh}
  />
);

const renderListItem = ({item, navigation}) => (
  <GroupListItem item={item} navigation={navigation} />
);

function HomeScreen({navigation}) {
  const {user} = useContext(FireBaseContext);

  console.log(user);
  const [allGroupData, setAllGroup] = useState([]);
  const [classData, setClassData] = useState([]);
  const [communityData, setCommunityData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSheetFetching, setIsSheetFetching] = useState(false);

  const [showClasses, setShowClasses] = useState(true);

  const bottomSheet = useRef();

  async function fetchGroups() {
    const nonMemberGroupData = await getNonmemberGroups(user.uid);
    const groupsData = await getAllGroups(user.uid);
    const seperatedGroupsData = groupBy(groupsData, 'groupIsCommunity');
    setAllGroup(nonMemberGroupData);
    setClassData(seperatedGroupsData.false || []);
    setCommunityData(seperatedGroupsData.true || []);
    setIsFetching(false);
    setIsSheetFetching(false);
  }

  async function onRefresh() {
    setIsFetching(true);
    fetchGroups();
  }

  async function onSheetRefresh() {
    setIsSheetFetching(true);
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
        <FlatList
          height={'100%'}
          data={classData}
          onRefresh={onRefresh}
          refreshing={isFetching}
          renderItem={({item}) => renderListItem({item, navigation})}
          keyExtractor={item => item.id}
        />
      )}

      {!showClasses && (
        <FlatList
          height={'100%'}
          data={communityData}
          onRefresh={onRefresh}
          refreshing={isFetching}
          renderItem={({item}) => renderListItem({item, navigation})}
          keyExtractor={item => item.id}
        />
      )}
      <FAB
        icon="plus"
        style={styles.floatingButton}
        onPress={() => bottomSheet.current.show()}
      />

      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={windowHeight * 0.8}
        sheetBackgroundColor={'#e5e5e5'}>
        <FlatList
          height={'100%'}
          data={allGroupData}
          onRefresh={onSheetRefresh}
          refreshing={isSheetFetching}
          renderItem={({item}) =>
            renderSheetListItem({item, bottomSheet, onSheetRefresh})
          }
          keyExtractor={item => item.id}
        />
      </BottomSheet>
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
