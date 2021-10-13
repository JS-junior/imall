import React, { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator, FlatList, Alert, TextInput, TouchableWithoutFeedback, StatusBar, AsyncStorage, ToastAndroid, Keyboard } from 'react-native'
import styles from './styles.js'
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { state } from './state.js'
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

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
  
const googleSignup = async()=>{
try {
    const result = await Google.logInAsync({
      androidStandaloneAppClientId:"",
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
    console.log(result)
      let userInfo = await fetch('https://www.googleapis.com/userinfo/v2/me', {
   headers: { Authorization: `Bearer ${result.accessToken}` },
  })
  const res = await userInfo.json()
  setUsername(res.name);
  setEmail(res.email);
  setPassword(res.name);
  signup();

    } else {
      ToastAndroid.show("Google signup cancelled", 2000)
    }
  } catch (e) {
    ToastAndroid.show("Google signup error", 2000)
  }
}
const FBSignup = async ()=> {
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
function unicodeToChar(text) {
   return text.replace(/\\u[\dA-F]{4}/gi, 
          function (match) {
               return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
          });
}
      const response = await fetch(`https://graph.facebook.com/me?fields=email,name&access_token=${token}`);
      const user = await response.json()
      setUsername(user.name);
      setEmail(unicodeToChar(user.email));
      setPassword(user.name)
      signup()
    } else {
   ToastAndroid.show("FB signup Cancelled",2000)
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}
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
  if(data.message === "signup successful"){
  ToastAndroid.show(data.message,2000)
  navigation.replace("Login")
  }else if(data.message === "email already exists"){ 
  ToastAndroid.show(data.message, 2000)
  } else {
  ToastAndroid.show("something went wrong, try again", 2000)
  }
  })
 .catch(err => ToastAndroid.show("an error occurred",2000))
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
	<View style={styles.loginWithBar}>
          <TouchableOpacity onPress={googleSignup} style={styles.iconButton}>
            <Icon name='google' type='font-awesome' size={30} color='#808e9b' />
          </TouchableOpacity>
          <TouchableOpacity onPress={FBSignup} style={styles.iconButton}>
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
