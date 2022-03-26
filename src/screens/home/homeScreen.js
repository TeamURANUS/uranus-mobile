import * as React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import DefaultBackground from '../../shared/defaultBackground';
import {getTitleStyle} from '../../services/dynamicStyles';

const COMMUNITY_DATA = [
  {
    type: 'community',
    id: '1',
    title: 'EVT',
    text: 'ORTAM PARTİ',
    imageUrl:
      'https://media.istockphoto.com/photos/man-holding-blue-helmet-close-up-picture-id1178982949?s=612x612',
  },
  {
    type: 'community',
    id: '2',
    title: 'ASAT',
    text: 'AT AVRAT SİLAH',
    imageUrl:
      'https://media.istockphoto.com/photos/man-holding-blue-helmet-close-up-picture-id1178982949?s=612x612',
  },
  {
    type: 'community',
    id: '3',
    title: 'TOBB BİLGİSAYAR',
    text: 'ARADIĞINIZ KLUÜB BULUNAMADI',
    imageUrl:
      'https://media.istockphoto.com/photos/man-holding-blue-helmet-close-up-picture-id1178982949?s=612x612',
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

const ListItem = ({item, navigation}) => (
  <TouchableOpacity
    style={styles.listItem}
    onPress={() =>
      item.type === 'class'
        ? navigation.navigate('Course', {
            navigation: navigation,
            course: item,
            name: item.title,
            type: 'course',
          })
        : navigation.navigate('Course', {
            navigation: navigation,
            course: item,
            name: item.title,
            type: 'community',
          })
    }>
    <Image
      style={styles.itemImage}
      source={{
        uri: item.imageUrl,
      }}
    />
    <View style={styles.listItemTextContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  </TouchableOpacity>
);

const renderListItem = ({item, navigation}) => (
  <ListItem item={item} navigation={navigation} />
);

function HomeScreen({navigation}) {
  const [showClasses, setShowClasses] = useState(true);

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
            data={CLASS_DATA}
            renderItem={({item}) => renderListItem({item, navigation})}
            keyExtractor={item => item.id}
          />
        </View>
      )}

      {!showClasses && (
        <View>
          <FlatList
            data={COMMUNITY_DATA}
            renderItem={({item}) => renderListItem({item, navigation})}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  itemImage: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 12,
    marginLeft: 2,
    color: 'grey',
  },
  itemTitle: {
    fontSize: 20,
    margin: 2,
  },
  listItemTextContainer: {
    marginLeft: 10,
  },
  listItem: {
    height: 80,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#c2b9b9',
  },
  topListNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default HomeScreen;
