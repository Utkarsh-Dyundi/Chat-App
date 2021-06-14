import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase';

const CustomListItem = ({id, chatName, enterChat}) => {
const [chatMessages, setChatMessages]= useState([]);

  useEffect(() => {
      const unsub=db.collection('chats').doc(id).collection('message')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snap)=>
         setChatMessages(snap.docs.map((doc)=>doc.data()))
      )
      return unsub
  },[])

    return (
        <ListItem key= {id} onPress={()=> enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar
            rounded
            source={{

               uri: chatMessages?.[0]?.photoURL||"https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527__340.png"
            }}
             />
             <ListItem.Content>
            <ListItem.Title style={{fontWeight:"800"}}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle
            numberOfLines={1}
            ellipsizeMode="tail"
            >
            {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
            </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
