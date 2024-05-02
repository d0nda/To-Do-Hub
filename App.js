//App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoScreen from './src/screens/TodoScreen';
import AddToDoScreen from './src/screens/AddToDoScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TodoScreen" component={TodoScreen} options={{ title: 'To-Do Hub' }} />
        <Stack.Screen name="AddToDoScreen" component={AddToDoScreen} options={{ title: 'Add To Do' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
