import * as React from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

//const {width, height} = Dimensions.get('screen');

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

export default function ContactsScreen({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: '#d2d1d1'}}>
      <Text style={styles.header}>Kişiler</Text>
      <FlatList
        data={DATA}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={styles.contact}>
              <Image source={{uri: item.picture}} style={styles.picture} />
              <View style={styles.info}>
                <Text style={{fontSize: 20, fontWeight: '700'}}>
                  {item.name}
                </Text>
                <Text style={{fontSize: 14, opacity: 0.7}}>{item.major}</Text>
                <Text style={{fontSize: 14, opacity: 0.8, color: '#0099cc'}}>
                  {item.email}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
