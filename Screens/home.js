import React,{useLayoutEffect, useState, useEffect} from 'react'
import {SafeAreaView, View} from 'react-native'
import { StyleSheet, Text,  ScrollView } from 'react-native'
import CustomListItem from '../Components/CustomListItem'
import { auth, db } from '../firebase'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"

const Home = ({navigation}) => {
      
    const [chats, setChats]=useState([]);

    const signOut=()=>{
        auth.signOut()
        .then(()=>{
            navigation.replace("Login")
        }
        )
    };

    useEffect(() => {
        const unsub=db.collection('chats').onSnapshot(snap=>{
            setChats(snap.docs.map(doc=>({
                id: doc.id,
                data: doc.data(),
            })))
        })
       
        return unsub
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
           title:"UChat",
           headerStyle:{ backgroundColor:"#0C2340"},
           headerLeft: ()=>(
               <View style={{ marginLeft:20}}>
               <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
               <Avatar
                rounded
                source={{
                 uri: auth?.currentUser?.photoURL
                }}
             />
                   </TouchableOpacity>
               </View>
           ),
           headerRight: ()=>(
               <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    width: 80,
                    marginLeft:20,
                    marginRight:10
               }}>
                <TouchableOpacity activeOpacity={0.5}>
                      <AntDesign name="camerao" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate("AddChat")} activeOpacity={0.5}>
                      <SimpleLineIcons name="pencil" size={24} color="white" />
                </TouchableOpacity>
               </View>
           )
        });
    }, [navigation]);

    const enterChat=(id, chatName)=>{
        navigation.navigate("Chat", {
        id, chatName,
        }
        )
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
            { console.log(chats)}
            {chats.map(({id, data: { chatName }})=>(
                <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
            ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        height:"100%"
    }
})
