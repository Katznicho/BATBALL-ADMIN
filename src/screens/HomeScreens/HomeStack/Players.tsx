import { StyleSheet, Text, View, SafeAreaView, FlatList, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { generalstyles } from '../../../generalstyles/generalstyles'
import firestore from '@react-native-firebase/firestore';
import {  CLUB_PLAYERS, PLAYERS } from '../../../constants/endpoints';
import { theme } from '../../../theme/theme';
import { ActivityIndicator } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import SearchComponent from '../../../components/SearchComponent';

const Players= ({ navigation }: any) => {
    const [clubs, setClubs] = React.useState<any>([])
    const [loading, setLoading] = React.useState(false)
    
    const { clubId,clubName } = useRoute<any>().params;


    const getPlayers = async () => {
        try {
            setLoading(true)
            setClubs([])
            const clubs = await firestore().collection(CLUB_PLAYERS).doc(clubId).collection(PLAYERS).get();
            for (const club of clubs.docs) {
                const clubData = club.data();
                
                const details = {
                    ...clubData,
                    playerId: club.id,
                    clubName:clubName,
                    
                }
                setClubs((prev: any) => [...prev, details])
            }
            setLoading(false)
        }
        catch (error) {
        
        }
    }
    // useEffect(() => {
    //     getPlayers();
    // }, [])

    useEffect(() => {
        getPlayers();
    }, [clubId])

    const [searchQuery, setSearchQuery] = useState('');



    return (
        <SafeAreaView style={[generalstyles.container]}>
            {/* clubs */}
            {loading ? (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />

                </View>
            ) : clubs?.length == 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{color:theme.colors.primary , fontSize:20 , fontWeight:"bold"}}>No Players Yet</Text>
                </View>
            ) 
            : (
                <FlatList
                    data={clubs}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => String(item.id)}
                    contentContainerStyle={{
                        paddingHorizontal: 10
                        , marginBottom: 15,
                        marginTop: -2,
                        paddingBottom: 100
                    }}
                    ListHeaderComponent={
                        <View style={[generalstyles.centerContent]}>
                        <SearchComponent
                          placeholder="search for  a club player"
                          value={searchQuery}
                          searchStyles={{
                            elevation: 4,
                            borderRadius: 25,
                            marginTop: 5,
                            marginBottom: 10,
                            marginRight: 5,
                             height: 45,
                            backgroundColor: theme.colors.white,
                            color: `${theme.colors.white}`,
                            width: theme.dimensions.width / 1.2,
                          }}
                          onSearchChange={(query: any) => {
                            if (query.length > 0) {
                              const filteredClubs = clubs.filter((item: any) =>
                                item.name.toLowerCase().includes(query.toLowerCase()),
                              );
                               setClubs(filteredClubs);

                            } else {
                                getPlayers();
                            }
                            setSearchQuery(query);
                        
                          }}
                        />
                      </View>
                         
                    }
                    renderItem={({ item, index }) => {
                        return <Pressable
                            style={styles.container}
                            key={index}
                            onPress={
                                () => navigation.navigate('PlayerDetails', {
                                    clubId,
                                    playerId:item.playerId
                                }
                                )
                            }

                        >

                            <View >
                                {/* icon */}
                                <Image
                                    source={{
                                        uri: item?.profile_pic
                                    }}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 50,
                                    }}
                                />

                            </View>
                            <View style={{
                                flexDirection: 'column',
                                flex: 1,
                                marginHorizontal: 10,
                                marginTop: 10
                            }}>
                                {/* team name */}
                                <Text style={styles.date}>{item.name}</Text>
                                <Text style={styles.status}>{item.clubName}</Text>
                                <Text style={styles.mode}>{item.weight}</Text>
                                <Text style={styles.mode}>{item.height}</Text>

                                {/* team name */}

                            </View>
                            <View style={{
                                flexDirection: 'column',
                            }}>
                                {/* amount details */}
                                <View>
                                    <Text style={styles.amount}>{
                                        item.position

                                    }</Text>


                                </View>
                                {/* amoun details */}
                            </View>
                            <Pressable>
                                {/* add chevron icon */}
                                <Ionicons name="chevron-forward"
                                    size={24} color={theme.colors.primary} />
                                {/* icon */}

                            </Pressable>
                        </Pressable>
                    }}




                />
            )
            }
            {/* clubs */}
        </SafeAreaView>
    )
}

export default Players

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
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
})