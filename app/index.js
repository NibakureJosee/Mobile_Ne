import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../app/src/screens/HomeScreen';
import PostScreen from '../app/src/screens/PostScreen';
import CreatePostScreen from '../app/src/screens/CreateScreen';

const Stack = createStackNavigator();

const App = () => {
  return (

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Post" component={PostScreen} options={{headerShown:false}}/>
        <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{headerShown:false}}/>
      </Stack.Navigator>

  );
};

export default App;
