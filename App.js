import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login';
import Home from './components/home';


const Stack = createStackNavigator();

export default function App() {  
  
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' >
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='Home' component={Home} options={{title: "Data Karyawan"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

