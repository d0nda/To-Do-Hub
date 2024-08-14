import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from '../components/TodoItem';
import { useNavigation } from '@react-navigation/native';

const CATEGORIES = [
  { id: '1', name: 'Self-care List', color: '#E6F3FF' },
  { id: '2', name: 'Daily To-do\'s', color: '#FFF5E6' },
  { id: '3', name: 'Workout List', color: '#E6FFE6' },
  { id: '4', name: 'Expenditure List', color: '#FFE6E6' },
];

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
      const updatedTodos = todos.some((t) => t.id === todo.id)
        ? todos.map((t) => (t.id === todo.id ? { ...t, ...todo } : t))
        : [...todos, { ...todo, completed: false }];

      setTodos(updatedTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Error updating or adding todo:', error);
    }
  };

  const toggleTodoCompletion = async (id) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Error toggling todo completion:', error);
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

  const renderCategory = ({ item: category }) => {
    const categoryTodos = todos.filter(todo => todo.categoryId === category.id);
    
    if (categoryTodos.length === 0) return null;

    return (
      <View style={[styles.categoryContainer, { backgroundColor: category.color }]}>
        <Text style={styles.categoryTitle}>{category.name}</Text>
        {categoryTodos.map(todo => (
          <TodoItem
            key={todo.id}
            title={todo.text}
            date={new Date(todo.createdAt).toLocaleDateString('en-GB')}
            completed={todo.completed}
            onToggleCompletion={() => toggleTodoCompletion(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            onPress={() => navigation.navigate('AddToDoScreen', { todo })}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {todos.length > 0 ? (
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={styles.imageContainer}>
          <Image source={require('../assets/To_do_empty.png')} style={styles.image} />
          <Text style={styles.boldText}>Create your first To Do</Text>
          <TouchableOpacity style={styles.addToButton} onPress={() => navigation.navigate('AddToDoScreen')}>
            <Text style={styles.addToButtonText}>Add To Do</Text>
          </TouchableOpacity>
        </View>
      )}
      {todos.length > 0 && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddToDoScreen')}
        >
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
  categoryContainer: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
  },
  addToButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addToButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default TodoScreen;