import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LineUps from './LineUps';
import { theme } from '../../../../theme/theme';
import Latest from './Latest';
import Stats from './Stats';
import { useRoute } from '@react-navigation/native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { CLUBS, SEASONS, SEASON_FIXTURES } from '../../../../constants/endpoints';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { formatDate } from '../../../../utils/Helpers';
import FixtureTabs from './FixtureTabs';

const Stack = createNativeStackNavigator();

const FixtureStack = ({navigation}:any) => {
    const { seasonId, fixtureId } = useRoute<any>().params
    const [fixtureDetails, setFixtureDetails] = useState<any>([]);
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
            };

            setFixtureDetails([details]);
            return details;
        } catch (error) {
            // Handle the error here
        }
    };

    useEffect(() => {
        getFixtureDetails();
    }, []);
    return (
        <Stack.Navigator
            initialRouteName="FixtureTab">
            <Stack.Screen
                name="FixtureTab"
                component={FixtureTabs}
                options={({ route }:any) => ({
                    header: () => {
                        return (
                            <View>
                                {fixtureDetails.length > 0 ?

                                    <View>
                                        <View

                                            style={{
                                                width: '100%',
                                                height: 200,
                                                backgroundColor: theme.colors.primary
                                            }}


                                        >
                                            <View>
                                                <IconButton
                                                    icon="chevron-left"
                                                    iconColor={theme.colors.primary}
                                                    size={28}
                                                    onPress={() => navigation.goBack()}
                                                    containerColor={theme.colors.arraowBackGroundColor} />
                                            </View>

                                            {/* details area */}
                                            <View style={{ marginHorizontal: 20 }}>
                                                <View>
                                                    <Text style={styles.round}>{fixtureDetails[0]?.round}</Text>
                                                </View>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignContent: 'center',
                                                    alignItems: 'center',
                                                }}>

                                                    {/* home team */}

                                                    <View style={[{ marginHorizontal: 10 }]}>

                                                        <Image
                                                            source={{
                                                                uri: fixtureDetails[0]?.homeTeamDetails?.logo
                                                            }}
                                                            style={{
                                                                width: 60,
                                                                height: 60,
                                                                borderRadius: 50,
                                                                borderColor: theme.colors.white,
                                                                borderWidth: 1,
                                                            }} />
                                                        <View style={styles.teamNameDiv}>
                                                            <Text style={styles.teamName}>{fixtureDetails[0]?.homeTeamDetails.name}</Text>
                                                        </View>


                                                    </View>

                                                    {/* home team */}
                                                    <View>
                                                        <Text style={styles.time}>{fixtureDetails[0]?.startingTime}</Text>
                                                        <Text style={styles.date}>{formatDate(fixtureDetails[0]?.fixtureDate)}</Text>
                                                    </View>
                                                    {/* away team */}
                                                    <View>

                                                        <Image
                                                            source={{
                                                                uri: fixtureDetails[0]?.awayTeamDetails?.logo
                                                            }}
                                                            style={{
                                                                width: 60,
                                                                height: 60,
                                                                borderRadius: 50,
                                                                borderColor: theme.colors.white,
                                                                borderWidth: 1,
                                                            }} />
                                                        <View style={styles.teamNameDiv}>
                                                            <Text style={styles.teamName}>{fixtureDetails[0]?.awayTeamDetails.name}</Text>
                                                        </View>

                                                    </View>
                                                    {/* away team */}

                                                </View>
                                            </View>
                                            {/* details area */}
                                        </View>
                                        {/* logo */}


                                    </View>

                                    :
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <ActivityIndicator size="large" color={theme.colors.primary} />

                                    </View>}
                            </View>
                        );
                    },
                })}
                initialParams={{ seasonId, fixtureId }}
            />
            
        </Stack.Navigator>
    );
};

export default FixtureStack;


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
