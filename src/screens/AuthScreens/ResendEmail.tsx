import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
  } from 'react-native';
  import React, { useState } from 'react';
  import { useNavigation } from '@react-navigation/native';
  import { theme } from '../../theme/theme';
  import { Button, IconButton } from 'react-native-paper';
  import { TextInput } from 'react-native-paper';
import axiosInstance from '../../axios/axios';
import { RESEND_EMAIL } from '../../constants/endpoints';
import { showMessage } from 'react-native-flash-message';

  
  const ResendEmailScreen = () => {

    const navigation = useNavigation<any>();

    const [email, setEmail] = useState<string>('');
    const [loading , setLoading] = useState<boolean>(false)

  


      const onResendEmail = async()=>{
         try {
            
             const formData = new FormData();
             formData.append("email", email)
             const {data} =  await axiosInstance.post(RESEND_EMAIL , formData);
             setLoading(false)
             setEmail("");     
             showMessage({
                message: 'success',
                description: `An otp has been sent to your email`,
                type: 'success',
                icon: 'success',
                autoHide: true,
                duration: 2000,
                floating: true
              })  
              navigation.navigate('Verification', { email: email});

         } catch (error) {
              console.log("=====================")
            setLoading(false);
            
             Alert.alert("Error", "Please try again");

         }

      }
  

    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: theme.colors.primary,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{
            margin: 20,
          }}
          keyboardShouldPersistTaps="always"
        >
          <View style={{ marginTop: Platform.OS === 'ios' ? 20 : 0 }}>
            <IconButton
              icon="chevron-left"
              iconColor={theme.colors.white}
              size={28}
              onPress={() => navigation.goBack()}
              containerColor={theme.colors.arraowBackGroundColor}
            />
          </View>
          <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <Text
              style={{
                color: theme.colors.white,
                fontSize: 30,
                fontWeight: 'bold',
              }}
            >
               Resend Email
            </Text>
          </View>
          <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <Text
              style={{
                color: theme.colors.placeholder,
                fontSize: 15,
                width: 200,
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}
            >
               Please re-enter your email again to resend verification code
            </Text>
          </View>
  
          {/* password */}
          <View style={styles.spacing}>
            <TextInput
              label="Enter Email"
              mode={'flat'}
              style={{
                backgroundColor: theme.colors.primary,
                borderBottomColor: theme.colors.placeholder,
                height: 60,
                borderBottomWidth: 0,
              }}
              theme={{
                colors: { text: theme.colors.white, primary: theme.colors.white },
              }}
              right={
                  (
                  <TextInput.Icon
                  icon={'checkbox-outline'}
                    style={{ marginRight: 15, padding: 5 }}
                    color={'red'}
                    size={24}
                    theme={{
                      colors: {
                        background: 'red',
                        primary: 'red',
                        onBackground: 'red',
                        surface: 'red',
                      },
                    }}

                  />
                )
              }
              value={email}
              outlineColor={theme.colors.primary}
              underlineColor={theme.colors.disabled}
              selectionColor={theme.colors.primary}
              textContentType="emailAddress"
              onChangeText={text => setEmail(text)}
              
            />
          </View>
          {/* password */}
  
  
          <View>  
            {/* button */}
            <View
              style={{
                marginVertical: 5,
                marginHorizontal: 40,
              }}
            >
              <Button
                mode="contained"
                contentStyle={{
                  flexDirection: 'row-reverse',
                }}
                loading={loading}
                disabled={loading}
                buttonColor={theme.colors.buttonColor}
                textColor={theme.colors.primary}
                onPress={onResendEmail}
              >
                Send
              </Button>
            </View>
            {/* button */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };
  
  export default ResendEmailScreen;
  
  const styles = StyleSheet.create({
    spacing: {
      marginBottom: 10,
    },
  });
  