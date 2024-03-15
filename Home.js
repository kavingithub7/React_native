import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import ImageSlider from '../components/ImageSlider';
import ProductContainer from '../components/ProductContainer';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import {NavigationContext} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logout = async () => {
  AsyncStorage.removeItem('id')
    .then(async (value) => {
      ToastAndroid.showWithGravityAndOffset(
        'Logout Successfully',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      navigation.navigate('Home');
    })
    .catch((err) => console.log(err));
};

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainDiv}>
      <ScrollView
        style={styles.innerView}
        contentContainerStyle={{paddingBottom: '90%'}}>
        <View style={styles.logoDiv}>
          <Image
            source={require('../assets/images/aadhi-logo.jpeg')}
            style={styles.logo}
          />
        </View>
        <SearchBar onPress={() => alert('HI')} />
        <ImageSlider />
        <ProductContainer title="Exclusive Offer" navigation={navigation} />
      </ScrollView>

      {/* <View>
        <Text
          style={{fontSize: 24}}
          onPress={() => navigation.navigate('Favourites')}>
          Favourites |
          <Text
            style={{fontSize: 24}}
            onPress={() => navigation.navigate('Profile')}>
            Profile
          </Text>
        </Text>
      </View>
      <View>
        <Text
          style={{fontSize: 22}}
          onPress={() => navigation.navigate('Subscribe')}>
          Subscribe |
          <Text
            style={{fontSize: 24}}
            onPress={() => navigation.navigate('Subscription')}>
            Subscription
          </Text>
        </Text>
      </View>

      <View>
        <Text
          style={{fontSize: 20}}
          onPress={() => navigation.navigate('Myorders')}>
          My Orders
        </Text>
      </View>

      <View>
        <Text
          onPress={() => {
            logout();
          }}>
          Log Out
        </Text>
      </View>
      <View>
        <Text
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Login
        </Text>
      </View> */}
      {/* <View>
        <Text
          onPress={() => {
            logout();
          }}>
          Log Out
        </Text>
      </View> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainDiv: {
    height: 51,
    flex: 1,
    backgroundColor: '#fff',
  },
  innerView: {
    paddingHorizontal: 20,
  },
  logoDiv: {
    alignItems: 'center',
  },
  logo: {
    height: 80,
    width: 90,
    marginTop: 10,
  },
});

export default Home;
