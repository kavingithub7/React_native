import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../assets/colors/colors';
import Button from '../components/Button';
import Divider from '../components/Divider';
import axios from '../others/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Subscribtion({navigation}) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('id').then((value) => {
      axios
        .get('/user/' + value)
        .then((data) => {
          if (data.data.status != 400) return alert('Somthing Went Wrong');
          else {
            console.log(data.data.data);

            setData(data.data.data[0]);
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));
    });
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView>
        <Pressable
          style={{marginTop: 10, marginLeft: 10}}
          onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={25} color={Colors.primaryBlack} />
        </Pressable>
        <Text style={styles.heading}>Subscription</Text>
        <Divider />
        <View style={styles.container}>
          <Text style={styles.containerHeading}>Name</Text>
          <Text style={styles.containerAnswer}>
            {data.first_name} {data.last_name}
          </Text>
        </View>
        <View style={styles.bottomBorder} />
        <View style={styles.container}>
          <Text style={styles.containerHeading}>Address</Text>
          <Text style={styles.containerAnswer}>
            {data.address1}, {data.address2}, {data.city}
          </Text>
        </View>
        <View style={styles.bottomBorder} />
        <View style={styles.container}>
          <Text style={styles.containerHeading}>Zipcode</Text>
          <Text style={styles.containerAnswer}>{data.zip}</Text>
        </View>
        <View style={styles.bottomBorder} />
        <View style={styles.container}>
          <Text style={styles.containerHeading}>Available Balance</Text>
          <TextInput style={styles.containerAnswer} value="1000" />
        </View>
        <View style={styles.bottomBorder} />
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: 100,
          justifyContent: 'space-between',
        }}>
        <View style={{width: 200}}>
          <Button title="Topup" style={{width: 200}} />
        </View>
        <View style={{width: 200, marginLeft: 230, marginTop: -105}}>
          <Button title="Confirm" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    justifyContent: 'center',
    marginLeft: '40%',
    marginTop: -20,
    fontFamily: 'Montserrat-Light',
    marginBottom: 15,
  },
  question: {
    color: 'black',
    fontSize: 18,
    marginBottom: -15,
    backgroundColor: '#E5E5E5',
  },
  container: {
    marginVertical: 20,
    fontSize: 18,
    // alignItems: 'center',
  },
  containerHeading: {
    fontSize: 16,
    color: Colors.eyeIcon,
    fontFamily: 'Montserrat-Light-Light',
    marginLeft: 30,
  },
  containerAnswer: {
    marginTop: 30,
    fontSize: 18,
    fontStyle: 'normal',
    fontFamily: 'Montserrat-Light',
    fontWeight: 'normal',
    color: '#030303',
    marginLeft: 50,
  },
  bottomBorder: {
    height: 1,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    width: '90%',
    marginLeft: 25,
  },
});
