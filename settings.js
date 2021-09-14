import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styles from './styles.js'
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, ListItem, Avatar, Button, Input } from 'react-native-elements';

import { MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export default function Settings({ navigation }) {
  const people = [
    { name: 'Hitretha', comment: 'Amazing product' },
    { name: 'Hitretha', comment: 'Amazing product' },
    { name: 'Hitretha', comment: 'Amazing product' },
    { name: 'Hitretha', comment: 'Amazing product' },
  ];
  const [items, setItems] = useState(people);
  const [query, setQuery] = useState('');

useLayoutEffect(()=>{
		navigation.setOptions({
		  title: "Settings",
			headerStyle: { 
				backgroundColor: '#FFF',
			},
			
			headerTitleStyle: {
				textAlign: 'center',
				color: 'black'
			},
			headerRight: ()=>{ return(
			<Icon name='shopping-cart' type='font-awesome-5' />)}
			})
	}, [navigation])
	
  return (
    <ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <Avatar
          rounded
          source={{
            uri:
              'http://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
          }}
        />
        <Text style={styles.settingsUserTxt}> Username </Text>
      </View>

      <View style={styles.settingsContainer}>
        <ListItem>
          <LinearGradient
            style={styles.settingsCard}
            colors={['#FF9800', '#F44336']}>
            <ListItem.Content>
              <ListItem.Title> Invite Friends </ListItem.Title>
              <ListItem.Subtitle>
                share this app among your friends
              </ListItem.Subtitle>
            </ListItem.Content>
          </LinearGradient>
        </ListItem>
      </View>

      <View style={styles.settingsContainer}>
        <ListItem>
          <LinearGradient
            style={styles.settingsCard}
            colors={['#FF9800', '#F44336']}>
            <ListItem.Content>
              <ListItem.Title> Help and Support</ListItem.Title>
              <ListItem.Subtitle>
                Any queries, ask at our commnunity
              </ListItem.Subtitle>
            </ListItem.Content>
          </LinearGradient>
        </ListItem>
      </View>

      <View style={styles.settingsContainer}>
        <ListItem>
          <LinearGradient
            style={styles.settingsCard}
            colors={['#FF9800', '#F44336']}>
            <ListItem.Content>
              <ListItem.Title> Terms and conditions </ListItem.Title>
              <ListItem.Subtitle>
                Please Read our term and conditions page for more details.
              </ListItem.Subtitle>
            </ListItem.Content>
          </LinearGradient>
        </ListItem>
      </View>

      <View style={styles.settingsContainer}>
        <ListItem>
          <LinearGradient
            style={styles.settingsCard}
            colors={['#FF9800', '#F44336']}>
            <ListItem.Title> Change username</ListItem.Title>
            <ListItem.Subtitle>
              <TextInput />
            </ListItem.Subtitle>
          </LinearGradient>
        </ListItem>
      </View>

      <View style={styles.settingsContainer}>
        <ListItem>
          <LinearGradient
            style={styles.settingsCard}
            colors={['#FF9800', '#F44336']}>
            <ListItem.Content>
              <ListItem.Title> Toggle Theme </ListItem.Title>
              <ListItem.Subtitle> switch between themes</ListItem.Subtitle>
            </ListItem.Content>
          </LinearGradient>
        </ListItem>
      </View>

      <View style={styles.settingsContainer}>
        <ListItem>
          <LinearGradient
            style={styles.settingsCard}
            colors={['#FF9800', '#F44336']}>
            <ListItem.Content>
              <ListItem.Title> Total Expenses </ListItem.Title>
              <ListItem.Subtitle>
               
                cost of all purchases till now, $100
              </ListItem.Subtitle>
            </ListItem.Content>
          </LinearGradient>
        </ListItem>
      </View>

      <View style={styles.settingsContainer}>
        <ListItem>
          <LinearGradient
            style={styles.settingsCard}
            colors={['#FF9800', '#F44336']}>
            <ListItem.Content>
              <ListItem.Title> Logout </ListItem.Title>
              <ListItem.Subtitle>
                switch between accounts by logging out
              </ListItem.Subtitle>
            </ListItem.Content>
          </LinearGradient>
        </ListItem>
      </View>
    </ScrollView>
  );
}
