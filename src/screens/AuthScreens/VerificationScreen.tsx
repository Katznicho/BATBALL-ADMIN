import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../../theme/theme';
import { IconButton, Button } from 'react-native-paper';
import { generalstyles } from '../../generalstyles/generalstyles';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../axios/axios';
import { VERIFY_EMAIL } from '../../constants/endpoints';
import { showMessage } from 'react-native-flash-message';
import { loginUser } from '../../redux/slices/UserSlice';

const VerificationScreen = () => {
  const [code, setCode] = useState<any>("");
  const [disabled, setDisabled] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [showlink , setShowlink] =  useState<boolean>(false)


  const [timer, setTimer] = useState(120); // Initial timer value in seconds




  const { params } = useRoute<any>();
  const {email} =  params
  const navigation = useNavigation<any>();

  useEffect(() => {
    // Start the timer when the component mounts
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          // Perform action when timer reaches zero (e.g., enable the link)
           setShowlink(true);
          return prevTimer
        }
        setShowlink(false)
        return prevTimer - 1;
      });
    }, 1000)

    // Clear the timer when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const dispatch = useDispatch<any>();

  const onCodeConfirmation = async () => {
    setLoading(true)
    setDisabled(true)
    try {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("otp", code);
      const { data } = await axiosInstance.post(VERIFY_EMAIL, formdata)

      showMessage({
        message: 'success',
        description: `Email Verified`,
        type: 'success',
        icon: 'success',
        autoHide: true,
        duration: 4000,
        floating: true
      })
      dispatch(loginUser());


    } catch (error) {
      console.log("===============================")
      console.log(error)
      console.log("================================")
      Alert.alert("Error", "An error has occured")
    }
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: theme.colors.primary }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{ margin: 20 }}
        keyboardShouldPersistTaps="always"
      >
        <View>
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
            Verification?
          </Text>
        </View>
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
          <Text
            style={{
              color: theme.colors.placeholder,
              fontSize: 15,
            }}
          >
            Check your email. We have sent you a code
          </Text>
        </View>

        <View>
          {/* otp input */}
          <View>
            <TextInput
              style={{
                color: theme.colors.white,
                fontSize: 20,
                fontWeight: 'bold',
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.white,
                marginVertical: 10,
                padding: 10,
              }}
              placeholder="Enter Code"
              placeholderTextColor={theme.colors.placeholder}
              keyboardType="number-pad"
              onChangeText={(text) => setCode(text)}
            />
          </View>
          {/* otp input */}

          {/* did not receive */}
          

           {
            showlink?(
              <TouchableOpacity
            style={[
              generalstyles.centerContent,
              { justifyContent: 'flex-end', padding: 5, marginTop: 30 },
            ]}
            onPress={() => navigation.navigate('ResendEmail')}
          >
            <Text style={{ color: theme.colors.buttonColor }}>
               Click here to Resend Otp
            </Text>
          </TouchableOpacity>
            ):(
              <TouchableOpacity
              style={[
                generalstyles.centerContent,
                { justifyContent: 'flex-end', padding: 5, marginTop: 30 },
              ]}
            >
              <Text style={{ color: theme.colors.textColor }}>
                Resend Otp in {timer} seconds
              </Text>
            </TouchableOpacity>
            )
           }
          {/* did not receive */}

          {/* button */}
          <View style={generalstyles.buttonStyles}>
            <Button
              mode="contained"
              contentStyle={{
                flexDirection: 'row-reverse',
              }}
              loading={loading}
              disabled={code.length < 6 || disabled}
              buttonColor={theme.colors.buttonColor}
              textColor={theme.colors.primary}
              onPress={() => onCodeConfirmation()}
            >
              Verify
            </Button>
          </View>
          {/* button */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  inputStyles: {
    borderWidth: 2,
    borderBottomColor: theme.colors.buttonColor,
    borderRadius: 0,
    width: 40,
    height: 60,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  inputContainerStyles: {
    marginHorizontal: 5,
    width: 40,
    marginBottom: 40,
  },
});


{/* <OtpInputs
               handleChange={(code) =>{
                console.log(`code`, code)
                  setCode(code)
                  // onCodeConfirmation()

               }}
              autofillFromClipboard={true}
              inputStyles={styles.inputStyles}
              inputContainerStyles={styles.inputContainerStyles}
              keyboardType={'phone-pad'}
              numberOfInputs={6}
              value={code}
            /> */}