import React, { useEffect } from 'react';
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { theme } from '../../theme/theme';
import { Avatar, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack/HomeStack';
import CalendarStack from './CalendarStack/CalendarStack';

import { useNavigation } from '@react-navigation/native';
import ClubStack from './ClubStack/ClubStack';
import SeasonStack from './SeasonStack/SeasonStack';



//const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const BaseStack = () => {

  const paper_theme = useTheme();
  paper_theme.colors.secondaryContainer = theme.colors.primary;
  paper_theme.colors.error = theme.colors.buttonColor;

  const { appIntro, isLoggedIn, user } = useSelector((state: RootState) => state.user);

  const navigation = useNavigation<any>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e: any) => {
      //console.log(e.target);
      console.log("pressed")
    });

    return unsubscribe;
  }, [navigation]);

  return (<Tab.Navigator
    initialRouteName="Home"
    backBehavior="order"
    sceneContainerStyle={{
      backgroundColor: theme.colors.screenBackground,
      flex: 1,
    }}
    screenOptions={
      {
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          borderWidth: 0,
          borderTopWidth: 0,
          borderColor: theme.colors.primary,
          height: 60,
        },
        headerShown: false,
        tabBarActiveTintColor: theme.colors.red,
        tabBarInactiveTintColor: theme.colors.white,


        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: '400',
          fontFamily: "Montserrat-VariableFont_wght",
          fontStyle: 'normal',
          lineHeight: 20,
          marginBottom: 5,
          // color:theme.colors.white
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },

      }
    }

  >

    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarLabel: 'Home',
        tabBarAccessibilityLabel: 'Home',

        tabBarIcon: ({ color, focused }: any) => !focused ? (
          <View><Image source={require("../../assets/homeicontwo.png")} /></View>


        ) : (
          <View>
            <Image
              source={require("../../assets/homeiconeone.png")}
            />
          </View>
        )
      }}


    />

    <Tab.Screen
      name="Fixtures"
      component={CalendarStack}
      options={{
        tabBarLabel: 'Media',
        tabBarAccessibilityLabel: 'Fixtures',
        tabBarIcon: ({ color, focused }: any) => !focused ? (
          <View><Image source={require("../../assets/calendertwo.png")} /></View>


        ) : (
          <View>
            <Image
              source={require("../../assets/calendericonone.png")}
            />
          </View>
        )
      }}

    />

    {/* <Tab.Screen
      name="Clubs"
      component={ClubStack}
      options={{
        tabBarLabel: 'Clubs',
        tabBarAccessibilityLabel: 'Clubs',
        tabBarIcon: ({ color, focused }: any) => !focused ? (
          <View><Image source={require("../../assets/calendertwo.png")} /></View>


        ) : (
          <View>
            <Image
              source={require("../../assets/calendericonone.png")}
            />
          </View>
        )
      }}

    /> */}

    {/* teams */}
    <Tab.Screen
      name="Seasons"
      component={SeasonStack}
      options={{
        tabBarLabel: 'Tournaments',
        tabBarAccessibilityLabel: 'Tournaments',
        tabBarIcon: ({ color, focused }: any) => !focused ? (
          <View><Image source={require("../../assets/calendertwo.png")} /></View>


        ) : (
          <View>
            <Image
              source={require("../../assets/calendericonone.png")}
            />
          </View>
        )
      }}

    />
    {/* teams */}





  </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadowStyles: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

export default BaseStack;
