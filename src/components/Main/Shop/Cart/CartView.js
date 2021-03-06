import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import readStorage from './.././../../../utils/readStorage';
import writeStorage from './.././../../../utils/writeStorage';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchCartFromAsyncStorage,
  updateCart,
  deleteProductFromCart,
  sendOrder,
} from './../../../../actions/actions';

import * as Config from './../../../../Config/config';
const URLImage = Config.API_URL + Config.URL_IMAGE_PRODUCT;

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

function CartView(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartFromAsyncStorage());
  }, [dispatch]);

  const {navigation} = props;

  const cart = useSelector(state => state.cartReducer.cart);

  increaseProduct = product => {
    const newProduct = {
      ...product,
      quantity: product.quantity + 1,
    };
    dispatch(updateCart(newProduct));
  };

  decreaseProduct = product => {
    if (product.quantity - 1 > 0) {
      const newProduct = {
        ...product,
        quantity: product.quantity - 1,
      };
      dispatch(updateCart(newProduct));
    }
  };

  deleteProduct = id => {
    dispatch(deleteProductFromCart(id));
  };

  const onSendOrder = () => {
    const arrayDetail = cart.map((value, key) => ({
      id: value.id,
      quantity: value.quantity,
    }));
    dispatch(sendOrder(arrayDetail));
  };

  const {
    main,
    checkoutButton,
    checkoutTitle,
    wrapper,
    product,
    mainRight,
    productController,
    txtName,
    txtPrice,
    productImage,
    numberOfProduct,
    txtShowDetail,
    showDetailContainer,
  } = styles;

  // var total = cart.reduce((a, b) => a + b);
  var total = 0;
  cart.forEach((product, index) => {
    total += product.price * product.quantity;
  });

  return (
    <View style={wrapper}>
      <ScrollView style={main}>
        {cart &&
          cart.map((value, key) => {
            return (
              <View key={key} style={product}>
                <Image
                  source={{uri: `${URLImage}${value.images[0]}`}}
                  style={productImage}
                />
                <View style={[mainRight]}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={txtName}>{toTitleCase(value.name)}</Text>
                    <TouchableOpacity onPress={() => deleteProduct(value.id)}>
                      <Text
                        style={{
                          fontFamily: 'Avenir',
                          color: '#969696',
                          padding: 6,
                        }}>
                        X
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={txtPrice}>{value.price}$</Text>
                  </View>
                  <View style={productController}>
                    <View style={numberOfProduct}>
                      <TouchableOpacity onPress={() => increaseProduct(value)}>
                        <Text style={{padding: 10}}>+</Text>
                      </TouchableOpacity>
                      <Text style={{padding: 10}}>{value.quantity}</Text>
                      <TouchableOpacity onPress={() => decreaseProduct(value)}>
                        <Text style={{padding: 10}}> -</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={showDetailContainer}
                      onPress={() => navigation.push('ProductDetail', value)}>
                      <Text style={txtShowDetail}>SHOW DETAILS</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
      </ScrollView>
      <TouchableOpacity style={checkoutButton} onPress={onSendOrder}>
        <Text style={checkoutTitle}>TOTAL {total}$ CHECKOUT NOW</Text>
      </TouchableOpacity>
    </View>
  );
}

const {width} = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#DFDFDF',
  },
  checkoutButton: {
    height: 50,
    margin: 10,
    marginTop: 0,
    backgroundColor: '#2ABB9C',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    width,
    backgroundColor: '#DFDFDF',
  },
  checkoutTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  product: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
  },
  productImage: {
    width: imageWidth,
    height: imageHeight,
    flex: 1,
    resizeMode: 'center',
  },
  mainRight: {
    flex: 3,
    justifyContent: 'space-between',
  },
  productController: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberOfProduct: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  txtName: {
    paddingLeft: 20,
    color: '#A7A7A7',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  txtPrice: {
    paddingLeft: 20,
    color: '#C21C70',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  txtShowDetail: {
    color: '#C21C70',
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Avenir',
    textAlign: 'right',
  },
  showDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default CartView;
