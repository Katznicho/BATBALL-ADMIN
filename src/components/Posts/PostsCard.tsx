// @ts-nocheck
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
const TweetCard = ({ tweet }) => {
    const user = tweet.user
    const profile_name = user.name
    const profile_image_url = user.profile_image_url_https
    return (
        <View className=" rounded-[10px] w-82 h-[600px] shadow-lg bg-[#d35fa1]  space-y-4 m-4">
            <View className="flex-row items-center px-3 pt-3">

                <View className="w-[62px] h-[62px] bg-slate-400  rounded-full mr-2">
                    <Image source={{ uri: profile_image_url }} className=" w-[62px] h-[62px] rounded-full mr-2" />
                </View>
                <View className=" flex-1">
                    <Text className="font-bold text-black">{profile_name}</Text>
                    <Text className="text-white ">@{tweet.text}. <Text className="text-[#0060D0]">Follow</Text></Text>
                </View>
                <TouchableOpacity ><Image source={require('../../assets/twitter.png')} className="w-[27.58px] h-[21.24px] " /></TouchableOpacity>

            </View>
            <Text className="text-white text-[13px] px-3 pt-2"> In the groooooove</Text>
            <Text className="text-[13px] text-[#0060D0] px-3">@MOTL <Text className=" text-white"> let’s go.</Text> </Text>
            <View className="w-72 h-[236px] bg-gray-500 rounded-[10px] items-center m-5">

                {tweet.entities.media && (<Image
                    source={{ uri: tweet.entities.media[0].media_url_https }}
                    className="w-72  h-[236px] rounded-[10px]"
                    resizeMode='cover'
                    resizeMethod='resize'

                />)}
            </View>
            <Text className="text-white  text-xsm pl-3 opacity-60 font-poppins "> {tweet.created_at}</Text>
            <View className="border-[0.3px] px-3 border-white w-82 m-1"></View>

            <View className="flex-row  justify-around">

                <View className="flex-row items-center space-x-2 pl-3">
                    <TouchableOpacity>
                        <Image source={require('../../assets/heart.png')} /></TouchableOpacity>

                    <Text className="text-white">
                        {tweet.favorite_count}
                    </Text>
                </View>
                <View className="flex-row items-center space-x-2 pl-3">
                    <TouchableOpacity><Image source={require('../../assets/like.png')} /></TouchableOpacity>

                    <Text className="text-white">
                        {tweet.retweet_count}
                    </Text>
                </View>
                <View className="flex-row items-center space-x-2 pl-3">
                    <TouchableOpacity>
                        <Image source={require('../../assets/share.png')} /></TouchableOpacity>

                    <Text className="text-white">
                        300
                    </Text>
                </View>
            </View>
            <View className="w-[35\30px] h-[30px] bg-[#8b367b] rounded-[25px] items-center m-2 justify-center">
                <Text className="text-white text-[14px] font-poppins">Read{tweet.reply_count} Rpl</Text>
            </View>

        </View>

    )


}
const PostsCard = () => {
    const [tweets, setTweets] = useState([]);
    const username = 'MbalwaOld';
    const BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAHU2MAEAAAAAeiYhs%2BFfvojDnKQ72e9WV2Ygoj8%3DodMVjW8sRaPqGxVe9rRoP4eNeckaV4QfhUZ5EbzsKRGaG4sx6m'
    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const response = await fetch(
                    `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${username}&count=10`,
                    {
                        headers: {
                            Authorization: `Bearer ${BEARER_TOKEN}`,
                        },
                    }
                );
                const data = await response.json();
                //console.log(response)
                setTweets(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTweets();
    }, [username]);


    return (
        <View>

            {tweets.map((tweet) => (
                <TweetCard key={tweet.id} tweet={tweet} />
            ))}


        </View>
    )
}

export default PostsCard