import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useLayoutEffect,
} from 'react';
import styles from './styles.js';
import { state } from './state.js';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  ToastAndroid,
  AsyncStorage,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Icon, ListItem, Avatar, Button, Input } from 'react-native-elements';
import {
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export default function Search({ navigation }) {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [{ base_url }, dispatch] = useContext(state); 
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Search',
      headerStyle: {
      backgroundColor: '#FFF',
      },

      headerTitleStyle: {
        textAlign: 'center',
        color: 'black',
      },
      headerRight: () => {
   return <Icon name="shopping-cart" type="font-awesome-5" />;
      },
    });
  }, [navigation]);

  const fetchProducts = async () => {
  const form = new FormData();
  form.append('query', query);
    const res = await fetch(`${base_url}/search`, {
      method: 'POST',
      body: form,
    });
  const data = await res.json();
  setProducts(data.message);
  };
 
return (
<ScrollView>
<Input placeholder="search" value={query}
onChangeText={(text) => {setQuery(text); fetchProducts();  }}
leftIcon={<FontAwesome name="search" size={24} color="black" />}
 />
 <View style={styles.searchContainer}>
        {!query ? 
          <View></View>
        : 
      <FlatList
            data={products}
            renderItem={({ item }) => {
              return ( 
              <TouchableWithoutFeedback onPress={()=> navigation.navigate("Product", { id: item.id }) }>
                <View style={styles.searchCard}>
                  <ListItem>
                    <Image
     
                      source={{
                        uri:
                         item.image,
                      }}
                      style={styles.searchCardImage}
                    />

                    <ListItem.Content>
                      <ListItem.Title> {item.name} </ListItem.Title>
                      <ListItem.Subtitle>
                        {item.desc}
                      </ListItem.Subtitle>
                      <Text style={{ fontWeight: 'bold' }}>
                       ₹{item.discount}
                       <Text
                          style={{
                            textDecoration: 'line-through',
                            color: 'gray',
                          }}>
                          
                        ₹{item.price}
                       </Text>
                      </Text>
                    </ListItem.Content>
                  </ListItem>
                </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
}
</View>
</ScrollView>
  );
}
