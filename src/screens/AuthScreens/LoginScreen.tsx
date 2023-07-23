import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { theme } from '../../theme/theme';
import { generalstyles } from '../../generalstyles/generalstyles';
import { useNavigation } from '@react-navigation/native';
import { Button, HelperText, IconButton, TextInput } from 'react-native-paper';
import { emailChecker, EmptyFieldError } from "../../utils/Helpers";
import { useDispatch } from 'react-redux';
import { guestLogin, updateUserState } from '../../redux/slices/UserSlice';
import { LOGIN, USER_COLLECTION } from '../../constants/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  //password icons
  const [passwordType, setPasswordType] = useState(true);



  const navigation = useNavigation<any>();

  const dispatch = useDispatch<any>();

  const [loading, setLoading] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const disableLoginButton = () => {
    if (
      EmptyFieldError(email) ||
      EmptyFieldError(password) ||
      emailChecker(email)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onLoginUser = async () => {
    try {
      setLoading(true);
      setDisableButton(true);
      const formdata = new FormData();
      formdata.append('email', email);
      formdata.append('password', password);


      //login in user with firebase using email and password
      const userCredentials = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      //get user details from USER collection
      const user = await firestore().collection(USER_COLLECTION).doc(userCredentials.user.uid).get();
      const user_details = user.data();


      dispatch(
        updateUserState({
          isLoggedIn: true,
          appIntro: false,
          user: {
            id: user_details?.uid,
            fname: user_details?.name,
            lname: user_details?.lname,
            email: user_details?.email,
            phone: "",
            uid: userCredentials.user.uid,
            displayPicture: userCredentials.user.photoURL,
          },
          authToken: "",
          guestUser: false,
        }),
      );

      setLoading(false);
      setDisableButton(false);
      setEmail('');
      setPassword('');
    } catch (error: any) {
      if (error.response.data.errors) {
        const errorMessage =
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
        });
      } else if (error.response.data.message === 'Invalid credentials') {
        Alert.alert("Error", `${error.response.data.message}`)
      } else {

        Alert.alert(`${error.message}`)
      }
      setLoading(false);
      setDisableButton(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* hide the entire status bar */}
      {/* <StatusBar hidden={true} /> */}

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
        {/* top view */}
        <View>
          <ImageBackground

            source={require("../../assets/images/cricket.jpeg")}
            resizeMode="cover"
            style={{
              width: '100%',
              height: theme.dimensions.height * 0.38,
            }}
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
                <TouchableOpacity
                  style={[
                    {
                      borderBottomColor: theme.colors.buttonColor,
                      borderBottomWidth: 3,
                    },
                  ]}
                >
                  <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
              </View>

              <View style={{}}>
                <TouchableOpacity
                  onPress={async () => {
                    //clear everything in the async storage
                    await AsyncStorage.clear();
                    //check if the user is logged in firebase and log them out
                    if (auth().currentUser) {
                      await auth().signOut();
                    }
                    navigation.navigate('Register');
                  }}
                >
                  <Text style={styles.text}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* login and register text */}
            <View
              style={[
                {
                  top: theme.dimensions.height / 4,
                  left: theme.dimensions.width / 34,
                  position: 'absolute',
                },
              ]}
            >
              <Text style={[styles.welcomeText, { paddingHorizontal: 20 }]}>
                Welcome back
              </Text>
              {/* <Text
                style={[
                  styles.welcomeText,
                  { fontWeight: 'bold', marginLeft: -130 },
                ]}
              >
                Sarah
              </Text> */}
            </View>
          </ImageBackground>
        </View>
        {/* top view */}

        {/* bottom view */}
        <View
          style={[
            {
              flex: 1,
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 20,
              paddingVertical: 30,
              height: theme.dimensions.height * 0.7,
              width: '100%',
            },
          ]}
        >
          {/* email */}
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <TextInput
              label="Email"
              mode={'flat'}
              style={{
                backgroundColor: theme.colors.primary,
                borderBottomColor: theme.colors.placeholder,
                height: 60,
                borderBottomWidth: 0,
              }}
              // autoFocus={true}
              theme={{
                colors: {
                  text: theme.colors.white,
                  primary: theme.colors.white,
                  secondary: theme.colors.white,
                  surface: theme.colors.white,
                },
              }}
              right={
                emailChecker(email) == false &&
                email.length > 0 && (
                  <TextInput.Icon
                    icon={'checkbox-outline'}
                    style={{ marginRight: 15, padding: 5 }}
                    color={theme.colors.buttonColor}
                    size={24}
                  />
                )
              }
              error={emailChecker(email)}
              textColor={theme.colors.white}
              value={email}
              outlineColor={theme.colors.primary}
              underlineColor={theme.colors.disabled}
              selectionColor={theme.colors.white}
              textContentType="emailAddress"
              onChangeText={text => setEmail(text)}
            />
            {emailChecker(email) && (
              <HelperText type="error" visible={true}>
                {'Please enter a valid email address'}
              </HelperText>
            )}
          </View>

          {/* email */}

          {/* password */}
          <View>
            <TextInput
              label="Password"
              mode={'flat'}
              style={{
                backgroundColor: theme.colors.primary,
                borderBottomColor: theme.colors.placeholder,
                height: 60,
                borderBottomWidth: 0,
              }}
              theme={{
                colors: {
                  text: theme.colors.white,
                  primary: theme.colors.white,
                },
              }}
              right={
                password.length > 0 && (
                  <TextInput.Icon
                    icon={passwordType ? 'eye-off-outline' : 'eye'}
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
                    onPress={() => setPasswordType(!passwordType)}
                  />
                )
              }
              value={password}
              outlineColor={theme.colors.primary}
              underlineColor={theme.colors.disabled}
              selectionColor={theme.colors.primary}
              textContentType="password"
              onChangeText={text => setPassword(text)}
              secureTextEntry={passwordType}
            />
          </View>
          {/* password */}
          {/* style={[
                generalstyles.flexStyles,
                { justifyContent: 'flex-end', padding: 5, marginTop: 20 },
              ]} */}

          {/* forgot password */}
          <View
            style={[
              generalstyles.flexStyles,
              {
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 5,
                marginTop: 20,
              },
            ]}
          >

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={{ color: theme.colors.buttonColor }}>
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>

          {/* forgot passwprd */}

          {/* bottom areea */}
          <View
            style={[
              generalstyles.flexStyles,
              {
                justifyContent: 'space-between',
                marginTop: 30,
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
            >
              {/* ios */}
              <View>
                
              </View>
              {/* ios */}

              {/* google icon */}
              <View style={{ marginLeft: 15 }}>
                
              </View>
              {/* google icon */}
            </View>
            <View
              style={{ backgroundColor: theme.colors.white, borderRadius: 20 }}
            >
              {/* button */}
              <Button
                icon={{ source: 'play', direction: 'ltr' }}
                mode="contained"
                contentStyle={{
                  flexDirection: 'row-reverse',
                }}
                loading={loading}
                buttonColor={theme.colors.buttonColor}
                textColor={theme.colors.primary}
                disabled={disableButton || disableLoginButton()}
                onPress={onLoginUser}
              >
                Login
              </Button>
              {/* button */}
            </View>
          </View>
          {/* bottom area */}
        </View>
        {/* bottom view */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
});
