/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useReducer, useEffect} from 'react';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import SettingModal from './screens/SettingModal';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {
  storeUserSession,
  retrieveUserSession,
  removeUserSession,
} from './utilis/storage';
import SignUp_Email from './components/SignUp_Email';
import SignUp_Password from './components/SignUp_Password';
import SignUp_DisplayName from './components/SignUp_DisplayName';
import auth from '@react-native-firebase/auth';

enableScreens();
const Stack = createNativeStackNavigator();
export const AuthContext = React.createContext();
const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  function onAuthStateChanged(user) {
    const bootstrapAsync = async () => {
      try {
        dispatch({type: 'RESTORE_TOKEN', token: user});
        // await removeUserSession();
        // userToken = await retrieveUserSession();
      } catch (e) {
        // Restoring token failed
      }
    };
    if (user) {
      bootstrapAsync();
    } else {
      dispatch({type: 'SIGN_OUT'});
    }
  }

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        const {email, password} = data;
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        await auth().signInWithEmailAndPassword(email, password);
      },
      signOut: () => auth().signOut(),
      signUp: data => {
          const {email, password, firstName, lastName} = data;
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
              // console.log("user res: ",res.user);
              console.log("update profile");
              res.user.updateProfile({
                displayName: firstName + ' ' + lastName,
              });
            }).catch(error=>{
              console.log(error);
            });
        
      },
    }),
    [],
  );
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            <>
              <Stack.Screen name="signin" component={SignIn} />
              <Stack.Screen name="signUpEmail" component={SignUp_Email} />
              <Stack.Screen name="signUpPassword" component={SignUp_Password} />
              <Stack.Screen
                name="signUpDisplayName"
                component={SignUp_DisplayName}
              />
            </>
          ) : (
            <Stack.Screen name="dashboard" component={Dashboard} 
            options={{ headerShown:false, }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
