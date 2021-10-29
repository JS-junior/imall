import React, { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react';
import styles from './styles.js';
import state from './state.js';
import { Text, View, TouchableOpacity, FlatList, TouchableWithoutFeedback, Dimensions,  StyleSheet, TextInput,  ActivityIndicator, ToastAndroid,  Image, ScrollView } from 'react-native';
const { height, width } = Dimensions.get('window');
import { MaterialCommunityIcons, Ionicons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { Card, CardItem } from 'native-base';
import {Icon, Avatar, Input, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Comment({ navigation, route }) {
  
  const { commentId } = route.params()
  
  useLayoutEffect(()=>{
  navigation.setOptions({
    title: title,
    headerStyle: { 
	backgroundColor: '#FFF',
			},
	headerTitleStyle: {
		textAlign: 'center',
		color: 'black'
			}
			})
}, [navigation]);
  const base_url = "https://rn-shop-code.herokuapp.com"
  //const [{ base_url }, dispatch ] = useContext(state)
  const [ comments, setComments ] = useState([])
  const [ title, setTitle ] = useState("")
  const [ user, setUser ] = useState("")
  const [ reply, setReply ] = useState("")
  const [ postId, setPostId ] = useState(0)
  const [ modal, setModal ] = useState(false)
  
  const fetchUser = async () => {
  const token = await AsyncStorage.getItem("token")
    const res = await fetch(`${base_url}/get-user?token=${token}`);
    const data = await res.json();
    setUser(data.name);
    }
  
const fetchComments = async()=>{
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`${base_url}/comment?id=${commentId}&token=${token}`);
  const data = await res.json();
  setComments(data.message);
  setPostId(data.postId)
  setTitle(data.title)
}

useEffect(()=>{
  fetchComments()
  fetchUser()
  setModal(true)
}, [])

const postComment = async(id)=>{
  if(!reply){
    ToastAndroid.show("please write something!", 2000);
  } else {
  const form = new FormData()
  form.append("reply", reply)
  form.append("postId", postId)
  form.append("isAdmin", "False")
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`${base_url}/comment?token=${token}`, {
    method: "POST", body: form });
  const data = await res.json();
  fetchComments()
  }
}
const deleteComment = async(id)=>{
  const form = new FormData()
  form.append("id", id)
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`${base_url}/delete-comment?id=${id}token=${token}`, { method: "POST", body: form });
  const data = await res.json();
  if(data.message === "deleted successfully"){
  fetchComments()
  } else {
    ToastAndroid.show("an error occurred",2000)
  }
}

return (
  <View style={{ flex: 1,height: height, width: width, justifyContent: 'center' }}>
  {!modal ? <Text></Text> : <FlatList data={comments} renderItem={({ comment }) => {
  return (
  <ListItem>
  <Avatar  rounded source={{ uri: `https://avatars.dicebear.com/api/initials/${comment.user}.svg`}}/>
  <ListItem.Content>
   <Text style={{ paddingTop: 10 }}>
  <Text style={styles.productTitle}>{comment.user}{'\n'} </Text>{'\n'} {comment.comment} </Text>
  {user === comment.user ?
 <MaterialIcons name="delete" size={24} color="black" onPress={() => deleteComment(comment.id)} /> : <Text></Text>} 
 </ListItem.Content>
 </ListItem>
 )}} />}
 {!modal ? <Text></Text> :  <View style={styles.bottomBar}>
<TextInput  placeholder="write something" value={reply} style={styles.normalInput} onChangeText={(text) => setReply(text)} />
<TouchableOpacity onPress={postComment}>
<Text style={styles.signupButton}> reply </Text>
</TouchableOpacity>
</View>}
</View>
  );
}