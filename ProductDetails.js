import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Pressable,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Colors from '../assets/colors/colors';
import Button from '../components/Button';
import Divider from '../components/Divider';
import axios from '../others/constants';
import {SliderBox} from 'react-native-image-slider-box';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductDetails({route, navigation}) {
  const [customerId, setCustomerId] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('id').then(async (value) => {
      setCustomerId(value);
    });
    fetchData();
  }, []);

  const [data, setData] = useState({});
  const [image, setImage] = useState('');
  const [id] = useState(route.params.data.item_id);

  const fetchData = () => {
    axios
      .get(`/product/v1/catalog/items/${id}`)
      .then((data) => {
        console.log(data.data.data[0].img_url_1);
        setData(data.data.data[0]);
        setImage(data.data.data[0].img_url_1);
      })
      .catch((err) => alert(err));
  };

  const AddToCart = () => {
    // alert('hi');
    if (customerId === null) {
      ToastAndroid.show('You need to login', ToastAndroid.SHORT);
      return navigation.navigate('Login');
    } else {
      let image = data.img_url_1;
      // console.log(image);
      axios
        .post(
          `/orders/addtocart/${customerId}/${data.item_name}/${data.item_desc}/${count}/${data.price}`,
        )
        .then((result) => {
          if (result.data.status === 1) {
            alert('Product has been added successfully');
          }
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    }
  };

  const Favourites = () => {
    // alert('hi');
    if (customerId === null) {
      ToastAndroid.show('You need to login', ToastAndroid.SHORT);
      return navigation.navigate('Login');
    } else {
      let image = data.img_url_1;
      // console.log(image);
      axios
        .post(
          `/favourites/favourites/${customerId}/${data.item_id}/${data.item_name}/${data.item_desc}/${data.category_id}/${data.brand_id}`,
        )
        .then((result) => {
          if (result.data.status === 1) {
            alert('Favourites added successfully');
          }
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    }
  };

  const images = [
    data.img_url_1,
    data.img_url_2,
    data.img_url_3,
    data.img_url_4,
  ];
  const [count, setCount] = useState(1);

  let price = data.price * count;
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Pressable style={styles.header} onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={25} color={Colors.primaryBlack} />
        </Pressable>
        <Pressable
          style={{
            paddingHorizontal: 20,
            marginTop: -35,
            marginBottom: 10,
            marginLeft: 400,
          }}
          onPress={() => navigation.push('AddToCart')}>
          <Icon name="shoppingcart" size={25} color={Colors.primaryBlack} />
        </Pressable>

        <SliderBox
          style={styles.image}
          images={images}
          dotColor="#DC1D0B"
          inactiveDotColor="#C4C4C4"
          autoplay
          circleLoop
        />
        {/* name,price,wishlist */}

        <View style={styles.bottomDiv}>
          <View style={styles.nameDiv}>
            <View>
              <Text style={styles.name}>{data.item_name}</Text>
              <Text style={styles.desc}>{data.net_wt} kg</Text>
            </View>
            <Icon2
              name="heart-outlined"
              onPress={() => Favourites()}
              size={30}
            />
          </View>
          <View style={styles.cartDiv}>
            <View style={styles.cartFuncDiv}>
              <Pressable
                style={styles.cartFuncDiv1}
                onPress={() => setCount(count - 1)}
                value={count}>
                <Icon2 name="minus" size={30} color="#b3b3b3" />
              </Pressable>
              <View style={styles.cartFuncDiv2}>
                <Text>{count}</Text>
              </View>
              <Pressable
                style={styles.cartFuncDiv3}
                onPress={() => setCount(count + 1)}
                value={count}>
                <Icon2 name="plus" size={30} color={Colors.buttonGreen} />
              </Pressable>
            </View>
            <View>
              <Text style={styles.price}>${price}</Text>
            </View>
          </View>
          <Divider />
          <View style={styles.productDetails}>
            <Text style={styles.heading}>Product Detail</Text>
            <Text style={styles.answer}>{data.item_desc}</Text>
          </View>
          <Divider />
          <View style={styles.productDetails}>
            <Text style={styles.heading}>Nutritious</Text>
            <Text style={styles.answer}>{data.ingredients}</Text>
          </View>
          <Divider />
        </View>
      </ScrollView>
      <View style={{paddingHorizontal: 20, marginBottom: 20}}>
        <Button onPress={() => AddToCart()} title="Add To Basket" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    height: 250,
    width: '100%',

    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  bottomDiv: {
    padding: 20,
  },
  nameDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 22,
    color: Colors.primaryBlack,
  },
  desc: {
    fontSize: 14,
    marginTop: 11,
    color: Colors.primaryGray,
  },
  cartDiv: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cartFuncDiv: {
    flex: 1,
    flexDirection: 'row',
  },
  cartFuncDiv1: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  cartFuncDiv2: {
    height: 45,
    width: 45,
    borderWidth: 2,
    borderColor: Colors.lightGray,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  cartFuncDiv3: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  price: {
    fontSize: 20,
    color: Colors.primaryBlack,
  },
  productDetails: {
    marginVertical: 20,
    fontSize: 18,
  },
  heading: {
    fontSize: 18,
    color: Colors.primaryBlack,
  },
  answer: {
    marginTop: 10,
    fontSize: 13,
    color: Colors.primaryGray,
  },
});
