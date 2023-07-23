import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generalstyles } from '../../../generalstyles/generalstyles';
import { ScrollView } from 'react-native';
import { EXCEPTIONAL_PLAYS, USER_POSTS, USER_STATUS, VIDEOS } from '../../../constants/endpoints';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import CardComponent from '../../../components/CardComponent';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from '../../../theme/theme';
import VideoCardComponent from '../../../components/VideoCardComponent';

const Plays = () => {
    const { user } = useSelector((state: RootState) => state.user);
    const [status, setStatus] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const getLatestStatusesForUsers = async () => {
        try {
            const statuses = await firestore().collection(EXCEPTIONAL_PLAYS).get(); // Assuming you have a "users" collection
            const latestStatuses = [];
            for (const statusDoc of statuses.docs) {

                const statusData = statusDoc.data();

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
        // console.log(status)
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
                    <Text style={{ color: theme.colors.primary, fontSize: 20, fontWeight: "bold" }}>No Plays Yet</Text>
                </View>
            ) :
            (<FlatList
                data={status}
                renderItem={({ item }) => (<VideoCardComponent item={item} />)}
                keyExtractor={(item) => item.id}
            />)
            }

        </SafeAreaView>
    )
}

export default Plays

const styles = StyleSheet.create({
    textStyles: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    imageStyles: {
        width: 50,
        height: 50
    },
    containerStyles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
    }

})