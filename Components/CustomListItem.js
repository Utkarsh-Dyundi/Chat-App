import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = ({_id, chatName, enterChat}) => {
    return (
        <ListItem onPress={()=> enterChat(id, chatName)} key={_id} bottomDivider>
            <Avatar
            rounded
            source={{
               uri:"https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527__340.png"
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
            </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
