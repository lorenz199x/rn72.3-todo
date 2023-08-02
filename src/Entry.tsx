import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert, Modal } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, editTodo, deleteTodo } from './redux/actions/todoAction';

/**
 * I created this interface for a simple state checking without redux
 */
interface Todo {
  id: number;
  text: string;
}

const Entry: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [todoText, setTodoText] = useState<string>('');
  // const [todos, setTodos] = useState<Todo[]>([]); // this is the state if you want to check if this is running without state management
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>('');

  const todos = useSelector((state: any) => state.Todos.todos); // this is from the initial state from reducer we just call it here to use the datas that we add in our app
  const dispatch = useDispatch(); // this code is for connecting to our action button like add, edit, delete we just send the params that is needed to run the action

  /** this is for checking the authentication based on you device security
   * I used a PIN Code '1234' for my tesing in emulator
   */
  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async (): Promise<void> => {
    /**
     * here's the basic auth checking using the expo library for local authentication
     */
    const authResult = await LocalAuthentication.authenticateAsync();
    // console.log('authResult', authResult);

    if (authResult.success) {
    /**
     * if the security validation is correct  they can access the app entry file
     */
      setIsAuthenticated(true);
    } else {
      Alert.alert('Authentication failed. Please try again.');
    }
  };

  const handleAddTodo = (): void => {
    if (todoText.trim() === '') {
      return;
    }

    /** this is the basic setup sending to default setState without redux implementation */
    // setTodos((prevTodos) => [...prevTodos, { id: Date.now(), text: todoText.trim() }]);

    dispatch(addTodo({ id: Date.now(), text: todoText.trim() }));
    setTodoText('');
  };

  const handleDeleteTodo = (id: number): void => {
    /** this is the basic setup sending to default setState without redux implementation */
    // setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (id: number): void => {
    const selectedTodo = todos.find((todo) => todo.id === id);

    if (selectedTodo) {
      setSelectedTodoId(id);
      setEditedTodoText(selectedTodo.text);
      setEditModalVisible(true);
    }
  };

  const handleSaveEdit = (): void => {
    if (!selectedTodoId || editedTodoText.trim() === '') {
      return;
    }

    /** this is the basic setup sending to default setState without redux implementation */
    // setTodos((prevTodos) =>
    //   prevTodos.map((todo) =>
    //     todo.id === selectedTodoId ? { ...todo, text: editedTodoText.trim() } : todo
    //   )
    // );
    
    dispatch(editTodo(selectedTodoId, editedTodoText.trim()));
    setEditedTodoText('');
    setEditModalVisible(false);
    setSelectedTodoId(null);
  };

  const handleCancelEdit = (): void => {
    setEditModalVisible(false);
    setSelectedTodoId(null);
  };

  if (!isAuthenticated) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Secured TODO List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your task..."
          value={todoText}
          onChangeText={(text) => setTodoText(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.todoText}>{item.text}</Text>
            <View style={styles.cardButtonsContainer}>
              <TouchableOpacity style={[styles.cardButton, styles.editButton]} onPress={() => handleEditTodo(item.id)}>
                <Text style={styles.cardButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cardButton, styles.deleteButton]} onPress={() => handleDeleteTodo(item.id)}>
                <Text style={styles.cardButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal for editing TODO */}
      <Modal
        visible={editModalVisible}
        onRequestClose={handleCancelEdit}
        transparent
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.editModal}>
            <TextInput
              style={styles.modalInput}
              value={editedTodoText}
              onChangeText={(text) => setEditedTodoText(text)}
              placeholder="Edit your task..."
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleSaveEdit}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleCancelEdit}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  todoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  cardButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#ffa500',
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  editModal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 2,
    minWidth: '80%',
    justifyContent: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#007bff',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Entry;
