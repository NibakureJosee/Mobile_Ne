import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { createPost } from "../api/jsonPlaceholder.js";
import { TouchableOpacity } from 'react-native';

const CreatePostScreen = ({ navigation, route }) => {
  const { handleNewPost } = route.params;
  
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  const handleCreatePost = async () => {
    if (!formData.title || !formData.body) {
      Alert.alert('Validation Error', 'Both title and body are required.');
      return;
    }

    try {
      const response = await createPost({ title: formData.title, body: formData.body });
      // Assuming response.data is the newly created post object
      handleNewPost(response.data); // Call the callback to update HomeScreen
      navigation.navigate('Home');
    } catch (error) {
      console.error('Failed to create post:', error);
      Alert.alert('Error', 'Failed to create post.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
                style={styles.viewButton} 
                onPress={() => navigation.navigate('Home')}
              >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={formData.title}
        onChangeText={(val) => setFormData({ ...formData, title: val })}
      />
      <TextInput
        style={styles.body}
        placeholder="Body"
        value={formData.body}
        onChangeText={(val) => setFormData({ ...formData, body: val })}
      />
  
      <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => handleCreatePost}
              >
              <Text style={styles.createPost}>Create Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e0f7e9',
  },
  input: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 6,
  },
  body: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  viewButton: {
    width: '50%',
    color:"007f4f",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom:20,
  },
  createPost: {
    backgroundColor: '#007f4f',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom:20
  },
});

export default CreatePostScreen;
