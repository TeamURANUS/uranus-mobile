import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';

import DefaultBackground from '../../shared/defaultBackground';
import {Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import PostCard from '../../shared/postCard';

const windowWidth = Dimensions.get('window').width;

var DATA = [
  {
    id: '1',
    postTitle:
      'First Title: Lorem ipsum dolor sit amet, consectetur adipiscing elit ',
    postBody:
      'Donec ornare volutpat mauris, eget consequat dui fermentum eu. Maecenas imperdiet vitae ligula vel scelerisque. Mauris semper justo in risus cursus pharetra. Aenean ex eros, lacinia ut accumsan semper, convallis vel augue. Proin odio tortor, iaculis sit amet sem sed, fermentum vehicula ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam tincidunt arcu vel varius laoreet. Mauris commodo nibh vel augue elementum pharetra. Donec ipsum felis, mollis sed nisi vel, euismod efficitur arcu. Pellentesque dapibus ut sem eu ornare. Sed non erat pretium, eleifend risus eget, consequat lorem. Aliquam nec nunc quis nulla faucibus consectetur mollis ac odio. Nullam mollis est at tellus sollicitudin, id imperdiet sem malesuada. Phasellus imperdiet vulputate lorem, et posuere velit euismod vitae. Curabitur fringilla imperdiet ultricies. Etiam tristique commodo turpis, a pellentesque nulla aliquam at.',
    postDate: '16.01.2022',
    isInstructorPost: true,
    isRead: true,
  },
  {
    id: '2',
    postTitle:
      'Second Title: Cras tellus orci, dictum at dolor vel, consequat scelerisque dolor',
    postBody:
      'Ut id auctor nisl. Etiam rutrum, lacus non cursus porta, mi massa varius libero, sed ultrices massa diam lobortis odio. Donec mauris dolor, lobortis vitae lectus a, gravida ornare nibh. Nam porttitor dui eget turpis mollis, id faucibus odio dictum. Maecenas lacinia quis erat ut congue. Vestibulum lobortis ut ipsum dapibus luctus. In hac habitasse platea dictumst. Suspendisse ultrices lectus non ligula feugiat, sed luctus erat porttitor. Duis tellus neque, sagittis vel tellus eu, varius lacinia ante. Ut semper ipsum nec risus vehicula, nec tincidunt erat elementum. Maecenas eget urna leo. Morbi rhoncus purus at ex congue, rutrum accumsan justo accumsan.',
    postDate: '16.01.2022',
    isInstructorPost: false,
    isRead: true,
  },
  {
    id: '3',
    postTitle: 'Third Title: Sed non erat pretium',
    postBody:
      'Bu çalışma, nesne üretiminin temel ve yalın haline yönelik yapılan tartışmaların somut ürünlerini sunuyor. Varlıklar dünyasında bir şeyin nesne haline gelmesi, insanın ona yönelmesini, onunla arasında bağ kurmasını gerektirir. Bu nedenle nesnenin, insanın var olan üzerinden geliştirdiği “Bilme” yetisi ve “Bilinci” sayesinde “Düşünme, algılama, tasarımlama” gibi yeteneklerinin ürünü olduğu söylenebilir. Bilinç ve yetenekler üzerinden gerçekleşecek ve nesneyi üretecek olan, bir şeyi oluşturmaya yönelik eylemlerimiz ‘yapma’ kavramıyla ilişkilidir. Yapma kavramı, “Bilme- Anlamlandırma- Dönüştürme” olarak tanımlanabilecek bir süreç içerisinde gerçekleşiyor. Bilme, duyulara dayalı bilginin yanıltıcılığına karşın, maddeyle kurulan ilişkide aklın bilgisini ortaya koyan durumdur. Düşünme ve düşünce yoluyla görme üzerine kurulu bir anlamlandırma biçiminden söz edilebilir. Anlamlandırma nesnelerin zihindeki tasarılarını oluşturur. Dönüştürmek ise zihinde tasarımlanan nesnenin bir örneğini ve niteliklerini ortaya koymaktır. Maddeden nesneyi üreten bilme, anlamlandırma ve dönüştürme sürecinde, deneyimler ve deneyler üzerinden yapılan çıkarsamalar ve sonuçta elde edilen bütüne ilişkin bilgi, oluşumun/nesnenin özüne dair somut ifadeleri meydana getiriyor. Bu somut ifadelere de, kavramsal ve yaratıcı soyut ve somut eylemleri barındıran bir bütün olan, “Yapı” denebilir. Madde ve “Yapan/Tasarımcı/Mimar” arasındaki ilişkiler bütünü, yaratıcı edimlerimizi en yalın haliyle açığa çıkarır. Sonuçta yaratıcı edimlerimiz de, bilinçlilik hallerimizin ve dönüştürme yeteneğimizin temsili olan nesneleri.',
    postDate: '16.01.2022',
    isInstructorPost: true,
    isRead: false,
  },
];

const ListItem = ({item, navigation}) => (
  <TouchableOpacity
    style={styles.newsItem}
    onPress={() => navigation.navigate('Detailed News', {item: item})}>
    <PostCard item={item} />
  </TouchableOpacity>
);

const renderListItem = ({
  item,
  navigation,
  showInstructorPosts,
  showStudentPosts,
}) =>
  (showInstructorPosts && item.isInstructorPost) ||
  (showStudentPosts && !item.isInstructorPost) ? (
    <ListItem item={item} navigation={navigation} />
  ) : null;

export default function CourseScreen({route, navigation}) {
  const {course} = route.params;
  const [showInstructorPosts, setShowInstructorPosts] = useState(true);
  const [showStudentPosts, setShowStudentPosts] = useState(true);

  return (
    <DefaultBackground>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.header}>{course.title}</Text>
          <TouchableOpacity style={styles.newPostTO}>
            <MaterialCommunityIcons name="plus" style={styles.plusButton} />
            <Text style={styles.newPostTOText}>New Post</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterPanel}>
          <View style={styles.checkboxGroup}>
            <CheckBox
              value={showInstructorPosts}
              onValueChange={setShowInstructorPosts}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxText}>Instructor Posts</Text>
          </View>
          <View style={styles.checkboxGroup}>
            <CheckBox
              value={showStudentPosts}
              onValueChange={setShowStudentPosts}
              style={(styles.checkbox, {marginLeft: 60})}
            />
            <Text style={styles.checkboxText}>Student Posts</Text>
          </View>
        </View>
        <FlatList
          data={DATA}
          renderItem={({item}) =>
            renderListItem({
              item,
              navigation,
              showInstructorPosts,
              showStudentPosts,
            })
          }
        />
      </View>
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#d2d2d2'},
  header: {
    fontSize: 35,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a6a5a5',
    color: '#000000',
  },
  newsItem: {
    backgroundColor: 'white',
    display: 'flex',
    marginBottom: 2,
  },
  topBar: {
    width: windowWidth,
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#a6a5a5',
  },
  newPostTO: {
    backgroundColor: '#0d92ff',
    borderRadius: 5,
    alignSelf: 'center',
    position: 'absolute',
    right: 20,
    width: 105,
    height: 30,
    flexDirection: 'row',
  },
  newPostTOText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  plusButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    color: '#ffffff',
    fontSize: 20,
  },

  filterPanel: {
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  checkboxGroup: {
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  checkboxText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: 20,
  },
});
