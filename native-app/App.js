import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Navigator from './routes/HomeStack';

export default function App() {
  return (
    <StatusBar style="auto" />,
    <Navigator/>
    /*
    <NavigationContainer>
      <DrawerNav/>
    </NavigationContainer>
    */
  );
}


