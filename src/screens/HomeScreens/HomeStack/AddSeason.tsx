import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { generalstyles } from '../../../generalstyles/generalstyles';
import { Text, Button } from 'react-native-paper';
import { theme } from '../../../theme/theme';
import CalendarComponent from '../../../components/CalendarComponent';
import { isBefore, format, differenceInMonths, set, add } from 'date-fns';
import { MultiSelect } from 'react-native-element-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';
import { CLUBS, SEASONS, SEASON_TABLE } from '../../../constants/endpoints';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';
import Upload from '../../../components/Upload';


interface DayDetails {
    dateString: string
    day: number,
    month: number,
    timestamp: number,
    year: number
}

interface CustomStyles {
    container: {
        backgroundColor: string;
    };
    text: {
        color: string;
    };
}

interface Output {
    [key: string]: {
        customStyles: CustomStyles;
        isBooked: boolean;


    };
}

const AddSeason = ({ navigation }: any) => {


    const [selected, setSelected] = useState<any>([]);
    const [loading, setLoading] = React.useState(false);
    const [adding, setAddding] = useState<boolean>(false);

    const [seasonPic, setSeasonPic] = useState("");
    const [seasonPicImageUploading, setSeasonPicImageUploading] = useState(false)





    const [seasonDetails, setSeasonDetails] = useState({
        name: '',
        startDate: '',
        endDate: '',
        seasonLength: '',
        description: "",
    });

    const [markedDates, setMarkedDates] = useState<Output>({});
    const [markedDatesEnd, setMarkedDatesEnd] = useState<Output>({});

    const setStartDate = (day: DayDetails) => {


        if (!seasonDetails.startDate) {
            setSeasonDetails((prevState) => ({
                ...prevState,
                startDate: day.dateString,
                endDate: '',
            }));
        } else {
            setSeasonDetails((prevState) => ({
                ...prevState,
                endDate: day.dateString,
            }));


        }

        const updatedMarkedDates: Output = {};

        updatedMarkedDates[seasonDetails.startDate] = {
            customStyles: {
                container: {
                    backgroundColor: theme.colors.primary,
                },
                text: {
                    color: 'white',
                },
            },
            isBooked: true,
        };

        //keep the previous marked dates
        setMarkedDates((prevState) => ({
            ...prevState,
            ...updatedMarkedDates,
        }));


    };

    const setEndDate = (day: DayDetails) => {
        setSeasonDetails((prevState) => ({
            ...prevState,
            endDate: day.dateString,
        }));
        //set marked dates
        const updatedMarkedDates: Output = {};

        updatedMarkedDates[seasonDetails.startDate] = {
            customStyles: {
                container: {
                    backgroundColor: theme.colors.primary,
                },
                text: {
                    color: 'white',
                },
            },
            isBooked: true,
        };

        setMarkedDatesEnd((prevState) => ({
            ...prevState,
            ...updatedMarkedDates,
        }));

        const months = differenceInMonths(new Date(day.dateString), new Date(seasonDetails.startDate));

        setSeasonDetails((prevState) => ({
            ...prevState,
            seasonLength: months.toString() + ' months',
        }));



    };



    useEffect(() => {
        if (seasonDetails.startDate) {
            const updatedMarkedDates: Output = {};
            updatedMarkedDates[seasonDetails.startDate] = {
                customStyles: {
                    container: {
                        backgroundColor: theme.colors.primary,
                    },
                    text: {
                        color: 'white',
                    },
                },
                isBooked: true,
            };
            setMarkedDates(updatedMarkedDates);
        }

        if (seasonDetails.endDate) {
            const updatedMarkedDates: Output = {};
            updatedMarkedDates[seasonDetails.endDate] = {
                customStyles: {
                    container: {
                        backgroundColor: theme.colors.primary,
                    },
                    text: {
                        color: 'white',
                    },
                },
                isBooked: true,
            };

            const months = differenceInMonths(new Date(seasonDetails.endDate), new Date(seasonDetails.startDate));
            //   console.log('Months:', months);
            setMarkedDatesEnd(updatedMarkedDates);

        }


    }, [seasonDetails.startDate, seasonDetails.endDate])

    useEffect(() => {
        if (selected.length > 0) {
            setSeasonDetails((prevState) => ({
                ...prevState,
                numOfTeams: selected.length.toString(),
            }));

        }
    }, [selected])



    const onCreateSeason = async () => {
        try {
            setAddding(true);

            // const team_deatils = clubs.filter((club: any) => selected.includes(club.label));

            // //sort the teams by name 
            // team_deatils.sort((a: any, b: any) => {
            //     if (a.value < b.value) {
            //         return -1;
            //     }
            //     if (a.value > b.value) {
            //         return 1;
            //     }
            //     return 0;
            // });

            const seasonRef = await firestore().collection(SEASONS).add({
                name: seasonDetails.name,
                startDate: seasonDetails.startDate,
                endDate: seasonDetails.endDate,
                seasonLength: seasonDetails.seasonLength,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                logo: seasonPic,
                description:seasonDetails.description
            });

            //create ranking table for the season

            // team_deatils.forEach(async (team: any) => {
            //     await firestore().collection(SEASONS).doc(seasonRef.id).collection(SEASON_TABLE).add({
            //         teamId: team.label,
            //         teamName: team.value,
            //         teamLogo: team.logo,
            //         teamCoverImage: team.coverImage,
            //         played: 0,
            //         won: 0,
            //         drawn: 0,
            //         lost: 0,
            //         goalsFor: 0,
            //         goalsAgainst: 0,
            //         goalDifference: 0,
            //         points: 0,
            //         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            //         updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            //     })
            // }
            // );

        }

        catch (error) {
            console.log(error);
        }
        finally {
            setAddding(false);
            showMessage({
                message: 'Tournament Created',
                description: 'Tournament has been created successfully',
                type: "success"
            });
            navigation.navigate("Seasons");

        }
    }









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
                {/* season name */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Tournament Name</Text>
                    <TextInput
                        value={seasonDetails.name}
                        onChangeText={(text) =>
                            setSeasonDetails((prevState) => ({
                                ...prevState,
                                name: text,
                            }))
                        }
                        style={styles.input}
                        placeholder="Enter season name"
                        placeholderTextColor={theme.colors.placeholder}
                    />
                </View>
                {/* season name */}

                {/* season picture */}
                {/* profile picture */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Tournament Picture (Optional)</Text>
                    <Upload
                        setImageURL={setSeasonPic}
                        setImagesUploading={setSeasonPicImageUploading}
                        imageTextOne={"SEASON BANNER"}
                        profileImagesUploading={seasonPicImageUploading}
                    />
                </View>
                {/* profile picture */}
                {/* season picture */}

                {/* season length */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Tournament Length</Text>
                    <TextInput
                        value={seasonDetails.seasonLength}
                        editable={false}
                        style={styles.input}
                        placeholder="calculated automatically after selecting start and end date"
                        placeholderTextColor={theme.colors.placeholder}
                    />
                </View>
                {/* season length */}




                {/* start date */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Tournament Start Date</Text>
                    <CalendarComponent
                        containerStyles={{
                            borderWidth: 1,
                            borderColor: theme.colors.primary,
                            height: 400,
                            // marginHorizontal: 25,
                            marginTop: 10,
                            borderRadius: 10,
                            backgroundColor: theme.colors.darkBlack,
                            color: theme.colors.white,
                            fontWeight: 'bold',
                            elevation: 30,
                        }}
                        disableAllTouchEventsForDays={false}
                        handleDayPress={setStartDate}
                        markedDates={markedDates}

                    />

                </View>
                {/* start date */}

                {/* end date */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Tournament End Date</Text>
                    <CalendarComponent
                        containerStyles={{
                            borderWidth: 1,
                            borderColor: theme.colors.primary,
                            height: 400,
                            // marginHorizontal: 25,
                            marginTop: 10,
                            borderRadius: 10,
                            backgroundColor: theme.colors.darkBlack,
                            color: theme.colors.white,
                            fontWeight: 'bold',
                            elevation: 30,
                        }}
                        disableAllTouchEventsForDays={false}
                        handleDayPress={setEndDate}
                        markedDates={markedDatesEnd}

                    />

                </View>
                {/* end date */}

                {/* description */}
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Description (Optional)</Text>
                    <TextInput
                        value={seasonDetails.description}
                        onChangeText={(text) =>
                            setSeasonDetails((prevState) => ({
                                ...prevState,
                                description: text,
                            }))
                        }
                        style={styles.input}
                        placeholder="Enter season description"
                        placeholderTextColor={theme.colors.placeholder}
                        numberOfLines={3}
                    />
                </View>
                {/* description */}

                {/* add season */}
                <View
                    style={{
                        backgroundColor: theme.colors.white,
                        borderRadius: 20,
                        marginBottom: 50,
                        marginHorizontal: 10,
                    }}
                >
                    <Button
                        icon={{ source: 'play', direction: 'ltr' }}
                        mode="contained"
                        contentStyle={{ flexDirection: 'row-reverse' }}
                        loading={adding}
                        disabled={adding}
                        buttonColor={theme.colors.buttonColor}
                        textColor={theme.colors.primary}
                        onPress={onCreateSeason}
                    >
                        Add Tournament
                    </Button>
                </View>
                {/* add season */}

            </ScrollView>
        </SafeAreaView>



    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        padding: 5,
    },
    errorContainer: {
        marginHorizontal: 10,
        marginTop: -18
    },

    infoRow: { marginBottom: 20, padding: 10 },

    title: { fontWeight: 'bold', color: '#000' },

    input: {
        borderBottomColor: '#000',
        borderBottomWidth: 0.5,
        padding: 0,
        color: "#000"
    },

    login: {
        backgroundColor: '#1c478e',
        color: '#fff',
        padding: 12,
        textAlign: 'center',
        borderRadius: 15,
        marginTop: 20,
    },

    errorColor: { color: '#EF4444', marginTop: 5 },
    dropdown: {
        height: 50,
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        color: 'black',
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
    },
});

export default AddSeason;
