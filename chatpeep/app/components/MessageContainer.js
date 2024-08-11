import { View, Text, FlatList, StyleSheet, StatusBar } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import ContentLoader, {
  FacebookLoader,
  InstagramLoader,
  Bullets,
} from "react-native-easy-content-loader";
import { useSession } from "../auth/ctx";

const MessageContainer = ({ messageList }) => {
  const { session } = useSession();
  let flatListRef = useRef();

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({});
    }
  }, [messageList]);

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
