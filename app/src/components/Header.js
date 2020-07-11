import React from 'react';
import {View, Text} from 'react-native';
import R from '../R';
import Icon from 'react-native-vector-icons/Feather';
export const Header = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '500',
          fontSize: R.dimensions.hp('2%'),
        }}
        onPress={props.onPress}>
        {props.title}
      </Text>
      <Icon name={props.icon ? 'arrow-up' : 'arrow-down'}></Icon>
    </View>
  );
};
