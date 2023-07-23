import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert, ImageBackground, Modal, Pressable } from 'react-native'
import React, { useEffect , useState} from 'react'
import { useRoute } from '@react-navigation/native'
import { generalstyles } from '../../../generalstyles/generalstyles';
import { CLUBS, CLUB_PLAYERS, PLAYERS } from '../../../constants/endpoints';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { ActivityIndicator, Button, IconButton } from 'react-native-paper';
import { theme } from '../../../theme/theme';
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showMessage } from 'react-native-flash-message';




const PlayerDetails = ({ navigation }: any) => {

    const { playerId, clubId } = useRoute<any>().params

    //all clubs
    const [clubs, setClubs] = React.useState<any>([])
    const [loading, setLoading] = React.useState(false)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [selectedClub, setSelectedClub] = React.useState<any>(null)

    const getClubs = async () => {
        try {
            setLoading(true)
            setClubs([])
            const clubs = await firestore().collection(CLUBS).get();
            for (const club of clubs.docs) {
                const clubData = club.data();
                clubData.id = club.id;
                if(clubData.id == clubId){
                    continue;
                }
                const details = {
                    ...clubData,
                    clubId: club.id
                }
                setClubs((prev: any) => [...prev, details])
            }
            setLoading(false)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getClubs();
    }, [])
    //all clubs






    const [playerData, setPlayerData] = React.useState<any>([])

    const getClubData = async () => {
        const clubDoc = await firestore().collection(CLUBS).doc(clubId).get();
         
        const playerDoc = await firestore().collection(CLUB_PLAYERS).doc(clubId).collection(PLAYERS).doc(playerId).get();


        if (playerDoc.exists) {
            const playerData = playerDoc.data();
            const details = {
                ...playerData,
                playerId: playerId,
                clubId,
                clubName: clubDoc.data()?.name,
                club:clubDoc.data()?.name
            }
            setPlayerData([details]);
            // Use clubData to display the club information on the page
        } else {
            // Handle the case when the club document does not exist
            Alert.alert('Club does not exist!');
        }
    };

    useEffect(() => {
        getClubData();
    }, [playerId, clubId]);


    const onFinishTransfer = async () => {
        try {
             setLoading(true)
            //get player old club
            const clubDoc = await firestore().collection(CLUBS).doc(clubId).get();
            const playerDoc = await firestore().collection(CLUB_PLAYERS).doc(clubId).collection(PLAYERS).doc(playerId).get();
            const playerData = playerDoc.data();

            const details = {
                ...playerData,
                clubId:selectedClub.id,
                clubName:selectedClub.name,
                transerFrom:{
                    club:clubDoc.data(),
                    clubId:clubDoc.id
                }
            }
            //delete from old club
            await firestore().collection(CLUB_PLAYERS).doc(clubId).collection(PLAYERS).doc(playerId).delete();
            
            //add to new club
            await firestore().collection(CLUB_PLAYERS).doc(selectedClub.id).collection(PLAYERS).doc(playerId).set(details);
            showMessage({
                message: "Transfer Successful",
                type: "success",
            });
            // navigation.navigate("Clubs")
            navigation.navigate('HomeScreen')
            setModalVisible(false)
            setLoading(false)
           
        }
        catch (error) {
            console.log(error)
        }
    }


            



    return (
        <SafeAreaView style={[generalstyles.container]}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <View style={styles.selectClubView}>
                            <Text style={styles.selectClubText}>Select Club</Text>
                        </View>


                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            {

                                clubs.map((club: any) => (
                                    <Pressable
                                        key={club.id}
                                        style={[
                                            styles.pressableStyles,
                                            {
                                                backgroundColor: selectedClub?.id == club.id ? theme.colors.white : theme.colors.disabled,
                                            }
                                        ]}
                                        onPress={() => {
                                            setSelectedClub(club)
                    
                                        }
                                        }

                                    >

                                        <View >
                                            {/* icon */}
                                            <Image
                                                source={{
                                                    uri: club.logo
                                                }}
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius: 10,
                                                }}
                                            />

                                        </View>
                                        <View>
                                            {/* team name */}
                                            <Text style={styles.date}>{club.name}</Text>
                                            <Text style={styles.status}>{club.stadium}</Text>
                                            <Text style={styles.mode}>{club.location}</Text>

                                            {/* team name */}

                                        </View>
                                        <Pressable>
                                            {/* add chevron icon */}
                                            <Ionicons name="chevron-forward"
                                                size={24} color={theme.colors.primary} />
                                            {/* icon */}

                                        </Pressable>
                                    </Pressable>
                                ))

                            }
                        </ScrollView>

                        {/* other actions */}
                        <View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }]}>
                            <Button
                                mode="contained"
                                contentStyle={{
                                    flexDirection: 'row-reverse',
                                }}
                                style={{ marginRight: 10 }}
                                buttonColor={theme.colors.red}
                                textColor={theme.colors.textColor}
                                onPress={() => setModalVisible(false)}

                            >
                                Cancel Transfer
                            </Button>
                            <Button
                                mode="contained"
                                contentStyle={{
                                    flexDirection: 'row-reverse',
                                }}
                                disabled={selectedClub == null || loading}
                                style={{ marginRight: 10 }}
                                buttonColor={theme.colors.success}
                                textColor={theme.colors.textColor}
                                onPress={onFinishTransfer}

                            >
                                {loading?"Transfering...":"Finish Transfer"}
                            </Button>
                        </View>
                        {/* other actions */}
                    </View>



                </View>


            </Modal>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                style={{
                    paddingBottom: 100
                }}
            >
                {
                    playerData.length > 0 ?
                        <View>
                            <ImageBackground
                                source={{ uri: playerData[0].profile_pic }}
                                style={{ width: '100%', height: 200 }}


                            >
                                <View>
                                    <IconButton
                                        icon="chevron-left"
                                        iconColor={theme.colors.primary}
                                        size={28}
                                        onPress={() => navigation.goBack()}
                                        containerColor={theme.colors.arraowBackGroundColor}
                                    />
                                </View>
                            </ImageBackground>
                            {/* logo */}
                            <View style={[generalstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                                <View style={{ marginTop: -50, alignItems: 'flex-start', marginLeft: 20 }}>
                                    <ImageBackground
                                        source={{ uri: playerData[0].profile_pic }}
                                        style={{ width: 100, height: 100 }}
                                        imageStyle={{ borderRadius: 50 }}
                                    >
                                    </ImageBackground>

                                </View>

                                <View>
                                    <Button

                                        mode="contained"
                                        contentStyle={{ flexDirection: 'row-reverse' }}

                                        buttonColor={theme.colors.buttonColor}
                                        textColor={theme.colors.primary}
                                        style={styles.buttonStyles}
                                        onPress={() => {
                                            navigation.navigate("EditPlayerScreen", {
                                                clubId,
                                                clubName: playerData[0]?.club,
                                                playerId: playerData[0].playerId
                                            })
                                        }
                                        }


                                    >
                                        Edit Player
                                    </Button>

                                    <Button

                                        mode="contained"
                                        contentStyle={{ flexDirection: 'row-reverse' }}

                                        buttonColor={theme.colors.buttonColor}
                                        textColor={theme.colors.primary}
                                    // onPress={()=>{
                                    //     navigation.navigate("CreatePlayerScreen", {
                                    //         clubId,
                                    //         clubName:playerData[0].name
                                    //     })
                                    // }}


                                    >
                                        Add Stats
                                    </Button>

                                    <Button

                                        mode="contained"
                                        contentStyle={{ flexDirection: 'row-reverse' }}

                                        buttonColor={theme.colors.buttonColor}
                                        textColor={theme.colors.primary}
                                        style={styles.buttonStyles}
                                        onPress={() => setModalVisible(true)}

                                    >
                                        Transfer Player
                                    </Button>



                                </View>


                            </View>
                            {/* logo */}


                            {/* club details */}
                            <View style={{
                                marginTop: 20,
                                marginBottom: 20
                            }}>

                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Name : {playerData[0].name}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Club : {playerData[0].clubName}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Description : {playerData[0].description}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Positon : {playerData[0].position}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Weight : {playerData[0].weight}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Height : {playerData[0].height}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Number : {playerData[0].jersey_number}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>DOB : {playerData[0].dob}</Text>
                                </View>


                            </View>


                            {/* club details */}

                        </View>

                        :
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ActivityIndicator size="large" color={theme.colors.primary} />

                        </View>
                }
                {/* cover image */}

                {/* cover image */}

            </ScrollView>
        </SafeAreaView>
    )
}

export default PlayerDetails

const styles = StyleSheet.create({

    errorContainer: {
        marginHorizontal: 10,
        marginTop: -18
    },


    errorColor: { color: '#EF4444', marginTop: 5 },
    text: {
        fontSize: 16,
        color: "#000",
    },
    viewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 2,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
    },
    playerlink: {
        color: "#1c478e"
    },
    buttonStyles: {
        marginVertical: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    modalView: {
        // margin: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    pressableStyles: {
        borderRadius: 8,
        padding: 16,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    ugx: {
        fontSize: 14,
        color: "gray",
    },

    date: {
        fontSize: 16,
        color: theme.colors.primary,
    },
    status: {
        fontSize: 12,
        color: 'gray',
    },
    mode: {
        fontSize: 12,
        color: 'gray',
    },
    selectClubView:{
        marginVertical: 10,

    },
    selectClubText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.white,
        textAlign: 'center',
    }

})