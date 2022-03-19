import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import DefaultBackground from '../../../shared/defaultBackground';

export default function DetailedNewsScreen({route, navigation}) {
  const {item} = route.params;
  return (
    <DefaultBackground>
      <ScrollView style={styles.scroll}>
        <View style={styles.pictureContainer}>
          <Image source={{uri: item.newsPicture}} style={styles.picture} />
        </View>
        <View>
          <Text style={styles.title}>{item.newsTitle}</Text>
          <Text style={styles.date}>{item.newsDate}</Text>
          <Text style={styles.text}>{item.newsText}</Text>
        </View>
      </ScrollView>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginBottom: 40,
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
    margin: 20,
    resizeMode: 'cover',
    height: 300,
    borderRadius: 10,
  },
  pictureContainer: {
    justifyContent: 'center',
  },
});
