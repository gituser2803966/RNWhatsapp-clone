import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useContacts} from '../contexts/ContactsProvider';

export default function ContactScreen() {
  const {contacts} = useContacts();
  console.log('contacts ==>> ', contacts);

  return (
    <View style={styles.container}>
      <View style={{
          display:"flex",
          flexDirection:'column',
      }}>
      {contacts.map((contact, index) => {
          const nameToDisplay = contact.firstName.substring(0,1);
          console.log(contact.photoURL)
        return (
          <View
            style={styles.contact}
            key={index}>
            {contact.photoURL ? (
              <Image
                style={{
                    width:50,
                    height:50,
                    borderRadius:50,
                    marginRight:5,
                }}
                source={{
                  uri: contact.photoURL,
                }}
              />
            ) : (
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: '#1DA1F2',
                  borderRadius:50,
                  alignItems:"center",
                  justifyContent:'center',
                  marginRight:5,
                }}>
                <Text>{nameToDisplay}</Text>
              </View>
            )}
            <Text 
            >{contact.firstName+" "+contact.lastName}</Text>
          </View>
        );
      })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
  },
  contact:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      padding:5,
      backgroundColor:"#fafafa",
      borderBottomWidth:0.5,
      borderBottomColor:"#EBF0F9",
  }
});
