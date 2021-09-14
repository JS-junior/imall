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

import { MaterialCommunityIcons, Feather, FontAwesome} from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');



export default function Home({ navigation }) {
  const people = [
    { name: 'Hitretha', comment: 'Amazing product' },
    { name: 'Hitretha', comment: 'Amazing product' },
    { name: 'Hitretha', comment: 'Amazing product' },
    { name: 'Hitretha', comment: 'Amazing product' },
  ];
  const [items, setItems] = useState(people);
  const [ query, setQuery ] = useState("")
  
  useLayoutEffect(()=>{
		navigation.setOptions({
		  title: "Paymall",
			headerStyle: { 
				backgroundColor: '#FFF',
			},
			headerLeft: ()=>{ return(
      <Feather name="menu" size={24} color="black" 
      onPress={()=> navigation.navigate('Search') }
      /> )},
			headerTitleStyle: {
				textAlign: 'center',
				color: 'black'
			},
			headerRight: ()=>{ return(
			<Icon onPress={()=> navigation.navigate('Cart')}
			name='shopping-cart' type='font-awesome-5' />)}
			})
	}, [navigation])
	
  return (
    <ScrollView>
<View>
<TouchableOpacity onPress={()=> navigation.navigate('Search') }>
<Input placeholder='search' value={query} onChangeText={(text)=> setQuery(text)}
leftIcon={<FontAwesome name="search" size={24} color="black" />}/>
</TouchableOpacity>
</View>
<Image style={styles.carouselImage}     
source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/01/AirPods.jpg' }} />
 <FlatList 
 data={items}
 renderItem={({val})=>{ 
 return(
 <View style={styles.homeContainer}>
<Text 
style={styles.productMoreTxt}> Recommended for you</Text>
<View style={styles.homeBoxContainer}>
<View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate('Product') }>
<Image style={styles.boxContainerImage} source={{ uri:'https://upload.wikimedia.org/wikipedia/commons/0/01/AirPods.jpg' }} />
</TouchableWithoutFeedback>
<Text> T shirt $28</Text>
</View>
<View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate('Settings') }>
<Image style={styles.boxContainerImage} source={{ uri:'https://upload.wikimedia.org/wikipedia/commons/0/01/AirPods.jpg' }} />
</TouchableWithoutFeedback>
<Text> T shirt $28</Text>
</View>
<View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate('Orders') }>
<Image style={styles.boxContainerImage} source={{ uri:'https://upload.wikimedia.org/wikipedia/commons/0/01/AirPods.jpg' }} />
</TouchableWithoutFeedback>
<Text> T shirt $28</Text>
</View>
<View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate('Signup') }>
<Image style={styles.boxContainerImage} source={{ uri:'https://upload.wikimedia.org/wikipedia/commons/0/01/AirPods.jpg' }} />
</TouchableWithoutFeedback>
<Text> T shirt $28</Text>
</View>
</View>
</View>)}} />
 
 </ScrollView>)
        
 }
