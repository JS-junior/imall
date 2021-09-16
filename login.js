import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import styles from './styles.js';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, TouchableOpacity, FlatList, TextInput, TouchableWithoutFeedback, ToastAndroid, Alert, StyleSheet, Dimensions, StatusBar, Keyboard } from 'react-native'
import RNModal from 'react-native-modal';

export default function Login({ navigation }){
const [ username, setUsername ] = useState("")
const [ password, setPassword ] = useState("")
const [ email, setEmail ] = useState("")
const [query, setQuery] = useState('');
const [ modal, setModal ] = useState(false)
  
  const forgotpass = ()=>{
  setModal(false)
  ToastAndroid.show("Check your mail", 4000)
  }

useLayoutEffect(()=>{
		navigation.setOptions({
			headerStyle: { 
				backgroundColor: '#333',
			},

			headerTitleStyle: {
				textAlign: 'center',
				color: 'white'
			}
		})
	}, [navigation])

return(
 	<LinearGradient colors={['#222', '#222', '#000']} 
		style={styles.signupContainer} >
		 {!modal ? <Text></Text> : 
  <View>
 
  <RNModal isVisible={modal} 
  animationIn="zoomIn" animationOut="zoomOut">
 <View style={styles.forgotpassModal}>
 
 <Text style={{ fontWeight: "bold" }}>
  Forgot your password ? </Text>
  
 <Text style={{ color: 'gray'  }}>
 type your registered email, we will send you a email for verification and you can the reset your password. Your verification session expires after 10 minutes.    
 <Text style={{ color: "blue" }}>  Learn more</Text>
 </Text>
 
 <Input placeholder="email" placeholderTextColor="#808e9b" value={query} style={styles.normalInput} onChangeText={(text)=> setQuery(text)} />
 <View style={{ flexDirection: "row", justifyContent: "center" }}>
 <TouchableOpacity style={styles.forgotpassbtn} 
 onPress={()=> setModal(false)}>
 <Text style={{ color: "#FFF", textAlign: "center", fontWeight: 'bold', fontSize: 16 }}> cancel </Text>
 </TouchableOpacity>
 <TouchableOpacity style={styles.forgotpassbtn} 
 onPress={forgotpass}>
 <Text style={{ color: "#FFF", textAlign: "center", fontWeight: 'bold', fontSize: 16 }}> Ok </Text>
 </TouchableOpacity>
 </View>
 </View>
 </RNModal>
  </View>}
<View>
		<Text style={styles.signupHeading}> Login in </Text>
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
		<TouchableOpacity >
	<Text style={styles.signupButton}> Login in </Text>
		</TouchableOpacity>
		<View style={styles.signupCaption} >
		<Text style={{ color: 'white' }}> Don't have an account? 
	<TouchableWithoutFeedback onPress={()=> navigation.navigate("Home")}>
		<Text style={styles.signupHeading}> Sign up </Text>
		</TouchableWithoutFeedback>
		{"\n"}{"\n"}{"\n"}
		<TouchableWithoutFeedback onPress={()=> setModal(true)}>
		<Text style={styles.signupHeading}> Forgot password? </Text>
		</TouchableWithoutFeedback>

		</Text>
		</View>
		

	
</View>
</LinearGradient>
)
}