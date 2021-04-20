import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp_Email from './SignUp_Email';
import SignUp_Password from './SignUp_Password';

const Stack = createStackNavigator();

export default function Signup() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="signUpEmail"
        component={SignUp_Email}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="signUpPassword"
        component={SignUp_Password}
      />
      {/* <Stack.Screen /> */}
    </Stack.Navigator>
  );
}
