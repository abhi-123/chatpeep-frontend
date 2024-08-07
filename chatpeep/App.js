import { useCallback, useEffect, useState ,React} from 'react';
import { Text, View, Pressable, StyleSheet ,SafeAreaView} from 'react-native';
//import Entypo from '@expo/vector-icons/Entypo';
//import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import UserMessage from './components/Usermessage';
import MessageContainer from './components/MessageContainer';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
 // const [messageText, onMesaageSubmit] = useState({});
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Ionicons.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      } 
    }

    prepare();
  }, []);

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
  const handleSession = (type) => {
    setSessionStarted(type);
  }
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      console.log(appIsReady)
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return ( 
    <SafeAreaView  style={{flex: 1}} onLayout={onLayoutRootView}>
    {!sessionStarted &&  <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
   <Pressable style={styles.button} onPress={() => handleSession(true)}>
      <Text style={styles.text}>Get Started</Text>
    </Pressable> 
    </View> }
    {sessionStarted && 
    <View style={{ flex: 1,  justifyContent: 'space-between' , backgroundColor:'#eee'}}> 
    <View style={{ width:'100%',height:100, backgroundColor:'#e6e6e' , alignItems:'flex-end',justifyContent:'flex-end',paddingRight:20,paddingBottom:20}}>
    {messageList.length> 0 && <Pressable onPress={() => setMessageList([])} >
        <Ionicons name="refresh" size={24} color="black" />
      </Pressable> }
      <Pressable onPress={() => handleSession(false)}>
        <Ionicons name="close" size={24} color="black" />
      </Pressable>
      
    </View>
    <MessageContainer messageList= {messageList}></MessageContainer>
    <UserMessage onSubmitHandle={handleUserInput}></UserMessage>
    </View>
    }
    </SafeAreaView>
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
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
}); 