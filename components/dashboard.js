import React, {useContext} from 'react';
import {Image, View, Text, StyleSheet, Pressable} from 'react-native';
import {AuthContext} from '../App';
import MainTab from '../screens/MainTab';
import SettingModal from '../screens/SettingModal';
import {enableScreens} from 'react-native-screens';
import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

enableScreens();
const Stack = createNativeStackNavigator();

export default function Dashboard({navigation}) {
  const {signOut} = useContext(AuthContext);
  const user = auth().currentUser;
  console.log(user);
  //signOut fun
  const handleSignOut = () => {
    signOut();
  };

  // open setting screen
  const handlePress = () => {
    navigation.navigate('setting');
  };

  // header center
  const ImageTitleMainTab = () => {
    const NameToDisplay =
      (user.displayName && user.displayName.substring(0, 1)) || '';
    return (
      <Pressable
        onPress={() => {
          handlePress();
        }}>
        <View style={styles.container}>
          {user.photoURL ? (
            <Image
              style={styles.userImage}
              source={{
                uri: user.photoURL,
              }}
            />
          ) : (
            <Text>{NameToDisplay}</Text>
          )}
        </View>
      </Pressable>
    );
  };

  //header Left
  const HeaderLeftSettingScreen = () => {
    return (
      <View style={styles.headerLeft}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Text>x</Text>
        </Pressable>
      </View>
    );
  };

  // header right
  const HeaderRightSettingScreen = () => {
    return (
      <View style={styles.headerLeft}>
        <Pressable
          onPress={() => {
            handleSignOut();
          }}>
          <Text style={{color: '#2196F3'}}>đăng xuất</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={MainTab}
        options={{
          headerCenter: props => <ImageTitleMainTab {...props} />,
        }}
      />
      <Stack.Screen
        options={{
          headerLeft: props => <HeaderLeftSettingScreen {...props} />,
          title: '',
          headerRight: props => <HeaderRightSettingScreen {...props} />,
          // stackPresentation: "fullScreenModal",
        }}
        name="setting"
        component={SettingModal}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF9FC',
  },
  headerLeft: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF9FC',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    paddingBottom: 10,
  },
});
