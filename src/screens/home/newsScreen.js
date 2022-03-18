import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import NewsCard from '../../shared/newsCard';
import DefaultBackground from '../../shared/defaultBackground';

var DATA = [
  {
    id: '1',
    newsPicture: 'https://picsum.photos/100',
    newsTitle:
      'First Title: Lorem ipsum dolor sit amet, consectetur adipiscing elit ',
    newsText:
      'Donec ornare volutpat mauris, eget consequat dui fermentum eu. Maecenas imperdiet vitae ligula vel scelerisque. Mauris semper justo in risus cursus pharetra. Aenean ex eros, lacinia ut accumsan semper, convallis vel augue. Proin odio tortor, iaculis sit amet sem sed, fermentum vehicula ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam tincidunt arcu vel varius laoreet. Mauris commodo nibh vel augue elementum pharetra. Donec ipsum felis, mollis sed nisi vel, euismod efficitur arcu. Pellentesque dapibus ut sem eu ornare. Sed non erat pretium, eleifend risus eget, consequat lorem. Aliquam nec nunc quis nulla faucibus consectetur mollis ac odio. Nullam mollis est at tellus sollicitudin, id imperdiet sem malesuada. Phasellus imperdiet vulputate lorem, et posuere velit euismod vitae. Curabitur fringilla imperdiet ultricies. Etiam tristique commodo turpis, a pellentesque nulla aliquam at.',
    newsDate: '16.01.2022',
  },
  {
    id: '2',
    newsPicture: 'https://picsum.photos/101',
    newsTitle:
      'Second Title: Cras tellus orci, dictum at dolor vel, consequat scelerisque dolor',
    newsText:
      'Ut id auctor nisl. Etiam rutrum, lacus non cursus porta, mi massa varius libero, sed ultrices massa diam lobortis odio. Donec mauris dolor, lobortis vitae lectus a, gravida ornare nibh. Nam porttitor dui eget turpis mollis, id faucibus odio dictum. Maecenas lacinia quis erat ut congue. Vestibulum lobortis ut ipsum dapibus luctus. In hac habitasse platea dictumst. Suspendisse ultrices lectus non ligula feugiat, sed luctus erat porttitor. Duis tellus neque, sagittis vel tellus eu, varius lacinia ante. Ut semper ipsum nec risus vehicula, nec tincidunt erat elementum. Maecenas eget urna leo. Morbi rhoncus purus at ex congue, rutrum accumsan justo accumsan.',
    newsDate: '16.01.2022',
  },
  {
    id: '3',
    newsPicture: 'https://picsum.photos/102',
    newsTitle: 'Third Title: Sed non erat pretium',
    newsText:
      'Bu çalışma, nesne üretiminin temel ve yalın haline yönelik yapılan tartışmaların somut ürünlerini sunuyor. Varlıklar dünyasında bir şeyin nesne haline gelmesi, insanın ona yönelmesini, onunla arasında bağ kurmasını gerektirir. Bu nedenle nesnenin, insanın var olan üzerinden geliştirdiği “Bilme” yetisi ve “Bilinci” sayesinde “Düşünme, algılama, tasarımlama” gibi yeteneklerinin ürünü olduğu söylenebilir. Bilinç ve yetenekler üzerinden gerçekleşecek ve nesneyi üretecek olan, bir şeyi oluşturmaya yönelik eylemlerimiz ‘yapma’ kavramıyla ilişkilidir. Yapma kavramı, “Bilme- Anlamlandırma- Dönüştürme” olarak tanımlanabilecek bir süreç içerisinde gerçekleşiyor. Bilme, duyulara dayalı bilginin yanıltıcılığına karşın, maddeyle kurulan ilişkide aklın bilgisini ortaya koyan durumdur. Düşünme ve düşünce yoluyla görme üzerine kurulu bir anlamlandırma biçiminden söz edilebilir. Anlamlandırma nesnelerin zihindeki tasarılarını oluşturur. Dönüştürmek ise zihinde tasarımlanan nesnenin bir örneğini ve niteliklerini ortaya koymaktır. Maddeden nesneyi üreten bilme, anlamlandırma ve dönüştürme sürecinde, deneyimler ve deneyler üzerinden yapılan çıkarsamalar ve sonuçta elde edilen bütüne ilişkin bilgi, oluşumun/nesnenin özüne dair somut ifadeleri meydana getiriyor. Bu somut ifadelere de, kavramsal ve yaratıcı soyut ve somut eylemleri barındıran bir bütün olan, “Yapı” denebilir. Madde ve “Yapan/Tasarımcı/Mimar” arasındaki ilişkiler bütünü, yaratıcı edimlerimizi en yalın haliyle açığa çıkarır. Sonuçta yaratıcı edimlerimiz de, bilinçlilik hallerimizin ve dönüştürme yeteneğimizin temsili olan nesneleri.',
    newsDate: '16.01.2022',
  },
  {
    id: '4',
    newsPicture: 'https://picsum.photos/103',
    newsTitle: 'Third Title: Sed non erat pretium',
    newsText:
      'Bu çalışma, nesne üretiminin temel ve yalın haline yönelik yapılan tartışmaların somut ürünlerini sunuyor. Varlıklar dünyasında bir şeyin nesne haline gelmesi, insanın ona yönelmesini, onunla arasında bağ kurmasını gerektirir. Bu nedenle nesnenin, insanın var olan üzerinden geliştirdiği “Bilme” yetisi ve “Bilinci” sayesinde “Düşünme, algılama, tasarımlama” gibi yeteneklerinin ürünü olduğu söylenebilir. Bilinç ve yetenekler üzerinden gerçekleşecek ve nesneyi üretecek olan, bir şeyi oluşturmaya yönelik eylemlerimiz ‘yapma’ kavramıyla ilişkilidir. Yapma kavramı, “Bilme- Anlamlandırma- Dönüştürme” olarak tanımlanabilecek bir süreç içerisinde gerçekleşiyor. Bilme, duyulara dayalı bilginin yanıltıcılığına karşın, maddeyle kurulan ilişkide aklın bilgisini ortaya koyan durumdur. Düşünme ve düşünce yoluyla görme üzerine kurulu bir anlamlandırma biçiminden söz edilebilir. Anlamlandırma nesnelerin zihindeki tasarılarını oluşturur. Dönüştürmek ise zihinde tasarımlanan nesnenin bir örneğini ve niteliklerini ortaya koymaktır. Maddeden nesneyi üreten bilme, anlamlandırma ve dönüştürme sürecinde, deneyimler ve deneyler üzerinden yapılan çıkarsamalar ve sonuçta elde edilen bütüne ilişkin bilgi, oluşumun/nesnenin özüne dair somut ifadeleri meydana getiriyor. Bu somut ifadelere de, kavramsal ve yaratıcı soyut ve somut eylemleri barındıran bir bütün olan, “Yapı” denebilir. Madde ve “Yapan/Tasarımcı/Mimar” arasındaki ilişkiler bütünü, yaratıcı edimlerimizi en yalın haliyle açığa çıkarır. Sonuçta yaratıcı edimlerimiz de, bilinçlilik hallerimizin ve dönüştürme yeteneğimizin temsili olan nesneleri.',
    newsDate: '16.01.2022',
  },
  {
    id: '5',
    newsPicture: 'https://picsum.photos/104',
    newsTitle: 'Title: Sed non erat pretium',
    newsText:
      'Bu çalışma, nesne üretiminin temel ve yalın haline yönelik yapılan tartışmaların somut ürünlerini sunuyor. Varlıklar dünyasında bir şeyin nesne haline gelmesi, insanın ona yönelmesini, onunla arasında bağ kurmasını gerektirir. Bu nedenle nesnenin, insanın var olan üzerinden geliştirdiği “Bilme” yetisi ve “Bilinci” sayesinde “Düşünme, algılama, tasarımlama” gibi yeteneklerinin ürünü olduğu söylenebilir. Bilinç ve yetenekler üzerinden gerçekleşecek ve nesneyi üretecek olan, bir şeyi oluşturmaya yönelik eylemlerimiz ‘yapma’ kavramıyla ilişkilidir. Yapma kavramı, “Bilme- Anlamlandırma- Dönüştürme” olarak tanımlanabilecek bir süreç içerisinde gerçekleşiyor. Bilme, duyulara dayalı bilginin yanıltıcılığına karşın, maddeyle kurulan ilişkide aklın bilgisini ortaya koyan durumdur. Düşünme ve düşünce yoluyla görme üzerine kurulu bir anlamlandırma biçiminden söz edilebilir. Anlamlandırma nesnelerin zihindeki tasarılarını oluşturur. Dönüştürmek ise zihinde tasarımlanan nesnenin bir örneğini ve niteliklerini ortaya koymaktır. Maddeden nesneyi üreten bilme, anlamlandırma ve dönüştürme sürecinde, deneyimler ve deneyler üzerinden yapılan çıkarsamalar ve sonuçta elde edilen bütüne ilişkin bilgi, oluşumun/nesnenin özüne dair somut ifadeleri meydana getiriyor. Bu somut ifadelere de, kavramsal ve yaratıcı soyut ve somut eylemleri barındıran bir bütün olan, “Yapı” denebilir. Madde ve “Yapan/Tasarımcı/Mimar” arasındaki ilişkiler bütünü, yaratıcı edimlerimizi en yalın haliyle açığa çıkarır. Sonuçta yaratıcı edimlerimiz de, bilinçlilik hallerimizin ve dönüştürme yeteneğimizin temsili olan nesneleri.',
    newsDate: '16.01.2022',
  },
  {
    id: '6',
    newsPicture: 'https://picsum.photos/105',
    newsTitle: 'Title: Sed non erat pretium',
    newsText:
      'Bu çalışma, nesne üretiminin temel ve yalın haline yönelik yapılan tartışmaların somut ürünlerini sunuyor. Varlıklar dünyasında bir şeyin nesne haline gelmesi, insanın ona yönelmesini, onunla arasında bağ kurmasını gerektirir. Bu nedenle nesnenin, insanın var olan üzerinden geliştirdiği “Bilme” yetisi ve “Bilinci” sayesinde “Düşünme, algılama, tasarımlama” gibi yeteneklerinin ürünü olduğu söylenebilir. Bilinç ve yetenekler üzerinden gerçekleşecek ve nesneyi üretecek olan, bir şeyi oluşturmaya yönelik eylemlerimiz ‘yapma’ kavramıyla ilişkilidir. Yapma kavramı, “Bilme- Anlamlandırma- Dönüştürme” olarak tanımlanabilecek bir süreç içerisinde gerçekleşiyor. Bilme, duyulara dayalı bilginin yanıltıcılığına karşın, maddeyle kurulan ilişkide aklın bilgisini ortaya koyan durumdur. Düşünme ve düşünce yoluyla görme üzerine kurulu bir anlamlandırma biçiminden söz edilebilir. Anlamlandırma nesnelerin zihindeki tasarılarını oluşturur. Dönüştürmek ise zihinde tasarımlanan nesnenin bir örneğini ve niteliklerini ortaya koymaktır. Maddeden nesneyi üreten bilme, anlamlandırma ve dönüştürme sürecinde, deneyimler ve deneyler üzerinden yapılan çıkarsamalar ve sonuçta elde edilen bütüne ilişkin bilgi, oluşumun/nesnenin özüne dair somut ifadeleri meydana getiriyor. Bu somut ifadelere de, kavramsal ve yaratıcı soyut ve somut eylemleri barındıran bir bütün olan, “Yapı” denebilir. Madde ve “Yapan/Tasarımcı/Mimar” arasındaki ilişkiler bütünü, yaratıcı edimlerimizi en yalın haliyle açığa çıkarır. Sonuçta yaratıcı edimlerimiz de, bilinçlilik hallerimizin ve dönüştürme yeteneğimizin temsili olan nesneleri.',
    newsDate: '16.01.2022',
  },
  {
    id: '7',
    newsPicture: 'https://picsum.photos/106',
    newsTitle: 'Title: Sed non erat pretium',
    newsText:
      'Bu çalışma, nesne üretiminin temel ve yalın haline yönelik yapılan tartışmaların somut ürünlerini sunuyor. Varlıklar dünyasında bir şeyin nesne haline gelmesi, insanın ona yönelmesini, onunla arasında bağ kurmasını gerektirir. Bu nedenle nesnenin, insanın var olan üzerinden geliştirdiği “Bilme” yetisi ve “Bilinci” sayesinde “Düşünme, algılama, tasarımlama” gibi yeteneklerinin ürünü olduğu söylenebilir. Bilinç ve yetenekler üzerinden gerçekleşecek ve nesneyi üretecek olan, bir şeyi oluşturmaya yönelik eylemlerimiz ‘yapma’ kavramıyla ilişkilidir. Yapma kavramı, “Bilme- Anlamlandırma- Dönüştürme” olarak tanımlanabilecek bir süreç içerisinde gerçekleşiyor. Bilme, duyulara dayalı bilginin yanıltıcılığına karşın, maddeyle kurulan ilişkide aklın bilgisini ortaya koyan durumdur. Düşünme ve düşünce yoluyla görme üzerine kurulu bir anlamlandırma biçiminden söz edilebilir. Anlamlandırma nesnelerin zihindeki tasarılarını oluşturur. Dönüştürmek ise zihinde tasarımlanan nesnenin bir örneğini ve niteliklerini ortaya koymaktır. Maddeden nesneyi üreten bilme, anlamlandırma ve dönüştürme sürecinde, deneyimler ve deneyler üzerinden yapılan çıkarsamalar ve sonuçta elde edilen bütüne ilişkin bilgi, oluşumun/nesnenin özüne dair somut ifadeleri meydana getiriyor. Bu somut ifadelere de, kavramsal ve yaratıcı soyut ve somut eylemleri barındıran bir bütün olan, “Yapı” denebilir. Madde ve “Yapan/Tasarımcı/Mimar” arasındaki ilişkiler bütünü, yaratıcı edimlerimizi en yalın haliyle açığa çıkarır. Sonuçta yaratıcı edimlerimiz de, bilinçlilik hallerimizin ve dönüştürme yeteneğimizin temsili olan nesneleri.',
    newsDate: '16.01.2022',
  },
  {
    id: '8',
    newsPicture: 'https://picsum.photos/107',
    newsTitle: 'Title: Sed non erat pretium',
    newsText:
      'Bu çalışma, nesne üretiminin temel ve yalın haline yönelik yapılan tartışmaların somut ürünlerini sunuyor. Varlıklar dünyasında bir şeyin nesne haline gelmesi, insanın ona yönelmesini, onunla arasında bağ kurmasını gerektirir. Bu nedenle nesnenin, insanın var olan üzerinden geliştirdiği “Bilme” yetisi ve “Bilinci” sayesinde “Düşünme, algılama, tasarımlama” gibi yeteneklerinin ürünü olduğu söylenebilir. Bilinç ve yetenekler üzerinden gerçekleşecek ve nesneyi üretecek olan, bir şeyi oluşturmaya yönelik eylemlerimiz ‘yapma’ kavramıyla ilişkilidir. Yapma kavramı, “Bilme- Anlamlandırma- Dönüştürme” olarak tanımlanabilecek bir süreç içerisinde gerçekleşiyor. Bilme, duyulara dayalı bilginin yanıltıcılığına karşın, maddeyle kurulan ilişkide aklın bilgisini ortaya koyan durumdur. Düşünme ve düşünce yoluyla görme üzerine kurulu bir anlamlandırma biçiminden söz edilebilir. Anlamlandırma nesnelerin zihindeki tasarılarını oluşturur. Dönüştürmek ise zihinde tasarımlanan nesnenin bir örneğini ve niteliklerini ortaya koymaktır. Maddeden nesneyi üreten bilme, anlamlandırma ve dönüştürme sürecinde, deneyimler ve deneyler üzerinden yapılan çıkarsamalar ve sonuçta elde edilen bütüne ilişkin bilgi, oluşumun/nesnenin özüne dair somut ifadeleri meydana getiriyor. Bu somut ifadelere de, kavramsal ve yaratıcı soyut ve somut eylemleri barındıran bir bütün olan, “Yapı” denebilir. Madde ve “Yapan/Tasarımcı/Mimar” arasındaki ilişkiler bütünü, yaratıcı edimlerimizi en yalın haliyle açığa çıkarır. Sonuçta yaratıcı edimlerimiz de, bilinçlilik hallerimizin ve dönüştürme yeteneğimizin temsili olan nesneleri.',
    newsDate: '16.01.2022',
  },
  {
    id: '9',
    newsPicture: 'https://picsum.photos/108',
    newsTitle: 'Title: Sed non erat pretium',
    newsText:
      'Bu çalışma, nesne üretiminin temel ve yalın haline yönelik yapılan tartışmaların somut ürünlerini sunuyor. Varlıklar dünyasında bir şeyin nesne haline gelmesi, insanın ona yönelmesini, onunla arasında bağ kurmasını gerektirir. Bu nedenle nesnenin, insanın var olan üzerinden geliştirdiği “Bilme” yetisi ve “Bilinci” sayesinde “Düşünme, algılama, tasarımlama” gibi yeteneklerinin ürünü olduğu söylenebilir. Bilinç ve yetenekler üzerinden gerçekleşecek ve nesneyi üretecek olan, bir şeyi oluşturmaya yönelik eylemlerimiz ‘yapma’ kavramıyla ilişkilidir. Yapma kavramı, “Bilme- Anlamlandırma- Dönüştürme” olarak tanımlanabilecek bir süreç içerisinde gerçekleşiyor. Bilme, duyulara dayalı bilginin yanıltıcılığına karşın, maddeyle kurulan ilişkide aklın bilgisini ortaya koyan durumdur. Düşünme ve düşünce yoluyla görme üzerine kurulu bir anlamlandırma biçiminden söz edilebilir. Anlamlandırma nesnelerin zihindeki tasarılarını oluşturur. Dönüştürmek ise zihinde tasarımlanan nesnenin bir örneğini ve niteliklerini ortaya koymaktır. Maddeden nesneyi üreten bilme, anlamlandırma ve dönüştürme sürecinde, deneyimler ve deneyler üzerinden yapılan çıkarsamalar ve sonuçta elde edilen bütüne ilişkin bilgi, oluşumun/nesnenin özüne dair somut ifadeleri meydana getiriyor. Bu somut ifadelere de, kavramsal ve yaratıcı soyut ve somut eylemleri barındıran bir bütün olan, “Yapı” denebilir. Madde ve “Yapan/Tasarımcı/Mimar” arasındaki ilişkiler bütünü, yaratıcı edimlerimizi en yalın haliyle açığa çıkarır. Sonuçta yaratıcı edimlerimiz de, bilinçlilik hallerimizin ve dönüştürme yeteneğimizin temsili olan nesneleri.',
    newsDate: '16.01.2022',
  },
  {
    id: '10',
    newsPicture: 'https://picsum.photos/109',
    newsTitle: 'Title: Sed non erat pretium',
    newsText:
      'Bu çalışma, nesne üretiminin temel ve yalın haline yönelik yapılan tartışmaların somut ürünlerini sunuyor. Varlıklar dünyasında bir şeyin nesne haline gelmesi, insanın ona yönelmesini, onunla arasında bağ kurmasını gerektirir. Bu nedenle nesnenin, insanın var olan üzerinden geliştirdiği “Bilme” yetisi ve “Bilinci” sayesinde “Düşünme, algılama, tasarımlama” gibi yeteneklerinin ürünü olduğu söylenebilir. Bilinç ve yetenekler üzerinden gerçekleşecek ve nesneyi üretecek olan, bir şeyi oluşturmaya yönelik eylemlerimiz ‘yapma’ kavramıyla ilişkilidir. Yapma kavramı, “Bilme- Anlamlandırma- Dönüştürme” olarak tanımlanabilecek bir süreç içerisinde gerçekleşiyor. Bilme, duyulara dayalı bilginin yanıltıcılığına karşın, maddeyle kurulan ilişkide aklın bilgisini ortaya koyan durumdur. Düşünme ve düşünce yoluyla görme üzerine kurulu bir anlamlandırma biçiminden söz edilebilir. Anlamlandırma nesnelerin zihindeki tasarılarını oluşturur. Dönüştürmek ise zihinde tasarımlanan nesnenin bir örneğini ve niteliklerini ortaya koymaktır. Maddeden nesneyi üreten bilme, anlamlandırma ve dönüştürme sürecinde, deneyimler ve deneyler üzerinden yapılan çıkarsamalar ve sonuçta elde edilen bütüne ilişkin bilgi, oluşumun/nesnenin özüne dair somut ifadeleri meydana getiriyor. Bu somut ifadelere de, kavramsal ve yaratıcı soyut ve somut eylemleri barındıran bir bütün olan, “Yapı” denebilir. Madde ve “Yapan/Tasarımcı/Mimar” arasındaki ilişkiler bütünü, yaratıcı edimlerimizi en yalın haliyle açığa çıkarır. Sonuçta yaratıcı edimlerimiz de, bilinçlilik hallerimizin ve dönüştürme yeteneğimizin temsili olan nesneleri.',
    newsDate: '16.01.2022',
  },
];

const ListItem = ({item, navigation}) => (
  <TouchableOpacity
    style={styles.newsItem}
    onPress={() => navigation.navigate('Detailed News', {item: item})}>
    <NewsCard
      newsPicture={item.newsPicture}
      newsTitle={item.newsTitle}
      newsText={item.newsText}
      newsDate={item.newsDate}
    />
  </TouchableOpacity>
);

const renderListItem = ({item, navigation}) => (
  <ListItem item={item} navigation={navigation} />
);

export default function NewsScreen({navigation}) {
  return (
    <DefaultBackground>
      <View style={styles.container}>
        <Text style={styles.header}>Haberler</Text>
        <FlatList
          data={DATA}
          renderItem={({item}) => renderListItem({item, navigation})}
        />
      </View>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#d7d7d7'},
  header: {
    fontSize: 35,
    fontWeight: '500',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    color: '#000000',
    paddingBottom: 20,
  },
  newsItem: {
    backgroundColor: 'white',
    display: 'flex',
    marginBottom: 2,
  },
});
