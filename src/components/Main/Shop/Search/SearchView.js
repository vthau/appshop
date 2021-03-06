import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import * as Config from './../../../../Config/config';
const URLImage = Config.API_URL + Config.URL_IMAGE_PRODUCT;

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

function SearchView(props) {
  const {navigation} = props;

  const search = useSelector(state => state.searchReducer.search);

  const gotoDetail = () => {
    navigation.push('ProductDetail');
  };

  const {
    product,
    mainRight,
    txtMaterial,
    txtColor,
    txtName,
    txtPrice,
    productImage,
    txtShowDetail,
    showDetailContainer,
    wrapper,
  } = styles;

  return (
    <ScrollView style={wrapper}>
      {search.length !== 0 &&
        search.map((value, key) => (
          <View key={key} style={product}>
            <Image
              source={{uri: `${URLImage}${value.images[0]}`}}
              style={productImage}
            />
            <View style={mainRight}>
              <Text style={txtName}>{toTitleCase(value.name)}</Text>
              <Text style={txtPrice}>{value.price}$</Text>
              <Text style={txtMaterial}>Material Fur</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={txtColor}>{value.color}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={txtColor}>{value.color}</Text>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      backgroundColor: 'white',
                      borderRadius: 15,
                      marginLeft: 10,
                    }}
                  />
                </View>
              </View>
              <TouchableOpacity style={showDetailContainer}>
                <Text style={txtShowDetail}>SHOW DETAILS</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
    </ScrollView>
  );
}

const {width} = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F6F6F6',
    flex: 1,
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
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  txtColor: {
    paddingLeft: 20,
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  txtMaterial: {
    paddingLeft: 20,
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  txtShowDetail: {
    color: '#C21C70',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Avenir',
    textAlign: 'right',
  },
  showDetailContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: 100,
  },
});

export default SearchView;
