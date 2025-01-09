import { ActivityIndicator, View } from "react-native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store'
import { Slot } from 'expo-router'

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export default function RootLayout() {

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

  const [fontsLoaded] = useFonts({
    "PBlack": require("../assets/fonts/Poppins-Black.ttf"),
    "PBold": require("../assets/fonts/Poppins-Bold.ttf"),
    "PExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "PExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "PLight": require("../assets/fonts/Poppins-Light.ttf"),
    "PMedium": require("../assets/fonts/Poppins-Medium.ttf"),
    "PRegular": require("../assets/fonts/Poppins-Regular.ttf"),
    "PSemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "PThin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }


  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
      </Stack>
    </ClerkProvider>
  );
}
