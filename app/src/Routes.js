import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Splash, DetectLocation, Home} from './scenes';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Splash'} component={Splash} />
        <Stack.Screen name={'DetectLocation'} component={DetectLocation} />
        <Stack.Screen name={'Home'} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
