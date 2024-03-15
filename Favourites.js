import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  ToastAndroid,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../assets/colors/colors';
import Button from '../components/Button';
import Divider from '../components/Divider';
import axios from '../others/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavouriteComponent from '../components/FavouritesComponent';

export default function Favourites({navigation}) {
  const [data, setData] = useState({});
  const [customerId, setCustomerId] = useState(null);
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
      fetchData();
    });
  }, []);

  const fetchData = () => {
    axios
      .get(`/favourites/` + 1)
      .then((data) => {
        console.log(data.data.data);
        setData(data.data.data);
      })
      .catch((err) => alert(err));
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <Text style={styles.heading}>Favourites</Text>
      <Divider />
      <FlatList
        contentContainerStyle={{flexGrow: 1, paddingBottom: '5%'}}
        data={data}
        keyExtractor={(item) => item.Id}
        renderItem={(item) => <FavouriteComponent data={item.item} />}
      />
      {/* <ScrollView>
        <View style={styles.mainDiv}>
          <Image
            source={{
              uri:
                'https://farmfreshfoodies.s3.ap-south-1.amazonaws.com/8166634.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.subDiv}>
            <Text style={styles.name}>{data.item_name}</Text>
            <Text style={styles.desc}>{data.item_desc}</Text>
          </View>
          <View style={styles.subDiv}>
            <View>
              <Text style={styles.price}>$ {data.rate} </Text>
              <Pressable
                style={{marginLeft: 410, marginTop: -25}}
                onPress={(data) => console.log(data)}>
                <Icon name="arrowright" size={25} color={Colors.primaryBlack} />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView> */}
      <View style={{paddingHorizontal: 20, marginBottom: 20}}>
        <Button title="Add All To Cart" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    justifyContent: 'center',
    marginLeft: '40%',
    marginTop: 10,
    fontFamily: 'Montserrat-Light',
    marginBottom: 15,
  },

  mainDiv: {
    marginTop: 10,
    height: 130,
    width: 450,
    marginLeft: 10,
    borderBottomWidth: 2,
    borderColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 95,
    height: 95,
    borderRadius: 10,
    marginLeft: -320,
    marginTop: 30,
  },
  subDiv: {
    marginTop: 20,
    width: '100%',
    paddingLeft: 14,
  },
  name: {
    fontSize: 18,
    color: Colors.primaryBlack,
    marginTop: -100,
    marginLeft: 120,
  },
  desc: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 120,
    color: Colors.primaryGray,
  },

  price: {
    fontSize: 18,
    marginTop: -110,
    marginLeft: 340,
  },

  cartDiv: {
    marginTop: -60,
    marginLeft: 250,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});
