import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
} from 'react-native';
import {width} from '../utilis/contants';
// import { usersCollection } from '../database';
import firestore from '@react-native-firebase/firestore';
export default function Signin({navigation, route}) {
  const {email, password} = route.params;

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const handleSignUp = () => {
    firestore().collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });
    // .then((docRef) => {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch((error) => {
    //     console.error("Error adding document: ", error);
    // });
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.marginVer}>
            <Text></Text>
          </View>
          <View style={styles.loginFormView}>
            <TextInput
              placeholder="enter your first name"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={value => setFirstName(value)}
              value={firstName}
            />
            <TextInput
              placeholder="enter your last name"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={value => setLastName(value)}
              value={lastName}
              secureTextEntry={true}
            />

            <Pressable style={styles.Button} onPress={() => handleSignUp()}>
              <Text style={styles.loginButtonText}>SIGNUP</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    padding: 12,
    width: width - 10,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  Button: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
  },
  signupButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
});
