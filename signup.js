import React, { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator, FlatList, TextInput, TouchableWithoutFeedback, StatusBar, AsyncStorage, ToastAndroid, Keyboard } from 'react-native'
import styles from './styles.js'
import { LinearGradient } from 'expo-linear-gradient';
import { state } from './state.js'


export default function Signup({ navigation }){

	useLayoutEffect(()=>{
		navigation.setOptions({
			headerStyle: { 
				backgroundColor: '#222',
			},
			headerLeft: ()=>{ return(
      <Text style={{ color: "#222" }}>H</Text> )},
			headerTitleStyle: {
				textAlign: 'center',
				color: 'white'
			}
		})
	}, [navigation])


const [ username, setUsername ] = useState("")
const [ password, setPassword ] = useState("")
const [ email, setEmail ] = useState("")
const [ { base_url, token }, dispatch ] = useContext(state)
  

const signup = ()=>{
  const form = new FormData()
  form.append("username", username)
  form.append("email",email) 
  form.append("password", password) 
  fetch(`${base_url}/signup`, { method: "POST",
  body: form })
  .then((res) =>{ return res.json() })
  .then((data) =>{ 
  ToastAndroid.show(data.message, 2000)
  if  (data.message === "signup successful"){
  ToastAndroid.show(data.message)
  navigation.navigate("Login")
  }else if(data.message === "email already exists"){ 
  ToastAndroid.show(data.message, 2000)
  } else {
  ToastAndroid.show("something went wrong, try again", 2000)
  }
  })
}

return(
		<LinearGradient colors={['#222', '#222', '#000']} 
		style={styles.signupContainer} >
<View>
		<Text style={styles.signupHeading}> Sign up </Text>
<TextInput 
placeholder='usernanme'
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
		<TouchableOpacity onPress={signup}>
	<Text style={styles.signupButton}> sign up </Text>
		</TouchableOpacity>
		<View style={styles.signupCaption} >
		<Text style={{ color: 'white' }}> already have an account ?
		<TouchableWithoutFeedback onPress={()=> navigation.navigate("Login")}>
		<Text style={styles.captionMain}> Login </Text>
		</TouchableWithoutFeedback>
		</Text>
		</View>

</View>
</LinearGradient>
)
}
