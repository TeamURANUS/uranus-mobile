import * as React from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DefaultBackground from '../../shared/defaultBackground';

const DATA = [...Array(15).keys()].map((_, i) => {
  return {
    key: i,
    //image: `https://randomuser.me/api/portraits/women/30.jpg`,
    //image: 'https://randomuser.me/api/portraits/men/.jpg',
    picture: `https://randomuser.me/api/portraits/men/${i}.jpg`,
    name: `Name${i} Lastname${i}`,
    major: 'Computer Science',
    email: `name${i}lastname${i}@etu.edu.tr`,
  };
});

const ListItem = ({item, navigation}) => (
  <TouchableOpacity
    style={styles.contact}
    onPress={() => navigation.navigate('Chat', {item: item})}>
    <Image source={{uri: item.picture}} style={styles.picture} />
    <View style={styles.info}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemMajor}>{item.major}</Text>
      <Text style={styles.itemEmail}>{item.email}</Text>
    </View>
  </TouchableOpacity>
);

const renderListItem = ({item, navigation}) => (
  <ListItem item={item} navigation={navigation} />
);

export default function ContactsScreen({navigation}) {
  return (
    <DefaultBackground>
      <View style={styles.container}>
        <Text style={styles.header}>Kişiler</Text>
        <FlatList
          data={DATA}
          renderItem={({item}) => renderListItem({item, navigation})}
        />
      </View>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#d2d1d1'},
  header: {
    fontSize: 45,
    fontWeight: '900',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    color: '#000000',
    paddingBottom: 20,
  },
  info: {
    marginTop: 5,
    marginBottom: 5,
  },
  contact: {
    flexDirection: 'row',
    marginBottom: 2,
    backgroundColor: '#ffffff',
  },
  picture: {
    width: 55,
    height: 55,
    borderRadius: 55,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 15,
  },
  itemName: {fontSize: 20, fontWeight: '700'},
  itemMajor: {fontSize: 14, opacity: 0.7},
  itemEmail: {fontSize: 14, opacity: 0.8, color: '#0099cc'},
});
