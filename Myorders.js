import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
  Pressable,
} from 'react-native';
import axios from '../others/constants';
import {ScrollView} from 'react-native-gesture-handler';
import OrderCard from '../components/OrderCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../assets/colors/colors';
import Icon from 'react-native-vector-icons/AntDesign';

const Myorders = ({navigation}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
        .get('orders/' + value)
        .then((data) => {
          if (data.data.status === 400) return alert('Somthing Went Wrong');
          else {
            setData(data.data.data);
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));
    });
    console.log(data);
  }, []);

  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#53b175" />
      {isLoading ? (
        <View
          style={{
            height: '100%',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#53b175" />
        </View>
      ) : (
        <View>
          <View>
            <View style={styles.header}>
              <View style={{alignItems: 'flex-start', width: '100%'}}>
                <Pressable onPress={() => navigation.push('Home')}>
                  <Icon
                    name="arrowleft"
                    size={25}
                    color={Colors.primaryBlack}
                  />
                </Pressable>
                <Text style={styles.headerTitle}>My Orders</Text>
              </View>
            </View>
          </View>

          <ScrollView style={{height: '95%'}}>
            <FlatList
              contentContainerStyle={{flexGrow: 1, paddingBottom: '30%'}}
              data={data}
              keyExtractor={(item) => item.Id}
              renderItem={(item) => (
                <OrderCard data={item} navigation={navigation} />
              )}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 22,
    justifyContent: 'center',
    marginLeft: '40%',
    marginTop: -30,
  },
  mainCon: {
    borderRadius: 5,
    margin: 13,
  },
});

export default Myorders;
