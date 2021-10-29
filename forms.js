import React, { useState, useEffect, useRef, useContext,  useLayoutEffect } from 'react';
import styles from './styles.js';
import state from './state.js';
import RNModal from 'react-native-modal';
import { Text, View, TouchableOpacity, FlatList, TouchableWithoutFeedback, Dimensions,StyleSheet, SafeAreaView,  ActivityIndicator, ToastAndroid, Alert, TextInput, Image, ScrollView } from 'react-native';
import { Icon, Input, Button, Avatar, ListItem } from 'react-native-elements'
const { height, width } = Dimensions.get('window');
import { MaterialCommunityIcons, Ionicons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Forms({ navigation }) {

useLayoutEffect(()=>{
  navigation.setOptions({
    title: "forms",
    headerStyle: { 
	backgroundColor: '#FFF',
			},
	headerTitleStyle: {
		textAlign: 'center',
		color: 'black'
			},
	headerRight: ()=>{ return(
<Icon name='pluscircle' size={24} onPress={()=> setCreateView(true)} type='ant-design' />)}
			})
}, [navigation]);
const base_url = "https://rn-shop-code.herokuapp.com"
//const [{ base_url }, dispatch ] = useContext(state)

const [ title, setTitle ] = useState("")
const [ desc, setDesc ] = useState("")
const [ posts, setPosts ] = useState([])
const [ user, setUser ] = useState("")
const [ createView, setCreateView ] = useState(false)
const [ modal, setModal ] = useState(false)


const fetchPosts = async()=>{
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`${base_url}/post?token=${token}`);
  const data = await res.json();
  setPosts(data.message);
}

const fetchUser = async () => {
  const token = await AsyncStorage.getItem("token")
    const res = await fetch(`${base_url}/get-user?token=${token}`);
    const data = await res.json();
    setUser(data.name)
    }

useEffect(()=>{
  fetchPosts()
  fetchUser()
  setModal(true);
}, [])

const post = async()=>{
  if(!title && !desc){
    ToastAndroid.show("please write something!", 2000);
  } else {
  const form = new FormData()
  form.append("title", title)
  form.append("desc", desc)
  form.append("isAdmin", "False")
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`${base_url}/post?token=${token}`, {
    method: "POST", body: form });
  const data = await res.json();
  setCreateView(false)
  fetchPosts()
  }
}

const deletePost = async(id)=>{
  const form = new FormData()
  form.append("id", id)
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`${base_url}/delete-post?id=${id}token=${token}`, { method: "POST", body: form });
  const data = await res.json();
  if(data.message === "deleted successfully"){
  fetchPosts()
  } else {
    ToastAndroid.show("an error occurred",2000)
  }
}

const like = async(id)=>{
  const form = new FormData()
  form.append("postId", id)
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`${base_url}/likes?token=${token}`, { 
    method: "POST", body: form });
  const data = await res.json();
  if(data.message === "liked successfully"){
  fetchPosts()
  } else {
    ToastAndroid.show("an error occurred", 2000)
  }
}

const unlike = async(id)=>{
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`${base_url}/likes?id=${id}token=${token}`);
  const data = await res.json();
  if(data.message === "unliked successfully"){
  fetchPosts()
  } else {
    ToastAndroid.show("an error occurred",2000)
  }
}

  return (
    <View style={{ flex: 1, height: height, width: width, justifyContent: 'center' }}>
<RNModal isVisible={createView} 
 animationIn="zoomIn" animationOut="zoomOut">
 <View style={styles.forgotpassModal}>
 <Text style={{ fontWeight: "bold" }}> create a issue</Text>
 <Text style={{ color: 'gray'  }}>
 report a bug, or suggest a feature    
<Text style={{ color: "blue" }}>  Learn more</Text></Text>
<Input placeholder="title" placeholderTextColor="#808e9" value={title} style={styles.normalInput} onChangeText={(text)=> setTitle(text)} />
<Input multiline placeholder="description" placeholderTextColor="#808e9b" value={desc} style={styles.normalInput} onChangeText={(text)=> setDesc(text)} />
 <View style={{ flexDirection: "row", justifyContent: "center" }}>
 <TouchableOpacity style={styles.forgotpassbtn} 
 onPress={()=> setCreateView(false)}>
 <Text style={{ color: "#FFF", textAlign: "center", fontWeight: 'bold', fontSize: 16 }}> cancel </Text>
 </TouchableOpacity>
 <TouchableOpacity style={styles.forgotpassbtn} 
 onPress={post}>
 <Text style={{ color: "#FFF", textAlign: "center", fontWeight: 'bold', fontSize: 16 }}> create </Text></TouchableOpacity></View></View></RNModal>{/*
 {modal ? 
 <ScrollView showsHorizontalScrollIndicator={false}>
 <View style={styles.postsView}>
 <FlatList data={posts} renderItem={({ post })=>{
 return(
 <View style={styles.postView}>
 <View style={styles.postHeader}>
 <View>
 <Image style={{ width: 50, height: 50, borderRadius: 100 }} source={{ uri: `https://avatars.dicebear.com/api/initials/${post.username}.svg`}} />
 </View>
 <View style={{ flex: 1, paddingHorizontal: 10 }}>
 <Text style={{ color: '#000', fontFamily: 'NSBold', fontSize: 18 }}>
 {post.title}</Text>
<Text style={{ color: '#fff', fontFamily: 'NSRegular', fontSize: 16 }}>
{post.username}</Text>
</View>
<TouchableOpacity>
<Icon name='more-horizontal' color='#000' size={28} />
</TouchableOpacity>
</View>

<View style={{ marginTop: 10 }}>
<Text style={{color: '#fafafa',fontSize: 14, paddingHorizontal: 10 }}>{post.desc} </Text>
</View>
<View style={{ marginTop: 10, flexDirection: 'row', paddingHorizontal: 10 }}>
{post.likes.includes(user.id) ? <TouchableOpacity onPress={()=> unlike(post.id)} style={styles.postStatsOpacity}>
 <Icon name='heart' color='#ff0000' size={16} />
 <Text style={{ marginLeft: 6,color: '#000'  }}> {post.likes.length} </Text> </TouchableOpacity> :
<TouchableOpacity onPress={()=> like(post.id)} style={styles.postStatsOpacity}><Icon name='heart' color='#000' size={16} /><Text style={{ marginLeft: 6, color: '#000' }}> {post.likes.length}</Text></TouchableOpacity>}
<TouchableOpacity onPress={()=> navigation.navigate("Comment", { commentId: post.id })} style={{ ...styles.postStatsOpacity, marginLeft: 10 }} >
<Icon name='message-circle' color='#000' size={16} />
</TouchableOpacity>
</View>
</View>
)}} /> 
</View>
</ScrollView> : <ActivityIndicator color="#000" size="large" />}
   */}
    
</View>
  );
}