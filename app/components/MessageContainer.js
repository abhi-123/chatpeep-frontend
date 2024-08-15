import { View, Text, FlatList, StyleSheet, StatusBar, Pressable } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import ContentLoader, {
  FacebookLoader,
  InstagramLoader,
  Bullets,
} from "react-native-easy-content-loader";
import { useSession } from "../auth/ctx";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Speech from 'expo-speech';
const speechData = async () => {
 const typeOfSpeech = await Speech.getAvailableVoicesAsync();
  console.log(typeOfSpeech);
  
}
speechData(); 
const MessageContainer = ({ messageList }) => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const { session } = useSession();
  let flatListRef = useRef();

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({});
    }
  }, [messageList]);

 const textToSpeech = async (text) => { 
 
  let speak = await Speech.isSpeakingAsync();
  if(!speak) {
   Speech.speak(text,
    {
      onDone : () => {
      setIsSpeaking(false);

      }
    });
   setIsSpeaking(true);
}
else {
  Speech.stop();
  setIsSpeaking(false);
}

  console.log(text)

 // Speech.stop()
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {messageList.length > 0 ? (
        <>
          <FlatList
            data={messageList}
            ref={flatListRef}
            renderItem={({ item, index }) => {
              if (item.loader) {
                return (
                  <ContentLoader primaryColor="#eee" active avatar pRows={4} />
                );
              } else {
                return (
                  <>
                    <View
                      style={[
                        styles.item,
                        index % 2 == 0 ? styles.rightChat : styles.leftChat,
                      ]}
                    >
                      <Text style={styles.title}>{item?.text}</Text>
                     { index % 2 != 0 && <Pressable style={styles.button} onPress={() => textToSpeech(item?.text)}>
        <Text style={styles.text}>
        <Ionicons name={!isSpeaking ? "volume-high-outline" : "volume-mute"} size={24} color="black" />
        </Text>
      </Pressable> }
                    </View>
                    <View
                      style={
                        index % 2 == 0 ? styles.rightTime : styles.leftTime
                      }
                    >
                      <Text style={styles.time}>{item?.time}</Text>
                    </View>
                  </>
                );
              }
            }}
            keyExtractor={(item, index) => String(index)}
          />
        </>
      ) : (
        <Text>
          {session
            ? `Welcome ${
                session.charAt(0).toUpperCase() + session.slice(1)
              } to the chat session!!`
            : "User not allowed"}{" "}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: StatusBar.currentHeight || 0,

    //  backgroundColor:'wheat'
  },
  item: {
    padding: 10,
    margin: 5,

    //marginVertical: 8,
    //marginHorizontal: 16,
    //width: '90%',
    minHeight: 30,
    flexDirection: "row",
    borderRadius: 20,
    //justifyContent: 'space-between'
  },
  rightChat: {
    marginLeft: "30%",
    backgroundColor: "#fff",
  },
  leftChat: {
    marginRight: "30%",
    backgroundColor: "#eee",
  },
  title: {
    fontSize: 13,
    width: "90%",
    fontStyle: "italic",
  },
  rightTime: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  leftTime: {
    alignItems: "flex-start",
    marginBottom: 20,
  },
  time: {
    fontSize: 10,
    width: "10%",
    marginLeft: 10,
  },
});

export default MessageContainer;
