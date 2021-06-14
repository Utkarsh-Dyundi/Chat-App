import { black } from 'color-name'
import React, {useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import  Icon  from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'
const AddChat = ({navigation}) => {
    useLayoutEffect(() => {
       navigation.setOptions({
           title: "Start a new Chat",
           headerBackTitle: "Chats"
       })
    }, [])
     
    const createChat=async ()=>{
        await db.collection('chats').add({
            chatName: input
        }).then(()=>{
            navigation.goBack();
        })
        .catch((error) => alert(error))

    }
    const [input, setInput] = useState("")
    return (
        <View style={styles.container}>
            <Input 
              placeholder="Enter a chat name"
              value={input}
              onChangeText={(text)=> setInput(text)}
              onSubmitEditing={createChat}
              leftIcon={
                  <Icon name="wechat" type="antdesign" size={24} color="black" />
              }
            />
            <Button 
            disabled={!input}
            onPress={createChat}
            title="Start new Chat"
            />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container:{
         backgroundColor:"white",
         padding:40,
         height:"100%"
    }
})
