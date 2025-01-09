import { View, Text, Image, Pressable } from 'react-native';
import React, { useCallback } from 'react';
import Colors from './../../constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow, setActive } = useOAuth({ strategy: 'oauth_google' }); // Ambil setActive di sini

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
      } else {
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, [startOAuthFlow, setActive]); // Menambahkan setActive ke dependensi

  return (
    <View style={{ backgroundColor: Colors.white, height: '100%' }}>
      <Image
        style={{ width: '100%', height: 500 }}
        source={require('./../../assets/images/Thumbnail.png')}
      />

      <View style={{ padding: 20, display: 'flex', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'PBold', fontSize: 30, textAlign: "center" }}>
          Adopt a Soul,
        </Text>
        <Text style={{ fontFamily: 'PBold', fontSize: 30, textAlign: "center" }}>
          Save a Life
        </Text>
        <Text style={{ fontFamily: 'PMedium', textAlign: 'center', color: Colors.gray }}>
          Let's adopt the pet which you like
        </Text>
        <Text style={{ fontFamily: 'PMedium', textAlign: 'center', color: Colors.gray }}>
          and make their life happy again
        </Text>

        <Pressable
          onPress={onPress}
          style={{
            padding: 14,
            marginTop: 20,
            backgroundColor: Colors.primary,
            width: '100%',
            borderRadius: 14
          }}>
          <Text style={{ fontFamily: 'PBold', textAlign: 'center', fontSize: 20 }}>
            Get Started
          </Text>
        </Pressable>

        <View style={{
          paddingVertical: 10,
          marginTop: 10,
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          alignContent: 'center',
        }}>
          <Text style={{ fontFamily: 'PRegular' }}>By</Text>
          <Image style={{ width: 150, height: 35 }} source={require('./../../assets/images/logo2.png')} />
        </View>
      </View>

    </View>
  );
}