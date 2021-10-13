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
  ActivityIndicator,
  ToastAndroid,
  Image,
  ScrollView,
} from 'react-native';
import { state } from './state.js'
import { Icon, ListItem, Avatar, Button, Input } from 'react-native-elements';
import { MaterialCommunityIcons, Feather, FontAwesome} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('window');

export default function Home({ navigation }) {
  
  
  const [ query, setQuery ] = useState("")
  const [ lap, setLap ] = useState([])
  const [ game, setGame ] = useState([])
  const [ mob, setMob ] = useState([])
  const [ acs, setAcs ] = useState([])
  const [modal, setModal] = useState(false);
  const [ { base_url }, dispatch ] = useContext(state)
  
    const fetchProducts = async () => {
    const lapres = await fetch(`${base_url}/category?cat=L`);
    const lapdata = await lapres.json();
    setLap(lapdata);
    const mobres = await fetch(`${base_url}/category?cat=MOB`);
    const mobdata = await mobres.json();
    setMob(mobdata);
    const acsres = await fetch(`${base_url}/category?cat=PCA`);
    const acsdata = await acsres.json();
    setAcs(acsdata);
    const gameres = await fetch(`${base_url}/category?cat=GC`);
    const gamedata = await gameres.json();
    setGame(gamedata);
    ToastAndroid.show("hi", 2000)
    setModal(true)
  };
  
  useEffect(async()=>{
    const token = await AsyncStorage.getItem("token")
      ToastAndroid.show("You are a logged in user", 2000)
      fetchProducts()
  }, [])
  
  useLayoutEffect(()=>{
  navigation.setOptions({ title: "iMall",
headerStyle: { backgroundColor: '#FFF',},
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
<View style={{ flex: 1 }} >
<ScrollView>
<View>
<TouchableOpacity onPress={()=> navigation.navigate('Search')}>
<Input placeholder='search' value={query} onChangeText={(text)=> setQuery(text)}
leftIcon={<FontAwesome name="search" size={24} color="black" />}/>
</TouchableOpacity>
</View>

<Image style={styles.carouselImage}     
source={{ uri: 'https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Xiaomi/Events/Jupiter/Phase1/BrandStore/Redmi_9.jpg' }} />

{modal ?
    <View style={styles.homeContainer}>
<Text 
style={styles.productMoreTxt}> Laptops </Text>
<View style={styles.homeBoxContainer}>
<View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate('Product', { id: lap[0].pk }) }>
<Image style={styles.boxContainerImage} source={{ uri: lap[0].fields.image }} />
</TouchableWithoutFeedback>
<Text> {lap[0].fields.name}  </Text>
</View>
<View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate('Product', { id: lap[1].pk }) }>
<Image style={styles.boxContainerImage} source={{ uri: lap[1].fields.image  }} />
</TouchableWithoutFeedback>
<Text> {lap[1].fields.name} </Text>
</View>
<View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate('Product', { id: lap[2].pk }) }>
<Image style={styles.boxContainerImage} source={{ uri: lap[2].fields.image  }} />
</TouchableWithoutFeedback>
<Text> {lap[2].fields.name} </Text>
</View>
<View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate('Product', { id: lap[3].pk }) }>
<Image style={styles.boxContainerImage} source={{ uri: lap[3].fields.image  }} />
</TouchableWithoutFeedback>
<Text> {lap[3].fields.name} </Text>
</View>
</View>
</View>: <Text></Text>}
      
 
      {modal ?
    <View style={styles.homeContainer}>
<Text 
style={styles.productMoreTxt}> Mobiles </Text>
<View style={styles.homeBoxContainer}>
<View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate("Product", { id: mob[0].pk}) }>
<Image style={styles.boxContainerImage} source={{ uri: mob[0].fields.image }} />
</TouchableWithoutFeedback>
<Text> {mob[0].fields.name}  </Text>
</View>
<View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate('Product', { id: mob[1].pk }) }>
<Image style={styles.boxContainerImage} source={{ uri: mob[1].fields.image  }} />
</TouchableWithoutFeedback>
<Text> {mob[1].fields.name} </Text>
</View>
<View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate('Product', { id: mob[2].pk }) }>
<Image style={styles.boxContainerImage} source={{ uri: mob[2].fields.image  }} />
</TouchableWithoutFeedback>
<Text> {mob[2].fields.name} </Text>
</View>
<View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate('Product', {id: mob[3].pk}) }>
<Image style={styles.boxContainerImage} source={{ uri: mob[3].fields.image  }} />
</TouchableWithoutFeedback>
<Text> {mob[3].fields.name} </Text>
</View>
</View>
</View>: <Text></Text>}

{modal ?
    <View style={styles.homeContainer}>
<Text style={styles.productMoreTxt}> gaming consoles </Text>
<View style={styles.homeBoxContainer}><View style={styles.boxContainer}><TouchableWithoutFeedback onPress={()=> navigation.navigate("Product", {id: game[0].pk}) }><Image style={styles.boxContainerImage} source={{ uri: game[0].fields.image }} /></TouchableWithoutFeedback><Text> {game[0].fields.name}  </Text></View><View style={styles.boxContainer}><TouchableWithoutFeedback onPress={()=> navigation.navigate('Product', { id: game[1].pk }) }><Image style={styles.boxContainerImage} source={{ uri: game[1].fields.image  }} /></TouchableWithoutFeedback><Text> {game[1].fields.name} </Text></View>
<View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate('Product', { id: game[2].pk }) }><Image style={styles.boxContainerImage} source={{ uri: lap[2].fields.image  }} />
</TouchableWithoutFeedback>
<Text> {game[2].fields.name} </Text></View>
<View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate('Product', {id: game[3].pk}) }><Image style={styles.boxContainerImage} source={{ uri: game[3].fields.image  }} />
</TouchableWithoutFeedback><Text> {game[3].fields.name} </Text></View></View>
</View> : <Text></Text>}
{modal ?
 <View style={styles.homeContainer}>
<Text 
style={styles.productMoreTxt}> Computer accessories </Text>
<View style={styles.homeBoxContainer}>
<View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate("Product", {id: acs[0].pk}) }>
<Image style={styles.boxContainerImage} source={{ uri: acs[0].fields.image }} />
</TouchableWithoutFeedback>
<Text> {acs[0].fields.name}  </Text>
</View><View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate('Product', { id: acs[1].pk }) }><Image style={styles.boxContainerImage} source={{ uri: acs[1].fields.image  }} />
</TouchableWithoutFeedback>
<Text> {acs[1].fields.name} </Text>
</View>
<View style={styles.boxContainer}>
<TouchableWithoutFeedback onPress={()=> navigation.navigate('Product', { id: acs[2].pk }) }><Image style={styles.boxContainerImage} source={{ uri: acs[2].fields.image  }} />
</TouchableWithoutFeedback>
<Text> {acs[2].fields.name} </Text></View>
<View style={styles.boxContainer}><TouchableWithoutFeedback onPress={()=> navigation.navigate('Product', {id: acs[3].pk }) }><Image style={styles.boxContainerImage} source={{ uri: acs[3].fields.image  }} /></TouchableWithoutFeedback>
<Text> {acs[3].fields.name} </Text></View></View>
</View>: <ActivityIndicator size="large" color ="black" />} 
</ScrollView>
<View style={styles.bottomBar}><TouchableOpacity style={{ flex: 1 }} onPress={ ()=>navigation.navigate("Home")}><Icon name='home' size={30} />
 </TouchableOpacity>
  <TouchableOpacity style={{ flex: 1 }} onPress={ ()=>navigation.navigate("Cart")}>
    <Icon name='cart-plus' type="font-awesome" size={30} /></TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={ ()=>navigation.navigate("Orders")}>
            <Icon name='history' type='font-awesome' size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={ ()=>navigation.navigate("Settings")}>
            <Image
              style={{ width: 30, height: 30, borderRadius: 100 }}
              source={{
                uri: 'https://avatars1.githubusercontent.com/u/43666833?v=4',
              }}
            />
          </TouchableOpacity>
        </View>
 </View>)
        
 }
