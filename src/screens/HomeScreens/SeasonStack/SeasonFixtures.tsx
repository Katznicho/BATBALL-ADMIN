import { StyleSheet, Text, View, SafeAreaView, Pressable, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore, { firebase } from '@react-native-firebase/firestore';
import { CLUBS, SEASONS, SEASON_FIXTURES } from '../../../constants/endpoints';
import { generalstyles } from '../../../generalstyles/generalstyles';
import SearchComponent from '../../../components/SearchComponent';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from '../../../theme/theme';
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';


const SeasonFixtures = ({ navigation }: any) => {

  const { seasonId, seasonName } = useRoute<any>().params

  const [seasonfixtures, setSeasonFixtures] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getSeasonFixtures = async () => {
    try {
      setSeasonFixtures([]);
      setLoading(true);
      const fixtures = await firestore()
        .collection(SEASONS)
        .doc(seasonId)
        .collection(SEASON_FIXTURES)
        .get();

      const updatedFixture: any[] = [];

      fixtures.docs.forEach(async (fixture) => {
        const FixtureData = fixture.data();
        const homeTeamId = fixture.data().homeTeam;
        const awayTeamId = fixture.data().awayTeam;
        const details = {
          ...FixtureData,
          fixtureId: fixture.id,
          homeTeamDetails: (await firestore().collection(CLUBS).doc(homeTeamId).get()).data(),
          awayTeamDetails: (await firestore().collection(CLUBS).doc(awayTeamId).get()).data(),
        };
        setSeasonFixtures((prevState: any) => [...prevState, details]);
        // updatedFixture.push(details);
      });
      setLoading(false);

      return updatedFixture;
    } catch (error) {
      // Handle the error here
    }
  };

  useEffect(() => {
    const fetchSeasonFixtures = async () => {
      try {
        await getSeasonFixtures();

        setLoading(false);
      } catch (error) {
        // Handle the error here
        setLoading(false);
      }
    };

    fetchSeasonFixtures();
  }, []);


  return (
    <SafeAreaView style={[generalstyles.container]}>

      {/* fixtures */}
      {loading ? (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />

        </View>
      ) : seasonfixtures?.length == 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.primary, fontSize: 20, fontWeight: "bold" }}>No Fixtures yet</Text>
        </View>
      )
        : (
          <FlatList
            data={seasonfixtures}
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
                  placeholder="search for a fixture"
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
                      const filteredClubs = seasonfixtures.filter((item: any) =>
                        item.name.toLowerCase().includes(query.toLowerCase()),
                      );
                      setSeasonFixtures(filteredClubs);

                    } else {
                      getSeasonFixtures();
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
                  () => navigation.navigate('FixtureDetailsScreen', {
                    seasonId: seasonId,
                    fixtureId: item.fixtureId,
                  }
                  )
                }
              >
                <View style={[generalstyles.absoluteStyles ,{margin:5}]}>
                  <Text style={styles.fixtureDate}>{item.fixtureDate}</Text>
                </View>

                <View>
                  <View>
                    <Text style={styles.round}>{item?.round}</Text>
                  </View>

                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignItems: 'center',

                  }}>

                    {/* home team */}

                    <View style={[generalstyles.flexStyles]}>
                      <View style={styles.teamNameDiv}>
                        <Text style={styles.teamName}>{item?.homeTeamDetails.name}</Text>
                      </View>
                      <Image
                        source={{
                          uri: item?.homeTeamDetails?.logo
                        }}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 5,
                        }}
                      />


                    </View>

                    {/* home team */}
                    <View >
                      <Text style={styles.date}>{item?.startingTime}</Text>
                    </View>
                    {/* away team */}
                    <View style={[generalstyles.flexStyles]} >

                      <Image
                        source={{
                          uri: item?.awayTeamDetails?.logo
                        }}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 5,
                        }}
                      />
                      <View style={styles.teamNameDiv}>
                        <Text style={styles.teamName}>{item?.awayTeamDetails.name}</Text>
                      </View>

                    </View>
                    {/* away team */}

                  </View>





                </View>





              </Pressable>
            }}

          />
        )
      }
      {/* fixtures */}

    </SafeAreaView>

  )
}

export default SeasonFixtures

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
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 5,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  round: {
    fontSize: 12,
    color: theme.colors.primary,
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
    color: theme.colors.primary,
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    marginHorizontal: 5,
  },
  fixtureDate: {
    fontSize: 12,
    color: theme.colors.primary,
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
})