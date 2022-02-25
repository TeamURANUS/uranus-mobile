import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

function NewsCard({newsPicture, newsTitle, newsText, newsDate}) {
  return (
    <View style={styles.newsBox}>
      <Image source={{uri: newsPicture}} style={styles.picture} />
      <View style={styles.contentBox}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              flex: 2,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
            numberOfLines={2}>
            {newsTitle}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            {newsDate}
          </Text>
        </View>

        <View>
          <Text style={{fontSize: 14, opacity: 0.7}} numberOfLines={3}>
            {newsText}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  newsBox: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 100,
  },

  contentBox: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginRight: 20,
    width: 300,
    marginBottom: 10,
  },

  picture: {
    width: 80,
    height: 80,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default NewsCard;
