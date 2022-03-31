import * as React from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import DefaultBackground from '../../../shared/defaultBackground';

const windowHeight = Dimensions.get('window').height;

const DATA = [...Array(15).keys()].map((_, i) => {
  return {
    key: i,
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

function renderListItem(item, navigation, keyword) {
  return item.name.includes(keyword) ? (
    <ListItem item={item} navigation={navigation} />
  ) : null;
}

export default function ContactsScreen({navigation}) {
  const [searchText, setSearchText] = React.useState('Name');

  return (
    <DefaultBackground>
      <View>
        <TextInput
          placeholder="Search"
          placeholderTextColor="grey"
          style={styles.searchBar}
          onChangeText={newText => setSearchText(newText.toLowerCase())}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({item}) => renderListItem(item, navigation, searchText)}
        />
      </View>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffff'},
  header: {
    fontSize: 35,
    fontWeight: '500',
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
    backgroundColor: '#ffffff',
    borderBottomWidth: 2,
    borderColor: '#e0e0e0',
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

  searchBar: {
    height: windowHeight * 0.07,
    margin: '3%',
    backgroundColor: '#d2d2d2',
    borderRadius: 10,
    paddingLeft: 20,
  },
});
