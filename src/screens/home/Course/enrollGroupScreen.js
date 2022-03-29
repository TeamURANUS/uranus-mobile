import * as React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import DefaultBackground from '../../../shared/defaultBackground';
import {getTitleStyle} from '../../../services/dynamicStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showSuccessPopup} from '../../../services/popup';
import {Popup} from 'popup-ui';

const windowHeight = Dimensions.get('window').height;

const COMMUNITY_DATA = [
  {
    type: 'community',
    id: '1',
    title: 'EVT',
    text: 'ORTAM PARTİ',
    imageUrl:
      'https://media.istockphoto.com/photos/man-holding-blue-helmet-close-up-picture-id1178982949?s=612x612',
    admin: 'name lastname',
  },
  {
    type: 'community',
    id: '2',
    title: 'ASAT',
    text: 'AT AVRAT SİLAH',
    imageUrl:
      'https://media.istockphoto.com/photos/man-holding-blue-helmet-close-up-picture-id1178982949?s=612x612',
    admin: 'name lastname',
  },
  {
    type: 'community',
    id: '3',
    title: 'TOBB BİLGİSAYAR',
    text: 'ARADIĞINIZ KLUÜB BULUNAMADI',
    imageUrl:
      'https://media.istockphoto.com/photos/man-holding-blue-helmet-close-up-picture-id1178982949?s=612x612',
    admin: 'name lastname',
  },
];

const CLASS_DATA = [
  {
    type: 'class',
    id: '1',
    title: 'BIL 496',
    text: 'lorem ipsum',
    imageUrl:
      'https://media.istockphoto.com/photos/man-holding-blue-helmet-close-up-picture-id1178982949?s=612x612',
  },
  {
    type: 'class',
    id: '2',
    title: 'END 321',
    text: 'lorem ipsum',
    imageUrl:
      'https://media.istockphoto.com/photos/young-people-with-face-masks-back-at-work-or-school-in-office-after-picture-id1250279730?s=612x612',
  },
  {
    type: 'class',
    id: '3',
    title: 'BIL 441',
    text: 'lorem ipsum',
    imageUrl:
      'https://media.istockphoto.com/photos/remote-working-from-home-freelancer-workplace-in-kitchen-with-laptop-picture-id1213497796?s=612x612',
  },
  {
    type: 'class',
    id: '4',
    title: 'SOC 203',
    text: 'lorem ipsum',
    imageUrl:
      'https://media.istockphoto.com/photos/turner-worker-working-on-drill-bit-in-a-workshop-picture-id1128735755?s=612x612',
  },
  {
    type: 'class',
    id: '5',
    title: 'BIL 441',
    text: 'lorem ipsum',
    imageUrl:
      'https://media.istockphoto.com/photos/remote-working-from-home-freelancer-workplace-in-kitchen-with-laptop-picture-id1213497796?s=612x612',
  },
  {
    type: 'class',
    id: '6',
    title: 'SOC 203',
    text: 'lorem ipsum',
    imageUrl:
      'https://media.istockphoto.com/photos/turner-worker-working-on-drill-bit-in-a-workshop-picture-id1128735755?s=612x612',
  },
  {
    type: 'class',
    id: '7',
    title: 'BIL 441',
    text: 'lorem ipsum',
    imageUrl:
      'https://media.istockphoto.com/photos/remote-working-from-home-freelancer-workplace-in-kitchen-with-laptop-picture-id1213497796?s=612x612',
  },
  {
    type: 'class',
    id: '8',
    title: 'SOC 203',
    text: 'lorem ipsum',
    imageUrl:
      'https://media.istockphoto.com/photos/turner-worker-working-on-drill-bit-in-a-workshop-picture-id1128735755?s=612x612',
  },
];

const ListItem = ({item, navigation, isCourse, joinButtonPressed}) => (
  <View style={styles.listItem}>
    <View style={styles.listItemTop}>
      <Image
        style={styles.itemImage}
        source={{
          uri: item.imageUrl,
        }}
      />
      <View style={styles.listItemTextContainer}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemText} numberOfLines={1}>
          {item.text}
        </Text>
      </View>
    </View>
    <View style={styles.listAdmin}>
      <MaterialCommunityIcons name="account" style={styles.adminIcon} />
      <Text style={styles.adminText}>{item.admin}</Text>
    </View>
    <TouchableOpacity
      style={styles.joinButton}
      onPress={() => joinButtonPressed(item, isCourse)}>
      <Text style={styles.joinButtonText}>JOIN</Text>
    </TouchableOpacity>
  </View>
);

const renderListItem = ({item, navigation}) => (
  <ListItem item={item} navigation={navigation} />
);

export default function EnrollGroupScreen({navigation}) {
  const [showClasses, setShowClasses] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [updatePage, setUpdatePage] = useState(true);

  function joinButtonPressed(item, isCourse) {
    console.log(item.title);
    //console.log(isCourse);
    let index = -1;
    if (isCourse) {
      index = CLASS_DATA.indexOf(item);
      CLASS_DATA.splice(index, 1);
    } else {
      index = COMMUNITY_DATA.indexOf(item);
      console.log(index);
      COMMUNITY_DATA.splice(index, 1);
    }
    showSuccessPopup({
      Popup: Popup,
      title: 'Joined ' + item.title + ' succesfully',
      textBody: '',
    });
    setUpdatePage(!updatePage);
  }

  return (
    <DefaultBackground>
      <View style={{flexDirection: 'column'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#0787ff',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-end',
            marginRight: 20,
            marginTop: 15,
            flexDirection: 'row',
          }}
          onPress={() =>
            navigation.navigate('Create Group', {navigation: navigation})
          }>
          <MaterialCommunityIcons name="plus" style={styles.plusIcon} />
          <Text
            style={{
              color: '#ffffff',
              fontWeight: '600',
              fontSize: 15,
              padding: 10,
            }}>
            Create Group
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          placeholder="Search"
          placeholderTextColor="grey"
          style={styles.searchBar}
          onChangeText={newText => setSearchText(newText.toLowerCase())}
        />
      </View>
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

      <ScrollView>
        <View style={styles.flatListWrapper}>
          {showClasses
            ? CLASS_DATA.map((item, index) => {
                return item.title.toLowerCase().includes(searchText) ? (
                  <ListItem
                    item={item}
                    joinButtonPressed={joinButtonPressed}
                    isCourse={true}
                  />
                ) : null;
              })
            : COMMUNITY_DATA.map((item, index) => {
                return item.title.toLowerCase().includes(searchText) ? (
                  <ListItem
                    item={item}
                    joinButtonPressed={joinButtonPressed}
                    isCourse={false}
                  />
                ) : null;
              })}
        </View>
      </ScrollView>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  flatListWrapper: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  itemImage: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 12,
    marginLeft: 2,
    color: '#0b128c',
  },
  itemTitle: {
    fontSize: 18,
    margin: 2,
    fontWeight: '600',
    color: '#0b128c',
  },
  listItemTextContainer: {
    marginLeft: 10,
  },
  listItem: {
    height: 160,
    width: '46%',
    flexDirection: 'column',
    padding: 10,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#d9d9d9',
    marginBottom: 10,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: '#d9d9d9',
  },
  listItemTop: {
    flexDirection: 'row',
  },
  listAdmin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  adminText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 2,
    color: '#4b4b4b',
  },
  adminIcon: {
    color: '#4b4b4b',
    fontSize: 20,
  },
  joinButton: {
    backgroundColor: '#d2f33f',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    alignSelf: 'center',
    marginTop: 10,
  },
  joinButtonText: {
    fontSize: 18,
    fontWeight: '900',
    marginLeft: 2,
    color: '#1924c9',
  },
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
  searchBar: {
    height: windowHeight * 0.07,
    margin: '3%',
    backgroundColor: '#d2d2d2',
    borderRadius: 10,
    paddingLeft: 20,
  },
  plusIcon: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    color: '#ffffff',
    fontSize: 25,
  },
});
