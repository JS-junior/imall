import React, { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react';
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
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { state } from './state.js'
import { Icon, ListItem, Avatar, Button, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, FontAwesome, Feather} from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');



export default function Orders({ navigation }) {
const [{ base_url }, dispatch ]= useContext(state)
  useLayoutEffect(()=>{
  navigation.setOptions({
   title: "Orders",
   headerStyle: { 
backgroundColor: '#FFF',
	},
headerTitleStyle: {
textAlign: 'center',
color: 'black'
			},
headerLeft: ()=>{ return(
 <Icon name="home" size={30} color="black" 
 onPress={()=> navigation.navigate('Home') }
  /> )},
 headerRight: ()=>{ return(
 <Icon onPress={()=> navigation.navigate("Cart")} name='shopping-cart' type='font-awesome-5' />)}
      })
}, [navigation])

	
const [ modal, setModal ] = useState(false)

const fetchOrders = async ()=>{
const token = await AsyncStorage.getItem("token")
const res = await fetch(`${base_url}/orders?token=${token}`);
const data = await res.json();
setItems(data.message)
setModal(true)
}

useEffect(()=>{
fetchOrders()
},[])

  const [items, setItems] = useState([]);
  const [ query, setQuery ] = useState("")
  
  const refund = async(oid) =>{
    const token = await AsyncStorage.getItem("token")
    const form = new FormData()
    form.append("id", oid)
    const res = await fetch(`${base_url}/refund?token=${token}`, { method: "POST", body: form })
    const data = await res.json()
    if(data.message == "refunded"){
    ToastAndroid.show("refunded",2000)
    fetchOrders()
  } else {
    ToastAndroid.show("error",2000)
  }
  }
  return (
<ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>{!modal ? <ActivityIndicator color="#000" size="large" /> :
<View style={styles.historyContainer}>
<FlatList
data={items}
renderItem={({item}) => {
return (
<View style={styles.historyCard}>
<ListItem>
<Image style={styles.historyCardImage}
source={{  uri: item.image }}/>
<ListItem.Content>
<ListItem.Title style={{ fontWeight: 'bold' }}>
{item.product}
</ListItem.Title>
<ListItem.Subtitle>
{item.status} 
{item.status === "refunded" ? <Text></Text> :
<TouchableOpacity style={styles.refundBtn} onPress={()=> refund(item.id)}>
<Text style={{ fontWeight: "bold", color:"#FFF", textAlign: 'center'}}>Refund</Text></TouchableOpacity>}
</ListItem.Subtitle>
</ListItem.Content>     
</ListItem>
<View style={styles.orderContainer}>
<TouchableOpacity style={{ borderRadius: 10, backgroundColor: "#ffffff50" }}>
<Text style={{ color: "gray" }}>₹{item.price}</Text>
</TouchableOpacity>
<TouchableOpacity style={{  borderRadius: 10, backgroundColor: "#ffffff50" }}>
<Text style={{ color: "gray" }}>{item.location}{item.state}{item.country}</Text>
</TouchableOpacity>
<TouchableOpacity style={{  borderRadius: 10, backgroundColor: "#ffffff80" }}>
<Text style={{ color: "#555" }}>{item.timestamp}</Text>
</TouchableOpacity>
</View>
</View>
 )}}/>
 </View>}
 </ScrollView>
 )
 }