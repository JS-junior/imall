import React, { useState, useEffect, useRef, createContext, useReducer, useLayoutEffect } from 'react';
import styles from './styles.js'
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  AsyncStorage,
  Image,
  ScrollView,
} from 'react-native';

import { Icon, ListItem, Avatar, Button, Input } from 'react-native-elements';

import { MaterialCommunityIcons, Feather, FontAwesome} from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export const state = createContext()

const initialState = {
  base_url: "https://rn-shop-code.herokuapp.com",
  token: AsyncStorage.getItem("token"),
  
}

export const actionTypes = {
  BASE_URL: "BASE_URL"
}

export const reducer = (state,action) => {
  switch(action.type){
    default:
    return {...state}
  }
}

export default function StateProvider({ children }){
  
  return (
    <state.Provider value={useReducer(reducer,initialState)}>
    {children}
    </state.Provider>
    )
}