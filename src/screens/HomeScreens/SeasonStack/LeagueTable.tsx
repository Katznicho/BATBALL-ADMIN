import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { generalstyles } from '../../../generalstyles/generalstyles'
import { useRoute } from '@react-navigation/native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { SEASONS, SEASON_TABLE } from '../../../constants/endpoints';
import { DataTable } from 'react-native-paper';



const LeagueTable = ({ navigation }: any) => {

    const { seasonId, seasonName } = useRoute<any>().params

    const [seasonTable, setSeasonTable] = useState<any>([])

    const getSeasonTable = async () => {
        try {
            const seasonTableSnapshot = await firestore()
                .collection(SEASONS)
                .doc(seasonId)
                .collection(SEASON_TABLE)
                .get();

            const seasonTableData = seasonTableSnapshot.docs.map((doc) => doc.data());
            setSeasonTable(seasonTableData);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSeasonTable()
    }, [])


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
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title textStyle={{marginLeft:-15}}>
                            POS
                        </DataTable.Title>
                        <DataTable.Title textStyle={{marginLeft:-15}}>
                            Team
                        </DataTable.Title>
                        <DataTable.Title numeric>PL</DataTable.Title>
                        <DataTable.Title numeric>W</DataTable.Title>
                        <DataTable.Title numeric>D</DataTable.Title>
                        <DataTable.Title numeric>L</DataTable.Title>
                        <DataTable.Title numeric>+/-</DataTable.Title>
                        <DataTable.Title numeric>GD</DataTable.Title>
                        <DataTable.Title numeric>PTS</DataTable.Title>
                    </DataTable.Header>
                    {/*rows  */}
                    {
                        seasonTable.map((team: any, index: number) => (
                            <DataTable.Row key={team.teamId}>
                                <DataTable.Cell style={styles.teamPos}>{index + 1}</DataTable.Cell>
                                <DataTable.Cell textStyle={styles.teamName}>
                                    
                                    {team.teamName}
                                </DataTable.Cell>
                                <DataTable.Cell numeric>{team.played}</DataTable.Cell>
                                <DataTable.Cell numeric>{team.won}</DataTable.Cell>
                                <DataTable.Cell numeric>{team.drawn}</DataTable.Cell>
                                <DataTable.Cell numeric>{team.lost}</DataTable.Cell>
                                <DataTable.Cell numeric>{team.goalsFor}/{team.goalsAgainst}</DataTable.Cell>
                                <DataTable.Cell numeric>{team.goalsFor - team.goalsAgainst}</DataTable.Cell>
                                <DataTable.Cell numeric>{team.points}</DataTable.Cell>
                            </DataTable.Row>
                        ))

                    }
                    {/* rows */}
                </DataTable>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LeagueTable

const styles = StyleSheet.create({
    teamRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    teamName: {
        width: 80,
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: -10,
    },
    teamPos:{
        marginLeft: -15,
    }

});