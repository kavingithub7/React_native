import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TextInput,
  Pressable,
} from 'react-native';
import {createViewPortConfig} from 'react-native-responsive-view-port';
import Colors from '../assets/colors/colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Button from '../components/Button';

const {vw, vh} = createViewPortConfig();

const ForgotPassword = ({navigation}) => {
  const [hide, setHide] = useState(true);
  return (
    <View style={styles.mainDiv}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.topView}>
          <Image
            source={require('../assets/images/aadhi-logo.jpeg')}
            style={styles.logo}
          />
        </View>
        <View style={styles.subView}>
          <View>
            <Text style={styles.login}>Forgot Password</Text>
            <Text style={styles.loginMsg}>Enter your email</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.inputDiv}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.fieldDiv}>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  returnKeyType="done"
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoFocus={true}
                />
              </View>
            </View>
          </View>
          <Button onPress={() => navigation.push('OTP')} title="Submit" />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainDiv: {
    // paddingTop: StatusBar.currentHeight + 40,
    flex: 1,
    backgroundColor: '#fff',
  },
  topView: {
    height: 200 * vh,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 120,
    width: 120,
  },
  subView: {
    marginHorizontal: 100 * vw,
    backgroundColor: '#fff',
  },
  login: {
    fontSize: 26,
    color: Colors.primaryBlack,
  },
  loginMsg: {
    marginTop: 15,
    fontSize: 16,
    color: Colors.primaryGray,
  },
  form: {
    marginTop: 40,
  },
  inputLabel: {
    color: Colors.primaryGray,
  },
  inputDiv: {
    marginTop: 30,
    borderBottomWidth: 2,
    borderColor: '#E2E2E2',
  },
  fieldDiv: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    color: Colors.primaryBlack,
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 6,
  },
  forgotDiv: {
    flexDirection: 'row-reverse',
    marginTop: 20,
  },
  forgotPassword: {
    fontSize: 14,
  },
  msgDiv: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msg1: {
    fontSize: 14,
    color: Colors.primaryBlack,
  },
  msg2: {
    fontSize: 14,
    color: Colors.buttonGreen,
  },
});

export default ForgotPassword;
