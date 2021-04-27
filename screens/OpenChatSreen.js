import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function OpenChatScreen() {
  const [messages, setMessages] = useState([]);
  const currentUser = auth().currentUser;
  useEffect(() => {
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ]);
  }, []);

  // generate id chat 1-1
  function dmCollection(uid) {
    const idPair = [auth().currentUser.uid, uid].sort().join('_');
    return firestore().collection('room').doc(idPair).collection('messages');
  }


  function sendDM(toUid, messageText) {
    return dmCollection(toUid).add({
      from: auth().currentUser.uid,
      text: messageText,
      sent: firestore.FieldValue.serverTimestamp(),
    });
  }

  const onSend = useCallback((messages = []) => {
    const messageText = messages[0].text;
    sendDM()
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: currentUser.uid,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
