import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { theme } from '../../../theme/theme';
import FixtureScreen from '../../FixtureScreen/FixtureScreen';
import AllStats from './AllStats';

const Tab = createMaterialTopTabNavigator();

const StatTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="STATSTAB"
            backBehavior="order"
            sceneContainerStyle={{
                backgroundColor: theme.colors.screenBackground,
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
                    //fontSize: 10,
                    // // fontWeight: "600",
                    // fontFamily: 'Poppins-Regular',
                    // fontStyle: 'normal',
                    //lineHeight: 20,
                    //color: theme.colors.white,
                    //alignSelf: 'center',
                    width:70

                },

                tabBarIndicatorStyle: {
                    backgroundColor: theme.colors.red,
                     height: 4,
                     marginHorizontal: 5,
                    // width:50
                },
                tabBarPressColor: theme.colors.primary,
                tabBarScrollEnabled: true,
                tabBarShowIcon: true,
                tabBarShowLabel: true,
                tabBarContentContainerStyle:{
                    //width:80
                    marginHorizontal:0
                },
                tabBarItemStyle:{
                   width:80,
                   marginBottom:-10
                },
                tabBarIndicatorContainerStyle:{

                }


            }}

        >
            <Tab.Screen
                name="STATSTAB"
                component={AllStats}
                options={{
                    tabBarLabel: 'All STATS',
                    tabBarAccessibilityLabel: 'ALL STATS',
                    //add some styling here
                }}
            />

            <Tab.Screen
                name="LOGS"
                component={AllStats}
                options={{
                    tabBarLabel: 'LOGS',
                    tabBarAccessibilityLabel: 'LOGS',
                    //add some styling here
                }}
            />
            <Tab.Screen
                name="GOALS"
                component={AllStats}
                options={{
                    tabBarLabel: 'GOALS',
                    tabBarAccessibilityLabel: 'GOALS',
                    //add some styling here
                }}
            />

            <Tab.Screen
                name="ASSISTS"
                component={AllStats}
                options={{
                    tabBarLabel: 'ASSISTS',
                    tabBarAccessibilityLabel: 'ASSISTS',
                    //add some styling here
                }}
            />
            <Tab.Screen
                name="CLEAN SHEEET"
                component={AllStats}
                options={{
                    tabBarLabel: 'CLEAN SHEET',
                    tabBarAccessibilityLabel: 'CLEAN SHEET',
                    //add some styling here
                }}
            />
        </Tab.Navigator>
    );
};

export default StatTabs;

const styles = StyleSheet.create({});
