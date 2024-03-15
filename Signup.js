import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
  ToastAndroid,
} from 'react-native';
import {createViewPortConfig} from 'react-native-responsive-view-port';
import Colors from '../assets/colors/colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Button from '../components/Button';
import {ScrollView} from 'react-native-gesture-handler';
import axios from '../others/constants';

const {vw, vh} = createViewPortConfig();
const Signup = ({navigation}) => {
  const [hide1, setHide1] = useState(true);
  const [hide2, setHide2] = useState(true);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const createCustomer = () => {
    axios
      .post('/user', {
        email: email,
        mobile: mobile,
        password: password,
        rePassword: rePassword,
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.message === 'User Already Exist!') {
          return ToastAndroid.show('User Already Exist !', ToastAndroid.SHORT);
        } else {
          insertAuth(result.data.id);
          navigation.navigate('Login');
          return ToastAndroid.show('Account Created', ToastAndroid.SHORT);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const insertAuth = (id) => {
    axios
      .post('/user/auth', {
        customer_id: id,
        username: email,
        password: password,
        crte_by: id,
      })
      .then(() => {
        {
          alert('Account Created');
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <ScrollView>
      <View style={styles.mainDiv}>
        <View style={styles.topView}>
          <Image
            source={require('../assets/images/aadhi-logo.jpeg')}
            style={styles.logo}
          />
        </View>
        <View style={styles.subView}>
          <View>
            <Text style={styles.login}>Signup</Text>
            <Text style={styles.loginMsg}>
              Enter your credentials to continue
            </Text>
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
                  onChangeText={(val) => setEmail(val)}
                />
              </View>
            </View>

            <View style={styles.inputDiv}>
              <Text style={styles.inputLabel}>Phone</Text>
              <View style={styles.fieldDiv}>
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  autoCorrect={false}
                  onChangeText={(val) => setMobile(val)}
                />
              </View>
            </View>
            <View style={styles.inputDiv}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.fieldDiv}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={hide1}
                  returnKeyType="done"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(val) => setPassword(val)}
                />
                {hide1 ? (
                  <Pressable onPress={() => setHide1(!hide1)}>
                    <Icon
                      name="eye-slash"
                      style={{fontSize: 20, color: Colors.primaryBlack}}
                    />
                  </Pressable>
                ) : (
                  <Pressable onPress={() => setHide1(!hide1)}>
                    <Icon
                      name="eye"
                      style={{fontSize: 20, color: Colors.primaryBlack}}
                    />
                  </Pressable>
                )}
              </View>
            </View>
            <View style={styles.inputDiv}>
              <Text style={styles.inputLabel}>Re-type Password</Text>
              <View style={styles.fieldDiv}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={hide2}
                  returnKeyType="done"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(val) => setRePassword(val)}
                />
                {hide2 ? (
                  <Pressable onPress={() => setHide2(!hide2)}>
                    <Icon
                      name="eye-slash"
                      style={{fontSize: 20, color: Colors.primaryBlack}}
                    />
                  </Pressable>
                ) : (
                  <Pressable onPress={() => setHide2(!hide2)}>
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
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </View>
          <Button onPress={() => createCustomer()} title="Signup" />
          <View style={styles.msgDiv}>
            <Text style={styles.msg1}>By continuing you agree to our</Text>
            <Pressable onPress={() => navigation.push('Login')}>
              <Text style={styles.msg2}>
                Terms of Service and Privacy Policy.
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
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
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msg1: {
    fontSize: 14,
    color: Colors.primaryBlack,
  },
  msg2: {
    marginTop: 10,
    fontSize: 14,
    color: Colors.buttonGreen,
  },
});

export default Signup;
