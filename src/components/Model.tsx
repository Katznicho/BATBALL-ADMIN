// @ts-nocheck
import { View, Text, Button, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";

const ModalPopup = ({ visible, onClose }: any) => {
    // const navigation = useNavigation<any>();
    const [chanegBg, setChangeBg] = useState(false)
    const HandleBackground = () => {
        setChangeBg(!chanegBg)
    }
    return (
        <ImageBackground>
            <Modal visible={visible}
                animationIn="bounceInUp"
                animationOut="bounceOutDown"
                animationInTiming={900}
                animationOutTiming={500}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={500}

                style={{
                    justifyContent: "flex-end",
                    margin: 0,
                    marginBottom: 50,
                    // backgroundColor: "#E66975",

                }}

                className=' h-full  flex-1 '>
                <ImageBackground source={require('../assets/modelimg.png')} className="h-[487px] shadow-inset  bg-opacity-97 shadow-[#E66975] rounded-md items-center ">

                    <View className="border w-[109px] border-[#50165F] bg-[#50165F] h-[6px] rounded-[10px] mt-3"></View>
                    <Text className="text-white font-extrabold text-[40px] font-sans ">SELECT YOUR FAVORITE TEAM</Text>
                    <View className="space-y-1">

                        <View className="flex-row gap-4">

                            <TouchableOpacity className={`border border-[#FF0000] ${chanegBg ? "bg-[#622671] border-2" : "bg-[#946c9f] "}  w-[105px] h-[95px]  rounded-[15px]  items-center justify-center `}
                                onPress={HandleBackground}
                            >
                                <Image
                                    source={require('../assets/burenga.png')}
                                    className=" w-[61px] h-[65px]"
                                />
                                <Text className="text-white text-[9px]">Beruga FC</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className={`border border-[#FF0000] ${chanegBg ? "bg-[#622671] border-2" : "bg-[#946c9f] "}  w-[105px] h-[95px]  rounded-[15px]  items-center justify-center `}
                                onPress={HandleBackground}>
                                <Image
                                    source={require('../assets/burenga.png')}
                                    className=" w-[61px] h-[65px]"
                                />
                                <Text className="text-white text-[9px]">Beruga FC</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className={`border border-[#FF0000] ${chanegBg ? "bg-[#622671] border-2" : "bg-[#946c9f] "}  w-[105px] h-[95px]  rounded-[15px]  items-center justify-center `}
                                onPress={HandleBackground}>
                                <Image
                                    source={require('../assets/burenga.png')}
                                    className=" w-[61px] h-[65px]"
                                />
                                <Text className="text-white text-[9px]">Beruga FC</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row gap-4">

                            <TouchableOpacity className="border border-[#FF0000]  w-[105px] h-[95px]  rounded-[15px]  items-center justify-center bg-[#946c9f] ">
                                <Image
                                    source={require('../assets/burenga.png')}
                                    className=" w-[61px] h-[65px]"
                                />
                                <Text className="text-white text-[9px]">Beruga FC</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="border border-[#FF0000]  w-[105px] h-[95px]  rounded-[15px]  items-center justify-center bg-[#946c9f] ">
                                <Image
                                    source={require('../assets/burenga.png')}
                                    className=" w-[61px] h-[65px]"
                                />
                                <Text className="text-white text-[9px]">Beruga FC</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="border border-[#FF0000]  w-[105px] h-[95px]  rounded-[15px]  items-center justify-center bg-[#946c9f] ">
                                <Image
                                    source={require('../assets/burenga.png')}
                                    className=" w-[61px] h-[65px]"
                                />
                                <Text className="text-white text-[9px]">Beruga FC</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row gap-4">

                            <TouchableOpacity className="border border-[#FF0000]  w-[105px] h-[95px]  rounded-[15px]  items-center justify-center bg-[#946c9f] ">
                                <Image
                                    source={require('../assets/burenga.png')}
                                    className=" w-[61px] h-[65px]"
                                />
                                <Text className="text-white text-[9px]">Beruga FC</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="border border-[#FF0000]  w-[105px] h-[95px]  rounded-[15px]  items-center justify-center bg-[#946c9f] ">
                                <Image
                                    source={require('../assets/burenga.png')}
                                    className=" w-[61px] h-[65px]"
                                />
                                <Text className="text-white text-[9px]">Beruga FC</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="border border-[#FF0000]  w-[105px] h-[95px]  rounded-[15px]  items-center justify-center bg-[#946c9f] ">
                                <Image
                                    source={require('../assets/burenga.png')}
                                    className=" w-[61px] h-[65px]"
                                />
                                <Text className="text-white text-[9px]">Beruga FC</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity className=" bg-[#FF0000] h-[79px] w-[428px] mt-3  justify-center items-center" onPress={onClose} >
                        <Text className="text-[18px] text-white font-bold">Save</Text>
                    </TouchableOpacity>

                </ImageBackground>

            </Modal ></ImageBackground>

    )
}

export default ModalPopup