// @ts-nocheck
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';
import React from 'react';

const BottomBar = () => {
    return (
        <View className="   absolute bottom-0  ">
            <View className="bg-[#461556] w-full  h-[80px] flex-row items-center   relative  justify-around">
                <TouchableOpacity className="items-center">
                    <Image source={require('./assests/home.png')} />
                    <Text className="text-white ">Home</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center">
                    <Image source={require('./assests/calender.png')} className="" />
                    <Text className="text-[#FF0000] "> Fixtures </Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center relative  flex justify-center bg-[#461556] p-4 w-[100px]  rounded-full   h-[117px] ">
                    <Image
                        source={require('./assests/MOTL.png')}
                        className="w-[40px]  absolute top-2  h-[55px]"
                    />
                    <Text className="text-white top-2 mt-3 "> MOTL </Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center">
                    <Image source={require('./assests/shop.png')} />
                    <Text className="text-white "> Shop </Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center">
                    <Image source={require('./assests/line.png')} className="mr-4" />
                    <Text className="text-white  mr-4"> Stats </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BottomBar;
