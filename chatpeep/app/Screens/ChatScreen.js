import { View, Text, Pressable } from "react-native";
//import React from 'react'
import { useState, React } from "react";
import UserMessage from "../components/Usermessage";
import MessageContainer from "../components/MessageContainer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { generateResponse } from "../api/ChatGPTService";
import { useSession } from "../auth/ctx";

const ChatScreen = ({ handleSessionChat }) => {
  const [messageList, setMessageList] = useState([]);
  const { signOut } = useSession();

  function handleSession() {
    handleSessionChat(false);
  }
  async function handleUserInput(text) {
    // console.log('in parent app',text);
    let hours;
    let min;
    setMessageList((prevMessages) => {
      //  console.log(messageList);
      //   if(newMessage?.time) {
      console.log("in first ", prevMessages);
      hours = new Date().getHours(); //Current Hours
      min = new Date().getMinutes(); //Current Minutes
      if (min < 10) {
        min = "0" + min;
      }
      return [
        ...prevMessages,
        {
          text: `${text}`,
          time: hours + ":" + min,
        },
      ];
      //   }
    });
    const botResponse = await generateResponse(text);
    setMessageList((prevMessages) => {
      hours = new Date().getHours(); //Current Hours
      min = new Date().getMinutes(); //Current Minutes
      if (min < 10) {
        min = "0" + min;
      }

      return [
        ...prevMessages,
        {
          text: `${botResponse}`,
          time: hours + ":" + min,
        },
      ];
    });
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#eee",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 100,
          backgroundColor: "#e6e6e", 
         // justifyContent: "space-around",
         
        }}
      >
            {messageList.length > 0 && (
          <View style={{alignItems: "flex-start" , width:'20%',paddingLeft:20,height:100,justifyContent:'center'}}>
          <Pressable onPress={() => setMessageList([])}>
            <Ionicons name="refresh" size={24} color="black" />
          </Pressable>
          </View>
        )}
        <View style={{ alignItems: "flex-end",paddingRight: 20,width:'80%',marginLeft:'20%',
          justifyContent: 'space-around',height:100}}>
           <Link href="/Screens/tnc" asChild>
          <Pressable onPress={() => console.log('in clicked')}>
            <Text style={{ fontSize: 18, fontWeight: 600, color: "#2e2e2e" }}>
              Terms & Conditions
            </Text>
          </Pressable>
        </Link>
          <Pressable onPress={() => signOut()}>
            <Text style={{ fontSize: 18, fontWeight: 600, color: "#2e2e2e" }}>
            Sign Out
            </Text>
          </Pressable>
          </View>
    
        {/* <Link href="/" asChild>
      <Pressable>
        <Ionicons name="close" size={24} color="black" />
      </Pressable>
      </Link> */}
      </View>
      <MessageContainer messageList={messageList}></MessageContainer>
      <UserMessage onSubmitHandle={handleUserInput}></UserMessage>
    </View>
  );
};

export default ChatScreen;
