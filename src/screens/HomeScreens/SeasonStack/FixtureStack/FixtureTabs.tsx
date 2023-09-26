import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { theme } from '../../../../theme/theme';
import LineUps from './LineUps';
import Latest from './Latest';
import Stats from './Stats';
import Table from './Table';
import { useRoute } from '@react-navigation/native';


const Tab = createMaterialTopTabNavigator();

const FixtureTabs = () => {
    const { seasonId, fixtureId } = useRoute<any>().params
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
                name="LINEUPTAB"
                component={LineUps}
                options={{
                    tabBarLabel: 'LINEUPS',
                    tabBarAccessibilityLabel: 'LINEUPS',
                    //add some styling here
                }}
                initialParams={{seasonId, fixtureId}}
                
            />
            <Tab.Screen
                name="LATESTTAB"
                component={Latest}
                options={{
                    tabBarLabel: 'LATEST',
                    tabBarAccessibilityLabel: 'LATEST',
                    //add some styling here
                }}
                initialParams={{seasonId, fixtureId}}
            />
            <Tab.Screen
                name="STATSTAB"
                component={Stats}
                options={{
                    tabBarLabel: 'STATS',
                    tabBarAccessibilityLabel: 'STATS',
                    //add some styling here
                }}
                initialParams={{seasonId, fixtureId}}
            />
            <Tab.Screen
                name="TABLETAB"
                component={Table}
                options={{
                    tabBarLabel: 'TABLE',
                    tabBarAccessibilityLabel: 'TABLE',
                    //add some styling here
                }}
                initialParams={{seasonId, fixtureId}}
            />
        </Tab.Navigator>
    );
};

export default FixtureTabs;

const styles = StyleSheet.create({});
