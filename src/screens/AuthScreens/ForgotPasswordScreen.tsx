import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme/theme';
import { IconButton } from 'react-native-paper';
import { emailChecker } from '../../utils/Helpers';
import { TextInput } from 'react-native-paper';
import { HelperText, Button } from 'react-native-paper';
import { generalstyles } from '../../generalstyles/generalstyles';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState<string>('');
  //errors
  // const [emailError, handleEmailError] = useState<boolean>(false);

  const navigation = useNavigation<any>();
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
      >
        <View>
          <IconButton
            icon="chevron-left"
            iconColor={theme.colors.white}
            size={28}
            onPress={() => navigation.goBack()}
            containerColor={'#FFFFFF78'}
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
            Forgot Password?
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
            Enter your information below or login with another account
          </Text>
        </View>

        <View>
          <TextInput
            label="Email"
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
            autoFocus={true}
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

          {/* try another way */}
          <TouchableOpacity
            style={[
              generalstyles.centerContent,
              { justifyContent: 'flex-end', padding: 5, marginTop: 30 },
            ]}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <Text style={{ color: theme.colors.buttonColor }}>
              Try another way
            </Text>
          </TouchableOpacity>
          {/* try another way */}

          {/* button */}
          <View
            style={{
              marginVertical: 10,
              marginHorizontal: 40,
            }}
          >
            <Button
              mode="contained"
              contentStyle={{
                flexDirection: 'row-reverse',
              }}
              //  loading={true}
              buttonColor={theme.colors.buttonColor}
              textColor={theme.colors.primary}
              onPress={() => console.log('Pressed')}
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

export default ForgotPasswordScreen;
