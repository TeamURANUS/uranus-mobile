import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import NewsCard from '../shared/newsCard';

var DATA = [
  {
    id: '1',
    newsPicture: 'https://picsum.photos/100',
    newsTitle:
      'First Title First Title First Title First Title First Title First Title First Title ',
    newsText: 'newsText1',
    newsDate: '16.01.2022',
  },
  {
    id: '2',
    newsPicture: 'https://picsum.photos/101',
    newsTitle: 'Second Title',
    newsText: 'newsText2',
    newsDate: '16.01.2022',
  },
  {
    id: '3',
    newsPicture: 'https://picsum.photos/102',
    newsTitle: 'Third Title',
    newsText:
      'Bu çalışma, nesne üretiminin temel ve yalın haline yönelik yapılan tartışmaların somut ürünlerini sunuyor. Varlıklar dünyasında bir şeyin nesne haline gelmesi, insanın ona yönelmesini, onunla arasında bağ kurmasını gerektirir. Bu nedenle nesnenin, insanın var olan üzerinden geliştirdiği “Bilme” yetisi ve “Bilinci” sayesinde “Düşünme, algılama, tasarımlama” gibi yeteneklerinin ürünü olduğu söylenebilir. Bilinç ve yetenekler üzerinden gerçekleşecek ve nesneyi üretecek olan, bir şeyi oluşturmaya yönelik eylemlerimiz ‘yapma’ kavramıyla ilişkilidir. Yapma kavramı, “Bilme- Anlamlandırma- Dönüştürme” olarak tanımlanabilecek bir süreç içerisinde gerçekleşiyor. Bilme, duyulara dayalı bilginin yanıltıcılığına karşın, maddeyle kurulan ilişkide aklın bilgisini ortaya koyan durumdur. Düşünme ve düşünce yoluyla görme üzerine kurulu bir anlamlandırma biçiminden söz edilebilir. Anlamlandırma nesnelerin zihindeki tasarılarını oluşturur. Dönüştürmek ise zihinde tasarımlanan nesnenin bir örneğini ve niteliklerini ortaya koymaktır. Maddeden nesneyi üreten bilme, anlamlandırma ve dönüştürme sürecinde, deneyimler ve deneyler üzerinden yapılan çıkarsamalar ve sonuçta elde edilen bütüne ilişkin bilgi, oluşumun/nesnenin özüne dair somut ifadeleri meydana getiriyor. Bu somut ifadelere de, kavramsal ve yaratıcı soyut ve somut eylemleri barındıran bir bütün olan, “Yapı” denebilir. Madde ve “Yapan/Tasarımcı/Mimar” arasındaki ilişkiler bütünü, yaratıcı edimlerimizi en yalın haliyle açığa çıkarır. Sonuçta yaratıcı edimlerimiz de, bilinçlilik hallerimizin ve dönüştürme yeteneğimizin temsili olan nesneleri.',
    newsDate: '16.01.2022',
  },
];

export default function NewsScreen({navigation}) {
  return (
    <View style={{backgroundColor: '#d7d7d7'}}>
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
        Haberler
      </Text>
      <FlatList
        data={DATA}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                display: 'flex',
                marginBottom: 2,
              }}>
              <NewsCard
                newsPicture={item.newsPicture}
                newsTitle={item.newsTitle}
                newsText={item.newsText}
                newsDate={item.newsDate}
              />
            </TouchableOpacity>
          );
        }}
      />
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

  firstNews: {
    flex: 1,
  },

  firstImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});
