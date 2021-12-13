import React from 'react'
import { StatusBarStyle } from 'react-native'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'

import { AppNavigator } from './navigations'

interface Props {
  height?: number
  backgroundColor: string
  barStyle?: StatusBarStyle | null | undefined
}

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  )
}
export default App
