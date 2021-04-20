import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CallScreen from '../screens/CallScreen';
import ContactScreen from '../screens/ContactScreen';
import ConversationScreen from '../screens/ConversationScreen';

const Tab = createBottomTabNavigator();

export default function dashboard() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="conversations" component={ConversationScreen} />
      <Tab.Screen name="contacts" component={ContactScreen} />
      <Tab.Screen name="call" component={CallScreen} />
    </Tab.Navigator>
  );
}
