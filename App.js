import React, { useState, useEffect, useRef, useContext,useLayoutEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, TextInput, TouchableWithoutFeedback, SafeAreaView, StyleSheet, ActivityIndicator, Dimensions, StatusBar, Keyboard } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const { height, width } = Dimensions.get("window");
import styles from './styles.js'
import Home from "./home.js";
import Signup from "./signup.js";
import Product from './product.js';
import Login from "./login.js";
import Cart from './cart.js';
import Search from './search.js';
import Settings from './settings.js' 
import Payment from './payment.js'
import Orders from './orders.js'
import Checkout from './checkout.js'
import Loading from './loading.js';
import StateProvider, { state as context } from './state.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
const Stack = createStackNavigator()

const fetchToken = async () => {
   const token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.replace('Home');
    } else {
     navigation.replace('Login');
   }
  };
  
  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <StateProvider>
        <NavigationContainer>         
         <Stack.Navigator>
<Stack.Screen name="Loading" options={{headerShown: false}} component={Loading} />
 <Stack.Screen name="Home" component={Home} />
<Stack.Screen name="Product" component={Product} />
<Stack.Screen name="Payment" component={Payment} /><Stack.Screen name="Checkout" component={Checkout} />
<Stack.Screen name="Cart" component={Cart} />
<Stack.Screen name="Orders" component={Orders} />
<Stack.Screen name="Search" component={Search} />
<Stack.Screen name="Settings" component={Settings} />
 <Stack.Screen name="Login" component={Login} />
 <Stack.Screen name="Signup" component={Signup} />
          </Stack.Navigator>
    </NavigationContainer>
    </StateProvider>
  );
}

