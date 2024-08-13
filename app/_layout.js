import { Stack, Redirect } from "expo-router";
import { SessionProvider } from "./auth/ctx";
import { useSession } from "./auth/ctx";
import { RootSiblingParent } from "react-native-root-siblings";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function RootLayout() {
  const { session, isLoading } = useSession();


  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/Screens" />;
  }
  return (
    <SessionProvider>
      <RootSiblingParent>
      {/* <KeyboardAwareScrollView> */}
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "black",
              color: "white",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Home",
            }}
          />
          <Stack.Screen
            name="Screens"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        {/* </KeyboardAwareScrollView> */}
      </RootSiblingParent>
    </SessionProvider>
  );
}
