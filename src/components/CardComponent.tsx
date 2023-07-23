import { View, Image } from "react-native";
import { theme } from "../theme/theme";
import { Text } from "react-native-paper";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import LinearGradient from 'react-native-linear-gradient';

const CardComponent = ({ item }: any) => {
  return <View
    style={{
      marginVertical: 5,
      marginHorizontal: 10,
      padding: 30,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
    }}
  >
    <View>
      <View >
        {/* gradient */}
        <LinearGradient
             colors={[
              'rgba(76, 102, 159, 1)', // Change the color and opacity to adjust intensity
              'rgba(59, 89, 152, 0.8)',
              'rgba(25, 47, 106, 0.7)',
              'transparent'
            ]}
            style={{
              width: "100%",
              height: 250,
              borderRadius: 10,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: "100%",
                height: 250,
                borderRadius: 10,
              }}
            />
          </LinearGradient>
        {/* gradient */}
        {/* absolute position the title */}
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
              width: 80,
              marginBottom: -8,
            }}
          />
          <Text style={{
            color: theme.colors.white,
            fontFamily: "LeagueGothic-Regular",
            fontStyle: 'normal',
            fontSize: 35,
          }}>
            {item.title}
          </Text>
        </View>
        {/*  */}
      </View>

      <View
        style={{
          padding: 15,
          backgroundColor: theme.colors.white,
          marginTop: -5,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Text style={{
           color: theme.colors.black,
         fontSize: 13,
         marginBottom: 25,
         marginTop: -10,
         }}
          numberOfLines={2}
        >{item.caption}</Text>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: -5,
          //padding: 10,

        }}>
          {/* Likes */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',

          }}>
            <Text style={{
              marginLeft: 5,
              borderRightColor: theme.colors.black,
              borderRightWidth: 2,
              paddingRight: 5,
              fontWeight: "bold"
            }}>{10}</Text>

            <Text style={{ marginLeft: 5, fontWeight:"bold" }}>Views</Text>

          </View>

          {/* Time */}
          {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               
                <Text style={{ marginLeft: 5 }}>
                  {moment(item.createdAt.toDate()).format('MMM DD, YYYY')}
                </Text>
              </View> */}

          {/* Share */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Entypo name="share" size={22} color={theme.colors.black} />

          </View>
        </View>

      </View>
    </View>
  </View>

};


export default CardComponent;
