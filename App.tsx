import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './assets/src/root.stack';

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
