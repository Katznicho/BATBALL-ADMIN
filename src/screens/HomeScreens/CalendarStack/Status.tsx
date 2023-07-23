import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generalstyles } from '../../../generalstyles/generalstyles';
import { ScrollView } from 'react-native';
import { USER_STATUS } from '../../../constants/endpoints';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from '../../../theme/theme';

const Status = () => {

    const { user } = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState<boolean>(false);

    const [status, setStatus] = useState<any>([]);
    const getLatestStatusesForUsers = async () => {
        try {
             setStatus([]);
            const statuses = await firestore().collection(USER_STATUS).get(); // Assuming you have a "users" collection
            const latestStatuses = [];
            for (const statusDoc of statuses.docs) {

                const statusData = statusDoc.data();
                // const currentTime = firestore.Timestamp.now();
                // const twentyFourHoursAgo = currentTime.toMillis() - 24 * 60 * 60 * 1000;
                // const latestStatusesWithin24Hours = statusData.createdAt.toMillis() >= twentyFourHoursAgo;
                // const sortedLatestStatuses = latestStatusesWithin24Hours;
                //if(statusData.uid == user?.uid){

                setStatus((prev: any) => [...prev, statusData])

                //}
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getLatestStatusesForUsers();

    }, [])

    return (
        <SafeAreaView style={[generalstyles.container]}>
            {loading ? (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />

                </View>
            ) : status?.length == 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: theme.colors.primary, fontSize: 20, fontWeight: "bold" }}>No Gallery Images yet</Text>
                </View>
            ) :
                (<FlatList
                    data={status}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={styles.containerStyles}>
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: "100%",
                                    height: 100,
                                    borderRadius: 10,
                                }}
                            />
                            <View style={[generalstyles.resideViews]}>
                                <Text style={styles.textStyles}>{item.caption}</Text>

                            </View>

                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />)
            }

        </SafeAreaView>
    )
}

export default Status

const styles = StyleSheet.create({
    textStyles: {
        fontSize: 14,
        // fontWeight: 'bold',
        color: 'black',
        width:150,
        
    
    },
    imageStyles: {
        width: 150,
        height: 50
    },
    containerStyles: {

        marginLeft:15,
        marginRight:10,
        marginVertical:10
    }

})