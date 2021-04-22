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
  console.log(user)
  //signOut fun
  const handleSignOut = () => {
    signOut();
  };

  // open setting screen
  const handlePress = () => {
    navigation.navigate('setting');
  };

  // header center
  const ImageTitle = () => {
    const NameToDisplay =
      (user.displayName && user.displayName.substring(0, 1)) || '';
    return (
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            handlePress();
          }}>
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
        </Pressable>
      </View>
    );
  };

  //header Left
  const HeaderLeft = () => {
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
  const HeaderRight = () => {
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
          headerCenter: props => <ImageTitle {...props} />,
        }}
      />
      <Stack.Screen
        options={{
          headerLeft: props => <HeaderLeft {...props} />,
          title: '',
          headerRight: props => <HeaderRight {...props} />,
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
    // padding:20,
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
