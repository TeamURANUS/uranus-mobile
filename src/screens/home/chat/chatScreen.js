import React, {useState, useCallback, useEffect} from 'react';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {StyleSheet} from 'react-native';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(
      [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'Hey There',
          createdAt: new Date(),
          user: {
            _id: 3,
            name: 'React',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 3,
          text: 'How you doin',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ].reverse(),
    );
  }, []);

  const onSend = useCallback((messagesToSend = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messagesToSend),
    );
  }, []);

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={styles.bubbleWrapperStyle}
        textStyle={styles.bubbleTextStyle}
      />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messagesToSend => onSend(messagesToSend)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      renderUsernameOnMessage={true}
      listViewProps={{
        style: styles.listViewStyle,
      }}
      usernameStyle={styles.userNameStyle}
    />
  );
}

const styles = StyleSheet.create({
  userNameStyle: {color: '#2994ff'},
  listViewStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  bubbleTextStyle: {
    right: {
      color: 'white',
    },
    left: {
      color: 'black',
    },
  },
  bubbleWrapperStyle: {
    left: {
      backgroundColor: '#ffffff',
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
    right: {
      backgroundColor: '#1f68f5',
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 15,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
  },
});
