import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert, ImageBackground, Modal, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { generalstyles } from '../../../generalstyles/generalstyles';
import { CLUBS, CLUB_PLAYERS, PLAYERS, SEASONS } from '../../../constants/endpoints';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { ActivityIndicator, Button, IconButton } from 'react-native-paper';
import { theme } from '../../../theme/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';


const SeasonDetails = ({ navigation }: any) => {
    const { seasonId } = useRoute<any>().params


    const [seasonData, setseasonData] = React.useState<any>([]);

    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [numberOfTeams, setNumberOfTeams] = React.useState<any>(0);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [numberOfPlayers, setNumberOfPlayers] = React.useState<any>(0);

    const getSeasonData = async () => {
        const seasonDoc = await firestore().collection(SEASONS).doc(seasonId).get();
        if (seasonDoc.exists) {
            const seasonData = seasonDoc.data();
            const details = {
                ...seasonData,
                seasonId: seasonDoc.id,

            };
            setseasonData([details]);
            // Use clubData to display the club information on the page
        } else {
            // Handle the case when the club document does not exist
            Alert.alert('Club does not exist!');
        }
    };

    useEffect(() => {
        const unsubscribe = firestore()
            .collection(SEASONS)
            .doc(seasonId)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    const seasonData = doc.data();
                    const details = {
                        ...seasonData,
                        seasonId: seasonId
                    };


                    setseasonData([details]);
                    // Use clubData to update the club information on the page
                } else {
                    // Handle the case when the club document no longer exists
                    Alert.alert('Club no longer exists!');
                }
            });

        return () => unsubscribe(); // Unsubscribe when the component unmounts

    }, [seasonId]);


    const onCreateTeams = async () => {
        try {
            setLoading(true);

            showMessage({
                message: 'Creating Teams',
                description: 'Please wait',
                type: 'success',
            });

            const teamPromises = Array.from({ length: numberOfTeams }).map(async (_, teamIndex) => {
                const clubRef = await firestore().collection(SEASONS).doc(seasonId).collection(CLUBS).add({
                    coverImage: "https://media.istockphoto.com/id/641856978/photo/cricket-stadium.jpg?s=612x612&w=0&k=20&c=MEfasKgWKNwLqdxAlgewb1pbdvCpKUYagkPA9FC_Vrg=",
                    logo: "https://media.istockphoto.com/id/641856978/photo/cricket-stadium.jpg?s=612x612&w=0&k=20&c=MEfasKgWKNwLqdxAlgewb1pbdvCpKUYagkPA9FC_Vrg=",
                    name: `Team ${teamIndex + 1}`,
                    description: "",
                    location: "",
                    website: "",
                    email: "",
                    phoneNumber: "",
                    founded: "",
                    stadium: "",
                    capacity: "1000",
                    manager: "lorem ipsum dolor",
                    socailMediaPages: [],
                    owner: "lorem ipsum dolor",
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    identifier: 'template',
                });

                if (clubRef && numberOfPlayers > 0) {
                    const playerPromises = Array.from({ length: numberOfPlayers }).map(async (_, playerIndex) => {
                        await firestore().collection(SEASONS).doc(seasonId)
                            .collection(CLUB_PLAYERS)
                            .doc(clubRef.id)
                            .collection(PLAYERS)
                            .add({
                                name: `Player ${playerIndex + 1}`,
                                clubId: clubRef.id,
                                clubName: `Team ${teamIndex + 1}`,
                                height: '6ft',
                                weight: '80kg',
                                profile_pic: "https://media.istockphoto.com/id/1255328634/photo/cricket-leather-ball-resting-on-bat-on-the-stadium-pitch.jpg?s=612x612&w=0&k=20&c=e2yHkZt3DISv6e1dpkZgABgC9fxfY93cB1H4MdY9sJs=",
                                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                            });
                    });

                    await Promise.all(playerPromises);
                }

                return clubRef;
            });

            const teams = await Promise.all(teamPromises);
            showMessage({
                message: 'Teams Created',
                description: 'Please wait',
                type: 'success',
            });
            setLoading(false);
            setModalVisible(false);
        } catch (error) {
            console.log(error);
            showMessage({
                message: 'Error',
                description: 'Please try again',
                type: 'danger',
            });
            setLoading(false);
        }
    };




    return (
        <SafeAreaView style={[generalstyles.container]}>
            {/* modal to select the number of teams to create */}
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
                        <View >
                            <Text>Create Teams</Text>
                        </View>
                        <View>
                            <Text >Number of Teams</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter number of teams"
                                keyboardType="numeric"
                                onChangeText={(text) => setNumberOfTeams(text)}
                                value={numberOfTeams}
                            />
                        </View>
                        {/* players */}
                        <View>
                            <Text >Number of Players (Optional)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter number of players"
                                keyboardType="numeric"
                                onChangeText={(text) => setNumberOfPlayers(text)}
                                value={numberOfPlayers}
                            />
                        </View>
                        {/* players */}
                        {/* other actions */}
                        <View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }]}>
                            <Button
                                mode="contained"
                                contentStyle={{
                                    flexDirection: 'row-reverse',
                                }}
                                style={{ marginRight: 10 }}
                                buttonColor={theme.colors.red}
                                disabled={loading}
                                textColor={theme.colors.textColor}
                                onPress={() => setModalVisible(false)}

                            >
                                Cancel
                            </Button>
                            <Button
                                mode="contained"
                                contentStyle={{
                                    flexDirection: 'row-reverse',
                                }}
                                // disabled={selectedClub == null || loading}
                                disabled={loading || numberOfTeams == 0}
                                style={{ marginRight: 10 }}
                                buttonColor={theme.colors.success}
                                textColor={theme.colors.textColor}
                                onPress={onCreateTeams}

                            >
                                Create Teams
                            </Button>
                        </View>
                        {/* other actions */}

                    </View>
                </View>
            </Modal>

            {/* modal to select the number of teams to create */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                style={{
                    paddingBottom: 100
                }}
            >
                {
                    seasonData.length > 0 ?
                        <View>
                            <ImageBackground
                                source={{ uri: seasonData[0].logo }}
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
                                        source={{ uri: seasonData[0].logo }}
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
                                        style={{ marginVertical: 5 }}
                                        onPress={() => {
                                            navigation.navigate("EditClubScreen", {
                                                seasonId,
                                                seasonName: seasonData[0].name,
                                                numOfTeams: seasonData[0].numOfTeams,
                                            })
                                        }
                                        }


                                    >
                                        Edit Season
                                    </Button>

                                    {/* view fixtures */}
                                    <Button

                                        mode="contained"
                                        contentStyle={{ flexDirection: 'row-reverse' }}

                                        buttonColor={theme.colors.buttonColor}
                                        textColor={theme.colors.primary}
                                        style={{ marginVertical: 5 }}
                                        onPress={() => {
                                            navigation.navigate("SeasonFixtureScreen", {
                                                seasonId,
                                                seasonName: seasonData[0].name
                                            })
                                        }}


                                    >
                                        View Fixtures
                                    </Button>
                                    {/* view fixtures */}

                                    <Button

                                        mode="contained"
                                        contentStyle={{ flexDirection: 'row-reverse' }}

                                        buttonColor={theme.colors.buttonColor}
                                        textColor={theme.colors.primary}
                                        onPress={() => {
                                            navigation.navigate("AddFixtureScreen", {
                                                seasonId,
                                                seasonName: seasonData[0].name,
                                                numOfTeams: seasonData[0].numOfTeams,
                                                
                                            })
                                        }}


                                    >
                                        Add  Fixture
                                    </Button>

                                    <Button

                                        mode="contained"
                                        contentStyle={{ flexDirection: 'row-reverse' }}
                                        buttonColor={theme.colors.buttonColor}
                                        style={{ marginVertical: 5 }}
                                        textColor={theme.colors.primary}
                                        onPress={() => {
                                            setModalVisible(true)}
                                        }


                                    >
                                        Add  Clubs
                                    </Button>

                                </View>


                            </View>
                            {/* logo */}
                            <TouchableOpacity style={{
                                marginHorizontal: 20
                            }}
                                onPress={() => navigation.navigate("SeasonTableScreen", {
                                    seasonId,
                                    seasonName: seasonData[0].name
                                })}
                            >
                                <Text style={styles.playerlink}>View Table</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                marginHorizontal: 20
                            }}
                                onPress={() => navigation.navigate("ClubsScreen", {
                                    seasonId,
                                    seasonName: seasonData[0].name
                                })}
                            >
                                <Text style={styles.playerlink}>View Clubs</Text>
                            </TouchableOpacity>

                            {/* club details */}
                            <View style={{
                                marginTop: 20,
                                marginBottom: 20
                            }}>

                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Name : {seasonData[0].name}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Start Date: {seasonData[0].startDate}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>End Date : {seasonData[0].endDate}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Total Teams : {seasonData[0].numOfTeams}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Season Length: {seasonData[0].seasonLength}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Description : {seasonData[0].description}</Text>
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

export default SeasonDetails

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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: theme.colors.textColor,
        padding: 10,
        width: 200,
    }

})