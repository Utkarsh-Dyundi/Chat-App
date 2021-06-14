import React, {useLayoutEffect, useState} from 'react'
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons"
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { db, auth } from '../firebase';
import firebase from 'firebase/app'

const Chat = ({navigation, route}) => {
     
    const [input, setInput]=useState("");
    const [messages, setMessages]=useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Chat",
            headerBackTitleVisible: false,
            headerTitleAlign:"left",
            headerTitle:()=>(
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <Avatar 
                    rounded
                    source={{
                   uri:
                      messages[0]?.data.photoURL
                     }}
                    />
                    <Text style={{color:"white", marginLeft:10, fontWeight:"700"}}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft:()=>(
             <TouchableOpacity>
                 <AntDesign name="arrowleft" size={24} color="white" 
                     style={{marginLeft:10}}
                     onPress={navigation.goBack}
                 />
             </TouchableOpacity>
            ),
            headerRight:()=>(
                <View
                 style={styles.right}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation, messages]);

    const sendmsg=()=>{
          Keyboard.dismiss();

          db.collection('chats').doc(route.params.id).collection('message').add({
             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
             message: input,
             displayName: auth.currentUser.displayName,
             email:auth.currentUser.email,
             photoURL:auth.currentUser.photoURL
          })

          setInput("")
    }

    useLayoutEffect(() => {
        const unsubscribe=db.collection('chats').doc(route.params.id).collection('message')
        .orderBy("timestamp", "desc")
        .onSnapshot((snap)=>
          setMessages(
              snap.docs.map((doc)=>({
                  id: doc.id,
                  data: doc.data(),
              }))
          )
        );
       
        return unsubscribe
    }, [route]);

    return (
        <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
        <StatusBar style="Light" />
            <KeyboardAvoidingView
             behavior={Platform.OS ==="ios"? "padding" :"height"}
             style={styles.container}
             keyboardVerticalOffset={90}
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
                <ScrollView contentContainerStyle={{paddingTop:15}}>
                {console.log(messages)}
                   {messages.map(({id, data})=>(

                       data.email===auth.currentUser.email? (
                           <View key={id} style={styles.reciever}>
                               <Avatar
                                rounded
                                position="absolute"
                                //For web
                                containerStyle={{
                                  position:"absolute", 
                                  right:-5,
                                  bottom:-15
                                }}
                                size={30}
                                right={-5}
                                bottom={-15}
                                source={{
                                    uri: data.photoURL,
                                }}
                                />
                               <Text style={styles.recieverText}>{data.message}</Text>
                           </View>
                       ): (
                           <View key={id} style={styles.sender}>
                           <Avatar
                             rounded
                                position="absolute"
                                //For web
                                containerStyle={{
                                  position:"absolute",
                                  left:-5,
                                  bottom:-15
                                }}
                                size={30}
                                left={-5}
                                bottom={-15}
                                source={{
                                    uri: data.photoURL,
                                }}
                            />
                               <Text style={styles.senderText}>{data.message}</Text>
                               <Text style={styles.senderName}>{data.displayName}</Text>
                           </View>
                       )
                   ))}
                </ScrollView>
                <View style={styles.footer}>
                <TextInput 
                style={styles.text}
                value={input}
                onChangeText={(text)=> setInput(text)}
                onSubmitEditing={sendmsg}
                placeholder="Uchat message" />
                 <TouchableOpacity onPress={sendmsg} activeOpacity={0.5} >
                  <Ionicons name="send" size={24} color="#2B68E6" />
                 </TouchableOpacity>
                </View>
                </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Chat

const styles = StyleSheet.create({
    right:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginRight:20,
        width:80
    },
    container:{
        flex:1
    },
    footer:{
        flexDirection:"row",
        alignItems:"center",
        padding:15,
        width:"100%"
    },
    text:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:"#ECECEC",
        padding:10,
        color:"grey",
        borderRadius:30
    },
    reciever:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight: 15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"white"
    },
    senderText:{
        marginLeft:10,
        marginBottom:15,
        fontWeight:"500",
        color:"white"
    },
    recieverText:{
        marginLeft:10,
        fontWeight:"500",
        color:"black"
    },
    sender:{
        padding:15,
        backgroundColor:"#2B68E6",
        alignSelf:"flex-start",
        borderRadius:20,
        marginRight: 15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    }
})
