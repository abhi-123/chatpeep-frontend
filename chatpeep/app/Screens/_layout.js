import { Text } from "react-native";
import { Redirect, Stack ,useNavigation,router} from "expo-router";

import { useSession } from "../auth/ctx";
import { useEffect } from "react";

export default function ChatLayout() {
  const { session, isLoading } = useSession();
  const navigation = useNavigation();



  useEffect(() => {
    if (!session) {
   //  navigation.dispatch({ type: 'POP_TO_TOP' });
     router.replace('/');
    }
  }, [session]);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  console.log(session,'in nested layout')
 
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    //return  <Redirect href="/" />;
     
 
    
  //  return navigation.dispatch({ type: 'POP_TO_TOP' });
  

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack 
    >
      <Stack.Screen
        name="ChatScreen"
        options={{
          title: "Chat Window"
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
