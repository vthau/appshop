import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Button,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import CallAPI from './../../../utils/CallAPI';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Home from './Home/Home';
import Contact from './Contact/Contact';
import Search from './Search/Search';
import Cart from './Cart/Cart';
import Header from './Header';

const Tab = createBottomTabNavigator();
const {height} = Dimensions.get('window');

function Shop(props) {
  const {navigation} = props;

  const goBackMain = () => {
    navigation.pop();
  };

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} />
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: 12,
          },
          activeTintColor: 'blue',
          inactiveTintColor: 'black',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Trang chu',
            tabBarIcon: ({color}) => (
              <FontAwesome5 name={'home'} size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: 'Gio hang',
            tabBarIcon: ({color}) => (
              <FontAwesome5 name={'shopping-cart'} size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarLabel: 'Tim kiem',
            tabBarIcon: ({color}) => (
              <FontAwesome5 name={'search'} size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Contact"
          component={Contact}
          options={{
            tabBarLabel: 'Lien he',
            tabBarIcon: ({color}) => (
              <FontAwesome5 name={'address-book'} size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Shop;
