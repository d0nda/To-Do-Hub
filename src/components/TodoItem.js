//components/TodoItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TodoItem = ({ title, date, text, onDelete }) => {
  const color = 'green'; 

  // Function to extract truncated text
  const getTruncatedText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, 25, maxLength) + '...';
  };
  

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.contentContainer}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.truncatedText}>{getTruncatedText(text)}</Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Icon name="trash" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  contentContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffff',
    marginBottom: 5,
  },
  date: {
    color: '#ffff',
    marginBottom: 5,
    marginRight: 15,
  },
  truncatedText: {
    color: '#ffff',
  },
  deleteButton: {
    position: 'absolute',
    top: 35,
    right: 10,
  },
});

export default TodoItem;
