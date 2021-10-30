import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import{  WebView } from 'react-native-webview'

import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  TouchableWithoutFeedback,
  Button,
  Dimensions,
  StyleSheet,
  AsyncStorage,
  ToastAndroid,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import RNModal from 'react-native-modal';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, ListItem, Avatar, Input } from 'react-native-elements';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export default function Payment({ url, done }) {
  
   const [payed, setPayed] = useState(false);
  const [products, setProducts ] = useState([])
  const [ cart, setCart ] = useState({})
  
const onLoadStart = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    if (nativeEvent.url === "https://rn-shop-code.herokuapp.com/success-redirect") {
      ToastAndroid.show("done!", 2000)
      done()
    }
    if (nativeEvent.url === "https://rn-shop-code.herokuapp.com/cancel") {
      ToastAndroid.show("failed", 2000)
      done()
    }
  };

    
    return (
       <WebView onLoadStart={onLoadStart} onNavigationStateChange={ 
             (e) => { 
               if(e.url == "https://rn-shop-code.herokuapp.com/success-redirect") {
              done()
               }
           }
          } 
          source={{ uri: url }} />
    )
    }

