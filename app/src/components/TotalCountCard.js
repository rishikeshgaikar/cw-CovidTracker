import React from 'react';
import {View, Text} from 'react-native';
import {Card} from './Card';
import R from '../R';

export const TotalCountCard = (props) => {
  return (
    <Card color={props.color == null ? R.colors.blue : props.color}>
      <View style={{height: '100%', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: R.dimensions.hp('2%')}}>
          {props.title}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: R.dimensions.hp('2.8%'),
            fontWeight: '500',
          }}>
          {props.count}
        </Text>
      </View>
    </Card>
  );
};
