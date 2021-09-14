import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import styles from './styles.js';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, TouchableOpacity, FlatList, TextInput, TouchableWithoutFeedback, StyleSheet, Dimensions, StatusBar, Keyboard } from 'react-native'

export default function Login({ navigation }){
const [ username, setUsername ] = useState("")
const [ password, setPassword ] = useState("")
const [ email, setEmail ] = useState("")

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
		<TouchableWithoutFeedback>
		<Text style={styles.signupHeading}> Forgot password? </Text>
		</TouchableWithoutFeedback>

		</Text>
		</View>
		

	
</View>
</LinearGradient>
)
}