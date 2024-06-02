import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RichText, Toolbar, useEditorBridge } from '@10play/tentap-editor';

const AddToDoScreen = ({ route }) => {
  const [text, setText] = useState('');
  const { todo } = route.params || {};
  const navigation = useNavigation();

  // Initialize the 10tap editor
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: todo ? todo.text : '',
  });

  useEffect(() => {
    if (todo) {
      // Set initial content of the editor to the text of the todo
      console.log("Todo Text:", todo.text);
      editor.setContent(todo.text);
    }
  }, [todo, editor]);

  const addTodo = useCallback(() => {
    editor.getText().then((content) => {
      if (content.trim() !== '') {
        if (todo) {
          const updatedTodo = { ...todo, text: content };
          navigation.navigate('TodoScreen', { newTodo: updatedTodo });
        } else {
          const newTodo = { id: Date.now().toString(), text: content, createdAt: new Date().toISOString() };
          navigation.navigate('TodoScreen', { newTodo }); 
        }
        setText('');
      }
    });
  }, [editor, navigation, todo]);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <Icon name="plus" size={20} color="white" />
          </TouchableOpacity>
        ),
      });
    }, [navigation, addTodo])
  );

  return (
    <SafeAreaView style={styles.fullScreen}>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  keyboardAvoidingView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  addButton: {
    marginRight: 10,
    backgroundColor: 'blue',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddToDoScreen;
