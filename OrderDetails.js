import axios from '../others/constants';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import OrderDetailComponent from '../components/OrderDetailComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrderDetails({navigation, route}) {
  let routeData = route.params;
  //   console.log(routeData);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [orderData, setOrderData] = useState({});

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
          console.log(data.data.data);
          if (data.data.status === 400) return alert('Somthing Went Wrong');
          else {
            setOrderData(data.data.data[0]);
          }
        })
        .catch((err) => console.log(err));
    });
    fetchData();
  }, []);

  const fetchData = () => {
    let id = routeData.order_id;
    axios
      .get('/orders/orderDetail/' + id)
      .then((data) => {
        setData(data.data.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

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
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} />
            <Text style={styles.headerTitle}>Order Details</Text>
          </View>
          <View style={{width: '100%', backgroundColor: '#FFF'}}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Montserrat-Light',
                fontStyle: 'normal',
                marginLeft: 20,
                marginTop: 10,
                color: '#53b175',
              }}>
              ITEMS
            </Text>
            <Text
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: '#E2E2E2',
                marginTop: -10,
              }}></Text>
          </View>
          <View style={{width: '100%', backgroundColor: '#FFF'}}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Montserrat-Light',
                marginLeft: 10,
                marginTop: 10,
                color: '#7C7C7C',
              }}>
              Order Number : D01
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Montserrat-Light',
                marginLeft: 290,
                marginTop: -30,
                color: '#7C7C7C',
              }}>
              Items : {4} | Rs.{orderData.total_amount}
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{flex: 1, paddingBottom: '35%'}}
            style={{minHeight: '80%'}}>
            <View>
              <FlatList
                contentContainerStyle={{flexGrow: 1, paddingBottom: '5%'}}
                data={data}
                keyExtractor={(item) => item.Id}
                renderItem={(item) => <OrderDetailComponent data={item.item} />}
              />
            </View>

            <ScrollView
              style={{
                minHeight: '70%',
                flex: 1,
                width: '100%',
                backgroundColor: '#FFF',
                // alignItems: 'center',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Montserrat-Light',
                    marginLeft: 10,
                    marginTop: 10,
                    color: '#000000',
                  }}>
                  Total Amount : {orderData.total_amount}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Montserrat-Light',
                    marginLeft: 10,
                    marginTop: 10,
                    color: '#000000',
                  }}>
                  Discount Amount :
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Montserrat-Light',
                    marginLeft: 10,
                    marginTop: 10,
                    color: '#000000',
                  }}>
                  Discounted Total :
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Montserrat-Light',
                    marginLeft: 10,
                    marginTop: 10,
                    color: '#000000',
                  }}>
                  Tax Amount :
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Montserrat-Light',
                    marginLeft: 10,
                    marginTop: 10,
                    color: '#000000',
                  }}>
                  Net Total :
                </Text>
              </View>
            </ScrollView>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#53b175',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    width: '100%',
    marginLeft: '40%',
  },
});
