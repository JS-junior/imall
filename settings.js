import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useLayoutEffect,
} from 'react';
import styles from './styles.js';
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
  ToastAndroid,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, ListItem, Avatar, Button, Input } from 'react-native-elements';
import { state } from './state.js';
import {
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { height, width } = Dimensions.get('window');

export default function Settings({ navigation }) {
  const [query, setQuery] = useState('');
  const [ user, setUser ] = useState("")
  const [{ base_url }, dispatch] = useContext(state);

const fetchUser = async () => {
  const token = await AsyncStorage.getItem("token")
    const res = await fetch(`https://api.code-awesome.xyz/get-user?token=${token}`);
    const data = await res.json();
    setUser(data.message);
    ToastAndroid.show('cart', 2000);
  };

  const logout = async () => {
    const token = await AsyncStorage.removeItem('token');
    ToastAndroid.show('Logged out', 2000);
    navigation.navigate('Signup');
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Settings',
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
              <ListItem.Subtitle><Text onPress={logout}>
                switch between accounts by logging out
              </Text></ListItem.Subtitle>
            </ListItem.Content>
          </LinearGradient>
        </ListItem>
      </View>
   </ScrollView>
  );
}
