import { StyleSheet, Text, View, SafeAreaView, TextInput, Alert } from 'react-native'
import React, { useState , useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Upload from '../../../components/Upload'
import { CLUBS, CLUB_PLAYERS, PLAYERS, SEASONS } from '../../../constants/endpoints';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';
import { theme } from '../../../theme/theme';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';


const EditClub = ({ navigation }: any) => {

    const { clubId, seasonId } = useRoute<any>().params



    const [clubData, setClubData] = React.useState<any>([])
    const [loadingClubDetails, setLoadingClubDetails] = useState(false);

    const getClubData = async () => {
        const clubDoc = await firestore().collection(SEASONS).doc(seasonId).collection(CLUBS).doc(clubId).get();
        if (clubDoc.exists) {
            const clubData = clubDoc.data();
            const details = {
                ...clubData,
            }
            setClubData(details);
            setClub(details);
            // Use clubData to display the club information on the page
        } else {
            // Handle the case when the club document does not exist
            Alert.alert('Club does not exist!');
        }
    };

    useEffect(() => {
        getClubData();
    }, []);




    const [club, setClub] = useState<any>({
        coverImage:clubData?.coverImage,
        logo:clubData?.coverImage,
        name: clubData?.name,
        description: clubData?.description,
        location: clubData?.location,
        website: clubData?.website,
        email: clubData?.email,
        phoneNumber: clubData?.phoneNumber,
        founded: clubData?.founded,
        stadium: clubData?.stadium,
        capacity: clubData?.capacity,
        manager: clubData?.manager,
        socailMediaPages: clubData?.socailMediaPages,
        owner: clubData?.owner,

    }
    )
    const [logoUploading, setLogoUploading] = useState(false)
    const [clubLogo, setClubLogo] = useState<any>("")

    const [coverImageUploading, setCoverImageUploading] = useState(false)
    const [coverImage, setCoverImage] = useState<any>("")

    const [loading, setLoading] = useState(false)

    const onCreateClub = async () => {
        try {
            if (club.name === "" || clubLogo === "" || coverImage === "") {
                return Alert.alert("Please fill all fields")
            }
            setLoading(true)
            
            
            //update club

            const clubRef = await firestore().collection(SEASONS).doc(seasonId).collection(CLUBS).doc(clubId).update({
                ...club,
                logo: clubLogo,
                coverImage: coverImage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            })

            setLoading(false)
            showMessage({
                message: "Club Updated successfully",
                type: "success",
                icon: "success",
            })
            
            navigation.navigate("ClubDetailsScreen", { clubId: clubId , seasonId: seasonId})
        
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <SafeAreaView>
            {
                loadingClubDetails ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                        </View>
                    
                ):(
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
                            Edit  Club
                        </Button>
                    </View>
    
    
                </ScrollView>

                )
                    
            }

            
        </SafeAreaView>
    )
}

export default EditClub

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