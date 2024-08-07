import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
          color: 'white'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{
         title: 'Home',
                 
      }} />
      <Stack.Screen name="Screens/ChatScreen" options={{
         title: 'Chat Window',
                 
      }}/>
       <Stack.Screen name="tnc" options={{
         title: 'Terms and Conditions',
                 
      }} /> 
    </Stack>
  );
}