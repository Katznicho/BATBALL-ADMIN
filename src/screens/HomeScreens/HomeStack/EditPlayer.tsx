import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { generalstyles } from '../../../generalstyles/generalstyles'
import { theme } from '../../../theme/theme'
import { Button } from 'react-native-paper';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { CLUB_PLAYERS, PLAYERS } from '../../../constants/endpoints';
import { showMessage } from 'react-native-flash-message';
import Upload from '../../../components/Upload';
import { useRoute } from '@react-navigation/native';

const EditPlayer = ({navigation}:any) => {
    const [player, setPlayer] = useState({
        name: "",
        club: "",
        height: "",
        weight: "",
        position: "",
        stronger_footer: "",
        dob: "",
        description: "",
        jersey_number: "",
    })
     const {clubName , clubId, playerId} =  useRoute<any>().params


     const [playerProfile , setPlayerProfile] =  useState("");
     const [playerImageUploading, setPlayerImageUploading] = useState(false)

     const [loading, setLoading] = useState<boolean>(false);

     //fetch player 
     const fetchPlayer = async () => {
        try {
            const playerRef = await firestore().collection(CLUB_PLAYERS).doc(clubId).collection(PLAYERS).doc(playerId).get()
            const playerData = playerRef.data()

            setPlayer({
                name: playerData?.name,
                club: clubName,
                height: playerData?.height,
                weight: playerData?.weight,
                position: playerData?.position,
                stronger_footer: playerData?.stronger_footer,
                dob: playerData?.dob,
                description: playerData?.description,
                jersey_number: playerData?.jersey_number,
            })
            //setPlayerProfile(playerData?.profile_pic)
        }
        catch (error) {
            console.log(error)
        }
    }
      
     useEffect(() => {
        
        fetchPlayer()
    }, [clubId, playerId])
    //fetch player 

     const onEditPlayer = async () => {
        try {
            if (playerProfile === "" ) {
                setLoading(false)
                return Alert.alert("Please Upload Player Profile Picture")
            }
            setLoading(true)
           //edit player
            await firestore().collection(CLUB_PLAYERS).doc(clubId).collection(PLAYERS).doc(playerId).update({
                name: player.name,
                club: clubName,
                height: player.height,
                weight: player.weight,
                position: player.position,
                stronger_footer: player.stronger_footer,
                dob: player.dob,
                description: player.description,
                jersey_number: player.jersey_number,
                profile_pic: playerProfile,
                updated_at: firebase.firestore.FieldValue.serverTimestamp()
            })
            //edit player


            setLoading(false)
            showMessage({
                message: "Player updated  successfully",
                type: "success",
                icon: "success",
            })
            // const clubId = clubRef.id
            navigation.navigate("ClubDetailScreen", { clubId: clubId })
        
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <SafeAreaView style={[generalstyles.container]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                showsHorizontalScrollIndicator={false}
                style={{
                    paddingHorizontal: 10,
                    paddingBottom: 50,
                }}

            >
                 {/* club */}
                 <View style={styles.infoRow}>
                    <Text style={styles.title}>Player Club</Text>
                    <TextInput
                        value={clubName}
                         editable={false}
                        style={styles.input}


                    />
                </View>

                {/* club */}


                {/* player name */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Player Name</Text>
                    <TextInput
                        value={player.name}
                        onChangeText={text =>
                            setPlayer({
                                ...player,
                                name: text,
                            })
                        }
                        style={styles.input}
                        placeholder="enter player name"
                        placeholderTextColor={"#000"}

                    />
                </View>
                {/* player name */}



                {/* profile picture */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Profile Picture</Text>
                    <Upload
                        setImageURL={setPlayerProfile}
                        setImagesUploading={setPlayerImageUploading}
                        imageTextOne={"PROFILE IMAGE"}
                        profileImagesUploading={playerImageUploading}
                    />
                </View>
                {/* profile picture */}

                {/* height */}

                <View style={styles.infoRow}>
                    <Text style={styles.title}>Player Height</Text>
                    <TextInput
                        value={player.height}
                        onChangeText={text =>
                            setPlayer({
                                ...player,
                                height:text
                            })
                        }
                        style={styles.input}
                        placeholder="enter player height"
                        placeholderTextColor={"#000"}

                    />
                </View>
                {/* height */}

                {/* weight */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Player Weight</Text>
                    <TextInput
                        value={player.weight}
                        onChangeText={text =>
                            setPlayer({
                                ...player,
                                weight:text
                            })
                        }
                        style={styles.input}
                        placeholder="enter player weight"
                        placeholderTextColor={"#000"}

                    />
                </View>
                {/* weight */}

                {/* position */}
               
                {/* position */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Player Position</Text>
                    <TextInput
                        value={player.position}
                        onChangeText={text =>
                            setPlayer({
                                ...player,
                                position:text
                            })
                        }
                        style={styles.input}
                        placeholder="enter player position"
                        placeholderTextColor={"#000"}

                    />
                </View>
                {/* position */}

                {/* dob */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>DOB</Text>
                    <TextInput
                        value={player.dob}
                        onChangeText={text =>
                            setPlayer({
                                ...player,
                                dob:text
                            })
                        }
                        style={styles.input}
                        placeholder="enter player dob"
                        placeholderTextColor={"#000"}

                    />
                </View>

                {/* jersey_number */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Player Jersey Number</Text>
                    <TextInput
                        value={player.jersey_number}
                        onChangeText={text =>
                            setPlayer({
                                ...player,
                                jersey_number:text
                            })
                        }
                        style={styles.input}
                        placeholder="enter player jersey number"
                        placeholderTextColor={"#000"}

                    />
                </View>
                {/* jersey_number */}
                {/* dob */}

                {/* stroner foot */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Player Stronger Foot</Text>
                    <TextInput
                        value={player.stronger_footer}
                        onChangeText={text =>
                            setPlayer({
                                ...player,
                                stronger_footer:text
                            })
                        }
                        style={styles.input}
                        placeholder="enter player stronger foot"
                        placeholderTextColor={"#000"}

                    />
                </View>
                {/* stroner foot */}

                {/* description */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Player  Description</Text>
                    <TextInput
                        value={player.description}
                        onChangeText={text =>
                            setPlayer({
                                ...player,
                                description:text
                            })
                        }
                        style={styles.input}
                        placeholder="enter player description"
                        placeholderTextColor={"#000"}

                    />
                </View>
                {/* description */}
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
                        disabled={loading}
                        buttonColor={theme.colors.buttonColor}
                        textColor={theme.colors.primary}
                        onPress={onEditPlayer}

                    >
                        Edit Player
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditPlayer

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