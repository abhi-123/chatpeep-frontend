import { Text, Pressable } from "react-native";
import { Redirect, Stack, useNavigation, router } from "expo-router";

import { useSession } from "../auth/ctx";
import { useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ChatLayout() {
  const { session, isLoading, signOut } = useSession();
  const navigation = useNavigation();

  useEffect(() => {
    if (!session) {
      //  navigation.dispatch({ type: 'POP_TO_TOP' });
      router.replace("/");
    }
  }, [session]);
  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.

  // On web, static rendering will stop here as the user is not authenticated
  // in the headless Node process that the pages are rendered in.
  //return  <Redirect href="/" />;

  //  return navigation.dispatch({ type: 'POP_TO_TOP' });

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen
        name="ChatScreen"
        options={{
          title: "Chat Window",
          headerRight: () => (
            <Pressable onPress={() => signOut()}>
              <MaterialIcons name="logout" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="tnc"
        options={{
          title: "Terms and Conditions",
        }}
      />
    </Stack>
  );
}
