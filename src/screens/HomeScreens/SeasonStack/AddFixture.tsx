import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { generalstyles } from '../../../generalstyles/generalstyles';
import { Dropdown } from 'react-native-element-dropdown';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { CLUBS, SEASONS, SEASON_FIXTURES, SEASON_TABLE } from '../../../constants/endpoints';
import { useRoute } from '@react-navigation/native';
import CalendarComponent from '../../../components/CalendarComponent';
import { theme } from '../../../theme/theme';
import { set } from 'date-fns';
import Entypo from 'react-native-vector-icons/Entypo';
import { Button } from 'react-native-paper';
import add from '../../../../node_modules/date-fns/add/index.d';
import { showMessage } from 'react-native-flash-message';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

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

const AddFixture = ({ navigation }: any) => {

  const { seasonId, seasonName } = useRoute<any>().params

  const [rounds, setRounds] = useState<any>([]);
  const [round, setRound] = useState<any>("");


  const generateRound = (numOfTeams: number) => {
    let rounds = numOfTeams - 1;
    let totalRounds = rounds * 2;
    let roundsArray = [];
    for (let i = 0; i < totalRounds; i++) {
      let round = i + 1;
      const details = {
        label: `Round ${round}`,
        value: `Round ${round}`
      }
      roundsArray.push(details)
    }
    setRounds(roundsArray)
    return roundsArray
  }



  const [adding, setAdding] = useState<boolean>(false)

  const [matchTimes, setMatchTimes] = useState(
    [
      { label: "07:00 AM", value: "07:00 AM" },
      { label: "07:30 AM", value: "07:30 AM" },
      { label: "08:00 AM", value: "08:00 AM" },
      { label: "08:30 AM", value: "08:30 AM" },
      { label: "09:00 AM", value: "09:00 AM" },
      { label: "09:30 AM", value: "09:30 AM" },
      { label: "10:00 AM", value: "10:00 AM" },
      { label: "10:30 AM", value: "10:30 AM" },
      { label: "11:00 AM", value: "11:00 AM" },
      { label: "11:30 AM", value: "11:30 AM" },
      { label: "12:00 PM", value: "12:00 PM" },
      { label: "12:30 PM", value: "12:30 PM" },
      { label: "01:00 PM", value: "01:00 PM" },
      { label: "01:30 PM", value: "01:30 PM" },
      { label: "02:00 PM", value: "02:00 PM" },
      { label: "02:30 PM", value: "02:30 PM" },
      { label: "03:00 PM", value: "03:00 PM" },
      { label: "03:30 PM", value: "03:30 PM" },
      { label: "04:00 PM", value: "04:00 PM" },
      { label: "04:30 PM", value: "04:30 PM" },
      { label: "05:00 PM", value: "05:00 PM" },
      { label: "05:30 PM", value: "05:30 PM" },
      { label: "06:00 PM", value: "06:00 PM" },
      { label: "06:30 PM", value: "06:30 PM" },
      { label: "07:00 PM", value: "07:00 PM" },
      { label: "07:30 PM", value: "07:30 PM" },
      { label: "08:00 PM", value: "08:00 PM" },
      { label: "08:30 PM", value: "08:30 PM" },
      { label: "09:00 PM", value: "09:00 PM" },
      { label: "09:30 PM", value: "09:30 PM" },
      { label: "10:00 PM", value: "10:00 PM" },
    ]
  )



  const [seasonTeams, setSeasonTeams] = useState<any>([])
  const [markedDates, setMarkedDates] = useState<Output>({});
  const [selectedHome, setSelectedHome] = useState<any>("");
  const [selectedAway, setSelectedAway] = useState<any>("");
  const [selected, setSelected] = useState<any>("");


  const getClubs = async () => {
    try {
      //setLoading(true);
      setSeasonTeams([]);
      const allteams = await firestore().collection(SEASONS).doc(seasonId).collection(CLUBS).get();
      const updatedTeams: any[] = [];
      allteams.forEach((team) => {
        const teamData = team.data();
        const team_id = team.id;
        teamData.id = team.id;
        const details = {
          value: teamData.name,
          label: team_id
        };


        updatedTeams.push(details);
      });
      setSeasonTeams(updatedTeams);
      
    } catch (error) {
    }
  };






  useEffect(() => {
    getClubs()    
    // if(seasonTeams.length > 0){
    //   generateRound(seasonTeams.length)
    // }
    generateRound(20);
  }, [])

  const [fixtureDetails, setFixtureDetails] = useState({
    homeTeam: '',
    awayTeam: '',
    fixtureBanner: '',
    startingTime: '',
    fixtureDate: '',
    description: "",
    round:""
  });


  const setStartDate = (day: DayDetails) => {

    setFixtureDetails((prevState) => ({
      ...prevState,
      fixtureDate: day.dateString,
    }));

    const updatedMarkedDates: Output = {};

    updatedMarkedDates[fixtureDetails.fixtureDate] = {
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

  useEffect(() => {
    //update the marked dates
    if (fixtureDetails.fixtureDate) {
      const updatedMarkedDates: Output = {};
      updatedMarkedDates[fixtureDetails.fixtureDate] = {
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


    }




  }, [fixtureDetails.fixtureDate])



  const onAddFixture = async () => {

    try {
      setAdding(true);
      await firestore().collection(SEASONS).doc(seasonId).collection(SEASON_FIXTURES).add({
        ...fixtureDetails,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        isPostponed: false,
        isCompleted: false,
        isCancelled: false,
        isLive: false,
        isPending: true,
        seasonId: seasonId,
        seasonName: seasonName,
        
      });

      showMessage({
        message: 'Fixture Added Successfully',
        description: 'Fixture has been added successfully',
        type: 'success',
      });


      setAdding(false);

      navigation.goBack()


    } catch (error) {

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

        {/* select round */}
        <View style={styles.infoRow}>
          <Text style={styles.title}>Select Round</Text>
          <Dropdown

            style={styles.dropdown}
            placeholderStyle={[
              styles.placeholderStyle,
              {
                color: "#000000",
              },
            ]}
            selectedTextStyle={[
              styles.selectedTextStyle,
              {
                color: theme.colors.primary,
              },
            ]}
            inputSearchStyle={[
              styles.inputSearchStyle,
              {
                color: theme.colors.primary,
              },
            ]}
            iconStyle={[styles.iconStyle]}

            search
            data={rounds}
            itemTextStyle={[
              {
                color: "#000000",
              },
            ]}
            placeholder="Select round"
            searchPlaceholder="Search..."
            value={round}
            onChange={(item: any) => {
              
              setFixtureDetails((prevState: any) => ({
                ...prevState,
                round: item?.label,
              }));



            }}
            renderLeftIcon={() => (
              <Entypo
                style={styles.icon}
                color={theme.colors.primary}
                name="sports-club"
                size={20} />
            )}
            // selectedTextStyle={styles.selectedStyle}
            labelField={'value'}
            valueField={'label'}
          />
        </View>
        {/* select round */}

        {/*  home team*/}

        <View style={styles.infoRow}>
          <Text style={styles.title}>Select Home Team</Text>
          <Dropdown

            style={styles.dropdown}
            placeholderStyle={[
              styles.placeholderStyle,
              {
                color: "#000000",
              },
            ]}
            selectedTextStyle={[
              styles.selectedTextStyle,
              {
                color: theme.colors.primary,
              },
            ]}
            inputSearchStyle={[
              styles.inputSearchStyle,
              {
                color: theme.colors.primary,
              },
            ]}
            iconStyle={[styles.iconStyle]}

            search
            data={seasonTeams}
            itemTextStyle={[
              {
                color: "#000000",
              },
            ]}
            placeholder="Select home teams"
            searchPlaceholder="Search..."
            value={selectedHome}
            onChange={(item: any) => {
              setSelected(item);
              setFixtureDetails((prevState: any) => ({
                ...prevState,
                homeTeam: item?.label,
              }));



            }}
            renderLeftIcon={() => (
              <Entypo
                style={styles.icon}
                color={theme.colors.primary}
                name="sports-club"
                size={20} />
            )}
            // selectedTextStyle={styles.selectedStyle}
            labelField={'value'}
            valueField={'label'}
          />
        </View>
        {/* home team */}



        {/* away team */}
        <View style={styles.infoRow}>
          <Text style={styles.title}>Select Away Team</Text>
          <Dropdown

            style={styles.dropdown}
            placeholderStyle={[
              styles.placeholderStyle,
              {
                color: "#000000",
              },
            ]}
            selectedTextStyle={[
              styles.selectedTextStyle,
              {
                color: theme.colors.primary,
              },
            ]}
            inputSearchStyle={[
              styles.inputSearchStyle,
              {
                color: theme.colors.primary,
              },
            ]}
            iconStyle={[styles.iconStyle]}

            search
            data={seasonTeams}
            itemTextStyle={[
              {
                color: "#000000",
              },
            ]}
            placeholder="Select away team"
            searchPlaceholder="Search..."
            value={selectedAway}
            onChange={(item: any) => {
              setSelected(item);
              setFixtureDetails((prevState: any) => ({
                ...prevState,
                awayTeam: item?.label,
              }));



            }}
            renderLeftIcon={() => (
              <Entypo
                style={styles.icon}
                color={theme.colors.primary}
                name="sports-club"
                size={20} />
            )}
            // selectedStyle={styles.selectedStyle}
            labelField={'value'}
            valueField={'label'}
          />
        </View>
        {/* away team */}

        {/* fixture time */}
        <View style={styles.infoRow}>
          <Text style={styles.title}>Select Fixture Time</Text>
          <Dropdown

            style={styles.dropdown}
            placeholderStyle={[
              styles.placeholderStyle,
              {
                color: "#000000",
              },
            ]}
            selectedTextStyle={[
              styles.selectedTextStyle,
              {
                color: theme.colors.primary,
              },
            ]}
            inputSearchStyle={[
              styles.inputSearchStyle,
              {
                color: theme.colors.primary,
              },
            ]}
            iconStyle={[styles.iconStyle]}

            search
            data={matchTimes}
            itemTextStyle={[
              {
                color: "#000000",
              },
            ]}
            placeholder="Select fixture time"
            searchPlaceholder="Search..."
            value={selected}
            onChange={(item: any) => {
              setSelected(item);
              setFixtureDetails((prevState: any) => ({
                ...prevState,
                startingTime: item?.label,
              }));



            }}
            renderLeftIcon={() => (
              <Entypo
                style={styles.icon}
                color={theme.colors.primary}
                name="sports-club"
                size={20} />
            )}
            // selectedStyle={styles.selectedStyle}
            labelField={'value'}
            valueField={'label'}
          />
        </View>
        {/* fixture time */}

        {/* fixture  date*/}
        <View style={styles.infoRow}>
          <Text style={styles.title}>Fixture Date</Text>
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
        {/* fixture  date*/}

        {/* description */}
        <View style={styles.infoRow}>
          <Text style={styles.title}>Description (Optional)</Text>
          <TextInput
            value={fixtureDetails.description}
            onChangeText={(text) =>
              setFixtureDetails((prevState) => ({
                ...prevState,
                description: text,
              }))
            }
            style={styles.input}
            placeholder="Enter fixture description"
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
            onPress={onAddFixture}
          >
            Add Fixture
          </Button>
        </View>
        {/* add season */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddFixture

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
})