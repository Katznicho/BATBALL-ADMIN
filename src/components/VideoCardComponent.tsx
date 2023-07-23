import React from 'react';
import { View, Text } from 'react-native';
import Video from 'react-native-video';
import { theme } from '../theme/theme';
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from 'moment';

const VideoCardComponent = ({ item }: any) => {
  return (
    <View
      style={{
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 30,
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
      }}
    >
      <View>
        <Video

          source={{ uri: item.videoUri }}
          style={{
            width: '100%',
            height: 250,
            borderRadius: 10,
          }}
          // poster={item.image}
          controls={true}
          paused={true}



          resizeMode="cover"
        />

        {/* absolute position the title */}
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            padding: 10,
            borderRadius: 10,
            borderTopColor: theme.colors.primary,
            borderTopWidth: 2,
          }}
        >
          <Text style={{ color: theme.colors.white, fontSize: 23, fontWeight: 'bold' }}>
            {item.title}
          </Text>
        </View>
      </View>

      <View
        style={{
          padding: 30,
          backgroundColor: theme.colors.white,
          marginTop: -10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Text style={{ color: theme.colors.black, fontSize: 18 }}>{item.caption}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          {/* Likes */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name="like2" size={18} color={theme.colors.primary} />
            <Text style={{ marginLeft: 5, color: theme.colors.primary }}>{item.likesCount}</Text>
          </View>

          {/* Time */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <Text style={{ marginLeft: 5, color: theme.colors.primary }}>
              {moment(item.createdAt.toDate()).format('MMM DD, YYYY')}
            </Text>
          </View>

          {/* Share */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name="sharealt" size={18} color={theme.colors.primary} />
            <Text style={{ marginLeft: 5, color: theme.colors.primary }}>Share</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VideoCardComponent;
