import React, { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react';
import styles from './styles.js';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, ListItem, Avatar, Button } from 'react-native-elements';
import { state } from './state.js'
import { MaterialCommunityIcons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export default function Cart({ navigation }) {
  
  useLayoutEffect(()=>{
	navigation.setOptions({
	headerStyle: { 
	backgroundColor: '#333',
	},
	headerTitleStyle: {
	textAlign: 'center',
	color: 'white'
	}
	})
	}, [navigation])
	
const [ { base_url }, dispatch ] = useContext(state)
  const [payed, setPayed] = useState(false);
  const [products, setProducts ] = useState([])
  const [ cart, setCart ] = useState({})
  const [ modal, setModal ] = useState(false)
  
  const fetchCart = async ()=>{
 const token = await AsyncStorage.getItem("token")
 const res = await fetch(`${base_url}/get-cart?token=${token}`);
  const data = await res.json();
  setProducts(data.message);
  
 const cartres = await fetch(`${base_url}/get-cart-total?token=${token}`);
  const cartdata = await cartres.json();
  setCart(cartdata.message);
  setModal(true)
  }
  
const deleteCart = async (id) => {
const token = await AsyncStorage.getItem("token")
 const form = new FormData()
    form.append('id', id);
 const res = await fetch(`${base_url}/delete-cart?token=${token}`, {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    if (data.message === 'cart deleted'){
    ToastAndroid.show('cart deleted',2000)
    fetchCart()
    } else {
    ToastAndroid.show("error",2000)
    }
   }
   
useEffect(()=>{
    fetchCart()
    },[])
  return (
<View>
<View style={styles.cartContainer}>
<View style={styles.scrollViewContainer}><ScrollView showsVerticalScrollIndicator={false}>
<Icon name='shopping-cart' type='font-awesome-5' />
<Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold'}}>My Cart </Text>
 {!modal ? <ActivityIndicator color="#000" size="large" /> :
<FlatList 
style={{flex: 1, flexDirection: "column" }} 
data={products}
renderItem={({item})=>{ 
return( 
<View 
style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
<Avatar rounded source={{ uri: item.image }} />
<Text>{item.name}</Text><Text>{item.seller}</Text>
<Text>{item.price}</Text>
<MaterialIcons name="delete" onPress={()=> deleteCart(item.id)} size={24} color="black" /></View>
)}} />}
<View 
style={styles.subTotalContainer}>
<Text> Subtotal</Text>
{!modal ? <ActivityIndicator color="#000" size="large" /> : <Text>{cart.total} </Text>}</View>
<View style={styles.subTotalContainer}>
<Text style={{ fontWeight: 'bold' }}> Shipping</Text>
<Text> free</Text>
</View>
<View style={styles.subTotalContainer}>
<Text style={{ fontWeight: 'bold' }}> total</Text>{!modal ? <ActivityIndicator color="#000" size="large" /> : <Text>{cart.total} </Text>}</View>
{cart.quantity === 0 ? <Text></Text> :<TouchableOpacity onPress={()=> navigation.navigate("Checkout", {id : 0 })}>
<Text style={styles.checkoutButton}> Proceed to Checkout</Text>
</TouchableOpacity>}
</ScrollView> 
</View>
</View>
</View>
 )
 }