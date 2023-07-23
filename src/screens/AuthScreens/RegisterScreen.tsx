import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { theme } from '../../theme/theme';
import { generalstyles } from '../../generalstyles/generalstyles';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import {
  confirmPasswordError,
  emailChecker,
  EmptyFieldError,
  getErrorMessage,
  lengthChecker,
  
} from '../../utils/Helpers';
import { showMessage } from 'react-native-flash-message';
import { REGISTER, USER_COLLECTION } from '../../constants/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { loginUser, updateUserState } from '../../redux/slices/UserSlice';
import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';




const RegisterScreen = () => {



  //phone number verificaction set up
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState<string>('');
  const [lname, setLName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  //password icons
  const [loading, setLoading] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const [errors, setErrors] = useState({});

  const disableRegisterButton = () => {
    if (
      EmptyFieldError(name) ||
      EmptyFieldError(email) ||
      EmptyFieldError(lname) ||
      EmptyFieldError(password) ||
      EmptyFieldError(confirmPassword) ||
      emailChecker(email) ||
      lengthChecker(password, 8) ||
      lengthChecker(confirmPassword, 8) ||

      confirmPasswordError(password, confirmPassword)
    ) {
      return true;
    } else {
      return false;
    }
  };





  //manually verify the phone number
  const registerNewUser = async () => {
    try {
      setLoading(true);
      setDisableButton(true);
      //first check if the email exists in firebase before creating the user
      const user = await auth().fetchSignInMethodsForEmail(email);
      if (user.length > 0) {
        // Alert.alert(`Email already exists`);
        showMessage({
          message: 'Error',
          description: `Email already exists`,
          type: 'danger',
          icon: 'danger',
          autoHide: false,
          duration: 70000,
          floating: true,
        });

        setLoading(false);
        setDisableButton(false);
      } else {
    
        //create user with email and password
        const userCredentails = await auth().createUserWithEmailAndPassword(email, password);
        

        let createdAt = firebase.firestore.FieldValue.serverTimestamp();

        await firestore().collection(USER_COLLECTION)
          .doc(userCredentails.user.uid)
          .set({
            email,
            lname,
            fname: name,
            phone:"",
            createdAt
          }).catch(err=>{
            console.log("====================")
            console.log(JSON.stringify(err))
            console.log("====================")
          })

        dispatch(updateUserState({
          isLoggedIn: false,
          user: {
            id: userCredentails.user.uid,
            fname: name,
            lname: lname,
            email: email,
            phone: "",
            uid: userCredentails.user.uid,
            displayPicture: userCredentails.user.photoURL,
          },
          authToken: "",
          appIntro: true,
          guestUser: false
        }));
        dispatch(loginUser())

        setDisableButton(false);
        setLoading(false);

        setDisableButton(false);
        setLoading(false);
      }
    } catch (error: any) {
       console.log("==================")
       console.log(JSON.stringify(error))
       console.log("=============================")
      if (error.response.data.errors) {
        const errorMessage: string =
          error.response.data.errors[
          Object.keys(error.response.data.errors)[0]
          ][0];
        showMessage({
          message: 'Error',
          description: `${errorMessage}`,
          type: 'danger',
          icon: 'danger',
          autoHide: false,
          duration: 10000,
          floating: true,
        });
      } else {
        showMessage({
          message: 'Error',
          description: 'please check your internet connection',
          type: 'danger',
          icon: 'danger',
          autoHide: false,
          duration: 10000,
        });
      }

      setLoading(false);
      setDisableButton(false);
    }
  };


  const navigation = useNavigation<any>();

  return <KeyboardAvoidingView
    style={{
      flex: 1,
      backgroundColor: theme.colors.primary,
      paddingBottom: 20,
    }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      {/* top view */}
      <View>
        <ImageBackground
                  source={require("../../assets/images/cricket.jpeg")}
          resizeMode="cover"
          style={{ width: '100%', height: theme.dimensions.height * 0.38 }}
        >
          {/* login and register text */}
          <View
            style={[
              generalstyles.flexStyles,
              {
                alignItems: 'center',
              },
            ]}
          >
            <View
              style={{
                marginHorizontal: 25,
                marginVertical: 50,
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.text]}>Login</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={{
                  borderBottomColor: theme.colors.buttonColor,
                  borderBottomWidth: 3,
                }}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={[styles.text]}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* login and register text */}
          <View
            style={[
              {
                top: theme.dimensions.height / 4.5,
                left: theme.dimensions.width / 20,
                position: 'absolute',
              },
            ]}
          >
            <View
              style={[generalstyles.flexStyles, { alignItems: 'center' }]}
            >
              <Text style={[styles.welcomeText]}>Hello</Text>
              <Text
                style={[
                  styles.welcomeText,
                  { fontWeight: 'bold', marginLeft: 10 },
                ]}
              >
                ,
              </Text>
            </View>

            <View
              style={{
                width: "90%",
                flexWrap: 'wrap',
                flexDirection: 'row',
                marginTop: 20,
              }}
            >
              <Text
                style={[
                  {
                    marginLeft: 1,
                    color: '#d1d5db',
                    fontSize: 13,
                  },
                ]}
              >
                Enter your details   below to continue or login with your  account
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      {/* top view */}

      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>First Name</Text>

          <TextInput
            placeholder="Enter your first name"
            placeholderTextColor="#9ca3af"
            style={styles.formInput}
            value={name}
            onChangeText={text => {
              setName(text);

              setErrors({
                ...errors,
                first_name: [''],
              });
            }}
          />

          <Text style={styles.errorColor}>
            {getErrorMessage(errors, 'first_name')}
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Last Name</Text>

          <TextInput
            placeholder="Enter your last name"
            placeholderTextColor="#9ca3af"
            style={styles.formInput}
            value={lname}
            onChangeText={text => setLName(text)}
          />

          <Text style={styles.errorColor}>
            {getErrorMessage(errors, 'last_name')}
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Email</Text>

          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#9ca3af"
            style={styles.formInput}
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <Text style={styles.errorColor}>
            {getErrorMessage(errors, 'email')}
          </Text>
        </View>



        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Password</Text>

          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#9ca3af"
            style={styles.formInput}
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />

          <Text style={styles.errorColor}>
            {getErrorMessage(errors, 'password')}
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Confirm Password</Text>

          <TextInput
            placeholder="Confirm password"
            placeholderTextColor="#9ca3af"
            style={styles.formInput}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
          />

          <Text style={styles.errorColor}>
            {getErrorMessage(errors, 'confirm_password')}
          </Text>
        </View>

        <View
          style={[
            generalstyles.flexStyles,
            {
              justifyContent: 'space-between',
              // marginTop: 30,
              alignItems: 'center',
            },
          ]}
        >
          <View
            style={[
              generalstyles.flexStyles,
              {
                alignItems: 'center',
              },
            ]}
          />
          <View
            style={{ backgroundColor: theme.colors.white, borderRadius: 20 }}
          >
            <Button
              icon={{ source: 'play', direction: 'ltr' }}
              mode="contained"
              contentStyle={{ flexDirection: 'row-reverse' }}
              loading={loading}
              //disabled={loading}
              disabled={disableRegisterButton() || disableButton}
              buttonColor={theme.colors.buttonColor}
              textColor={theme.colors.primary}
              onPress={registerNewUser}
            //onPress={saveDataToBackend}
            >
              Sign up
            </Button>
          </View>
          
        </View>
        {/* bottom area */}
      </View>
      {/* bottom view */}
    </ScrollView>
  </KeyboardAvoidingView>
};

export default RegisterScreen;

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 35,
    color: 'white',
    textAlign: 'center',
  },
  text: {
    // color: 'white',
    fontSize: 18,
    // lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    //  backgroundColor: '#000000c0',
    color: 'white',
    paddingBottom: 4,
  },

  spacing: {
    marginBottom: 10,
  },
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

  container: { paddingHorizontal: 20, marginTop: 30 },

  formContainer: { marginBottom: 30 },

  formLabel: { color: '#a1a1aa' },

  formInput: {
    color: 'white',
    fontSize: 15,
    borderBottomColor: theme.colors.buttonColor,
    borderBottomWidth: 1,
    // paddingBottom: 2,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: 5,
  },
  phoneInput: {
    color: 'white',
    fontSize: 15,
    borderBottomColor: theme.colors.buttonColor,
    borderBottomWidth: 1,
    // paddingBottom: 2,
    paddingHorizontal: 0,
    paddingVertical: 0,
    //marginTop: -2,
    width: '100%',
    flex: 1,
  },
  countryContainer: {
    backgroundColor: theme.colors.primary,         
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -5,
  },

  errorColor: { color: '#EF4444', fontSize: 12 },
  phoneNumberInput:{
    width: '100%',
    height: 50,
    backgroundColor: theme.colors.primary,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderBottomColor: theme.colors.buttonColor,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
  },

});
