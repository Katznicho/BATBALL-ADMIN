import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import TopBar from '../../../components/AppBars/TopBar';
import { theme } from '../../../theme/theme';
import Clubs from './Clubs';
import ClubPage from '../HomeStack/ClubPage';


const Stack = createStackNavigator();

const ClubStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='FixtureScreen'
    >
      <Stack.Screen
        name="FixtureScreen"
        component={Clubs}
        options={{
          header: props => (
            <TopBar
              showSearch
              {...props}
              title={"CLUBS"}
            
              titleStyle={{
                color: `${theme.colors.textColor}`,
                marginLeft: 10,
                fontFamily: "LeagueGothic-Regular",
                fontStyle: 'normal',
                fontSize: 28,
                lineHeight: 34,

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
        name="ClubDetailScreen"
        component={ClubPage}
        options={{
          headerShown: false,
        }}

      />
    </Stack.Navigator>
  )
}

export default ClubStack

