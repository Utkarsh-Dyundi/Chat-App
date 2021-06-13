import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'

const Login = ({navigation}) => {
    
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("")

    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged((authUser)=>{
              if(authUser){
                  navigation.replace("Home")
              }
          });
          return unsubscribe;
     },[])
    const signIn=()=>{

    }
    return (
      
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <StatusBar style="light" />
            <Image 
                source={{
                    uri:"https://cdn.pixabay.com/photo/2021/05/22/11/38/whatsapp-6273368__340.png"
                }}
                style={{height:100, width:100}}
            />
            <View style={styles.inputContainer}>
                 <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(text)=>setEmail(text)} />
                 <Input placeholder="Password" secureTextEntry autoFocus type="password" value={password} onChangeText={(text)=>setPassword(text)}/>
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button
             onPress={()=>navigation.navigate("Register")}
             containerStyle={styles.button} type="outline" title="Register" />
            <View style={{height:100}}></View>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container:{
          flex:1,
          alignItems:"center",
          justifyContent:"center",
          padding:10,
          backgroundColor:"white"
    },
    inputContainer:{
          width:300
    },
    button:{
        width:200,
        marginTop:10,
    }
})
