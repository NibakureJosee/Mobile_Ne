import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getPosts, deletePost } from '../api/jsonPlaceholder.js';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await getPosts();
    setPosts(response.data);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deletePost(id);
      console.log('Delete response:', response); // Log the response
      if (response.status === 200) {
        setPosts(posts.filter(post => post.id !== id)); // Remove the post from the state
        Alert.alert('Success', 'Post deleted successfully.');
      } else {
        Alert.alert('Error', 'Failed to delete the post.');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to delete the post: ${error.message}`);
    }
  };

  const handleNewPost = (newPost) => {
    // Add new post to the beginning of the posts array
    setPosts([newPost, ...posts]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Jsplaceholder</Text>
      <TouchableOpacity 
        style={styles.createButton} 
        onPress={() => navigation.navigate('CreatePost', { handleNewPost })}
      >
        <Text style={styles.createButtonText}>Create new post</Text>
      </TouchableOpacity>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <TouchableOpacity>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.viewButton} 
                onPress={() => navigation.navigate('Post', { id: item.id })}
              >
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAFFFD',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#007f4f',
  },
  createButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    width: '100%',	
    borderWidth: 1,
    borderColor: '#007f4f',
    marginBottom: 16,
  },
  createButtonText: {
    color: '#007f4f',
    fontSize: 16,
    textAlign: 'center', 
  },
  post: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: '#d6d6d6',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#007f4f',
  },
  body: {
    fontSize: 16,
    color: '#333333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 4,
  },
  viewButton: {
    backgroundColor: '#007f4f',
    width: '50%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 8,
    width: '50%',
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
