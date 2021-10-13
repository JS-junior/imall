import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useLayoutEffect,
} from 'react';
import * as SMS from 'expo-sms';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import {
  StripeProvider,
  initStripe,
  useConfirmPayment,
  createPaymentMethod,
} from '@stripe/stripe-react-native';
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
  ToastAndroid,
  ScrollView,
} from 'react-native';
import { state } from './state.js';
import styles from './styles.js';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, ListItem, Avatar, Button, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export default function Checkout({ navigation,route }) {
  const { id } = route.params
// const id = 0

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#FFF',
      },
      title: 'Checkout',
      headerTitleStyle: {
        textAlign: 'center',
        color: '#000',
      },
    });
  }, [navigation]);

  const [confirm, setConfirm] = useState(false);
  const [payed, setPayed] = useState(false);
  const [phNum, setPhNum] = useState(0);
  const [secret, setSecret] = useState('');
  const [location, setLocation] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [card, setCard] = useState({});
  const [cart, setCart] = useState({});
  const [date, setDate] = useState(0);
  const [month, setMonth] = useState('');
  const { confirmPayment, loading } = useConfirmPayment();

  
 
// const local_url = 'https://api.code-awesome.xyz';
 
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState(null);

  const fetchCart = async () => {
  const token = await AsyncStorage.getItem("token")
    const res = await fetch(`https://rn-shop-code.herokuapp.com/get-cart-total?token=${token}`);
    const data = await res.json();
    setCart(data.message);
    ToastAndroid.show('cart', 2000);
  };

  
  const fetchProduct = async () => {
  const token = await AsyncStorage.getItem("token")
    const res = await fetch(`https://rn-shop-code.herokuapp.com/id?id=${id}`);
    const data = await res.json();
    setProduct(data[0]);
    ToastAndroid.show('product', 2000);
  };

  const order = async () => {
  setPayed(true)
   const token = await AsyncStorage.getItem("token")
    if (id === 0) {
      
      const form = new FormData();
      form.append('location', location);
      form.append('state', state);
      form.append('country', country);
      form.append('total', cart.total*100);
      form.append('quantity', cart.quantity);
      form.append('secret', secret);
      const res = await fetch(`https://rn-shop-code.herokuapp.com/order?token=${token}`, {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (data.message === 'ordered') {
        ToastAndroid.show('ordered', 2000);
       navigation.navigate("Payment",{ url: data.url })
      } else {
        ToastAndroid.show('server error', 2000);
      }
    } else {
      const form = new FormData();
      form.append('pid', id);
      form.append('location', location);
      form.append('state', state);
      form.append('country', country);
      form.append('total', product.fields.price*100);
      form.append('quantity', 1);
      form.append('secret', secret);
      const res = await fetch(`https://rn-shop-code.herokuapp.com/buy-now?token=${token}`, {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (data.message === 'ordered') {
        ToastAndroid.show('ordered', 2000);
        navigation.navigate("Payment",{ url: data.url })
      } else {
        ToastAndroid.show('server error', 2000);
      }
    }
  };

  useEffect(() => {
    if (id === 0) {
    
      fetchCart();
    } else {
      
     fetchProduct();
  ToastAndroid.show(id.toString(),2000)
    }
  }, []);

  return (
    <View>
      
        <View style={{ display: 'flex', flexDirection: 'row' }}>
         <Image
            style={{ width: 50, height: 50, borderRadius: 100 }}
            source={{
              uri:
                'http://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'MontserratExtraBold',
            }}>
            
            {cart.user}
          </Text>
        </View>

        <Text style={{ color: 'gray' }}>
          Total amount:
          <Text style={{ fontWeight: 'bold', color: 'black' }}>
            {product === null ? (
              <Text>₹{cart.total}</Text>
            ) : (
              <Text> ₹{product.fields.price}</Text>
            )}
          </Text>
        </Text>

        <Text style={{ color: 'gray' }}>
          Quantity:
          <Text style={{ fontWeight: 'bold', color: 'black' }}>
           
            {product === null ? (
              <Text>{cart.quantity}</Text>
            ) : (
              <Text> 1</Text>
            )}
          </Text>
        </Text>
       
        <View style={styles.paymentContainer}>
          <View style={styles.paymentInput}>
            <Icon color="#333" name="user" type="font-awesome" size={20} />
            <TextInput
              style={{ flex: 1, paddingHorizontal: 12 }}
              value={phNum}
              onChangeText={(text) => setPhNum(text)}
              placeholder={'phone'}
            />
          </View>
          <View style={styles.paymentInput}>
            <Icon color="#333" name="user" type="font-awesome" size={20} />
            <TextInput
              style={{ flex: 1, paddingHorizontal: 12 }}
              value={location}
              onChangeText={(text) => setLocation(text)}
              placeholder={'location'}
            />
          </View>
          <View style={styles.paymentInput}>
            <Icon color="#333" name="user" type="font-awesome" size={20} />
           <TextInput
              style={{ flex: 1, paddingHorizontal: 12 }}
              value={state}
              onChangeText={(text) => setState(text)}
              placeholder={'state'}
            />
          </View>
          <View style={styles.paymentInput}>
            <Icon color="#333" name="user" type="font-awesome" size={20} />
            <TextInput
              style={{ flex: 1, paddingHorizontal: 12 }}
             value={country}
              onChangeText={(text) => setCountry(text)}
              placeholder={'country'}
            />
         </View>{payed ? <ActivityIndicator color="#000" size="large" /> :
          <TouchableOpacity onPress={order} style={styles.payBtn}>
            <Text style={styles.payBtnTxt}> Pay </Text>
          </TouchableOpacity>}
        </View>
      
    </View>
  );
}
