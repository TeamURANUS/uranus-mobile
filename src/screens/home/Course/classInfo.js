import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import DefaultBackground from '../../../shared/defaultBackground';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

var MEMBERS = [
  {
    id: '1',
    name: 'name1 lastname1',
  },
  {
    id: '2',
    name: 'name2 lastname2',
  },
  {
    id: '3',
    name: 'name3 lastname3',
  },
  {
    id: '4',
    name: 'name4 lastname4',
  },
  {
    id: '5',
    name: 'name5 lastname5',
  },
  {
    id: '6',
    name: 'name6 lastname6',
  },
  {
    id: '7',
    name: 'name7 lastname7',
  },
];

const ListItem = ({item}) => (
  <View
    style={{
      backgroundColor: '#c4c4c4',
      borderRadius: 10,
      margin: 10,
      padding: 7,
      height: 50,
      justifyContent: 'center',
    }}>
    <Text
      style={{
        fontSize: 17,
        fontWeight: '400',
        color: '#4b4b4b',
        marginLeft: 10,
      }}>
      {item.name}
    </Text>
  </View>
);

const renderListItem = ({item, navigation}) => (
  <ListItem item={item} navigation={navigation} />
);
export default function ClassInfo({route, navigation}) {
  const {course} = route.params;

  return (
    <DefaultBackground>
      <ScrollView style={styles.container}>
        <View
          style={{
            alignItems: 'flex-start',
            borderBottomWidth: 3,
            borderBottomColor: '#07198c',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#ffffff',
              borderBottomWidth: 2,
              marginTop: 40,
              backgroundColor: '#07198c',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              padding: 5,
              width: '50%',
              textAlign: 'center',
            }}>
            Administrator(s):
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 7}}>
          <MaterialCommunityIcons
            name="account"
            style={{color: '#4b4b4b', fontSize: 25}}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              marginLeft: 2,
              color: '#4b4b4b',
            }}>
            {course.admin}
          </Text>
        </View>

        <View style={{flexDirection: 'row', alignContent: 'space-around'}}>
          <TouchableOpacity>
            <Text>Leave</Text>
            <MaterialCommunityIcons
              name="exit-run"
              style={{color: '#4b4b4b', fontSize: 25}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Close</Text>
            <MaterialCommunityIcons
              name="grave-stone"
              style={{color: '#4b4b4b', fontSize: 25}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            borderBottomWidth: 3,
            borderBottomColor: '#07198c',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#ffffff',
              borderBottomWidth: 2,
              marginTop: 40,
              backgroundColor: '#07198c',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              padding: 5,
              width: '50%',
              textAlign: 'center',
            }}>
            Members ({MEMBERS.length})
          </Text>
        </View>
        {MEMBERS.map((item, index) => {
          return <ListItem item={item} />;
        })}
      </ScrollView>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    fontSize: 35,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a6a5a5',
    color: '#fcfcfc',
  },
});
