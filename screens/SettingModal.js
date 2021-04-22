import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Pressable,
  View,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {width} from '../utilis/contants';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import app from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

const SettingModal = () => {
  const user = auth().currentUser;
  console.log(user)
  const [imageSource, setImageSource] = useState();

  const showlaunchImageLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      file => {
        setImageSource(file.uri);
        // const storageRef = storage().ref('imagesdssdf/');
        // console.log(storageRef);
        // // storage.child()
        // storageRef.putString(file.base64, 'base64').then(snapshot => {
        //   console.log('Uploaded a base64 string!');
        // });
        uploadImageToFireBaseStorage(file)
        // console.log(file)
      },
    );
  };

  function uploadImageToFireBaseStorage(file) {
    const storageRef = storage().ref();
  
    // [START storage_upload_handle_error]
    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg'
    };
  
    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('images/' + file.fileName).putFile(file.uri, metadata);
  
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(app.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case app.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case app.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
  
          // ...
  
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('download nowwwww....')
            user.updateProfile({
              photoURL:downloadURL,
            })
        });
      }
    );
    // [END storage_upload_handle_error]
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.info}>
        <View style={styles.imageContainer}>
          {user.photoURL || imageSource ? (
            <Pressable
              onPress={() => {
                showlaunchImageLibrary();
              }}>
              <Image
                style={styles.image}
                source={{
                  uri: user.imageURL || imageSource,
                }}
              />
            </Pressable>
          ) : (
            <View style={styles.noImageURL}>
              <Pressable
                onPress={() => {
                  showlaunchImageLibrary();
                }}>
                <Text>U</Text>
              </Pressable>
            </View>
          )}
        </View>
        <View style={styles.userInfo}>
          <Text>{user.displayName}</Text>
          <Text>{user.email}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  imageContainer: {
    backgroundColor: '#1DA1F2',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  noImageURL: {},
  userInfo: {
    paddingLeft: 20,
  },
});

export default SettingModal;
