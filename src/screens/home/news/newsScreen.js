import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import NewsCard from '../../../shared/components/newsCard';
import DefaultBackground from '../../../shared/defaultBackground';
import {newsAPI} from '../../../api/utils';

const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

const ListItem = ({item, navigation}) => (
  <TouchableOpacity
    style={styles.newsItem}
    onPress={() =>
      navigation.navigate('Detailed News', {
        item: item,
        name: item.documentContent[0],
      })
    }>
    <NewsCard
      newsPicture={item.documentContent[1]}
      newsTitle={item.documentContent[0]}
      newsText={item.documentContent[2]}
      newsDate={new Date(item.documentDate.seconds).toLocaleDateString(
        'tr-TR',
        options,
      )}
    />
  </TouchableOpacity>
);

const renderListItem = ({item, navigation}) => (
  <ListItem item={item} navigation={navigation} />
);

export default function NewsScreen({navigation}) {
  const [data, setData] = useState([]);

  async function fetchNews() {
    const response = await newsAPI.get('');
    setData(response.data.data);
  }

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <DefaultBackground>
      <View style={styles.container}>
        <Text style={styles.header}>News</Text>
        <FlatList
          data={data}
          renderItem={({item}) => renderListItem({item, navigation})}
        />
      </View>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
    fontWeight: '500',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    color: '#000000',
    paddingBottom: 20,
    margin: '3%',
  },
  newsItem: {
    backgroundColor: 'white',
    display: 'flex',
    marginBottom: 2,
  },
});
