import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import NewsCard from '../../../shared/components/newsCard';
import DefaultBackground from '../../../shared/defaultBackground';
import {getAllNews, scrapeNews} from '../../../services/news';
import {getFormattedDateFromTimestamp} from '../../../services/time';

const ListItem = ({item, navigation}) => (
  <TouchableOpacity
    style={styles.newsItem}
    onPress={() =>
      navigation.navigate('Detailed News', {
        item: item,
        name: item.documentTitle,
      })
    }>
    <NewsCard
      newsTitle={item.documentTitle}
      newsPicture={item.documentContent[0]}
      newsText={item.documentContent[1]}
      newsDate={getFormattedDateFromTimestamp(item.documentDate.seconds)}
    />
  </TouchableOpacity>
);

const renderListItem = ({item, navigation}) => (
  <ListItem item={item} navigation={navigation} />
);

export default function NewsScreen({navigation}) {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  async function fetchNews() {
    await scrapeNews();
    const newsData = await getAllNews();
    setData(newsData);
    setIsFetching(false);
  }

  async function onRefresh() {
    setIsFetching(true);
    fetchNews();
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
          onRefresh={onRefresh}
          refreshing={isFetching}
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
