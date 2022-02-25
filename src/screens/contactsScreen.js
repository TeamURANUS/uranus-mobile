import * as React from 'react';
import {FlatList, Image, Text, View, Dimensions} from 'react-native';

//const {width, height} = Dimensions.get('screen');

const DATA = [...Array(3).keys()].map((_, i) => {
  return {
    key: i,
    //image: `https://randomuser.me/api/portraits/women/30.jpg`,
    //image: 'https://randomuser.me/api/portraits/men/.jpg',
    image: `https://randomuser.me/api/portraits/men/${i}.jpg`,
    name: 'deniz',
    jobTitle: 'engineer',
    email: 'deniz@etu.edu.tr',
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;

export default () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text
        style={{
          fontSize: 45,
          fontWeight: '900',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          backgroundColor: 'white',
          color: '#000000',
          paddingBottom: 20,
        }}>
        Kişiler
      </Text>
      <FlatList
        data={DATA}
        renderItem={({item, index}) => {
          return (
            <View style={{flexDirection: 'row'}}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING,
                }}
              />
              <View>
                <Text style={{fontSize: 22, fontWeight: '700'}}>
                  {item.name}
                </Text>
                <Text style={{fontSize: 18, opacity: 0.7}}>
                  {item.jobTitle}
                </Text>
                <Text style={{fontSize: 14, opacity: 0.8, color: '#0099cc'}}>
                  {item.email}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
