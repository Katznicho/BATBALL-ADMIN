import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import moment from 'moment';
import ReviewTypes from '../../../../components/ReviewTypes';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { CLUBS, CLUB_PLAYERS, LINEUPS, PLAYERS, SEASONS, SEASON_FIXTURES } from '../../../../constants/endpoints';
import { theme } from '../../../../theme/theme';
import { ActivityIndicator, Button, Divider } from 'react-native-paper';
import { generalstyles } from '../../../../generalstyles/generalstyles';
import Modal from 'react-native-modal'; // Step 1


const LineUps = ({ navigation }: any) => {

    const [activeDetails, setActiveDetails] = useState<any[] | []>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessage] = useState(
        {
            id: 1,
            message: 'There are no active bookings yet',
            time: moment().format('DD/MM/YYYY'),
        },
    );


    const [details, setDetails] = useState([
        {
            name: 'LineUps',
            screen: 'LineUps',
        },
        {
            name: 'Stats',
            screen: 'Stats',
        },
        {
            name: 'Latest',
            screen: 'Latest',
        },
    ]);

    const { seasonId, seasonName, fixtureId } = useRoute<any>().params
    const [fixtureDetails, setFixtureDetails] = useState<any>([]);
    const [lineUps, setLineUps] = useState<any>([]);
    const [loadingLineUps, setLoadingLineUps] = useState<boolean>(false);

    const [homeTeamLineUps, setHomeTeamLineUps] = useState<any>([]);
    const [awayTeamLineUps, setAwayTeamLineUps] = useState<any>([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState<'home' | 'away'>('home')


    const getFixtureDetails = async () => {
        try {
            const fixture = await firestore().collection(SEASONS).doc(seasonId).collection(SEASON_FIXTURES).doc(fixtureId).get();
            const fixtureData = fixture.data();
            const homeTeamId = fixture.data()?.homeTeam;
            const awayTeamId = fixture.data()?.awayTeam;
            const details = {
                ...fixtureData,
                homeTeamDetails: (await firestore().collection(SEASONS).doc(seasonId).collection(CLUBS).doc(homeTeamId).get()).data(),
                awayTeamDetails: (await firestore().collection(SEASONS).doc(seasonId).collection(CLUBS).doc(awayTeamId).get()).data(),
                homeTeamPlayers: (await firestore().collection(SEASONS).doc(seasonId).collection(CLUB_PLAYERS).doc(homeTeamId).collection(PLAYERS).get()).docs,
                awayTeamPlayers: (await firestore().collection(SEASONS).doc(seasonId).collection(CLUB_PLAYERS).doc(awayTeamId).collection(PLAYERS).get()).docs,
            };
            setFixtureDetails([details]);
            return details;
        } catch (error) {
            // Handle the error here
        }
    };


    const getLineUps = async () => {
        try {
            setLoadingLineUps(true);
            const fixture = await firestore().collection(SEASONS).doc(seasonId).collection(SEASON_FIXTURES).doc(fixtureId).collection(LINEUPS).get();
            //check if lineups exist
            if (fixture.docs.length > 0) {
                const lineUpsData: any[] = [];
                fixture.docs.forEach(async (lineUp) => {
                    const lineUpData = lineUp.data();
                    const playerId = lineUp.data().playerId;
                    const details = {
                        ...lineUpData,
                        playerDetails: (await firestore().collection(SEASONS).doc(seasonId).collection(CLUBS).doc(playerId).get()).data(),
                    };
                    lineUpsData.push(details);
                });
                setLineUps(lineUpsData);
            }
            else {
                setLineUps([]);
            }
            setLoadingLineUps(false);
        } catch (error) {
            // Handle the error here
        }
    };


    useEffect(() => {
        getFixtureDetails();
        getLineUps();
    }, []);


    // Function to handle the "Next" button when adding home team line-up
    const handleNextStep = () => {
        setCurrentStep('away'); // Switch to the next step (away team line-up)
    };
    const handleBackStep = () => {
        setCurrentStep('home'); // Switch to the next step (away team line-up)
    };

    // Function to handle the "Submit" button when adding away team line-up
    const handleSubmit = () => {
        // Update data in Firestore with both line-ups (homeTeamLineUp and awayTeamLineUp)
        // You can use firestore() to update the data accordingly

        // After updating, you can close the modal and reset the steps
        setHomeTeamLineUps([]);
        setAwayTeamLineUps([]);
        setCurrentStep('home');
        setModalVisible(false);
    };

    // Step 2
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const handleHomeTeamPlayerSelect = (playerDetails: any) => {
        if (homeTeamLineUps.includes(playerDetails.id)) {
            setHomeTeamLineUps(homeTeamLineUps.filter((id: any) => id !== playerDetails.id));
        } else {
            setHomeTeamLineUps([...homeTeamLineUps, playerDetails.id]);
        }
    };

    const handleAwayTeamPlayerSelect = (playerDetails: any) => {
        if (awayTeamLineUps.includes(playerDetails.id)) {
            setAwayTeamLineUps(awayTeamLineUps.filter((id: any) => id !== playerDetails.id));
        } else {
            setAwayTeamLineUps([...awayTeamLineUps, playerDetails.id]);
        }
    };


    const renderPlayerItem = ({ item }: { item: any }) => {
        const details = {
            ...item.data(),
            id: item.id,
        }

        const isPlayerSelected = currentStep === 'home' ? homeTeamLineUps.includes(details.id) : awayTeamLineUps.includes(details.id);

        return (
            <Pressable
                onPress={() => {

                    // Call the respective handler function based on the current step (home or away)
                    if (currentStep === 'home') {

                        handleHomeTeamPlayerSelect(details);
                    } else {
                        handleAwayTeamPlayerSelect(details);
                    }
                }}
                key={item.id}
                style={{
                    backgroundColor: isPlayerSelected ? theme.colors.primary : theme.colors.white,
                    borderRadius: 8,
                    padding: 15,
                    width: '120%',
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 1,
                    shadowRadius: 4,
                    elevation: 5,
                    marginVertical: 5,
                    marginHorizontal: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={{ uri: item.data().profile_pic }} // Assuming you have the player's picture URL in the 'playerPicture' field
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        marginRight: 10,
                    }}
                />
                <Text style={{ color: theme.colors.black }}>
                    {item.data().name}
                </Text>
                {/* <Divider
                    style={{
                        marginHorizontal: 10,
                        height: 1,
                        flex: 1,
                        backgroundColor: theme.colors.black,
                    }}
                /> */}
            </Pressable>
        );
    };

    return (
        <SafeAreaView style={[generalstyles.container]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                showsHorizontalScrollIndicator={false}
                style={{
                    paddingBottom: 50,
                }}
            >
                {
                    loadingLineUps ?
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ActivityIndicator size="large" color={theme.colors.primary} />

                        </View> :
                        loadingLineUps === false && lineUps.length > 0 ?
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                                    <Text>
                                        Line ups
                                    </Text>
                                </View>
                            </View>
                            :
                            (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                                    <View
                                        style={{
                                            backgroundColor: theme.colors.white,
                                            borderRadius: 20,
                                            marginBottom: 50,
                                            marginHorizontal: 10,
                                            marginVertical: 20,
                                        }}
                                    >
                                        <Button
                                            icon={{ source: 'play', direction: 'ltr' }}
                                            mode="contained"
                                            contentStyle={{ flexDirection: 'row-reverse' }}
                                            loading={loading}
                                            buttonColor={theme.colors.buttonColor}
                                            textColor={theme.colors.primary}
                                            onPress={toggleModal}


                                        >
                                            Add Line Ups
                                        </Button>
                                    </View>
                                </View>
                            )

                }

                {/* Show the modal when isModalVisible is true */}
                <Modal
                    isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}
                    style={{
                        backgroundColor: theme.colors.white,
                        borderRadius: 20,
                        marginBottom: 50,
                        marginHorizontal: 10,
                        marginVertical: 20,
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {currentStep === 'home' ? (
                            /* Render content for adding home team line-up */

                            <FlatList
                                contentContainerStyle={{
                                    backgroundColor: theme.colors.white,
                                    paddingBottom: 50,
                                
                                    marginBottom: 50,
                                }}
                                showsVerticalScrollIndicator={false}
                                data={fixtureDetails[0]?.homeTeamPlayers}
                                keyExtractor={(item) => item.playerId}
                                renderItem={renderPlayerItem}
                                ListFooterComponent={
                                    <Button
                                        mode="contained"
                                        contentStyle={{ flexDirection: 'row-reverse' }}
                                        loading={loading}
                                        buttonColor={theme.colors.buttonColor}
                                        textColor={theme.colors.primary}
                                        onPress={handleNextStep}>Next</Button>
                                }
                            />


                        ) : (
                            /* Render content for adding away team line-up */
                            <View>
                                <FlatList
                                    contentContainerStyle={{
                                        backgroundColor: theme.colors.white,
                                        paddingBottom: 50,
                                        
                                        marginBottom: 50,
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    data={fixtureDetails[0]?.awayTeamPlayers}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderPlayerItem}
                                    ListFooterComponent={
                                        <View>
                                            <View>
                                                <Button
                                                    mode="contained"
                                                    contentStyle={{ flexDirection: 'row-reverse' }}
                                                    loading={loading}
                                                    buttonColor={theme.colors.buttonColor}
                                                    textColor={theme.colors.primary}
                                                    onPress={handleSubmit}>
                                                    Submit</Button>

                                            </View>

                                            <View>
                                                <Button
                                                    mode="contained"
                                                    contentStyle={{ flexDirection: 'row-reverse' }}
                                                    loading={loading}
                                                    buttonColor={theme.colors.buttonColor}
                                                    textColor={theme.colors.primary}
                                                    onPress={handleBackStep}>
                                                    Back</Button>

                                            </View>




                                        </View>

                                    }
                                />


                            </View>
                        )}
                    </View>
                </Modal>


            </ScrollView>
        </SafeAreaView>
    )
}

export default LineUps

const styles = StyleSheet.create({
    date: {
        fontSize: 15,
        fontWeight: 'bold',
        color: theme.colors.white,
    },
    time: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.white,
    },

    round: {
        fontSize: 22,
        color: theme.colors.white,
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
    },
    teamNameDiv: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    teamName: {
        fontSize: 12,
        color: theme.colors.white,
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        marginHorizontal: 5,
    },
    fixtureDate: {
        fontSize: 12,
        color: theme.colors.white,
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
    },
})

{/*  */ }