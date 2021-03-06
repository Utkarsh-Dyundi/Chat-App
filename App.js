import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screens/login'
import Register from './Screens/register'
import Home from './Screens/home'
import AddChat from './Screens/addChat';
import Chat from './Screens/chat';
const Stack = createStackNavigator();

const globalScreenOptions={
  headerStyle:{backgroundColor:"#0C2340"},
  headerTitleStyle:{ color: "white"},
  headerTintColor:"white",
  headerTitleStyle: { 
    textAlign:"center", 
    flex:1 
},
}
export default function App() {
  return (
    <NavigationContainer >
    <Stack.Navigator screenOptions={globalScreenOptions}>
    <Stack.Screen name='Login' component={Login}></Stack.Screen>
    <Stack.Screen name='Register' component={Register}></Stack.Screen>
    <Stack.Screen name='Home' component={Home}></Stack.Screen>
    <Stack.Screen name='AddChat' component={AddChat}></Stack.Screen>
    <Stack.Screen name='Chat' component={Chat}></Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
