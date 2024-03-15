import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Colors from '../assets/colors/colors';

export default function OTP({navigation}) {
  return (
    <View style={styles.mainDiv}>
      <Text style={styles.title}>Enter OTP</Text>
      <OTPInputView
        style={styles.otp}
        pinCount={4}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        placeholderTextColor={Colors.primaryBlack}
        onCodeFilled={(code) => {
          console.log(`Code is ${code}, you are good to go!`);
          navigation.navigate('CreatePassword');
        }}
      />
      <View style={styles.msg}>
        <Text style={styles.msg1}>Did't got code?</Text>
        <Pressable onPress={() => alert('We send code again!')}>
          <Text style={styles.msg2}>Resend</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
  },
  otp: {
    width: '80%',
    height: 150,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: Colors.buttonGreen,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.buttonGreen,
  },
  msg: {
    flexDirection: 'row',
  },
  msg1: {
    fontSize: 18,
    marginRight: 10,
  },
  msg2: {
    fontSize: 18,
    color: Colors.buttonGreen,
  },
});
