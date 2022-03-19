import * as React from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DefaultBackground from '../../../shared/defaultBackground';
import {FAB} from 'react-native-paper';

const DATA = [...Array(3).keys()].map((_, i) => {
  return {
    key: i,
    picture: `https://randomuser.me/api/portraits/men/${i}.jpg`,
    name: `Name${i} Lastname${i}`,
    lastMessage:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi neque augue, ullamcorper vel fringilla sed, tincidunt in neque. Praesent porttitor viverra accumsan. Nam suscipit est sed tellus sodales iaculis.',
    lastMessageDate: '16.01.2022',
  };
});

const ListItem = ({item, navigation}) => (
  <TouchableOpacity
    style={styles.message}
    onPress={() => navigation.navigate('Chat', {item: item})}>
    <Image source={{uri: item.picture}} style={styles.picture} />
    <View style={styles.messageInfo}>
      <View style={styles.nameAndDate}>
        <Text style={styles.itemName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.itemLastMessageDate}>{item.lastMessageDate}</Text>
      </View>

      <View>
        <Text style={styles.itemLastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const renderListItem = ({item, navigation}) => (
  <ListItem item={item} navigation={navigation} />
);

export default function MessagesScreen({navigation}) {
  return (
    <DefaultBackground>
      <View style={styles.container}>
        <Text style={styles.header}>Messages</Text>
        <FlatList
          data={DATA}
          renderItem={({item}) => renderListItem({item, navigation})}
        />

        <FAB
          icon="plus"
          style={styles.floatingButton}
          onPress={() => navigation.navigate('Contacts')}
        />
      </View>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
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
    width: 300,
  },
  message: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 2,
    backgroundColor: '#ffffff',
  },
  picture: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 0,
  },
  itemName: {
    fontSize: 17,
    fontWeight: '700',
    marginRight: 15,
    flex: 2,
  },
  itemLastMessage: {
    fontSize: 14,
    opacity: 0.7,
  },
  itemLastMessageDate: {
    fontSize: 14,
    opacity: 0.8,
    color: '#9b9b9b',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  floatingButton: {
    position: 'absolute',
    backgroundColor: '#3B7AF9',
    bottom: 16,
    right: 16,
  },
  nameAndDate: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  messageInfo: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginRight: 20,
    width: 310,
    marginBottom: 20,
  },
});
