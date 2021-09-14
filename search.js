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
  Image,
  ScrollView,
} from 'react-native';

import { Icon, ListItem, Avatar, Button, Input } from 'react-native-elements';

import { MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export default function Search({ navigation }) {
  
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
		  title: "Search",
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
      <Input
        placeholder="search"
        value={query}
        onChangeText={(text) => setQuery(text)}
        leftIcon={<FontAwesome name="search" size={24} color="black" />}
      />

      <View style={styles.searchContainer}>
        {!query ? (
          <View></View>
        ) : (
          <FlatList
            data={items}
            renderItem={({ val }) => {
              return (
                <View style={styles.searchCard}>
                  <ListItem>
                    <Image
                      source={{
                        uri:
                          'http://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
                      }}
                      style={styles.searchCardImage}
                    />

                    <ListItem.Content>
                      <ListItem.Title> Airpods </ListItem.Title>
                      <ListItem.Subtitle>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Repel odioassumenda itaque ut repudiandae optio
                        labore deserunt rem. Obcaecati deserunt soluta possimus
                        modi asperiores laudantium voluptatem ipsa officiis sit
                        necessitatibu
                      </ListItem.Subtitle>
                      <Text style={{ fontWeight: 'bold' }}>
                        {' '}
                        $29{' '}
                        <Text
                          style={{
                            textDecoration: 'line-through',
                            color: 'gray',
                          }}>
                          {' '}
                          $37
                        </Text>
                      </Text>
                    </ListItem.Content>
                  </ListItem>
                </View>
              );
            }}
          />
        )}
      </View>
    </ScrollView>
  );
}