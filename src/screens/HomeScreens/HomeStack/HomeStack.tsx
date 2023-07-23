import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TopBar from '../../../components/AppBars/TopBar';
import { theme } from '../../../theme/theme';
import HomeScreen from '../HomeScreen';
import CreateStatus from './CreateStatus';
import CreatePost from './CreatePost';
import CreateClub from './CreateClub';
import ClubPage from './ClubPage';
import Clubs from '../ClubStack/Clubs';
import CreatePlayer from './CreatePlayer';
import Players from './Players';
import PlayerDetails from './PlayerDetails';
import EditClub from './EditClub';
import EditPlayer from './EditPlayer';
import AddSeason from './AddSeason';
import UploadVideoScreen from './UploadVideoScreen';
import ExceptionalPlays from './ExceptionalPlays';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: props => (
            <TopBar
              showSearch
              {...props}
              title={"BATBALL ADMIN"}

              titleStyle={{
                color: `${theme.colors.textColor}`,
                fontSize: 18,
                // width: 44,
                // textShadowColor: "rgba(0, 0, 0, 0.5)",
                // textShadowOffset: {
                //   width: 0,
                //   height: 4,
                // },
                // textShadowRadius: 4,
                // textAlign: "left",
                // fontFamily: "LeagueGothic-Regular",

              }}
              subtitleStyle={{
                alignSelf: 'center',
                color: `${theme.colors.textColor}`,
                marginBottom: 5,
              }}
            />
          ),
        }}

      />
      {/* status */}
      <Stack.Screen
        name="StatusScreen"
        component={CreateStatus}
        options={{
          header: props => (
            <TopBar
              showSearch
              {...props}
              title={"Add Gallery"}
              previous={true}
              titleStyle={{
                color: `${theme.colors.textColor}`,
                fontSize: 18,
                // width: 44,
                // textShadowColor: "rgba(0, 0, 0, 0.5)",
                // textShadowOffset: {
                //   width: 0,
                //   height: 4,
                // },
                // textShadowRadius: 4,
                // textAlign: "left",
                // fontFamily: "LeagueGothic-Regular",

              }}

            />
          ),
        }}

      />
       <Stack.Screen
        name="VideoScreen"
        component={UploadVideoScreen}
        options={{
          header: props => (
            <TopBar
              showSearch
              {...props}
              title={"Add Video"}
              previous={true}
              titleStyle={{
                color: `${theme.colors.textColor}`,
                fontSize: 18,
                // width: 44,
                // textShadowColor: "rgba(0, 0, 0, 0.5)",
                // textShadowOffset: {
                //   width: 0,
                //   height: 4,
                // },
                // textShadowRadius: 4,
                // textAlign: "left",
                // fontFamily: "LeagueGothic-Regular",

              }}

            />
          ),
        }}
      />
       <Stack.Screen
        name="ExceptionalScreen"
        component={ExceptionalPlays}
        options={{
          header: props => (
            <TopBar
              showSearch
              {...props}
              title={"Add Exceptional Plays"}
              previous={true}
              titleStyle={{
                color: `${theme.colors.textColor}`,
                fontSize: 18,
                // width: 44,
                // textShadowColor: "rgba(0, 0, 0, 0.5)",
                // textShadowOffset: {
                //   width: 0,
                //   height: 4,
                // },
                // textShadowRadius: 4,
                // textAlign: "left",
                // fontFamily: "LeagueGothic-Regular",

              }}

            />
          ),
        }}
      />
      {/* status */}
      {/* post */}
      <Stack.Screen
        name="PostScreen"
        component={CreatePost}
        options={{
          header: props => (
            <TopBar
              showSearch
              {...props}
              title={"Add Articles"}
              previous={true}

              titleStyle={{
                color: `${theme.colors.textColor}`,
                // fontSize: 18,
                // width: 44,
                // textShadowColor: "rgba(0, 0, 0, 0.5)",
                // textShadowOffset: {
                //   width: 0,
                //   height: 4,
                // },
                textShadowRadius: 4,
                textAlign: "left",
                // fontFamily: "LeagueGothic-Regular",

              }}
              subtitleStyle={{
                alignSelf: 'center',
                color: `${theme.colors.textColor}`,
                marginBottom: 5,
              }}
            />
          ),
        }}

      />
      {/* post */}

      {/* create a club */}

      <Stack.Screen
        name="ClubScreen"
        component={CreateClub}
        options={{
          header: props => (
            <TopBar
              showSearch
              {...props}
              title={"Add Club"}
              previous={true}

              titleStyle={{
                color: `${theme.colors.textColor}`,
                // fontSize: 18,
                // width: 44,
                // textShadowColor: "rgba(0, 0, 0, 0.5)",
                // textShadowOffset: {
                //   width: 0,
                //   height: 4,
                // },
                textShadowRadius: 4,
                textAlign: "left",
                // fontFamily: "LeagueGothic-Regular",

              }}
              subtitleStyle={{
                alignSelf: 'center',
                color: `${theme.colors.textColor}`,
                marginBottom: 5,
              }}
            />
          ),
        }}

      />

      <Stack.Screen
        name="EditClubScreen"
        component={EditClub}
        options={{
          header: props => (
            <TopBar
              showSearch
              {...props}
              title={"Edit Club"}
              previous={true}

              titleStyle={{
                color: `${theme.colors.textColor}`,
                // fontSize: 18,
                // width: 44,
                // textShadowColor: "rgba(0, 0, 0, 0.5)",
                // textShadowOffset: {
                //   width: 0,
                //   height: 4,
                // },
                textShadowRadius: 4,
                textAlign: "left",
                // fontFamily: "LeagueGothic-Regular",

              }}
              subtitleStyle={{
                alignSelf: 'center',
                color: `${theme.colors.textColor}`,
                marginBottom: 5,
              }}
            />
          ),
        }}

      />

      {/* create a club */}

      {/* edit player */}
      <Stack.Screen
        name="EditPlayerScreen"
        component={EditPlayer}
        options={{
          header: props => (
            <TopBar
              showSearch
              {...props}
              title={"Edit Player"}
              previous={true}

              titleStyle={{
                color: `${theme.colors.textColor}`,
                // fontSize: 18,
                // width: 44,
                // textShadowColor: "rgba(0, 0, 0, 0.5)",
                // textShadowOffset: {
                //   width: 0,
                //   height: 4,
                // },
                textShadowRadius: 4,
                textAlign: "left",
                // fontFamily: "LeagueGothic-Regular",

              }}
              subtitleStyle={{
                alignSelf: 'center',
                color: `${theme.colors.textColor}`,
                marginBottom: 5,
              }}
            />
          ),
        }}

      />
      {/* edit player */}

      {/* player screen */}
      <Stack.Screen
        name="PlayerScreen"
        component={Clubs}
        options={{
          header: props => (
            <TopBar
              showSearch
              {...props}
              title={"Choose Club"}
              previous={true}

              titleStyle={{
                color: `${theme.colors.textColor}`,
                // fontSize: 18,
                // width: 44,
                // textShadowColor: "rgba(0, 0, 0, 0.5)",
                // textShadowOffset: {
                //   width: 0,
                //   height: 4,
                // },
                textShadowRadius: 4,
                textAlign: "left",
                // fontFamily: "LeagueGothic-Regular",

              }}
              subtitleStyle={{
                alignSelf: 'center',
                color: `${theme.colors.textColor}`,
                marginBottom: 5,
              }}
            />
          ),
        }}

      />

      {/* create a player */}
      <Stack.Screen
        name="CreatePlayerScreen"
        component={CreatePlayer}
        options={{
          header: props => (
            <TopBar
              showSearch
              {...props}
              title={"Create  Player"}
              previous={true}
              titleStyle={{
                color: `${theme.colors.textColor}`,
                // fontSize: 18,
                // width: 44,
                // textShadowColor: "rgba(0, 0, 0, 0.5)",
                // textShadowOffset: {
                //   width: 0,
                //   height: 4,
                // },
                textShadowRadius: 4,
                textAlign: "left",
                // fontFamily: "LeagueGothic-Regular",

              }}
              subtitleStyle={{
                alignSelf: 'center',
                color: `${theme.colors.textColor}`,
                marginBottom: 5,
              }}
            />
          ),
        }}

      />
      {/* create a player */}


      {/* player screen */}

      {/* club page */}
      <Stack.Screen
        name="ClubDetailScreen"

        component={ClubPage}
        options={{
          headerShown: false,
        }}

      />
      {/* club page */}

      {/* players */}
      <Stack.Screen
        name="AllPlayerScreen"
        component={Players}
        options={{
          header: (props: any) => (
            <TopBar
              showSearch
              {...props}
              title={props.route.params.title}
              previous={true}
              titleStyle={{
                color: `${theme.colors.textColor}`,
                // fontSize: 18,
                // width: 44,
                // textShadowColor: "rgba(0, 0, 0, 0.5)",
                // textShadowOffset: {
                //   width: 0,
                //   height: 4,
                // },
                textShadowRadius: 4,
                textAlign: "left",
                // fontFamily: "LeagueGothic-Regular",

              }}
              subtitleStyle={{
                alignSelf: 'center',
                color: `${theme.colors.textColor}`,
                marginBottom: 5,
              }}
            />
          ),
        }}
      />
      {/* players */}

      {/* player details */}
      <Stack.Screen
        name="PlayerDetails"
        component={PlayerDetails}
        options={{
          headerShown: false,
        }}

      />
      {/* player details */}

      {/* add season */}
      <Stack.Screen
        name="AddSeasonScreen"
        component={AddSeason}
        options={{
          header: (props: any) => (
            <TopBar
              showSearch
              {...props}
              title={`Add New Tournament`}
              previous={true}
              titleStyle={{
                color: `${theme.colors.textColor}`,
                // fontSize: 18,
                // width: 44,
                // textShadowColor: "rgba(0, 0, 0, 0.5)",
                // textShadowOffset: {
                //   width: 0,
                //   height: 4,
                // },
                textShadowRadius: 4,
                textAlign: "left",
                // fontFamily: "LeagueGothic-Regular",

              }}
              subtitleStyle={{
                alignSelf: 'center',
                color: `${theme.colors.textColor}`,
                marginBottom: 5,
              }}
            />
          ),
        }}
      />
      {/* add season */}
    </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({})