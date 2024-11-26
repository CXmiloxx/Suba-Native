import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/home/Home';
import Registro from '../components/registro';
import NavButtons from '../components/layout/NavButtons';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Registro" component={Registro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
