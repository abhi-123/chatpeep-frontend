import { View, Text,Pressable, } from 'react-native'
//import React from 'react'
import { useState ,React} from 'react';
import UserMessage from '../../components/Usermessage';
import MessageContainer from '../../components/MessageContainer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';


const ChatScreen = ({handleSessionChat}) => {
    const [messageList, setMessageList] = useState([]);
    
    function handleSession() {
        handleSessionChat(false);
    }
    function handleUserInput(text) {
        // console.log('in parent app',text);
        let hours = new Date().getHours(); //Current Hours
          let min = new Date().getMinutes(); //Current Minutes
          if (min < 10)
           {
            min = "0" + min}
         let newMessage = {
          text: text,
          time : hours + ':' + min
      
         }
         setMessageList((prevMessages) => {
                //  console.log(messageList);
               //   if(newMessage?.time) {
                  console.log('in first ',prevMessages)
                      return [...prevMessages,newMessage]
               //   }
              });
        }
  return (
    <View  style={{ flex: 1,  justifyContent: 'space-between' , backgroundColor:'#eee'}}>
         <View style={{ width:'100%',height:100, backgroundColor:'#e6e6e' , alignItems:'flex-end',justifyContent:'space-around',paddingRight:20,paddingBottom:20}}>
         <Link href="/tnc" asChild>
      <Pressable>
        <Text style={{fontSize:18, fontWeight:600 , color:'#2e2e2e'}}>Terms & Conditions</Text>
      </Pressable>
    </Link>
    {messageList.length> 0 && <Pressable onPress={() => setMessageList([])} >
        <Ionicons name="refresh" size={24} color="black" />
      </Pressable> }
      {/* <Link href="/" asChild>
      <Pressable>
        <Ionicons name="close" size={24} color="black" />
      </Pressable>
      </Link> */}
      
    </View>
     <MessageContainer messageList= {messageList}></MessageContainer>
    <UserMessage onSubmitHandle={handleUserInput}></UserMessage>
    </View>
  )
}

export default ChatScreen