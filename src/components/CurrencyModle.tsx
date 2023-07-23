// @ts-nocheck

import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native';

export default function CurrencyModle({ visible, onClose }: any) {
    const navigation = useNavigation()
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
                <TouchableOpacity onPress={onClose} className='absolute right-5 top-3'><Image source={require('../assets/cross.png')} /></TouchableOpacity>

                <Text className='text-black font-bold text-[20px] mt-7'>What is your name? </Text>

                <View className='absolute  left-10 top-[130px] '>
                    <Text className=' font-semibold text-[10px]'>FIRST NAME</Text>
                    <TextInput
                        maxLength={20}
                        placeholder='Denis'
                        placeholderTextColor='black' />
                    <View className='border-b-[0.8px] w-[316.01px] border-black'></View>
                    <Text className=' font-semibold text-[10px] mt-5'>LAST NAME</Text>
                    <TextInput
                        maxLength={20}
                        placeholder='Denis'
                        placeholderTextColor='black' className='' />
                    <View className='border-b-[0.8px] w-[316.01px] border-black'>
                    </View>
                    <Text className='items-center  mr-[70px] text-[13px] font-[600px] '>By tapping Sign Up UP & Accept, you acknowledge that you have read the <Text className='text-[#FF0000]'>Privacy Policy</Text>  and agree to the <Text className='text-[#FF0000]'>Terms of service </Text> set by the LPTL League and any 3rd parties involved. </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('PaymentScreen')} className='bg-[#FF0000] w-[276px] h-[51px] rounded-[30px] items-center mb-7 justify-center mt-7'>
                        <Text className='text-white text-[20px] font-[600px]'>Sign up & Accept</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>

    )
}