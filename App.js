import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, TextInput, TouchableWithoutFeedback, StyleSheet, Dimensions, StatusBar, Keyboard } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const { height, width } = Dimensions.get("window");
import Home from "./home.js";
import Signup from "./signup.js";
import Login from "./login.js";
import Cart from './cart.js';
import Search from './search.js';
import Product from './product.js';
import Payment from './payment.js'
import Orders from './orders.js'
import Settings from './settings.js'

export default function App() {
 const Stack = createStackNavigator()

  return (
          <NavigationContainer>         
          <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
		flex: 1,
		height: height,
		width: width
  },
});
