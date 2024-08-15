import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import Animated, { FadeInLeft, FadeOutRight} from 'react-native-reanimated';

import { useForm, Controller } from "react-hook-form";
import Constants from "expo-constants";
import { useSession } from "../auth/ctx";
import { Link, Redirect } from "expo-router";
import Toast from "react-native-root-toast";
import { router } from "expo-router";
import { Keyboard } from "react-native";
import { useState } from "react";
import app from "../../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Modal from "react-native-modal";
import { signUpApi, signInApi } from "../api/api";

const LoginForm = ({ setshowSignupForm }) => {
  const { session, userCreated, signIn } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onSubmit = async (data) => {
    let toast;
    // if (data.name.toLowerCase() != userCreated?.toLowerCase()) {
    //   toast = Toast.show("User Not Allowed!\n Please check First Name again", {
    //     duration: Toast.durations.LONG,
    //     
    //   });
    //   return;
    // }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
try {
  const response = await signInApi(data);
  const { data: responseData, success , message } = response;
  console.log(response);
  setIsLoading(false);
  if (!success) {
    toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      
    });
    return;
  }
  signIn(responseData.name);
  router.setParams({ name: responseData.name });
  router.replace(`/Screens`);
  
} catch (error) {
  setIsLoading(false);
  toast = Toast.show(error, {
    duration: Toast.durations.LONG,
    
  });
  
}


   
 

    // const auth = getAuth();
    // signInWithEmailAndPassword(auth, data.name, data.lastName)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     console.log(userCredential);
    //     // ...
    //   })
    //   .catch((error) => {

    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(error);

    //   });
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };
  const handleLogin = () => {
    console.log('in handleLogin')
    setshowSignupForm(true);
  };

  console.log("errors", errors);

  return (
  //  <ScrollView style={{flex:1}}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex:1}}> 
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{flex:1}}>
      <View style={styles.container}>
      {/* <Animated.View entering={FadeOutRight} exiting={FadeInLeft}> */}
        <Modal isVisible={isModalVisible}>
          <View
            style={{
              height: "20%",
              width: "80%",
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <Text>{`Your Credential is => ${userCreated}`}</Text>
            <Pressable
              style={{
                marginTop: 20,
                color: "white",
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: "#ec5990",
                borderRadius: 4,
              }}
              onPress={toggleModal}
            >
              <Text style={styles.text}>Close</Text>
            </Pressable>
          </View>
        </Modal>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{
            required: { value: true, message: "Email is required" },
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          }}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
         <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="password"
          rules={{
            required: { value: true, message: "Password is required" },
          }}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        {/* <Text style={styles.label}>First name </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="name"
          rules={{
            required: { value: true, message: "First Name is required" },
          }}
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}
        <Text style={styles.label}>Last name</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="lastName"
        /> */}

        <View style={[styles.button, isLoading ? styles.disabledbutton : ""]}>
          <Pressable
            style={{ justifyContent: "center", paddingTop: 10, width: "auto" }}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            <Text style={styles.text}>
              {isLoading ? "Authenticating..." : "Login"}
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Pressable onPress={toggleModal}>
            <Text style={{ color: "#ec5990" }}>Forgot Password </Text>
          </Pressable>
        </View>

        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white" }}>Not a Member? </Text>
          <Pressable onPress={handleLogin}>
            <Text style={{ color: "#ec5990" }}>Sign Up </Text>
          </Pressable>
        </View>

        <View style={styles.loader}>
          <ActivityIndicator
            animating={isLoading}
            size="large"
            color="#ec5990"
          />
        </View>
        {/* </Animated.View> */}
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  //  </ScrollView>
  );
};

const SignUpForm = ({ setshowSignupForm }) => {
  const { userCreated, signUp } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
    watch
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordRepeat: "",
    },
  });

  let password  = watch("password", "");

  const onSubmit = async (data) => {
    let toast;
    delete data.passwordRepeat;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    signUp(data.name);
    setIsLoading(false);
try {

  const response = await signUpApi(data);
  const { data: responseData, success , message } = response;
  console.log(responseData);
  setIsLoading(false);
  if (!success) {
    toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      
    });
    return;
  }
  toast = Toast.show(message, {
    duration: Toast.durations.LONG,
    
  });

  console.log(response);
  setshowSignupForm(false);
  
} catch (error) {
  setIsLoading(false);
  toast = Toast.show(error, {
    duration: Toast.durations.LONG,
    
  });
  
}




    // const auth = getAuth();
    // signInWithEmailAndPassword(auth, data.name, data.lastName)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     console.log(userCredential);
    //     // ...
    //   })
    //   .catch((error) => {

    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(error);

    //   });

    // router.setParams({ name: getValues("name") });
    //router.replace(`/Screens`);
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };
  const handleLogin = () => {
    setshowSignupForm(false);
  };

  console.log("errors", errors);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex:1}}> 
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{flex:1}}>
      <View style={styles.container}>
       <Animated.View entering={FadeInLeft} exiting={FadeOutRight}>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
            placeholder="Email "
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{
            required: { value: true, message: "Email is required" },
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          }}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Name"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="name"
          rules={{
            required: { value: true, message: "Name is required" },
          }}
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}
       
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="password"
          rules={{
            required: { value: true, message: "Password is required" },
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters"
            }
          }}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
       
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Confirm Pasword "
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="passwordRepeat"
          rules={{
            required: { value: true, message: "Confirm Password is required" },
            validate: (val) => {
              if (watch('password') != val) {
                return "Your passwords do no match";
              }
            }
          }}
        />
        {errors.passwordRepeat && (
          <Text style={styles.errorText}>{errors.passwordRepeat.message}</Text>
        )}

        <View style={[styles.button, isLoading ? styles.disabledbutton : ""]}>
          <Pressable
            style={{ justifyContent: "center", paddingTop: 10, width: "auto" }}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            <Text style={styles.text}>
              {isLoading ? "Creating User..." : "Sign Up"}
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white" }}>Already a Member? </Text>
          <Pressable onPress={handleLogin}>
            <Text style={{ color: "#ec5990" }}>Log In </Text>
          </Pressable>
        </View>

        <View style={styles.loader}>
          <ActivityIndicator
            animating={isLoading}
            size="large"
            color="#ec5990"
          />
        </View>
        </Animated.View>
      </View>

    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "white",
    margin: 20,
    marginLeft: 0,
    marginRight:0
  },
  button: {
    marginTop: 20,
    color: "white",
    height: 40,
    backgroundColor: "#ec5990",
    borderRadius: 4,
  },
  disabledbutton: {
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
  errorText: {
    fontSize: 12,
    // lineHeight: 21,
    // fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#F44336",
    //  textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 20,
    backgroundColor: "#0e101c",
  },
  input: {
    backgroundColor: "white",
    borderColor: "none",
    height: 40,
    padding: 10,
    borderRadius: 4,
    margin: 20,
    marginLeft: 0,
    marginRight:0


  },
  loader: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
  },
});
export { LoginForm, SignUpForm };
