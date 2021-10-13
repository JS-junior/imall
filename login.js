import React, { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react'
import styles from './styles.js';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Text, Platform, View, TouchableOpacity, ActivityIndicator, FlatList, TextInput, TouchableWithoutFeedback, ToastAndroid, Alert, StyleSheet, Dimensions, StatusBar, Keyboard } from 'react-native';
import { state, actionTypes } from './state.js'
import { Input, Icon } from 'react-native-elements';
import RNModal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Facebook from 'expo-facebook'
import * as Google from 'expo-google-app-auth';

export default function Login({ navigation }){
const [ username, setUsername ] = useState("")
const [ password, setPassword ] = useState("")
const [ email, setEmail ] = useState("")
const [query, setQuery] = useState('')
const [ modal, setModal ] = useState(false)
const [ { base_url, token }, dispatch ] = useContext(state)
  
  const forgotpass = async()=>{
  const form = new FormData()
  form.append("email", email)
  const res = await fetch(`${base_url}/forgotpass`, { method: "POST", body: form })
  const data = await res.json()
  if(data.message === "check your mail"){
  setModal(false)
  ToastAndroid.show("Check your mail", 4000)
  } else {
 ToastAndroid.toast("server error", 2000)
}
  
  }

useLayoutEffect(()=>{
navigation.setOptions({
	headerStyle:{
	backgroundColor: '#222',
},
headerLeft:()=>{ return(
  <Text style={{ color: "#222"}}>H</Text> )},
headerTitleStyle: {
	textAlign: 'center',
	color: 'white'
	}
})
}, [navigation])
	
const login = async ()=>{
  const form = new FormData()
  form.append("username", username)
  form.append("password", password)
  form.append("email", email)
  
  const res = await fetch(`${base_url}/login`, { method: "POST", body: form })
  const data = await res.json()
  if(data.token){
  const token = await AsyncStorage.setItem("token", data.token)
  ToastAndroid.show("login sucessful",2000)
  navigation.replace("Home")
  } else {
 ToastAndroid.toast("server error", 2000)
}
}

const googleLogin = async()=>{
try {
    const result = await Google.logInAsync({
      androidStandaloneAppClientId:"",
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      let userInfo = await fetch('https://www.googleapis.com/userinfo/v2/me', {
   headers: { Authorization: `Bearer ${result.accessToken}` },
  })
  const res = await userInfo.json()
  console.log(res)
  setUsername(res.name);
  setEmail(res.email);
  setPassword(res.name);
  login();
    } else {
      ToastAndroid.show("Google signup cancelled", 2000)
    }
  } catch (e) {
    ToastAndroid.show("Google signup error", 2000)
  }
}

const FBLogin = async ()=> {
console.log('clicked')
  try {
    await Facebook.initializeAsync({
      appId: '',
    });
    const {
      type,
      token,
      expirationDate,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?fields=email,name&access_token=${token}`);
      const user = await response.json()
      console.log(token, user)
      function unicodeToChar(text) {
   return text.replace(/\\u[\dA-F]{4}/gi, 
          function (match) {
               return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
          });
}
      setUsername(user.name);
      setEmail(unicodeToChar(user.email));
      setPassword(user.name)
      login()
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    Alert.alert(`Facebook Login Error: ${message}`);
  }
}

return(
 <LinearGradient colors={['#222', '#222', '#000']} style={styles.signupContainer}>{!modal ? <Text></Text> : 
 <View>
 <RNModal isVisible={modal} 
 animationIn="zoomIn" animationOut="zoomOut">
 <View style={styles.forgotpassModal}>
 <Text style={{ fontWeight: "bold" }}>
  Forgot your password ? </Text>
 <Text style={{ color: 'gray'  }}>
type your registered email, we will send you a email for verification and you can the reset your password. Your verification session expires after 10 minutes.    
<Text style={{ color: "blue" }}>  Learn more</Text></Text>
<Input placeholder="email" placeholderTextColor="#808e9b" value={email} style={styles.normalInput} onChangeText={(text)=> setEmail(text)} />
 <View style={{ flexDirection: "row", justifyContent: "center" }}>
 <TouchableOpacity style={styles.forgotpassbtn} 
 onPress={()=> setModal(false)}>
 <Text style={{ color: "#FFF", textAlign: "center", fontWeight: 'bold', fontSize: 16 }}> cancel </Text>
 </TouchableOpacity>
 <TouchableOpacity style={styles.forgotpassbtn} 
 onPress={forgotpass}>
 <Text style={{ color: "#FFF", textAlign: "center", fontWeight: 'bold', fontSize: 16 }}> Ok </Text></TouchableOpacity></View></View></RNModal>
  </View>}<View><Text style={styles.signupHeading}> Login in </Text>
<TextInput 
placeholder='username'
placeholderTextColor='#808e9b'
value={username}
onChangeText={(text)=> setUsername(text)}
style={styles.normalInput}
autoCorrect={true}
/>
<TextInput 
placeholder='email'
placeholderTextColor='#808e9b'
value={email}
onChangeText={(text)=> setEmail(text)}
style={styles.normalInput}
autoCorrect={true}
/>
<TextInput 
placeholder='password'
placeholderTextColor='#808e9b'
value={password}
sercureTextEntry
onChangeText={(text)=> setPassword(text)}
style={styles.normalInput}
autoCorrect={true}
/>
<TouchableOpacity onPress={login}>
<Text style={styles.signupButton}> login </Text>
</TouchableOpacity>
<View style={styles.signupCaption} >
<Text style={{ color: 'white' }}> Don't have an account? 
<TouchableWithoutFeedback onPress={()=> navigation.navigate("Signup")}>
<Text style={styles.signupHeading}> Sign up </Text>
</TouchableWithoutFeedback>{"\n"}{"\n"}{"\n"}<TouchableWithoutFeedback onPress={()=> setModal(true)}>
<Text style={styles.signupHeading}> Forgot password? </Text>
</TouchableWithoutFeedback>
</Text>
<View style={styles.loginWithBar}>
          <TouchableOpacity onPress={googleLogin} style={styles.iconButton}>
            <Icon name='google' type='font-awesome' size={30} color='#808e9b' />
          </TouchableOpacity>
          <TouchableOpacity onPress={FBLogin} style={styles.iconButton}>
            <Icon
              name='facebook-square'
             type='font-awesome'
              size={30}
             color='#808e9b'
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name='apple' type='font-awesome' size={30} color='#808e9b' />
          </TouchableOpacity>
        </View>
</View>
</View>
</LinearGradient>
)
}