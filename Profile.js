import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../assets/colors/colors';
import Divider from '../components/Divider';
import axios from '../others/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function profile(navigation) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [ZipCode, setZipCode] = useState('');
  const [customerId, setCustomerId] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('id').then((value) => {
      if (value === null) {
        ToastAndroid.showWithGravityAndOffset(
          'You need to login',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        navigation.navigate('Login');
      }
      axios
        .get('/user/' + value)
        .then((data) => {
          if (data.data.status != 400) return alert('Somthing Went Wrong');
          else {
            // console.log(data.data.data[0].zip);
            setData(data.data.data[0]);
            setName(data.data.data[0].first_name);
            setEmail(data.data.data[0].email);
            setAddress1(data.data.data[0].address1);
            setAddress2(data.data.data[0].address2);
            setPhone(data.data.data[0].phone);
            setCity(data.data.data[0].city);
            setState(data.data.data[0].state);
            setZipCode(data.data.data[0].zip);
            setCustomerId(data.data.data[0].customer_id);
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));
    });
  }, []);

  const update = () => {
    // alert('hi');
    axios
      .put('/user/Update', {
        first_name: name,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zip: ZipCode,
        phone: phone,
        email: email,
        customer_id: customerId,
      })
      .then((data) => {
        if (data.data.status == 1) {
          alert('Profile Updated Successfully');
          setName(data.data.data[0].first_name);
          setEmail(data.data.data[0].email);
          setAddress1(data.data.data[0].address1);
          setAddress2(data.data.data[0].address2);
          setPhone(data.data.data[0].phone);
          setCity(data.data.data[0].city);
          setState(data.data.data[0].state);
          setZipCode(data.data.data[0].zip);
          setCustomerId(data.data.data[0].customer_id);
        } else {
          alert('Error while updating address');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView>
        <Pressable>
          <View style={styles.heading}>
            <Text style={styles.heading}>Edit Profile</Text>
            <Text
              style={{
                marginTop: -45,
                fontSize: 20,
                marginLeft: -90,
                color: Colors.eyeIcon,
              }}>
              Cancel
            </Text>
            <Text
              style={{
                marginTop: -30,
                fontSize: 20,
                marginLeft: 300,
                color: Colors.eyeIcon,
              }}
              onPress={() => update()}>
              Done
            </Text>
          </View>
        </Pressable>

        <Divider />
        <Image
          source={require('../assets/images/aadhi-logo.jpeg')}
          style={styles.image}
        />
        <Text
          style={{
            fontSize: 18,
            justifyContent: 'center',
            marginLeft: '30%',
            marginTop: 10,
            fontFamily: 'Montserrat-Light',
            marginBottom: 15,
          }}>
          Change Your Profile Photo
        </Text>
        <Divider />

        <View style={styles.container}>
          <Text style={styles.containerHeading}>Name</Text>
          <TextInput
            onChangeText={(val) => setName(val)}
            style={styles.containerAnswer}
            value={name}
          />
        </View>
        <Divider />
        <View style={styles.container}>
          <Text style={styles.containerHeading}>E - MAIL</Text>
          <TextInput
            onChangeText={(val) => setEmail(val)}
            style={styles.containerAnswer}
            value={email}
          />
        </View>
        <Divider />
        <View style={styles.container}>
          <Text style={styles.containerHeading}>Phone</Text>
          <TextInput
            onChangeText={(val) => setPhone(val)}
            style={styles.containerAnswer}
            value={phone}
          />
        </View>
        <Divider />
        <View style={styles.container}>
          <Text style={styles.containerHeading}>Address 1</Text>
          <TextInput
            onChangeText={(val) => setAddress1(val)}
            style={styles.containerAnswer}
            value={address1}
          />
        </View>
        <Divider />
        <View style={styles.container}>
          <Text style={styles.containerHeading}>Address 2</Text>
          <TextInput
            onChangeText={(val) => setAddress2(val)}
            style={styles.containerAnswer}
            value={address2}
          />
        </View>
        <Divider />
        <View style={styles.container}>
          <Text style={styles.containerHeading}>City</Text>
          <TextInput
            onChangeText={(val) => setCity(val)}
            style={styles.containerAnswer}
            value={city}
          />
        </View>
        <Divider />
        <View style={styles.container}>
          <Text style={styles.containerHeading}>State</Text>
          <TextInput
            onChangeText={(val) => setState(val)}
            style={styles.containerAnswer}
            value={state}
          />
        </View>
        <Divider />
        <View style={styles.container}>
          <Text style={styles.containerHeading}>Zipcode</Text>
          <TextInput
            onChangeText={(val) => setZipCode(val)}
            style={styles.containerAnswer}>
            {data.zip}
          </TextInput>
        </View>
        <Divider />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    justifyContent: 'center',
    marginLeft: '23%',
    marginTop: 10,
    fontFamily: 'Montserrat-Light',
    marginBottom: 15,
  },
  image: {
    width: 95,
    height: 95,
    borderRadius: 50,
    marginTop: 30,
    marginLeft: 200,
  },
  container: {
    marginVertical: 20,
    fontSize: 18,
    flex: 1,
    justifyContent: 'space-between',
  },
  containerHeading: {
    fontSize: 18,
    color: Colors.eyeIcon,
    fontFamily: 'Montserrat-Light-Light',
    marginLeft: 60,
    width: '50%',
    marginTop: 10,
  },
  containerAnswer: {
    fontSize: 18,
    fontStyle: 'normal',
    fontFamily: 'Montserrat-Light',
    fontWeight: 'normal',
    color: '#030303',
    width: '50%',
    marginLeft: 200,
    marginTop: -35,
  },
});
