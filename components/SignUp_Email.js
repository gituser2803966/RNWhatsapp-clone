import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import { width } from '../utilis/contants';

export default function SignUp_Email({navigation}) {
  const [email, setEmail] = useState();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={value => setEmail(value)}
        placeholder="enter your email"
      />
      <Button title="next" 
        onPress={()=>navigation.push("signUpPassword")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 0.5,
    padding:10,
    width:width - 20,
    paddingHorizontal:10,
    borderRadius:10,
    borderColor: 'grey',
    marginVertical: 8,
  },
});
