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
  Switch,
  StyleSheet,
  TextInput,
  Platform,
  Image,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
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
  const [ modal, setModal] = useState(false);
  const [ user, setUser ] = useState("")
  const [ turn, setTurn ] = useState(true)
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [{ base_url }, dispatch] = useContext(state);
  
  Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

  async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
    console.log(token);
    ToastAndroid.show(`${token}`,2000)
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


const fetchUser = async () => {
  const token = await AsyncStorage.getItem("token")
    const res = await fetch(`${base_url}/get-user?token=${token}`);
    const data = await res.json();
    setUser(data.name);
    setModal(true)
    }
    
  const notify = async()=>{
  setTurn((prev)=> !prev);
  const token = await AsyncStorage.getItem("token")
  registerForPushNotificationsAsync().then((pushToken) =>{ setExpoPushToken(pushToken)
  })
  if(!turn){
    const nextForm = new FormData()
  nextForm.append("push-token", expoPushToken)
  const generatePushToken = await fetch(`${base_url}/add-push-token?token=${token}`, { method: "POST", body: nextForm })
  const response = await generatePushToken.json()
  if(response.message === "added push"){
    ToastAndroid.show("Notifications turned on", 2000)
  } else {
    ToastAndroid.show("An error occurred", 2000)
  }
  } else {
 const res = await fetch(`${base_url}/add-push-token?push-token=${expoPushToken}&token=${token}`)
 const data = await res.json()
 ToastAndroid.show(data.message, 2000)
  }
    }
  
  
  
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
  
  useEffect(()=>{
   fetchUser()
 },[])
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
        <Text style={styles.settingsUserTxt}> {modal ? <Text>{user}</Text> : <Text></Text>}</Text>
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
              <ListItem.Title> Notifications </ListItem.Title>
              <ListItem.Subtitle>
              <Text>
        Don't miss out great deals by turning on notifications {modal ?
        <Switch rackcolor={{ false: "#767775", true: "#81b0ff" }} thumbColor={turn ? "#fff" : "#f4f3f4"} value={turn} onValueChange={notify} />: <Text></Text>}</Text>
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
