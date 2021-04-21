import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CallScreen from './CallScreen';
import ContactScreen from './ContactScreen';
import ConversationScreen from './ConversationScreen';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="conversations" component={ConversationScreen} />
      <Tab.Screen name="contacts" component={ContactScreen} />
      <Tab.Screen name="call" component={CallScreen} />
    </Tab.Navigator>
  );
}
