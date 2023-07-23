import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import TopBar from '../../../components/AppBars/TopBar';
import { theme } from '../../../theme/theme';
import StatTabs from './StatTabs';


const Stack = createStackNavigator();

const StatStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='StatScreen'
    >
      <Stack.Screen
        name="StatScreen"
        component={StatTabs}
        options={{
          header: props => (
            <TopBar
              showSearch
              {...props}
              title={"MOTL"}

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
    </Stack.Navigator>
  )
}

export default StatStack

const styles = StyleSheet.create({})