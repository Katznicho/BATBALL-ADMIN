import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme/theme';
import { IconButton } from 'react-native-paper';
import { confirmPasswordError } from '../../utils/Helpers';
import { TextInput } from 'react-native-paper';
import { HelperText, Button } from 'react-native-paper';
import { generalstyles } from '../../generalstyles/generalstyles';

const ChangePasswordScreen = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  //password icons
  const [passwordType, setPasswordType] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);

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
            Change Password
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
            Enter your information below to change password
          </Text>
        </View>

        {/* password */}
        <View style={styles.spacing}>
          <TextInput
            label="New Password"
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

        {/* confirm password */}
        <View style={styles.spacing}>
          <TextInput
            label="Confirm new password"
            mode={'flat'}
            style={{
              backgroundColor: theme.colors.primary,
              borderBottomColor: theme.colors.placeholder,
              height: 60,
              borderBottomWidth: 0,
            }}
            autoFocus={true}
            theme={{
              colors: { text: theme.colors.white, primary: theme.colors.white },
            }}
            right={
              confirmPassword.length > 0 && (
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
                  onPress={() => setConfirmPasswordType(!passwordType)}
                />
              )
            }
            error={confirmPasswordError(password, confirmPassword)}
            value={confirmPassword}
            outlineColor={theme.colors.primary}
            underlineColor={theme.colors.disabled}
            selectionColor={theme.colors.primary}
            textContentType="password"
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry={passwordType}
          />
          {confirmPasswordError(password, confirmPassword) && (
            <HelperText type="error" visible={true}>
              {'Passwords dont match'}
            </HelperText>
          )}
        </View>
        {/* confirm  password*/}

        <View>
          {/* remember me */}
          <View
            style={[
              generalstyles.centerContent,
              generalstyles.flexStyles,
              { marginLeft: -40 },
            ]}
          >
            <View>
              <IconButton
                icon="checkbox-marked"
                iconColor={theme.colors.buttonColor}
                size={28}
              />
            </View>
            <Text style={{ color: theme.colors.buttonColor, marginLeft: -5 }}>
              Remember Password
            </Text>
          </View>
          {/* remember me */}

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

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 10,
  },
});
