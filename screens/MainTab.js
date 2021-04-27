import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CallScreen from './CallScreen';
import ContactScreen from './ContactScreen';
import ConversationScreen from './ConversationScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ContactsProvider } from '../contexts/ContactsProvider';
const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <ContactsProvider>
    <Tab.Navigator
      initialRouteName="conversations"
      tabBarOptions={{
        activeTintColor: '#1DA1F2',
        inactiveTintColor:'gray',
      }}
    >
      <Tab.Screen 
      name="conversations" 
      component={ConversationScreen} 
      options={{
        tabBarLabel: 'conversations',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="comment-processing" color={color} size={size} />
        ),
        // tabBarBadge:3,
      }}
      />
      <Tab.Screen 
      name="contacts" 
      component={ContactScreen} 
      options={{
        tabBarLabel: 'contacts',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="contacts" color={color} size={size} />
        ),
        // tabBarBadge:3,
      }}
      />
      <Tab.Screen 
      name="calls" 
      component={CallScreen} 
      options={{
        tabBarLabel: 'calls',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="phone" color={color} size={size} />
        ),
      }}
      />
    </Tab.Navigator>
    </ContactsProvider>
  );
}
