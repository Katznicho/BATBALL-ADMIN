import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import TopBar from '../../../components/AppBars/TopBar';
import { theme } from '../../../theme/theme';
import CalendarTabs from './CalendarTabs';

const Stack = createStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='FixtureScreen'
    >
      <Stack.Screen
        name="FixtureScreen"
        component={CalendarTabs}
        options={{
          header: props => (
            <TopBar
              showSearch
              {...props}
              title={"BATBALL ADMIN"}

              titleStyle={{
                color: `${theme.colors.textColor}`,
                marginLeft: 10,
                fontFamily: "LeagueGothic-Regular",
                fontStyle: 'normal',
                fontSize: 28,
                lineHeight: 30,

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
    </Stack.Navigator>
  )
}

export default CalendarStack

const styles = StyleSheet.create({})