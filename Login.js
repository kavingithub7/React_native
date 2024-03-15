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
  ToastAndroid,
} from 'react-native';
import {createViewPortConfig} from 'react-native-responsive-view-port';
import Colors from '../assets/colors/colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Button from '../components/Button';
import axios from '../others/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {vw, vh} = createViewPortConfig();

const Login = ({navigation}) => {
  const [hide, setHide] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState('');

  const login = (userName, password) => {
    axios
      .get(`/user/${userName}/email/${password}/password/`)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 1) {
          AsyncStorage.setItem('email', userName);
          let id = res.data.id;
          AsyncStorage.setItem('id', id.toString());
          setData({userName: '', password: ''});
          return ToastAndroid.show(
            'Logged in Successfully',
            ToastAndroid.SHORT,
            navigation.navigate('Home'),
          );
        }
        if (res.data.message === 'Invalid Password')
          return ToastAndroid.show('Invalid Password', ToastAndroid.SHORT);

        if (res.data.message === 'Invalid E-Mail')
          return ToastAndroid.show('Invalid E-Mail', ToastAndroid.SHORT);
      })
      .catch((err) => console.log(err));
  };
  async function userdata(userid) {
    await AsyncStorage.setItem('id', userid);
    let id = await AsyncStorage.getItem('id');
    console.log(id);
  }

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
            <Text style={styles.login}>Login</Text>
            <Text style={styles.loginMsg}>Enter your emails and password</Text>
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
                  onChangeText={(val) => setUserName(val)}
                />
              </View>
            </View>
            <View style={styles.inputDiv}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.fieldDiv}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={hide}
                  returnKeyType="done"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(val) => setPassword(val)}
                />
                {hide ? (
                  <Pressable onPress={() => setHide(!hide)}>
                    <Icon
                      name="eye-slash"
                      style={{fontSize: 20, color: Colors.primaryBlack}}
                    />
                  </Pressable>
                ) : (
                  <Pressable onPress={() => setHide(!hide)}>
                    <Icon
                      name="eye"
                      style={{fontSize: 20, color: Colors.primaryBlack}}
                    />
                  </Pressable>
                )}
              </View>
            </View>
          </View>
          <View style={styles.forgotDiv}>
            <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </Pressable>
          </View>
          <Button onPress={() => login(userName, password)} title="Login" />
          <View style={styles.msgDiv}>
            <Text style={styles.msg1}>Don’t have an account? </Text>
            <Pressable onPress={() => navigation.push('Signup')}>
              <Text style={styles.msg2}>Signup</Text>
            </Pressable>
          </View>
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

export default Login;
