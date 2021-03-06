import React from 'react';
import {Provider} from 'react-redux';
import store from './../store';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Authentication from './Authentication/Authentication';
import ChangeInfo from './ChangeInfo/ChangeInfo';
import Main from './Main/Main';
import OrderHistory from './OrderHistory/OrderHistory';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Main">
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Authentication" component={Authentication} />
          <Stack.Screen name="ChangeInfo" component={ChangeInfo} />
          <Stack.Screen name="OrderHistory" component={OrderHistory} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
// adb connect 127.0.0.1:21503
