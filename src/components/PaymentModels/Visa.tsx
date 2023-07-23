// @ts-nocheck
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setAppIntro } from '../../redux/slices/UserSlice';



const Visa = ({ visible, onClose }) => {
    const dispatch = useDispatch();

    const onFinish = () => {
        dispatch(setAppIntro())
    }
    return (
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
                marginBottom: 0,
                // backgroundColor: "#E66975",

            }} >
            <View className='h-[440px] w-full  rounded-t-[10px] shadow-3xl  items-center bg-white relative'>
                <View className="border w-[109px] border-[#B7B4B4] bg-[#B7B4B4] h-[6px] rounded-[10px] mt-3"></View>

                <View className="flex-row items-center  space-x-6 mb-2"><TouchableOpacity onPress={onClose} className=' '><Image source={require('../../assets/cross.png')} /></TouchableOpacity>
                    <Text className='text-black font-bold text-[20px] mt-1'>Wallet details  </Text>
                    <View className='border-b-[0.8px] w-[131px] border-black flex-row items-center'>
                        <Image source={require('../../assets/depositimg.png')} className='' />
                        <Text className='font-bold text-[21px] text-black mr-2'> Gold</Text>
                        <Image source={require('../../assets/downarrow.png')} />
                    </View>



                </View>


                <View className="">
                    <Text className=' font-semibold text-[10px]'>NAME </Text>
                    <TextInput
                        maxLength={20}
                        placeholder='Denis Okello'
                        placeholderTextColor='black' />
                    <View className='border-b-[0.8px] w-[316.01px] border-black'></View>
                    <Text>WALLET NUMBER</Text>
                    <TextInput
                        maxLength={20}
                        placeholder='***  **** **91'
                        placeholderTextColor='black' />
                    <View className='border-b-[0.8px] w-[316.01px] border-black'></View>
                    <Text>WALLET BALANCE</Text>
                    <View className="flex-row"><TextInput
                        maxLength={20}
                        placeholder='***  **** **91'
                        placeholderTextColor='black' secureTextEntry={true} className=" flex-1" />

                        <Image source={require('../../assets/Eye2.png')} /></View>

                    <View className='border-b-[0.8px] w-[316.01px] border-black'></View>
                </View>



                <View className=" w-[337px] h-[51px]  rounded-[30px] bg-[#dac1db] items-center justify-center flex-row mt-4" >
                    <Image source={require('../../assets/depositimg.png')} />
                    <Text className="text-white  text-[16px] font-[600px] ml-10">DEPOSIT MONEY</Text>
                </View>
                <View className='flex-row items-center mt-7 space-x-8'><Text className="border-b font-bold text-black ">Clear deatails</Text>
                    <TouchableOpacity onPress={onFinish} className='w-[182px] h-[41px] bg-[#FF0000] rounded-[30px] items-center justify-center'>
                        <Text className='text-white  text-[16px] '> Save details </Text>
                    </TouchableOpacity>
                </View>

            </View>

        </Modal>
    )
}

export default Visa