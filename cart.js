import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styles from './styles.js';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import { Icon, ListItem, Avatar, Button } from 'react-native-elements';

import { MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';

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
	
  const people = [
    { name: 'Hitretha', comment: 'Amazing product' },
    { name: 'Hitretha', comment: 'Amazing product' },
    { name: 'Hitretha', comment: 'Amazing product' },
    { name: 'Hitretha', comment: 'Amazing product' },
  ];
  const [items, setItems] = useState(people);

  return (
    <View>
      <View style={styles.cartContainer}>
      <View style={styles.scrollViewContainer}>
          
<ScrollView showsVerticalScrollIndicator={false}>
<Icon name='shopping-cart' type='font-awesome-5' />
 <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold'}}>My Cart </Text> 
 <FlatList 
 data={items}                                                                                                             renderItem={({val})=>{
   return( 
   
<View style={styles.itemContainer}>
<ListItem>
<Avatar rounded source={{
uri:'https://upload.wikimedia.org/wikipedia/commons/0/01/AirPods.jpg' }} />
<ListItem.Title> Airbuds </ListItem.Title><ListItem.Subtitle numberOfLines={1} elllipsizeMode='tail'> Apple </ListItem.Subtitle>
<ListItem.Content>
</ListItem.Content>
<Text style={styles.itemSideText}> $100
<MaterialCommunityIcons name="delete" size={24} color="black" /></Text>
</ListItem>
 </View>
 )}} /> 
 <Text style={{ color: 'black', fontWeight: 'bold'}}> Subtotal </Text>
 <View style={{ bottom: 0 }}>
 <View style={styles.subTotalContainer}>
 <Text> Subtotal</Text>
 <Text> 1000</Text>
 </View>
 <View style={styles.subTotalContainer}>
<Text style={{ fontWeight: 'bold' }}> Shipping</Text>
<Text> free</Text>
</View>
<View style={styles.subTotalContainer}>
<Text style={{ fontWeight: 'bold' }}> total</Text>
<Text> 1000</Text></View></View>
<TouchableOpacity onPress={()=> navigation.navigate("Payment")}>
<Text style={styles.checkoutButton}> Proceed to Checkout</Text>
</TouchableOpacity>
</ScrollView> 
</View>
 </View>
 </View>
 )
 }