import React, {useState, useEffect,useLayoutEffect} from 'react'
import { StyleSheet,  View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image,Text, } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'
const Register = ({navigation}) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"Login",
        });
    }, [navigation]);


    const register=()=>{
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser=>{
             authUser.user.update({
                 displayName: name,
                 photoURL: imageUrl||"https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249__340.png"
             })
        }).catch((error)=>alert("Error accured"))
    };


    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar style="light" />
        <Text h3 style={{marginBottom:50}}>
            Create your account
        </Text>
        <View style={styles.inputContainer}>
        <Input placeholder="Full Name" 
          autoFocus type="text"
          value={name}
          onChangeText={(text)=>setName(text)}
        />
        <Input placeholder="Email" 
          autoFocus type="text"
          value={email}
          onChangeText={(text)=>setEmail(text)}
        />
        <Input placeholder="Password" 
          autoFocus type="text"
          value={password}
          secureTextEntry
          onChangeText={(text)=>setPassword(text)}
        />
        <Input placeholder="Profile picture URL {optional}" 
          autoFocus type="text"
          value={imageUrl}
          onChangeText={(text)=>setImageUrl(text)}
        />
        </View>
        <Button 
           raised
            onPress={register}
            title="Register"
        />
      </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white"
  },
  button:{
      width:200,
      marginTop:10
  },
  inputContainer:{
      width:300
  }
})
