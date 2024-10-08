import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

/* Prevent the splash screen from auto-hiding before asset loading is complete.
 * Call this in global scope without awaiting, otherwise this might be called too late, when the splash screen is already hidden.
 */
SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false)

  useEffect(() => {
    async function prepare() {
      try {
        // TODO: Load any resources or data that we need prior to rendering the app

        // Artificially delay for two seconds to simulate a slow loading
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }
    prepare()
  }, [])

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaProvider>
  )
}

export default RootLayout
