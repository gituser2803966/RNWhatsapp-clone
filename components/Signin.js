import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
// import 
import { useAuth } from '../context/AuthContext';
export default function Signin({navigation}) {

    const [email,setEmail] = useState();
    const [password, setPassword] =useState();
  const { signIn } = useAuth().authUser;
  
  const handleSignin = () =>{
    signIn({email,password})
  }

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>whatsapp</Text>
            <TextInput
              placeholder="Username"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={value=>setEmail(value)}
              value={email}
            />
            <TextInput
              placeholder="Password"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={value=>setPassword(value)}
              value={password}
              secureTextEntry={true}
            />

            <Pressable style={styles.loginButton}
              onPress={()=>handleSignin()}
            >
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </Pressable>
            <Pressable
              style={styles.signupButton}
              onPress={() => navigation.navigate("signup")}>
              <Text style={styles.signupText}>signup now</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
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
  loginButton: {
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
  signupText: {
    fontSize: 14,
    color: '#3897f1',
  },
});
