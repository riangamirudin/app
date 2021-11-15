import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';

const Login = ({navigation}) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

handleLogin = () => {
  if (username && password){
    setError(null);
    setLoading(true);

    fetch('http://gmedia.bz/DemoCase/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Service': 'gmedia-recruitment',
        'Auth-Key': 'demo-admin',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(async (response) => response.json())
    .then(async ({metadata, response}) => {
        setLoading(false);
        if(metadata.status == 200){          
          await AsyncStorage.setItem('uid', response.uid);
          await AsyncStorage.setItem('token', response.token);

          // const user = await AsyncStorage.getItem('token');
          navigation.navigate('Home');
        }
        else{
          // WARNING ERROR
          setError(metadata.message);
        }
      }
    )
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setError(error);
    });
  }
  else{
    setLoading(false);
    setError(error);
    console.log('WARNING');
  }
}

// const errorWarning = (erortext) => {
//   return(
//     <Text>{erortext}</Text>
//   );
// }

return (
  <ScrollView>
    <View style={styles.container} >
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      
      <View>
        {
          error && <Text>{error}</Text>
        }
      </View>
      <TextInput style={styles.inputText} onChangeText={(username)=> setUsername(username)} placeholder="Username" />
      
      <TextInput secureTextEntry={true} style={styles.inputText} onChangeText={(password)=> setPassword(password)} placeholder="Password" />
      <TouchableOpacity style={styles.buttonDefault} onPress={handleLogin}>          
        <View>
          {
            loading ? <ActivityIndicator size="small" color="#fff" />:<Text style={{color: '#fff', fontWeight: 'bold'}}>Login</Text>
          }
        </View>
      </TouchableOpacity>        
    </View>
  </ScrollView>
);
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  inputText: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  buttonDefault: {
    backgroundColor: '#B983FF',
    margin: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
  }
});