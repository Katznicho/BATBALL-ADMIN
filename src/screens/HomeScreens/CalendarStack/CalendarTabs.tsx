import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../HomeScreen';
import { theme } from '../../../theme/theme';
import Posts from './Posts';
import Status from './Status';
import Videos from './Videos';
import Plays from './Plays';

const Tab = createMaterialTopTabNavigator();

const CalendarTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="FIXTURESTAB"
            backBehavior="order"
            sceneContainerStyle={{
                //backgroundColor: theme.colors.screenBackground,
                flex: 1,
            }}
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: theme.colors.primary,
                    elevation: 0, // Remove shadow on Android
                    shadowOpacity: 0, // Remove shadow on iOS
                    borderBottomWidth: 0, // Remove the bottom border
                    borderTopWidth: 0,
                    borderColor: theme.colors.primary,
                },
                tabBarAndroidRipple: { borderless: true },
                tabBarActiveTintColor: theme.colors.white,
                tabBarInactiveTintColor: theme.colors.white,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "300",
                    fontFamily: 'Poppins-Regular',
                    fontStyle: 'normal',
                    lineHeight: 18,
                    color: theme.colors.white,
                    alignSelf: 'center',

                },

                tabBarIndicatorStyle: {
                    backgroundColor: theme.colors.red,
                    height: 2,
                    marginHorizontal: 10,
                },
                tabBarPressColor: theme.colors.primary,
                tabBarScrollEnabled: true,
                tabBarShowIcon: true,
                tabBarShowLabel: true,


            }}

        >
            <Tab.Screen
                name="FIXTURESTAB"
                component={Posts}
                options={{
                    tabBarLabel: 'Articles',
                    tabBarAccessibilityLabel: 'Articles',
                    //add some styling here
                }}
            />
            <Tab.Screen
                name="PLAYSTAB"
                component={Plays}
                options={{
                    tabBarLabel: 'Execptional plays',
                    tabBarAccessibilityLabel: 'Execptional plays',
                    //add some styling here
                }}
            />
            <Tab.Screen
                name="VIDEOESTAB"
                component={Videos}
                options={{
                    tabBarLabel: 'Latests Videos',
                    tabBarAccessibilityLabel: 'Latest Videos',
                    //add some styling here
                }}
            />
            <Tab.Screen
                name="RESULTSTAB"
                component={Status}
                options={{
                    tabBarLabel: 'Gallery',
                    tabBarAccessibilityLabel: 'Gallery',
                    //add some styling here
                }}
            />
        </Tab.Navigator>
    );
};

export default CalendarTabs;

const styles = StyleSheet.create({});
