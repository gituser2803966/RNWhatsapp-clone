/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useReducer, useEffect } from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Dashboard from './components/dashboard';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {retrieveUserSession,removeUserSession} from './utilis/storage';
import { AuthProvider } from './context/AuthContext';
import AuthReducer from './reducer/authReducer';

enableScreens();
const Stack = createNativeStackNavigator();
const App = () => {
  const [state, dispatch] = useReducer(AuthReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        // removeUserSession();
        userToken = await retrieveUserSession();
        dispatch({type: 'RESTORE_TOKEN', token: userToken});
      } catch (e) {
        // not login
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {
            state.userToken == null ? 
           (
            <>
              <Stack.Screen name="signin" component={Signin} />
              <Stack.Screen name="signup" component={Signup} />
            </>
           )
            :
            (
              <Stack.Screen name="dashboard" component={Dashboard} />
            )
          }
          
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
