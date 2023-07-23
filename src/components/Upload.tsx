import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import Progress from 'react-native-progress/Bar';
import storage from '@react-native-firebase/storage';
import { RootState } from '../redux/store';

export default function Upload({
    setImageURL,
    setImagesUploading,
    imageTextOne,
    profileImagesUploading
}: any) {

    const { user } = useSelector((state: RootState) => state.user);


    const [one, setOne] = useState<string | null>(null);

    const [photoOne, setPhotoOne] = useState<string | null>(null);


    const screenWidth = useWindowDimensions().width;
    const [uploadProgress, setUploadProgress] = useState(0);

    // Open Phone Gallery
    function openGalleryOne() {
        ImageCropPicker.openPicker({
            cropping: true
        })
            .then(image => {
                setOne(RNFetchBlob.wrap(image.path));
                setPhotoOne(image.path);
            })
            .catch(error => {
                console.log(error);
            });
    }



    // Open camera
    function takePhotoOne() {
        ImageCropPicker.openCamera({ width: 300, height: 400 })
            .then(image => {
                console.log('');
                console.log('');
                console.log('');
                console.log(image);
                // setImages(image);
                setOne(RNFetchBlob.wrap(image.path));
                setPhotoOne(image.path);
            })
            .catch(error => {
                console.log(error);
            });
    }





    const deletePhotoOne = () => {
        Alert.alert(
            'Delete Photo',
            'Are you sure you want to delete this photo?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },

                {
                    text: 'OK',
                    onPress: () => {
                        setOne(null);
                        setPhotoOne(null);
                    },
                },
            ],
            { cancelable: false },
        );
    };





    const uploadImages = async () => {
        if(one){
         console.log('uploading images');
        //upload images
        const fileExtension = photoOne?.split('.').pop();
        //generate a random name for the image
        const imageName = Math.random().toString(36).substring(7);
        //append the extension to the image name
        const imageFileName = Math.random() * 100 * Math.random() * 200 + imageName + '.' + fileExtension;
        //create a reference for the file
        const imageRef = storage().ref(`images/` + imageFileName);
        //upload the file
        const uploadTask = imageRef.putFile(photoOne);
        //upload images
        setImagesUploading(true)
        
        //wait for the upload to finish
        // Track upload progress
        uploadTask.on(
            'state_changed',
            (snapshot:any) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error:any) => {
                console.log(error);
                // Handle error if the upload fails
            },
            async () => {
                // Upload complete
                console.log('Upload complete');

                // Get the download URL
                const url = await imageRef.getDownloadURL();
                setImageURL(url);

                // Set images uploading state to false
                //setImagesUploading(false);

                // Reset upload progress
                //setUploadProgress(0);
            }
        );

        }
        else{
            // Alert.alert(
            //     'Upload Photo',
            //     'Please upload status ',
            //     [
            //         {
            //             text: 'OK',
            //             onPress: () => {
            //                 console.log('OK Pressed');
            //             },
            //         },
            //     ],
            //     { cancelable: false },
            // );
        }
        



    }


     useEffect(()=>{
        //upload images automatically
        uploadImages();
     }, [one, photoOne]);

    //
    //
    return (
        <>
            <Text style={styles.title}>{imageTextOne}</Text>

            {!one ? (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <MaterialIcons
                            name="photo-library"
                            size={40}
                            color="#1c478e"
                            onPress={openGalleryOne}
                        />
                    </View>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <MaterialIcons
                            name="photo-camera"
                            size={40}
                            color="#1c478e"
                            onPress={takePhotoOne}
                        />
                    </View>
                </View>
            ) : (
                <TouchableOpacity onPress={deletePhotoOne}>
                    <View style={{
                        backgroundColor: 'white',
                        borderRadius: 50,
                        width: 40,
                        position: 'absolute',
                        top: -10,
                        right: 10,
                    }}>
                        <Entypo
                            name="cross"
                            size={40}
                            color="red"
                        />
                    </View>
                    <Image
                        source={{ uri: photoOne }}
                        style={{ width: 200, height: 200, alignSelf: 'center' }}
                    />
                </TouchableOpacity>
            )}


            {
                profileImagesUploading ? (
                    <Progress
                        progress={uploadProgress}
                        width={screenWidth / 2 - 24}
                        color="#34D399"
                        borderWidth={0}
                        unfilledColor="grey"
                        height={1.5}
                        style={styles.progress}
                    />
                ) : (
                    <View

                    >
                        {/* <Button
                            title="Upload Image"
                            onPress={uploadImages}
                            style={{
                                marginTop: 20,
                                marginHorizontal: 40,
                                backgroundColor: '#1c478e',
                                borderRadius: 20,
                                alignSelf: 'center',
                                padding: 10,

                            }}

                        /> */}

                    </View>

                )

            }


        </>
    );
}

const styles = StyleSheet.create({
    title: { fontWeight: 'bold', color: '#000', textAlign: 'center' },

    progress: { marginTop: 10, alignSelf: 'center' },
});
