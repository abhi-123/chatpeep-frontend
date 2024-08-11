import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const UserMessage = ({ onSubmitHandle }) => {
  const [text, onChangeText] = React.useState("");
  function onChangeTextHandle(event) {
    onChangeText(event);
    // console.log(event);
  }
  function handleUserInput() {
    if (!text) return;
    onChangeText("");
    Keyboard.dismiss();
    onSubmitHandle(text);
  }
  return (
    <View style={styles.userInputContainer}>
      <TextInput
        placeholder="Type Your Message..."
        style={styles.input}
        onChangeText={onChangeTextHandle}
        value={text}
      />
      <Pressable style={styles.button} onPress={handleUserInput}>
        <Text style={styles.text}>
          <Ionicons name="send-sharp" size={24} color="white" />
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  userInputContainer: {
    flexDirection: "row",
    //  height: "auto",
    // backgroundColor: 'red',
    justifyContent: "flex-start",
  },
  input: {
    //flex:1,
    width: "70%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    //flex:1,
  },
  button: {
    margin: 12,
    width: "20%",
    marginLeft: 0,
    borderWidth: 1,
    padding: 0,
    borderRadius: 4,
    // elevation: 3,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default UserMessage;
