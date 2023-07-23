import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { generalstyles } from '../../../generalstyles/generalstyles';
import { CLUBS, SEASONS } from '../../../constants/endpoints';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { ActivityIndicator, Button, IconButton } from 'react-native-paper';
import { theme } from '../../../theme/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ClubPage = ({ navigation }: any) => {
    
    const { clubId, seasonId } = useRoute<any>().params
    


    const [clubData, setClubData] = React.useState<any>([]);

    const getClubData = async () => {
      const clubDoc = await firestore().collection(SEASONS).doc(seasonId).collection(CLUBS).doc(clubId).get();
      if (clubDoc.exists) {
        const clubData = clubDoc.data();
        const details = {
          ...clubData,
          clubId: clubDoc.id
        };
        setClubData([details]);
        // Use clubData to display the club information on the page
      } else {
        // Handle the case when the club document does not exist
        Alert.alert('Club does not exist!');
      }
    };
    
    useEffect(() => {
      const unsubscribe = firestore()
      firestore().collection(SEASONS).doc(seasonId).collection(CLUBS).doc(clubId)
        .onSnapshot((doc) => {
          if (doc.exists) {
            const clubData = doc.data();
            const details = {
              ...clubData,
              clubId: doc.id
            };
            setClubData([details]);
            // Use clubData to update the club information on the page
          } else {
            // Handle the case when the club document no longer exists
            Alert.alert('Club no longer exists!');
          }
        });
    


    
    }, [clubId]);




    return (
        <SafeAreaView style={[generalstyles.container]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                style={{
                    paddingBottom: 100
                }}
            >
                {
                    clubData.length > 0 ?
                        <View>
                            <ImageBackground
                                source={{ uri: clubData[0].coverImage }}
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
                                        source={{ uri: clubData[0].logo }}
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
                                                clubId,
                                                clubName:clubData[0].name,
                                                seasonId
                                            })
                                        }
                                        }


                                    >
                                        Edit Club
                                    </Button>

                                    <Button

                                        mode="contained"
                                        contentStyle={{ flexDirection: 'row-reverse' }}

                                        buttonColor={theme.colors.buttonColor}
                                        textColor={theme.colors.primary}
                                        onPress={()=>{
                                            navigation.navigate("CreatePlayerScreen", {
                                                clubId,
                                                clubName:clubData[0].name
                                            })
                                        }}


                                    >
                                        Add Player
                                    </Button>

                                </View>


                            </View>
                            {/* logo */}
                            <TouchableOpacity style={{
                                marginHorizontal:20
                            }}
                             onPress={()=>navigation.navigate("PlayersScreen", {
                                clubId,
                                title:clubData[0].name + " Players",
                                clubName:clubData[0].name,
                                seasonId
                            })}
                            >
                                    <Text style={styles.playerlink}>View Players</Text>
                            </TouchableOpacity>

                            {/* club details */}
                            <View style={{
                                marginTop: 20,
                                marginBottom: 20
                            }}>

                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Name : {clubData[0].name}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Description : {clubData[0].description}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Located : {clubData[0].location}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Created : {clubData[0].founded}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Manager : {clubData[0].manager}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Email : {clubData[0].email}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Contact : {clubData[0].phoneNumber}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Stadium : {clubData[0].stadium}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.text}>Capacity: {clubData[0].capacity}</Text>
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

export default ClubPage

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
    playerlink:{
        color:"#1c478e"
    }

})