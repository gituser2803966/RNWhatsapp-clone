import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import { width } from '../utilis/contants';

export default function SignUp_Password() {
  const [password, setPassword] = useState();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        secureTextEntry
        value={password}
        onChangeText={value => setPassword(value)}
        placeholder="enter your password"
      />
      <Button title="next" />
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
    borderRadius:10,
    padding:10,
    width:width - 20,
    borderWidth: 0.5,
    borderColor: 'grey',
    marginVertical: 8,
  },
});
