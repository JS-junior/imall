import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Text, View, TouchableOpacity, FlatList, TextInput, TouchableWithoutFeedback, StatusBar, Keyboard } from 'react-native'
import styles from './styles.js'
import { LinearGradient } from 'expo-linear-gradient';

export default function Signup({ navigation }){

	useLayoutEffect(()=>{
		navigation.setOptions({
			headerStyle: { 
				backgroundColor: '#222',
			},

			headerTitleStyle: {
				textAlign: 'center',
				color: 'white'
			}
		})
	}, [navigation])


const [ username, setUsername ] = useState("")
const [ password, setPassword ] = useState("")
const [ email, setEmail ] = useState("")
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
		<TouchableOpacity >
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
