import { StyleSheet, Text, View, SafeAreaView,  FlatList, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { generalstyles } from '../../../generalstyles/generalstyles'
import firestore, { firebase } from '@react-native-firebase/firestore';
import { CLUBS, SEASONS } from '../../../constants/endpoints';
import { theme } from '../../../theme/theme';
import { ActivityIndicator } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchComponent from '../../../components/SearchComponent';

const Seasons = ({ navigation }: any) => {
    const [seasons, setSeasons] = React.useState<any[]>([]);
const [loading, setLoading] = React.useState(false);

const getSeasons = async () => {
  try {
    setLoading(true);
    setSeasons([]);
    const unsubscribe = firestore().collection(SEASONS).onSnapshot((snapshot) => {
      const updatedSeasons: any[] = [];
      snapshot.forEach((season) => {
        const seasonData = season.data();
        seasonData.id = season.id;
    
        const details = {
            ...seasonData,
          seasonId: season.id,
        };
        updatedSeasons.push(details);
      });

        setSeasons(updatedSeasons);
      setLoading(false);
    });
    
    // Return a cleanup function to unsubscribe from the snapshot listener when the component unmounts
    return () => {
      unsubscribe();
    };
  } catch (error) {
  }
};

useEffect(() => {
  getSeasons();
}, []);


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
            ) : Seasons?.length == 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{color:theme.colors.primary , fontSize:20 , fontWeight:"bold"}}>No seasons yet</Text>
                </View>
            ) 
            : (
                <FlatList
                    data={seasons}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => String(item.id)}
                    contentContainerStyle={{
                        // paddingHorizontal: 10
                        // , marginBottom: 15,
                        // marginTop: -2,
                        // paddingBottom: 100
                    }}
                    ListHeaderComponent={
                        <View style={[generalstyles.centerContent]}>
                        <SearchComponent
                          placeholder="search for a tournament"
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
                              const filteredClubs = seasons.filter((item: any) =>
                                item.name.toLowerCase().includes(query.toLowerCase()),
                              );
                               setSeasons(filteredClubs);

                            } else {
                                getSeasons();
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
                                () => navigation.navigate('SeasonDetailsScreen', {
                                    seasonId: item.seasonId,
                                }
                                )
                            }

                        >

                            <View >
                                {/* icon */}
                                <Image
                                    source={{
                                        uri: item?.logo
                                    }}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 10,
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
                                <Text style={styles.status}>{item.startDate} - {item.endDate}</Text>
                                <Text style={styles.date}>{item.seasonLength}</Text>
                               

                                {/* team name */}

                            </View>
                            <View style={{
                                flexDirection: 'column',
                            }}>
                                {/* amount details */}
                                <View>
                                    <Text style={styles.amount}>{
                                        item.numOfTeams

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

export default Seasons

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
        marginVertical: 2,
    },
    status: {
        fontSize: 12,
        color: 'gray',
        marginVertical: 2,
    },
    mode: {
        fontSize: 12,
        color: 'gray',
    },
})