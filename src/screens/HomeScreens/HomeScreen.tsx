import { StyleSheet, Text, View, SafeAreaView, Alert, Image } from 'react-native'
import React from 'react'
import { generalstyles } from '../../generalstyles/generalstyles'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../../theme/theme'
import Ionicons from "react-native-vector-icons/Ionicons";
import Carousel from 'react-native-reanimated-carousel';

const cards = [
  {
    name: "Gallery",
    route: "StatusScreen",
    isBig: false,
    mode:['contain','cover'],
    arrayImages: [
      require("../../assets/home/gallery.jpeg"),
      require("../../assets/home/articles.jpeg")
    ]
  },
  {
    name: " Articles",
    route: "PostScreen",
    isBig: false,
    arrayImages: [
      require("../../assets/home/gallery.jpeg"),
      require("../../assets/home/articles.jpeg")

    ]
  },
  {
    name: "Exceptional Plays",
    route: "ExceptionalScreen",
    isBig: false,
    arrayImages: [
      require("../../assets/home/first.jpeg"),
      require("../../assets/home/articles.jpeg")

    ]
  },
  {
    name: "Latest Videos",
    route: "VideoScreen",
    isBig: false,
    image: require("../../assets/home/second.jpeg"),
    arrayImages: [
       require("../../assets/home/second.jpeg"),
      require("../../assets/home/gallery.jpeg"),


    ]
  },
  {
    name: "Tournament",
    route: "AddSeasonScreen",
    isBig: true,
    arrayImages: [
       require("../../assets/home/tournament.jpeg"),
      require("../../assets/home/tour.jpeg"),

    ]
  }

]

const HomeScreen = ({ navigation }: any) => {

  return (
    <SafeAreaView
      style={[generalstyles.container, {
        backgroundColor: theme.colors.primary,
        // opacity: 0.5,
      }]}
    >
      <FlatList
        data={cards}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 10,
          paddingTop: 10,
          opacity: 1
        }}
        keyExtractor={item => item.route}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                marginHorizontal: 10,
                marginVertical: 10
              }}
              onPress={() => {
                 navigation.navigate(item.route)
                //Alert.alert("pressed")
              }
              }
            activeOpacity={0.5}
            >
              <View>
                
                <Carousel
                  loop
                  width={item.isBig ? theme.dimensions.width / 1.1 : theme.dimensions.width / 2.4}
                  height={180}
                  autoPlay={true}
                  data={item.arrayImages}
                  scrollAnimationDuration={1000}
                  style={{
                    borderRadius: 10,
                    opacity: 0.8,
                    backgroundColor: theme.colors.black,
                    elevation: 5,
                  }}
                  
                  renderItem={({ index }) => (
                    <Image
                    source={item.arrayImages[index]}
                    style={{
                      width: item.isBig ? theme.dimensions.width / 1.1 : theme.dimensions.width / 2.4,
                      height:theme.dimensions.height/4,
                      borderRadius: 10,
                      opacity: 0.8,
                      backgroundColor: theme.colors.black,
                    }}
                  />
                  )}
                />
                {/* absolute pos */}
                <View
                  style={{
                    position: 'absolute',
                    bottom: 5,
                    left: 8,
                    padding: 5,
                    borderRadius: 10,
                    // backgroundColor: theme.colors.primary,

                  }}
                >
                  <View
                    style={{
                      borderTopColor: theme.colors.primary,
                      borderTopWidth: 5,
                      borderStyle: 'solid',
                      width: 82,
                      marginBottom: -8,
                    }}
                  />
                  <View style={[
                    generalstyles.flexStyles, {
                      marginVertical: 5,
                      marginBottom: -8,
                      marginLeft: -5
                    }
                  ]}>
                    <Ionicons
                      name="add-circle"
                      size={25}
                      color={theme.colors.white}
                      style={{
                        marginTop: 2
                      }}
                    />
                    <Text style={{
                      color: theme.colors.white,
                      fontFamily: "LeagueGothic-Regular",
                      fontStyle: 'normal',
                      fontSize: 22,
                    }}>
                      {item.name}
                    </Text>
                  </View>

                </View>
                {/* absolute pos */}
              </View>


            </TouchableOpacity>
          )
        }}
      />


    </SafeAreaView>




  )
}



export default HomeScreen

const styles = StyleSheet.create({


  cardParent: { flex: 1, margin: 10 },
  cardRow: { flexDirection: 'row', alignItems: "center", marginVertical: 10, marginRight: 10 },

  cardContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: { fontWeight: 'bold', color: '#000' },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {

    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: theme.colors.textColor,
    padding: 10,
    width: 200,
  }
})






