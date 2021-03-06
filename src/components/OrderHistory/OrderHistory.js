import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {fetchHistory} from './../../actions/actions';
import backSpecial from '../../media/appIcon/backs.png';

function OrderHistory(props) {
  const {navigation} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHistory());
  }, []);

  const history = useSelector(state => state.orderHistoryReducer.orderHistory);

  const goBackToMain = () => {
    navigation.pop();
  };

  const {wrapper, header, headerTitle, backIconStyle, body, orderRow} = styles;

  return (
    <View style={wrapper}>
      <View style={header}>
        <View />
        <Text style={headerTitle}>Order History</Text>
        <TouchableOpacity onPress={() => goBackToMain()}>
          <Image source={backSpecial} style={backIconStyle} />
        </TouchableOpacity>
      </View>
      <View style={body}>
        <ScrollView>
          {history.length > 0 &&
            history.map((value, key) => (
              <View key={key} style={orderRow}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: '#9A9A9A', fontWeight: 'bold'}}>
                    Order id:
                  </Text>
                  <Text style={{color: '#2ABB9C'}}>{value.id}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: '#9A9A9A', fontWeight: 'bold'}}>
                    OrderTime:
                  </Text>
                  <Text style={{color: '#C21C70'}}>{value.date_order}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: '#9A9A9A', fontWeight: 'bold'}}>
                    Status:
                  </Text>
                  <Text style={{color: '#2ABB9C'}}>Pending</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: '#9A9A9A', fontWeight: 'bold'}}>
                    Total:
                  </Text>
                  <Text style={{color: '#C21C70', fontWeight: 'bold'}}>
                    {value.total}$
                  </Text>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: '#fff'},
  header: {
    flex: 1,
    backgroundColor: '#2ABB9C',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
  }, // eslint-disable-line
  headerTitle: {fontFamily: 'Avenir', color: '#fff', fontSize: 20},
  backIconStyle: {width: 30, height: 30},
  body: {flex: 10, backgroundColor: '#F6F6F6'},
  orderRow: {
    height: width / 3,
    backgroundColor: '#FFF',
    margin: 10,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.2,
    padding: 10,
    borderRadius: 2,
    justifyContent: 'space-around',
  },
});

export default OrderHistory;
