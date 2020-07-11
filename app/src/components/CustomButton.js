import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import R from '../R';

const styles = StyleSheet.create({
  buttonTouchableOpacity: {
    marginHorizontal: 40,
    marginVertical: 16,
    padding: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: R.colors.green,
  },
  buttonText: {
    fontSize: 20,
    color: R.colors.white,
  },
});

export const CustomButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.buttonTouchableOpacity, {backgroundColor: props.color}]}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};
