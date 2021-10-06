import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useReducer,
  useLayoutEffect,
} from 'react';
import styles from './styles.js';

import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ToastAndroid,
  Image,
  ScrollView,
} from 'react-native';

import { Icon, ListItem, Avatar, Button, Input } from 'react-native-elements';
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('window');

export default function Loading({ navigation }) {
  const [logged, setLogged] = useState(null);

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
    <View
      style={{
        flex: 1,
        height: height,
        width: width,
        justifyContent: 'center',
      }}>
      <ActivityIndicator color="#000" size="large" />
    </View>
  );
}
