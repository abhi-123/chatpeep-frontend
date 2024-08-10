import { Text, View, StyleSheet, TextInput, Button, Pressable,TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Constants from 'expo-constants';
import { useSession } from "../auth/ctx";
import { Link, Redirect } from "expo-router";
import Toast from 'react-native-root-toast';
import { router } from "expo-router";
import {Keyboard} from 'react-native'
import { useState } from 'react';


const LoginForm = () => {
    const { session, signIn } = useSession();
    const [isLoading,setIsLoading] = useState(false);
  const { handleSubmit, control, reset, formState: { errors }, getValues } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });

  const onSubmit = async (data) => {
  
    let toast
    if(data.firstName.toLowerCase() != 'abhishek') {
        toast = Toast.show('User Not Allowed!\n Please check First Name again', {
            duration: Toast.durations.LONG,
            type: 'error'
            
          });
          return;
    }

    console.log('in login comp',data);
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 4000));
    setIsLoading(false);
        signIn(data.firstName);
        router.setParams({ name: getValues('firstName') });
        router.replace(`/Screens`);

    
  };

  const onChange = arg => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  console.log('errors', errors);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <Text style={styles.label}>First name (Required)</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="firstName"
        rules={{ required: { value: true, message: "First Name is required" }, }}
      />
      {errors.firstName && <Toast
            visible={true}
            hideOnPress={true}
        >{errors.firstName.message}</Toast>}
      <Text style={styles.label}>Last name</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="lastName"
       
      />

      <View style={[styles.button,isLoading ? styles.disabledbutton : '']}>
     
            <Pressable
              style={{justifyContent:'center',paddingTop:10,width:'auto',}}
              onPress={handleSubmit(onSubmit)}
              disabled = {isLoading}
            >
              <Text style={styles.text}>{isLoading ? 'Authenticating...' : 'Login'}</Text>
            </Pressable>
         
      </View>
     
      <View style={styles.loader}>
      
      <ActivityIndicator animating={isLoading} size="large" color="#ec5990" />
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  disabledbutton: {
    opacity: 0.7
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign:'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 20,
    backgroundColor: '#0e101c',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  loader: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 50,
  },
});
export default LoginForm;
