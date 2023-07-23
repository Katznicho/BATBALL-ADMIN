import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Upload from '../../../components/Upload'
import { theme } from '../../../theme/theme'
import { Button } from 'react-native-paper'
import  firestore, {firebase}  from '@react-native-firebase/firestore';
import { USER_STATUS } from '../../../constants/endpoints'
import  auth  from '@react-native-firebase/auth';
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { showMessage } from 'react-native-flash-message'

const CreateStatus = ({navigation}:any) => {
    const [status, setStatus] = useState({
        caption: "",
        image: "",
        title:""
    })
    const [profileImagesUploading, setProfileImagesUploading] = useState(false)
    const [imageURL, setImageURL] = useState("")
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state: RootState) => state.user);

     const postStatus = async()=>{
        try {
            if (status.caption === "" || imageURL === "") {
                return Alert.alert("Please fill all fields")
            }
            let createdAt = firebase.firestore.FieldValue.serverTimestamp();
            setLoading(true)
             await firestore().collection(USER_STATUS).add({
                caption: status.caption,
                image: imageURL,
                title: status.title,
                createdAt,
                likesCount: 0,
                commentsCount: 0,
                dislikesCount: 0,
                viewsCount: 0,
                uid: user?.uid,
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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                   showsVerticalScrollIndicator={false}
                   keyboardShouldPersistTaps="always"
            >
                
                <View style={styles.infoRow}>
                    <Upload
                        setImageURL={setImageURL}
                        setImagesUploading={setProfileImagesUploading}
                        imageTextOne={"Gallery Photo"}
                        profileImagesUploading={profileImagesUploading}
                    />
                </View>

                {/* title */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Image Title</Text>
                    <TextInput
                        value={status.title}
                        onChangeText={text =>
                            setStatus({
                                ...status,
                                title: text,
                            })
                        }
                        style={styles.input}
                        placeholder="enter status title"
                    
                    />
                </View>
                {/* title */}

                <View style={styles.infoRow}>
                    <Text style={styles.title}>Image Caption</Text>
                    <TextInput
                        value={status.caption}
                        onChangeText={text =>
                            setStatus({
                                ...status,
                                caption: text,
                            })
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
                        onPress={postStatus}
                    
                    >
                        Add Image
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateStatus

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        padding: 5,
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
})