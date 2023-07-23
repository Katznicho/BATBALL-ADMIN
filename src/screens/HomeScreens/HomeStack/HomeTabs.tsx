import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../HomeScreen';
import { theme } from '../../../theme/theme';
import BuzzScreen from '../../Buzz';

const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="POSTS"
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
          paddingHorizontal:40
        },
        tabBarAndroidRipple: { borderless: true },
        tabBarActiveTintColor: theme.colors.white,
        tabBarInactiveTintColor: theme.colors.white,
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: "600",
          fontFamily: 'Poppins-Regular',
          fontStyle: 'normal',
          lineHeight: 20,
          color: theme.colors.white,
          alignSelf: 'center',
          flex:1

        },

        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.red,
          height: 4,
          marginHorizontal: 35,
        },
        tabBarPressColor: theme.colors.primary,
        tabBarScrollEnabled: true,
        tabBarShowIcon: true,
        tabBarShowLabel: true,


      }}

    >
      <Tab.Screen
        name="POSTS"
        component={HomeScreen}
      />
      <Tab.Screen 
      name="BUZZ" 
      component={BuzzScreen}
       options={{
        tabBarLabel: 'BUZZ',
        tabBarAccessibilityLabel: 'BUZZ',
        //add some styling here
        
        
       }}
       />
    </Tab.Navigator>
  );
};

export default HomeTabs;

const styles = StyleSheet.create({});
