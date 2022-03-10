import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';

export default function DetailedNewsScreen({route, navigation}) {
  const {item} = route.params;
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{uri: item.newsPicture}} style={styles.picture} />
        <View>
          <Text style={styles.title}>{item.newsTitle}</Text>
          <Text style={styles.date}>{item.newsDate}</Text>
          <Text style={styles.text}>{item.newsText}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  title: {
    fontSize: 25,
    fontWeight: '700',
    marginLeft: 10,
    marginRight: 10,
  },

  text: {
    fontSize: 15,
    opacity: 0.8,
    marginRight: 10,
    marginLeft: 10,
  },

  date: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
    marginRight: 15,
    marginTop: 15,
    marginBottom: 10,
  },

  picture: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    resizeMode: 'cover',
    height: 300,
    width: '100%',
  },
});