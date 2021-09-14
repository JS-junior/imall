import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styles from './styles.js'
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import { Icon, ListItem, Avatar, Button, Input } from 'react-native-elements';

import { MaterialCommunityIcons, FontAwesome, Feather} from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');



export default function Orders({ navigation }) {
  
  useLayoutEffect(()=>{
		navigation.setOptions({
		  title: "Paymall",
			headerStyle: { 
				backgroundColor: '#FFF',
			},
			
			headerTitleStyle: {
				textAlign: 'center',
				color: 'black'
			},
			headerRight: ()=>{ return(
			<Icon name='shopping-cart' type='font-awesome-5' />)}
			})
	}, [navigation])
	
	
  const people = [
    { name: 'Hitretha', comment: 'Amazing product' },
    { name: 'Hitretha', comment: 'Amazing product' },
    { name: 'Hitretha', comment: 'Amazing product' },
    { name: 'Hitretha', comment: 'Amazing product' },
  ];
  const [items, setItems] = useState(people);
  const [ query, setQuery ] = useState("")
  
  return (
    <ScrollView>
    <View style={styles.historyContainer}>
    <FlatList data={items} 
 renderItem={ (val,index)=>{
          return(
  <View style={styles.historyCard}>
 <ListItem>
 <Image style={styles.historyCardImage}
 source={{ uri: 'http://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60' }} />
 <ListItem.Content>
 <ListItem.Title style={{ fontWeight: 'bold' }}>
  Apple Macbook Pro latest</ListItem.Title>
  <ListItem.Subtitle>To be Delivered on Oct 15
  </ListItem.Subtitle>
  </ListItem.Content>
  </ListItem>
 </View>
 )}} />
</View>           
                
 </ScrollView>)
        
 }