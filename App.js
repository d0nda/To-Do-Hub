import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'react-native';
import TodoScreen from './src/screens/TodoScreen';
import AddToDoScreen from './src/screens/AddToDoScreen';

enableScreens();

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor="purple" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#000000',
        }}
      >
        <Stack.Screen 
          name="TodoScreen" 
          component={TodoScreen} 
          options={{ title: 'TO-DO-HUB' }} 
        />
        <Stack.Screen 
          name="AddToDoScreen" 
          component={AddToDoScreen} 
          options={{ title: 'Add To Do' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}