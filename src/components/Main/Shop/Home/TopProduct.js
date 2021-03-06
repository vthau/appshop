import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {fetchTopProductRequest} from './../../../../actions/actions';
import * as Config from './../../../../Config/config';
const {width} = Dimensions.get('window');
const productWidth = (width - 50) / 2;
const productHeight = (productWidth / 361) * 452;
const URLImage = Config.API_URL + Config.URL_IMAGE_PRODUCT;

function TopProduct(props) {
  const {navigation} = props;

  const topProduct = useSelector(state => state.topProductReducer.topProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopProductRequest());
  }, [dispatch]);

  const gotDetail = product => {
    navigation.push('ProductDetail', product);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleContaienr}>
        <Text style={styles.title}>Top Product</Text>
      </View>
      <View style={styles.body}>
        {topProduct.map((value, key) => (
          <TouchableOpacity
            key={key}
            style={styles.productContainer}
            onPress={() => gotDetail(value)}>
            <Image
              style={styles.productImage}
              source={{uri: `${URLImage}${value.images[0]}`}}
            />
            <Text style={styles.productName}>{value.name}</Text>
            <Text style={styles.productPrice}>{value.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  titleContaienr: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  title: {
    color: '#3dd3cf',
    fontSize: 20,
  },
  productContainer: {
    backgroundColor: 'white',
    width: productWidth,
    paddingBottom: 10,
    marginBottom: 15,
    shadowColor: '#2E272B',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 2,
  },
  productImage: {
    width: productWidth,
    height: productHeight,
  },
  productName: {
    marginVertical: 5,
    color: '#3dd3cf',
    paddingLeft: 10,
  },
  productPrice: {
    color: 'grey',
    paddingLeft: 10,
  },
});

export default TopProduct;
