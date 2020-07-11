import React from 'react';
import {View, StatusBar} from 'react-native';
import R from '../R';

export const RootView = (props) => {
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: R.colors.white,
        },
        props.style,
      ]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={R.colors.white} />
      {props.children}
    </View>
  );
};
