import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';

const TodoItem = ({ title, date, completed, onToggleCompletion, onDelete, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Checkbox
            status={completed ? 'checked' : 'unchecked'}
            onPress={onToggleCompletion}
          />
          <View style={styles.textContainer}>
            <Text style={[
              styles.title,
              completed && styles.completedText
            ]}>
              {title}
            </Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Icon name="trash" size={20} color="#888" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  deleteButton: {
    padding: 5,
  },
});

export default TodoItem;