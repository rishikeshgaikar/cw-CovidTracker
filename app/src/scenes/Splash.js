import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {RootView} from '../components/RootView';
import R from '../R';

import AsyncStorage from '@react-native-community/async-storage';

export const Splash = ({navigation}) => {
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('myCountry');
        console.log(value);
        if (value !== null) {
          setTimeout(() => {
            navigation.navigate('Home');
          }, 2000);
        } else {
          setTimeout(() => {
            navigation.navigate('DetectLocation');
          }, 2000);
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  return (
    <RootView style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image source={R.images.virus} style={{marginVertical: '5%'}} />
      <Text style={{fontSize: R.dimensions.hp('5%')}}>CovidTracker</Text>
    </RootView>
  );
};
