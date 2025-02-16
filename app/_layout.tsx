
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/components/useColorScheme';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OverlayProvider } from 'stream-chat-expo';
import Toast from 'react-native-toast-message';
import { StreamVideo, StreamVideoClient, User } from '@stream-io/video-react-native-sdk';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'onboardingScreen',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <InitialLayout />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

function InitialLayout() {
  const { authState, initialized } = useAuth();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const segments = useSegments();
  const router = useRouter();
  const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

  useEffect(() => {
    if (!initialized) return;
    const inAuthGroup = segments[0] === '(inside)';
    if (authState?.authenticated && !inAuthGroup) {
      router.replace('/(inside)');
    } else if (!authState?.authenticated) {
      client?.disconnectUser?.();
      setClient(null);
      router.replace('/');
    }
  }, [initialized, authState, client, router, segments]);

  useEffect(() => {
    if (authState?.authenticated && authState.token) {
      try {
        const clientInstance = new StreamVideoClient({ apiKey: STREAM_KEY! });
        const user: User = { id: authState.user_id || '' };

        clientInstance.connectUser(user, authState.token)
          .then(() => setClient(clientInstance))
          .catch(err => console.error('StreamVideoClient connectUser error:', err));
      } catch (e) {
        console.error('Error creating StreamVideoClient:', e);
      }
    }
  }, [authState, STREAM_KEY]);

  return (
    <>
      {!client ? (
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      ) : (
        <StreamVideo client={client}>
          <OverlayProvider>
            <Slot />
            <Toast />
          </OverlayProvider>
        </StreamVideo>
      )}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="onboardingScreen" options={{ headerShown: false }} />
        <Stack.Screen name="signUpScreen" options={{ title: 'Sign Up', headerLeft: () => <CustomBackButton /> }} />
        <Stack.Screen name="verificationScreen" options={{ title: 'Verification', headerLeft: () => <CustomBackButton /> }} />
        <Stack.Screen name="signInScreen" options={{ title: 'Sign In', headerLeft: () => <CustomBackButton /> }} />
        <Stack.Screen name="(inside)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

const CustomBackButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
      <Ionicons name="arrow-back" size={24} color="#2E7D32" />
    </TouchableOpacity>
  );
};


