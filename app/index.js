import { useCallback, useEffect, useState, React } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Animated,{ FadeIn, FadeOut} from 'react-native-reanimated';
//import Entypo from '@expo/vector-icons/Entypo';
//import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useSession } from "./auth/ctx";
import { router } from "expo-router";
import { LoginForm, SignUpForm } from "./components/form";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const { session, userCreated, signUp } = useSession();
  const [appIsReady, setAppIsReady] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showLoginSignUp, setShowLoginSignup] = useState(false);
  const [showSignupForm, setshowSignupForm] = useState(false);

  // const [messageText, onMesaageSubmit] = useState({});

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Ionicons.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  function handleSession(type) {
    setSessionStarted(type);
  }
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
      if (session) {
       // signUp(session);
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        router.setParams({ name: session });
        router.replace("/Screens");
      }
      console.log(userCreated, "userCreated");
      // if (userCreated) {
      //   setshowSignupForm(false);
      // }
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    // <Animated.View entering={FadeIn} exiting={FadeOut} style={{backgroundColor:'red'}}>
   
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
       
      {showSignupForm ? (
       
        <SignUpForm setshowSignupForm={setshowSignupForm}></SignUpForm>
       
      ) : (
        <LoginForm setshowSignupForm={setshowSignupForm}></LoginForm>
      )}
      
    </SafeAreaView>
   
    // </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    // alignItems: 'center',
    //justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
