import React, {useState, useEffect} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {RootView} from '../components/RootView';
import R from '../R';
import {CustomButton} from '../components';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {LocationIqKey} from '../../res/constants';

export const DetectLocation = ({navigation}) => {
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState({});
  const [Error, setError] = useState({});
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (pos) => apiGetCountry(pos.coords.latitude, pos.coords.longitude),
      (err) => console.log(err),
    );
  };

  const apiGetCountry = (lat, lon) => {
    const api = `https://us1.locationiq.com/v1/reverse.php?key=${LocationIqKey}&lat=${lat}&lon=${lon}&format=json`;
    const request = axios.get(api);
    request
      .then((res) => {
        console.log(res.data.address);
        setData(res.data.address);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const addDataToAsync = async () => {
    console.log('Done.');
    try {
      await AsyncStorage.setItem('myCountry', Data.country_code);
    } catch (e) {
      // save error
    }
    console.log('Done.');
  };

  return (
    <RootView style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flex: 8, justifyContent: 'center'}}>
        <Image source={R.images.virus} style={{marginVertical: '5%'}}></Image>
      </View>
      <View style={{flex: 1}}>
        {Loading ? (
          <ActivityIndicator size="large" color={R.colors.green} />
        ) : (
          <Text style={{fontSize: R.dimensions.hp('5%')}}>{Data.country}</Text>
        )}
      </View>
      <View style={{flex: 1}}>
        <CustomButton
          color={R.colors.blue}
          title={'Next'}
          onPress={() => {
            addDataToAsync();
            navigation.navigate('Home');
          }}></CustomButton>
      </View>
    </RootView>
  );
};
