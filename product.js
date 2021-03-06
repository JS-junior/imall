import React, { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import styles from './styles.js';
import { state } from './state.js'
import { ListItem, Avatar, Icon } from 'react-native-elements';
import { FontAwesome, Feather, MaterialIcons} from '@expo/vector-icons'
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';
import { Ionicons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Product({ navigation, route }) {

const { id } = route.params

const [{ base_url }, dispatch] = useContext(state)

useLayoutEffect(()=>{
	navigation.setOptions({
	 title: "iMall",
	 headerStyle: { 
	backgroundColor: '#FFF',
			},
			
	headerTitleStyle: {
		textAlign: 'center',
		color: 'black'
			},
	headerRight: ()=>{ return(
<Icon name='shopping-cart' onPress={()=> navigation.navigate("Cart")} type='font-awesome-5' />)}
			})
	}, [navigation])
	

const fetchProduct = async () => {
  const token = await AsyncStorage.getItem("token")
    const res = await fetch(`${base_url}/id?id=${id}`);
    const data = await res.json();
    setProduct(data[0]);
    const reviewRes = await fetch(`${base_url}/get-reviews?id=${id}`);
    const Revdata = await reviewRes.json();
    setReviews(Revdata);
    const cat_items = await fetch(`${base_url}/category?cat=${data[0].fields.category}`);
   const cat_data = await cat_items.json();
  setProducts(cat_data);
    
    const useRes = await fetch(`${base_url}/get-user?token=${token}`);
    const userData = await useRes.json();
    setUser(userData.name);
    setModal(true)  
   
 };
  useEffect(() =>   {
    fetchProduct()
  }, []);


  const addReview = async () => {
   const token = await AsyncStorage.getItem("token")
    const form = new FormData();
   form.append('pid', product.pk);
    form.append('rating', rating);
    form.append('review', review);
    const res = await fetch(`${base_url}/add-review?token=${token}`, {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    if (data.message === 'review added') {
      ToastAndroid.show('review added', 2000);
    } else {
      ToastAndroid.show('server error', 2000);
    }
    fetchProduct();
  };

  const addToCart = async () => {
    const token = await AsyncStorage.getItem("token")
    const form = new FormData();
    form.append('pid', product.pk);
    form.append('rating', rating)
    const res = await fetch(`${base_url}/add-to-cart?token=${token}`, {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    if (data.message === 'added to cart') {
      ToastAndroid.show(data.message, 2000);
    } else {
      ToastAndroid.show('server error', 2000);
    }
    fetchProduct();
  };

  const deleteReview = async (pid) => {
   const token = await AsyncStorage.getItem("token")
    const form = new FormData();
    form.append('pid', pid);
    const res = await fetch(`${base_url}/delete-review?token=${token}`, {
     method: 'POST',
      body: form,
    });
    const data = await res.json();
    if (data.message === 'review removed') {
      ToastAndroid.show(data.message, 2000);
    } else {
      ToastAndroid.show('server error', 2000);
    }
    fetchProduct();
  };

const star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

    //Empty Star. You can also give the path from local
   const star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

  const [review, setReview] = useState('');
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(false);
  const [ user, setUser ] = useState(0)
  const [ rating, setRating ] = useState(0)
  const maxRating = [1,2,3,4,5]

function LoadingCard(){
const [ dummy ] = useState([1,2,3,4,5,6])

return(
<Placeholder Animation={Fade} style={{ marginVertical: 10}}>
<ScrollView>
   <View style={{ flexDirection: 'column' }}>
     <View>
      <PlaceholderMedia size={400} />
     </View>
     <View style={{ flex: 1, marginVertical: 10, marginLeft: 10, justifyContent: 'center' }}>
       <PlaceholderLine width={40} />
       <PlaceholderLine width={20} /> 
    </View><View>

<Text style={styles.productUpperCaption}> Product Description </Text>
<View style={{ flex: 1,flexDirection: 'column',  justifyContent: 'space-between', alignItems: 'center' }}>
<PlaceholderLine size={'50%'} />
 <PlaceholderLine size={'50%'}  />
 <PlaceholderLine size={'50%'} />
  </View>
   <Text style={styles.productUpperCaption}> More products </Text>
 
  <FlatList data={dummy} horizontal={true} renderItem={({item})=>{ return(
<ScrollView style={{ flexDirection: 'row'  }}>
     
   <Placeholder style={{ marginHorizontal: 10 }}>
   <PlaceholderMedia size={90} style={{ marginVertical: 5}} /> 
    </Placeholder>
  <PlaceholderLine width={80} />
  <PlaceholderLine width={80} />
     
   </ScrollView>)}} />
     
 <Text style={styles.productUpperCaption}> Reviews </Text>
 
 <FlatList data={dummy} renderItem={({item})=>{
return (
<Placeholder Animation={Fade} style={{ marginVertical: 10}}>
    <View style={{ flexDirection: 'row' }}>
      <View>
        <PlaceholderMedia style={{ borderRadius: 100 }} size={90} />
      </View>
      <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }}>
        <PlaceholderLine width={80} />
        <PlaceholderLine width={40} />
        <PlaceholderLine width={60} />
      </View>
   </View>
  </Placeholder>
  )}} />
      </View>
   </View>
   </ScrollView>
  </Placeholder>
)
}
  
  
  return (
    <SafeAreaView style={styles.container}>
      {modal ? 
        <ScrollView>
          <Image
           source={{ uri: product.fields.image }}
            style={styles.productImage}
          />
          <Text selectable style={styles.productTitle}> {product.fields.name}</Text>
          <Text selectable style={styles.productTitle}>???{product.fields.price}</Text>
          <View style={styles.productbtnContainer}>
            <TouchableOpacity onPress={addToCart} style={styles.addToCartBtn}>
              <Text style={styles.addTocartText}> add to cart </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate("Checkout", {id: product.pk})} style={styles.buyBtn}>
              <Text style={styles.buyBtn}> Buy </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.productUpperCaption}> Product Description </Text>
          <Text selectable
            style={{
              fontFamily: 'MontserratRegular',
              backgroundColor: 'white',
            }}>
            {product.fields.desc}
          </Text>
          <Text style={styles.productMoreTxt}> More Products </Text>

          <FlatList
            horizontal={true}
            data={products}
            keyExtractor={(item) => item.pk}
            renderItem={({ item }) => {
              return (
                <ListItem>
                  <ListItem.Content>
                    <TouchableOpacity
                      onPress={() =>{ 
                      
                        navigation.push("Product", {id: item.pk}) }}
                      
                      style={styles.moreProductContainer}>
                      <Image
                        style={styles.moreProductImage}
                        source={{
                          uri: item.fields.image,
                        }}
                      />
                      <Text>{item.fields.name}</Text>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text>???{item.fields.price} </Text>
                      </View>
                    </TouchableOpacity>
                  </ListItem.Content>
                </ListItem>
              );
            }}
          />
          <Text style={styles.productMoreTxt}> Reviews </Text>
          <FlatList
            data={reviews}
            renderItem={({ item }) => {
              return (
                <ListItem title="User">
                  <Avatar
                    rounded
                    source={{
                      uri: `https://avatars.dicebear.com/api/initials/${item.fields.user}.svg`,
                    }}
                  />

                  <ListItem.Content>
                    <Text style={{ paddingTop: 10 }}>
                      <Text style={styles.productTitle}>
                        {item.fields.user}
                        {'\n'}
                      </Text>
                      <FlatList 
          data={maxRating}
          style={styles.ratingContainer}
          renderItem={({val,index})=>{
          return(
          <View>
        <Image style={styles.starImage} source={ index <= item.fields.rating ? { uri: star } : { uri: star_With_Border }} />
          </View>
          )}}
          /> {'\n'}
                  {item.fields.review}
                   </Text>
  {user === item.fields.user ?
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color="black"
                      onPress={() => deleteReview(item.pk)}
                    /> : <Text></Text>} 
                  </ListItem.Content>
                </ListItem>
              );
            }}
          />
       <View style={{ marginVertical: 10, flexDirection: 'row'}}>
          <FlatList 
          data={maxRating}
          horizontal={true}
          renderItem={({val,index})=>{
          return(
          <View>
          <TouchableOpacity activeOpacity={0.7} onPress={()=> setRating(index)}>
          <Image style={styles.starImage} source={ index <= rating ? { uri: star } : { uri: star_With_Border }} />
          </TouchableOpacity>
          </View>
          )}}
      />
          </View>
     
        <TextInput
            placeholder="write something"
            value={review}
            style={styles.normalInput}
            onChangeText={(text) => setReview(text)}
          />
          <TouchableOpacity onPress={addReview}>
            <Text style={styles.signupButton}> Review </Text>
          </TouchableOpacity>
        </ScrollView>
       : 
        <LoadingCard />
      }
    </SafeAreaView> 
  );
}
