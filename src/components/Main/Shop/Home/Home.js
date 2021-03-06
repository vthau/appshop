import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import ProductDetail from './../ProductDetail/ProductDetail';
import ListProduct from './../ListProduct/ListProduct';
import HomeView from './HomeView';

const Stack = createStackNavigator();

function Home(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeView">
      <Stack.Screen name="HomeView" component={HomeView} />
      <Stack.Screen name="ListProduct" component={ListProduct} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
}

export default Home;

const styles = StyleSheet.create({});
