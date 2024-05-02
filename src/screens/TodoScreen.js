import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from '../components/TodoItem';
import { useNavigation } from '@react-navigation/native';

const TodoScreen = ({ route }) => {
  const [todos, setTodos] = useState([]);
  const navigation = useNavigation();
  const { newTodo } = route.params || {};

  useEffect(() => {
    retrieveTodos();
  }, []);

  useEffect(() => {
    if (newTodo) {
      updateOrAddTodo(newTodo);
    }
  }, [newTodo]);

  const retrieveTodos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('todos');
      if (jsonValue !== null) {
        const storedTodos = JSON.parse(jsonValue);
        setTodos(storedTodos);
      }
    } catch (error) {
      console.error('Error retrieving todos from AsyncStorage:', error);
    }
  };

  const updateOrAddTodo = async (todo) => {
    try {
      const isExistingTodo = todos.some((t) => t.id === todo.id);
      const updatedTodos = isExistingTodo
        ? todos.map((t) => (t.id === todo.id ? todo : t))
        : [...todos, todo];

      setTodos(updatedTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Error updating or adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(filteredTodos));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('AddToDoScreen', { todo: item })}>
            <TodoItem 
              title={item.text.substring(0, 9)}
              date={new Date(item.createdAt).toLocaleDateString('en-GB')}
              text={item.text}
              onDelete={() => deleteTodo(item.id)} 
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      {todos.length === 0 && (
        <View style={styles.imageContainer}>
          <Image source={require('../assets/To_do_empty.png')} style={styles.image} />
          <Text style={styles.boldText}>Create your first To Do</Text>
          <TouchableOpacity style={styles.addToButton} onPress={() => navigation.navigate('AddToDoScreen')}>
            <Text style={styles.addToButtonText}>Add To Do</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Plus button in navigation header */}
      {todos.length > 0 && (
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddToDoScreen')}>
          <Icon name="plus" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  imageContainer: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 230,
    resizeMode: 'contain',
  },
  boldText: {
    fontWeight: 'bold',
  },
  addToButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  addToButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TodoScreen;
