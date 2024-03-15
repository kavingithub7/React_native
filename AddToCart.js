import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Pressable} from 'react-native';
import AddToCartContainer from '../components/AddToCartContainer';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../assets/colors/colors';
import Button from '../components/Button';
import {ScrollView} from 'react-native-gesture-handler';
import axios from '../others/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddToCart({navigation}) {
  // let routeData = route.params;
  const [customerId, setCustomerId] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('id').then((value) => {
      setCustomerId(value);
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
      fetchData();
      fetchData1();
    });
  }, []);
  const [value, setValue] = useState({});
  const [data, setData] = useState({});

  const fetchData = () => {
    axios
      .get('/orders/addtocart/' + customerId)
      .then((data) => {
        console.log(data.data.data);
        setValue(data.data.data);
      })
      .catch((err) => console.log(err));
  };
  const fetchData1 = () => {
    axios
      .get('/orders/addtocart/' + customerId)
      .then((data) => {
        console.log(data.data.data);
        setData(data.data.data[0]);
      })
      .catch((err) => console.log(err));
  };
  const confirmOrder = () => {
    axios
      .post('/orders/', {
        customer_id: data.customer_id,
        total_discount_amount: 10,
        total_tax_amount: 10,
        total_amount: 100,
        crte_by: data.customer_id,
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.status === 200) {
          insertOrderDetail(result.data.lastId);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const insertOrderDetail = (lid) => {
    value.map((d, i) => {
      let item_discount = 10;
      let item_discount_amount = 10;
      let item_amount = d.rate * d.quantity;
      let item_sale_amount = item_amount + d.tax_amount - item_discount_amount;

      axios
        .post('/orders/createorderdetails', {
          order_id: lid,
          item_id: d.item_id,
          item_rate: d.rate,
          quantity: d.quantity,
          item_amount: item_amount,
          item_tax_amount: d.tax_amount,
          item_discount: item_discount,
          item_discount_amount: item_discount_amount,
          item_sale_amount: item_sale_amount,
          item_sale_amount: item_sale_amount,
          crte_by: d.customer_id,
        })
        .then((result) => {
          if (result.data.status === 200) {
            alert('Order Placed Successfully');
            navigation.navigate('Home');
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    });
  };

  return (
    <SafeAreaView style={styles.mainDiv}>
      <ScrollView>
        <View style={styles.subDiv}>
          <Pressable
            style={styles.header}
            onPress={() => navigation.push('Home')}>
            <Icon name="arrowleft" size={25} color={Colors.primaryBlack} />
          </Pressable>
          <Text style={styles.heading}>My Cart</Text>
          <View
            style={{
              borderBottomColor: '#E2E2E2',
              borderBottomWidth: 1,
              position: 'absolute',
              width: '110%',
              top: 50,
            }}
          />
        </View>
        <AddToCartContainer navigation={navigation} />
      </ScrollView>
      <View style={{paddingHorizontal: 20, marginBottom: 20}}>
        <Button onPress={() => confirmOrder()} title="Checkout" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  subDiv: {
    marginTop: 20,
    width: '100%',
    paddingLeft: 14,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 22,
    justifyContent: 'center',
    marginLeft: '40%',
    marginTop: -25,
  },
  mainDiv: {
    height: 51,
    flex: 1,
    backgroundColor: '#fff',
  },
});
