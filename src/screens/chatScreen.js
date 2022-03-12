import React, {useState, useCallback, useEffect} from 'react';
import {Avatar, Bubble, GiftedChat} from 'react-native-gifted-chat';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
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
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#c4c4c4',
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
        }}
      />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      inverted={false}
      renderUsernameOnMessage={true}
    />
  );
}
