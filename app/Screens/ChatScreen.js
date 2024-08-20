import {
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
//import React from 'react'
import { useState, useEffect, React } from "react";
import UserMessage from "../components/Usermessage";
import MessageContainer from "../components/MessageContainer";
import { saveConvoApi, loadPreviousChatsByUserApi } from "../api/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { generateResponse } from "../api/ChatGPTService";
import { useSession } from "../auth/ctx";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import Toast from "react-native-root-toast";

import * as Speech from "expo-speech";
const speechData = async () => {
  const speak = await Speech.isSpeakingAsync();
  if (speak) Speech.stop();
};
speechData();

const ChatScreen = ({ handleSessionChat }) => {
  const [messageList, setMessageList] = useState([]);
  const { signIn, session, savedSession, saveSession } = useSession();
  const [isModalVisible, setModalVisible] = useState(false);

  console.log(savedSession, "savedSession 2", session);

  useEffect(() => {
    if (session?.savedSession) setModalVisible(true);
    else setModalVisible(false);
  }, [session]);

  function handleSession() {
    handleSessionChat(false);
  }
  async function handleUserInput(text) {
    // console.log('in parent app',text);
    let hours;
    let min;
    setMessageList((prevMessages) => {
      //   if(newMessage?.time) {
      hours = new Date().getHours(); //Current Hours
      min = new Date().getMinutes(); //Current Minutes
      if (min < 10) {
        min = "0" + min;
      }
      let lists = [
        ...prevMessages,
        {
          text: `${text}`,
          time: hours + ":" + min,
          type: "user",
          createdAt: new Date(),
        },
        {
          loader: true,
        },
      ];
      return lists;
      //   }
    });
    const botResponse = await generateResponse(text);
    setMessageList((prevMessages) => {
      hours = new Date().getHours(); //Current Hours
      min = new Date().getMinutes(); //Current Minutes
      if (min < 10) {
        min = "0" + min;
      }
      prevMessages.pop();

      return [
        ...prevMessages,
        {
          text: `${botResponse}`,
          time: hours + ":" + min,
          type: "bot",
          createdAt: new Date(),
        },
      ];
    });
  }

  const toggleModal = () => {
    let dataToSend = { ...session, savedSession: false };
    signIn(dataToSend);
    setModalVisible(!isModalVisible);
  };
  const toggleModalAndLoadData = async () => {
    let toast;
    try {
      const response = await loadPreviousChatsByUserApi({
        email: session?.email,
      });
      const { data: responseData, success, message } = response;
      if (!success) {
        toast = Toast.show(message, {
          duration: Toast.durations.LONG,
        });
        return;
      }
      let dataToSend = { ...session, savedSession: false };
      signIn(dataToSend);
      setModalVisible(!isModalVisible);
      setMessageList(responseData?.conversation);
      //  console.log(savedSession, "savedSession 1");
    } catch (error) {
      toast = Toast.show(error, {
        duration: Toast.durations.LONG,
      });
    }
  };

  const saveConvo = async () => {
    const response = await saveConvoApi({
      user: session?.email,
      conversation: messageList,
    });
    const { data: responseData, success, message } = response;
    console.log(responseData);
  };
  return session?.savedSession ? (
    <Modal isVisible={isModalVisible}>
      <View
        style={{
          height: "20%",
          width: "80%",
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Text>{`Your Saved Session is => ${savedSession}`}</Text>
        <Pressable
          style={{
            marginTop: 20,
            color: "white",
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: "#ec5990",
            borderRadius: 4,
          }}
          onPress={toggleModalAndLoadData}
        >
          <Text>Yes</Text>
        </Pressable>
        <Pressable
          style={{
            marginTop: 20,
            color: "white",
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: "#ec5990",
            borderRadius: 4,
          }}
          onPress={toggleModal}
        >
          <Text>No</Text>
        </Pressable>
      </View>
    </Modal>
  ) : (
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
          height: 50,
          backgroundColor: "#e6e6e",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            height: 50,
            justifyContent: "center",
            paddingLeft: 20,
          }}
        >
          {messageList.length > 0 && (
            <Pressable
              onPress={() => {
                setMessageList([]);
                speechData();
              }}
            >
              <Ionicons name="refresh" size={20} color="black" />
            </Pressable>
          )}
        </View>

        <View
          style={{
            alignItems: "flex-start",
            height: 50,
            justifyContent: "center",
            flex: 1,
            paddingLeft: 20,
          }}
        >
          {messageList.length > 0 && (
            <Pressable
              onPress={() => {
                speechData();
                saveConvo();
              }}
            >
              <Ionicons name="save-outline" size={20} color="black" />
            </Pressable>
          )}
        </View>

        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "space-around",
            height: 50,
            paddingRight: 20,
          }}
        >
          <Link href="/Screens/tnc" asChild>
            <Pressable onPress={() => {}}>
              <Text style={{ fontSize: 16, fontWeight: 600, color: "#2e2e2e" }}>
                Usage Policies
                {/* <Ionicons name="documents-sharp" size={20} color="black" style={{marginLeft:20}} /> */}
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
      <MessageContainer messageList={messageList}></MessageContainer>
      <UserMessage onSubmitHandle={handleUserInput}></UserMessage>
    </View>
  );
};

export default ChatScreen;
