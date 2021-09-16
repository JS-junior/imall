import { StripeProvider } from '@stripe/stripe-react-native';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import styles from './styles.js';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, ListItem, Avatar, Button, Input } from 'react-native-elements';

import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export default function Payment({ navigation }) {
  
  useLayoutEffect(()=>{
		navigation.setOptions({
			headerStyle: { 
				backgroundColor: '#FFF',
			},
			title: 'Checkout',
			headerTitleStyle: {
				textAlign: 'center',
				color: 'white'
			}
		})
	}, [navigation])
	
const { confirmPayment } = useStripe();
const [ payed, setPayed ] = useState(false)
  const people = [
    { name: 'Hitretha', comment: 'Amazing product' },
    { name: 'Hitretha', comment: 'Amazing product' },
    { name: 'Hitretha', comment: 'Amazing product' },
    { name: 'Hitretha', comment: 'Amazing product' },
  ];
  const [items, setItems] = useState(people);
  const [query, setQuery] = useState('');
const { initPaymentSheet, presentPaymentSheet } = useStripe();

const initialize= () => {
    setPayed(true)
  };

  return (
  
    <View>
    <View style={{ display: 'flex', flexDirection: 'row' }}>
    <Image
          style={{ width: 50, height: 50, borderRadius: 100 }}
          source={{ uri: "http://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60" }}
        />   
 <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'MontserratExtraBold'}}> Ronnie </Text>
  </View>
  
  <Text style={{ color: 'gray' }}>Total amount: <Text style={{ fontWeight: 'bold', color: 'black'}}> $134 </Text> </Text>
  
  <Text style={{ color: 'gray' }}>Quantity: 
    <Text style={{ fontWeight: 'bold', color: 'black'}}> 6 </Text></Text>

  <Text style={{ color: 'gray' }}>expected delivery on <Text style={{ fontWeight: 'bold', color: 'black'}}>  Friday, 18 September </Text> </Text>
  
<CardField
      postalCodeEnabled={true}
      placeholder={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={(cardDetails) => {
        console.log('cardDetails', cardDetails);
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    />
    <View style={styles.paymentContainer}>
    <View style={styles.paymentInput}>
    <Icon color="#333" name="user" type="font-awesome" size={20} />
    <TextInput style={{ flex: 1, paddingHorizontal: 12 }} placeholder={'phone'} />
    </View>
    <View style={styles.paymentInput}>
    <Icon color="#333" name="user" type="font-awesome" size={20} />
    <TextInput style={{ flex: 1, paddingHorizontal: 12 }} placeholder={'location'} />
    </View>
<View style={styles.paymentInput}>
    <Icon color="#333" name="user" type="font-awesome" size={20} />
    <TextInput style={{ flex: 1, paddingHorizontal: 12 }} placeholder={'state'} />
    </View>
    <View style={styles.paymentInput}>
    <Icon color="#333" name="user" type="font-awesome" size={20} />
    <TextInput style={{ flex: 1, paddingHorizontal: 12 }} placeholder={'country'} />
    </View>
    <TouchableOpacity onPress={()=> navigation.navigate("Orders")} style={styles.payBtn}>
    <Text style={styles.payBtnTxt}> {!payed ? <Text></Text>:<ActivityIndicator color="#2ed573" size="small" />} Pay </Text>
   
    </TouchableOpacity>
    
  
    </View>
</View>
    
  );
}