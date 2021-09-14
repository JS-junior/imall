import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import styles from './styles.js';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');


export default function Product({ navigation }) {

useLayoutEffect(()=>{
		navigation.setOptions({
		  title: "Paymall",
			headerStyle: { 
				backgroundColor: '#FF',
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
{ name: "Hitretha", comment: "Amazing product" },
{ name: "Hitretha", comment: "Amazing product" },
{ name: "Hitretha", comment: "Amazing product" },
{ name: "Hitretha", comment: "Amazing product" }
]


  const [review, setReview] = useState('');
  const [items, setItems] = useState(people)
  
  
  
  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          source={{
            uri:
              'http://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
          }}
          style={styles.productImage}
        />
        <Text style={styles.productTitle}> Men Tshirt </Text>
        <Text style={styles.productTitle}> $29 </Text>
        <View style={styles.productbtnContainer}>
          <TouchableOpacity style={styles.addToCartBtn}>
            <Text style={styles.addTocartText}> add to cart </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyBtn}> Buy </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.productUpperCaption}> Product Description </Text>
        <Text
          style={{ fontFamily: 'MontserratRegular', backgroundColor: 'white' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
          odio assumenda itaque ut repudiandae optio labore deserunt rem.
          Obcaecati deserunt soluta possimus modi asperiores laudantium
          voluptatem ipsa officiis sit necessitatibus.
        </Text>
        <Text style={styles.productMoreTxt}> More Products </Text>
        

  
       <FlatList 
       horizontal={true}
       data={items}
       renderItem={ ({item}) => {
        return(
        <View style={styles.moreProductContainer}>
          <Image style={styles.moreProductImage}
      source={{ uri: 'http://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60'}} /> 
      <Text> Black Tshirt </Text>
           <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }} >
            <Text> $29 </Text>
            
          </View></View>
      )}} />
<FlatList 
       horizontal={true}
       data={items}
       renderItem={ ({item}) => {
        return(
        <View style={styles.moreProductContainer}>
          <Image style={styles.moreProductImage}
      source={{ uri: 'http://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60'}} /> 
      <Text> Black Tshirt </Text>
           <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text> $29 </Text>
            
            
          </View></View>
      )}} />
       
      
        <Text style={styles.productMoreTxt}> Reviews </Text>
        <FlatList
        data={items}
        renderItem={({ item })=>{
 return(
<ListItem title="User">
          <Avatar
            rounded
            source={{
              uri:
                'http://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
            }}
         />
            
          <ListItem.Content>
 
  <Text style={{ paddingTop: 70}}>
  <Text style={styles.productTitle}> User </Text>
  
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
            odio assumenda itaque ut repudiandae optio labore deserunt rem.
            Obcaecati deserunt soluta possimus modi asperiores laudantium
            voluptatem ipsa officiis sit necessitatibus.
          </Text>
          </ListItem.Content>
        </ListItem>
)}}
        />
        
        
        <TextInput
          placeholder="write something"
          value={review}
          style={styles.normalInput}
          onChangeText={(text) => setReview(text)}
        />
        <TouchableOpacity>
          <Text style={styles.signupButton}> Review </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}