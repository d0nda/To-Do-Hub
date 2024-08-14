import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, Button } from 'react-native-paper';

const CATEGORIES = [
  { id: '1', name: 'Self-care List' },
  { id: '2', name: 'Daily To-do\'s' },
  { id: '3', name: 'Workout List' },
  { id: '4', name: 'Expenditure List' },
];

const AddToDoScreen = ({ route }) => {
  const [text, setText] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const { todo } = route.params || {};
  const navigation = useNavigation();

  useEffect(() => {
    if (todo) {
      setText(todo.text);
      setCategoryId(todo.categoryId);
    }
  }, [todo]);

  const addTodo = useCallback(() => {
    if (text.trim() !== '' && categoryId) {
      const newTodo = todo
        ? { ...todo, text, categoryId }
        : { 
            id: Date.now().toString(), 
            text, 
            categoryId, 
            createdAt: new Date().toISOString(),
            completed: false
          };
      navigation.navigate('TodoScreen', { newTodo });
      setText('');
      setCategoryId('');
    }
  }, [text, categoryId, navigation, todo]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Icon name="check" size={20} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, addTodo]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <TextInput
          style={styles.input}
          placeholder="Enter your todo"
          value={text}
          onChangeText={setText}
          multiline
        />
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Select Category:</Text>
          {CATEGORIES.map((category) => (
            <Button
              key={category.id}
              mode={categoryId === category.id ? 'contained' : 'outlined'}
              onPress={() => setCategoryId(category.id)}
              style={styles.categoryButton}
            >
              {category.name}
            </Button>
          ))}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  input: {
    marginBottom: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryButton: {
    marginBottom: 10,
  },
  addButton: {
    marginRight: 10,
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddToDoScreen;