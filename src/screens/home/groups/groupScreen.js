import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';

import DefaultBackground from '../../../shared/defaultBackground';
import {Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostCard from './postCard';
import RadioGroup from 'react-native-radio-buttons-group';
import OptionsMenu from 'react-native-option-menu';
import {FAB} from 'react-native-paper';

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
    postOwner: 'Oğuz Ergin',
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
    postOwner: 'Deniz Türkmen',
  },
  {
    id: '3',
    postTitle: 'Third Title: Sed non erat pretium',
    postBody:
      'Bu çalışma, nesne üretiminin temel ve yalın haline yönelik yapılan tartışmaların somut ürünlerini sunuyor. Varlıklar dünyasında bir şeyin nesne haline gelmesi, insanın ona yönelmesini, onunla arasında bağ kurmasını gerektirir. Bu nedenle nesnenin, insanın var olan üzerinden geliştirdiği “Bilme” yetisi ve “Bilinci” sayesinde “Düşünme, algılama, tasarımlama” gibi yeteneklerinin ürünü olduğu söylenebilir. Bilinç ve yetenekler üzerinden gerçekleşecek ve nesneyi üretecek olan, bir şeyi oluşturmaya yönelik eylemlerimiz ‘yapma’ kavramıyla ilişkilidir. Yapma kavramı, “Bilme- Anlamlandırma- Dönüştürme” olarak tanımlanabilecek bir süreç içerisinde gerçekleşiyor. Bilme, duyulara dayalı bilginin yanıltıcılığına karşın, maddeyle kurulan ilişkide aklın bilgisini ortaya koyan durumdur. Düşünme ve düşünce yoluyla görme üzerine kurulu bir anlamlandırma biçiminden söz edilebilir. Anlamlandırma nesnelerin zihindeki tasarılarını oluşturur. Dönüştürmek ise zihinde tasarımlanan nesnenin bir örneğini ve niteliklerini ortaya koymaktır. Maddeden nesneyi üreten bilme, anlamlandırma ve dönüştürme sürecinde, deneyimler ve deneyler üzerinden yapılan çıkarsamalar ve sonuçta elde edilen bütüne ilişkin bilgi, oluşumun/nesnenin özüne dair somut ifadeleri meydana getiriyor. Bu somut ifadelere de, kavramsal ve yaratıcı soyut ve somut eylemleri barındıran bir bütün olan, “Yapı” denebilir. Madde ve “Yapan/Tasarımcı/Mimar” arasındaki ilişkiler bütünü, yaratıcı edimlerimizi en yalın haliyle açığa çıkarır. Sonuçta yaratıcı edimlerimiz de, bilinçlilik hallerimizin ve dönüştürme yeteneğimizin temsili olan nesneleri.',
    postDate: '16.01.2022',
    isInstructorPost: true,
    isRead: false,
    postOwner: 'Mucahid Kutlu',
  },
];

const radioButtonsData = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'all',
    value: 'option1',
    selected: true,
  },
  {
    id: '2',
    label: 'admin posts',
    value: 'option2',
  },
  {
    id: '3',
    label: 'member posts',
    value: 'option3',
  },
];

const ListItem = ({item, navigation}) => (
  <TouchableOpacity
    style={styles.newsItem}
    onPress={() => navigation.navigate('Detailed Post', {item: item})}>
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

export default function GroupScreen({route, navigation}) {
  const {course} = route.params;
  const [showInstructorPosts, setShowInstructorPosts] = useState(true);
  const [showStudentPosts, setShowStudentPosts] = useState(true);
  const [newPostButtonPressed, setNewPostButtonPressed] = useState(false);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  let newPostTitleTextInput = React.createRef();
  let newPostBodyTextInput = React.createRef();

  function postNewPost() {
    DATA.push({
      id: DATA.length + 1,
      postTitle: newPostTitle,
      postBody: newPostBody,
      postDate: '16.01.2022',
      isInstructorPost: false,
      isRead: true,
      postOwner: 'Deniz Türkmen',
    });
    newPostTitleTextInput.clear();
    newPostBodyTextInput.clear();
    setNewPostTitle('');
    setNewPostBody('');
    setNewPostButtonPressed(!newPostButtonPressed);
    console.log(DATA);
  }

  function newPostPressed() {
    setNewPostButtonPressed(!newPostButtonPressed);
  }

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    setShowInstructorPosts(
      radioButtonsArray[0].selected || radioButtonsArray[1].selected,
    );
    setShowStudentPosts(
      radioButtonsArray[0].selected || radioButtonsArray[2].selected,
    );
  }

  function classInfoPressed() {
    navigation.navigate('Class Info', {
      navigation: navigation,
      course: course,
    });
  }

  function assignmentsPressed() {
    navigation.navigate('Assignments', {
      navigation: navigation,
      course: course,
    });
  }

  const MoreIcon = require('../../../assets/hamburger.png');

  return (
    <DefaultBackground>
      <View style={styles.topBar}>
        <View style={styles.topBarButtons}>
          <OptionsMenu
            button={MoreIcon}
            buttonStyle={styles.optionsMenu}
            destructiveIndex={1}
            options={['Class Info', 'Assignments', '']}
            actions={[classInfoPressed, assignmentsPressed]}
          />
        </View>
      </View>
      <View style={styles.radioButtonsView}>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
          layout={'row'}
        />
      </View>
      {!newPostButtonPressed ? null : (
        <View style={styles.newPostView}>
          <View style={styles.newPostButtonsView}>
            <TouchableOpacity
              style={styles.newPostPostTO}
              onPress={postNewPost}>
              <MaterialCommunityIcons name="plus" style={styles.plusIcon} />
              <Text style={styles.newPostTOText}>Post</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder={'Title'}
            style={styles.newPostTitleTextBox}
            onChangeText={setNewPostTitle}
            ref={input => {
              newPostTitleTextInput = input;
            }}
          />
          <View style={styles.separator} />
          <TextInput
            placeholder={'Body'}
            style={styles.newPostBodyTextBox}
            onChangeText={setNewPostBody}
            ref={input => {
              newPostBodyTextInput = input;
            }}
          />
        </View>
      )}

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

      <FAB
        icon={newPostButtonPressed ? 'plus' : 'delete'}
        style={styles.newPostButton}
        onPress={newPostPressed}
      />
    </DefaultBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a6a5a5',
    color: '#fcfcfc',
    marginLeft: 10,
  },
  newsItem: {
    backgroundColor: 'white',
    display: 'flex',
    borderBottomWidth: 2,
    borderBottomColor: '#c4c4c4',
  },
  topBar: {
    width: windowWidth,
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#a6a5a5',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  topBarButtons: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    width: '50%',
    marginRight: 7,
  },

  newPostButton: {
    position: 'absolute',
    backgroundColor: '#3B7AF9',
    bottom: 50,
    right: 30,
    borderRadius: 30,
    alignSelf: 'center',
    width: 70,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newPostTOText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
  },
  plusIcon: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    color: '#ffffff',
    fontSize: 20,
  },

  menuTO: {
    borderRadius: 5,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'flex-start',
    height: 40,
    flexDirection: 'column',
    marginLeft: 10,
  },

  menuIcon: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: 35,
  },

  optionsMenu: {
    width: 30,
    height: 30,
    margin: 7.5,
    resizeMode: 'contain',
    marginLeft: 20,
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

  newPostView: {
    backgroundColor: '#7b13dc',
    borderWidth: 4,
    borderColor: '#7b13dc',
  },

  newPostTitleTextBox: {
    backgroundColor: '#ffffff',
  },

  newPostBodyTextBox: {
    backgroundColor: '#ffffff',
    height: 150,
    textAlignVertical: 'top',
  },

  newPostButtonsView: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
  },

  newPostPostTO: {
    backgroundColor: '#15a205',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },

  newPostCancelTO: {
    backgroundColor: '#e72838',
    borderRadius: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center',
    width: '50%',
    height: '100%',
    flexDirection: 'row',
  },

  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },

  radioButtonsView: {
    backgroundColor: '#d3d3d3',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
