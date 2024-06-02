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
      <StatusBar style="light" backgroundColor="#6a51ae" translucent={false} />
      <Stack.Navigator>
        <Stack.Screen 
          name="TodoScreen" 
          component={TodoScreen} 
          options={{ title: 'To-Do Hub' }} 
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
