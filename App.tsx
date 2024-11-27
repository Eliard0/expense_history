import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/views/Login';
import HomeScreen from './src/views/Home';
import { StatusBar } from 'react-native';
import { openDatabase } from './src/data/store';

export type StackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<StackParamList>();

function App(): React.JSX.Element {
  
  const db = openDatabase();

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
