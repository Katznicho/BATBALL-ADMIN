import React, { useEffect, useState, } from 'react';
import { View, Button as NativeButton, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Alert, useWindowDimensions, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import Progress from 'react-native-progress/Bar';
import { theme } from '../../../theme/theme';
import { Button } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { EXCEPTIONAL_PLAYS, VIDEOS } from '../../../constants/endpoints';
import Video from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';




const ExceptionalPlays = ({ navigation }: any) => {
  const screenWidth = useWindowDimensions().width;
  const [videoUri, setVideoUri] = useState<any>(null);
  const [downloadURL, setDownloadURL] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [caption, setCaption] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSelectVideo = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
        copyTo: "cachesDirectory",
        presentationStyle: "fullScreen"
      });
      let path: any = result[0]?.fileCopyUri?.replace('file://', '');

      setVideoUri(path);
    } catch (error) {
      console.log('Error picking video:', error);
    }
  };

  const handleUploadVideo = async () => {
    if (!videoUri) return;

    try {
      const reference = storage().ref('videos/' + Date.now());
      const uploadTask = reference.putFile(videoUri);

      uploadTask.on(
        'state_changed',
        snapshot => {
          // You can handle the upload progress here if needed
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        error => {
          console.log('Error uploading video:', error);
        },
        async () => {
          try {
            const url = await reference.getDownloadURL();
            setDownloadURL(url);
            console.log('Video URL:', url);
          } catch (error) {
            console.log('Error getting video URL:', error);
          }
        }
      );
    } catch (error) {
      console.log("============================================")
      console.log('Error uploading video:', JSON.stringify(error));
      console.log("============================================")
    }
  };


  //upload a video automatically
  useEffect(() => {
    if (videoUri) {
      handleUploadVideo();
    }

  }
    , [videoUri])


  const onPost = async () => {
    try {
      if (caption === "" || downloadURL === "") {
        return Alert.alert("Please fill all fields")
      }
      let createdAt = firebase.firestore.FieldValue.serverTimestamp();
      setLoading(true)
      await firestore().collection(EXCEPTIONAL_PLAYS).add({
        caption,
        videoUri: downloadURL,
        createdAt,
        likesCount: 0,
        commentsCount: 0,
        dislikesCount: 0,
        viewsCount: 0,
        comments: [],

      })
      setLoading(false)
      showMessage({
        message: "Status created successfully",
        type: "success",
        icon: "success",
      })
      navigation.goBack()

    }
    catch (error) {
      console.log(error)
    }
  }

  const deleteVideo = () => {
    Alert.alert(
      'Delete Video',
      'Are you sure you want to delete this video?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },

        {
          text: 'OK',
          onPress: () => {
            setVideoUri(null);
            setDownloadURL(null);
          },
        },
      ],
      { cancelable: false },
    );
  };



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        {
          !videoUri && <NativeButton title="Select Video" onPress={handleSelectVideo} />
        }


        {videoUri && (
          <TouchableOpacity 
           style={{
            marginTop: 40,
           }}
          onPress={deleteVideo}>
            <View style={{
              backgroundColor: 'blue',
              padding: 20,
              borderRadius: 50,
              width: 40,
              position: 'absolute',
              top: 0,
              right: 0,
            }}>
              <Entypo
                name="cross"
                size={40}
                color="red"
              />
            </View>
            <Video
              source={{ uri: videoUri }}
              style={styles.videoPlayer}
              controls={true}
              paused={true} // You can set this to false to automatically play the video
              resizeMode="contain"
            />
          </TouchableOpacity>
      )}


      {uploadProgress > 0 && <Progress
        progress={uploadProgress}
        width={screenWidth / 2 - 24}
        color="#34D399"
        borderWidth={0}
        unfilledColor="grey"
        height={1.5}
        style={styles.progress}
      />}

      <View style={styles.infoRow}>
        <Text style={styles.title}>Video Caption</Text>
        <TextInput
          value={caption}
          onChangeText={text =>
            setCaption(text)
          }
          style={styles.input}
          placeholder="enter status caption"

        />
      </View>


      <View
        style={{ backgroundColor: theme.colors.white, borderRadius: 20 }}
      >
        <Button
          icon={{ source: 'play', direction: 'ltr' }}
          mode="contained"
          contentStyle={{ flexDirection: 'row-reverse' }}
          loading={loading}
          disabled={loading}
          buttonColor={theme.colors.buttonColor}
          textColor={theme.colors.primary}
          onPress={onPost}

        >
          Post Video
        </Button>
      </View>


    </ScrollView>
    </SafeAreaView >



  );
};

export default ExceptionalPlays;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    padding: 5,
  },
  videoPlayer: {
    width: '100%',
    height: 200, // Set the desired height of the video player
    backgroundColor: 'black',
  },
  errorContainer: {
    marginHorizontal: 10,
    marginTop: -18
  },

  infoRow: { marginBottom: 20, padding: 10 },

  title: { fontWeight: 'bold', color: '#000' },

  input: {
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    padding: 0,
    color: "#000"
  },

  login: {
    backgroundColor: '#1c478e',
    color: '#fff',
    padding: 12,
    textAlign: 'center',
    borderRadius: 15,
    marginTop: 20,
  },

  errorColor: { color: '#EF4444', marginTop: 5 },
  progress: { marginTop: 10, alignSelf: 'center' },
})
