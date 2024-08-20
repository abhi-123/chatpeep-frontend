import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { Platform } from "react-native";

function useAsyncState(initialValue = [true, null]) {
  return React.useReducer((state, action) => [false, action], initialValue);
}

export async function setStorageItemAsync(key, value) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      console.log(value, "valueeeeeeee");
      await SecureStore.setItemAsync(key, JSON.stringify(value));
    }
  }
}

export function useStorageState(key) {
  // Public
  const [state, setState] = useAsyncState();

  // Get
  React.useEffect(() => {
    console.log("in effect context");
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          setState(JSON.parse(localStorage.getItem(key)));
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => {
        if (value) setState(JSON.parse(value));
      });
    }
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value) => {
      console.log("in useCallback context");
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
