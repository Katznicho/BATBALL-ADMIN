import { StyleSheet, Text, View, SafeAreaView, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Upload from '../../../components/Upload'
import { CLUBS } from '../../../constants/endpoints';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';
import { theme } from '../../../theme/theme';
import { Button } from 'react-native-paper';


const CreateClub = ({ navigation }: any) => {

    const [club, setClub] = useState({
        coverImage: "",
        logo: "",
        name: "",
        description: "",
        location: "",
        website: "",
        email: "",
        phoneNumber: "",
        founded: "",
        stadium: "",
        capacity: "",
        manager: "",
        socailMediaPages: [],
        owner: "",

    }
    )
    const [logoUploading, setLogoUploading] = useState(false)
    const [clubLogo, setClubLogo] = useState("")

    const [coverImageUploading, setCoverImageUploading] = useState(false)
    const [coverImage, setCoverImage] = useState("")

    const [loading, setLoading] = useState(false)

    const onCreateClub = async () => {
        try {
            if (club.name === "" || clubLogo === "" || coverImage === "") {
                return Alert.alert("Please fill all fields")
            }
            setLoading(true)
            const clubRef = await firestore().collection(CLUBS).add({
                ...club,
                logo: clubLogo,
                coverImage: coverImage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })


            setLoading(false)
            showMessage({
                message: "Club created successfully",
                type: "success",
                icon: "success",
            })
            const clubId = clubRef.id
            navigation.navigate("ClubDetailScreen", { clubId: clubId })
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                showsHorizontalScrollIndicator={false}
                style={{
                    paddingHorizontal: 10,
                    paddingBottom: 50,
                }}

            >
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Club Name</Text>
                    <TextInput
                        value={club.name}
                        onChangeText={text =>
                            setClub({
                                ...club,
                                name: text,
                            })
                        }
                        style={styles.input}
                        placeholder="enter club name"
                        placeholderTextColor={"#000"}

                    />
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.title}>Club Logo</Text>
                    <Upload
                        setImageURL={setClubLogo}
                        setImagesUploading={setLogoUploading}
                        imageTextOne={"CLUB LOGO"}
                        profileImagesUploading={logoUploading}
                    />
                </View>
                {/* founded */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Club Founded</Text>
                    <TextInput
                        value={club.founded}
                        onChangeText={text =>
                            setClub({
                                ...club,
                                founded: text,
                            })
                        }
                        style={styles.input}
                        placeholder="enter club founded date"
                        placeholderTextColor={"#000"}

                    />
                </View>
                {/* founded */}

                <View style={styles.infoRow}>
                    <Text style={styles.title}>Club Cover Image</Text>
                    <Upload
                        setImageURL={setCoverImage}
                        setImagesUploading={setCoverImageUploading}
                        imageTextOne={"CLUB COVER IMAGE"}
                        profileImagesUploading={coverImageUploading}
                    />
                </View>

                {/* manager */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Club Manager</Text>
                    <TextInput
                        value={club.manager}
                        onChangeText={text =>
                            setClub({
                                ...club,
                                manager: text,
                            })
                        }
                        style={styles.input}
                        placeholder="enter club manager"
                        placeholderTextColor={"#000"}

                    />
                </View>
                {/* manager */}

                {/* location */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Club Location</Text>
                    <TextInput
                        value={club.location}
                        onChangeText={text =>
                            setClub({
                                ...club,
                                location: text,
                            })
                        }
                        style={styles.input}
                        placeholder="enter club location"
                        placeholderTextColor={"#000"}

                    />
                </View>
                {/* location */}

                {/* description */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Club Description</Text>
                    <TextInput
                        value={club.description}
                        onChangeText={text =>
                            setClub({
                                ...club,
                                description: text,
                            })
                        }
                        style={styles.input}
                        placeholder="enter club description"
                        placeholderTextColor={"#000"}

                    />
                </View>
                {/* description */}

                {/* email */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Club Email</Text>
                    <TextInput
                        value={club.email}
                        onChangeText={text =>
                            setClub({
                                ...club,
                                email: text,
                            })
                        }
                        style={styles.input}
                        placeholder="enter club email"
                        placeholderTextColor={"#000"}

                    />
                </View>
                {/* email */}

                {/* contact number */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Club Contact Number</Text>
                    <TextInput
                        value={club.phoneNumber}
                        onChangeText={text =>
                            setClub({
                                ...club,
                                phoneNumber: text,
                            })
                        }
                        style={styles.input}
                        placeholder="enter club contact number"
                        placeholderTextColor={"#000"}

                    />
                </View>
                {/* contact number */}

                {/* stadium */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Club Stadium</Text>
                    <TextInput
                        value={club.stadium}
                        onChangeText={text =>
                            setClub({
                                ...club,
                                stadium: text,
                            })
                        }
                        style={styles.input}
                        placeholder="enter club stadium"
                        placeholderTextColor={"#000"}

                    />
                </View>
                {/* stadium */}

                {/* stadium capacity */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Club Stadium Capacity</Text>
                    <TextInput
                        value={club.capacity}
                        onChangeText={text =>
                            setClub({
                                ...club,
                                capacity: text,
                            })
                        }
                        style={styles.input}
                        placeholder="enter club stadium capacity"
                        placeholderTextColor={"#000"}

                    />
                </View>

                {/* stadium capacity */}


                <View
                    style={{ 
                        backgroundColor: theme.colors.white, 
                        borderRadius: 20 ,
                        marginBottom: 50,
                        marginHorizontal: 10,
                    }}
                >
                    <Button
                        icon={{ source: 'play', direction: 'ltr' }}
                        mode="contained"
                        contentStyle={{ flexDirection: 'row-reverse' }}
                        loading={loading}
                        disabled={loading || clubLogo === '' || coverImage === ''}
                        buttonColor={theme.colors.buttonColor}
                        textColor={theme.colors.primary}
                        onPress={onCreateClub}

                    >
                        Add Club
                    </Button>
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateClub

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