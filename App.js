// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './src/screens/BottomTabNavigator';
import Details from './src/Details';
import HeaderTitle from './src/HeaderTitle';
import MyMovie from './src/MyMovie'; // Import MyMovie screen
import {Provider} from 'react-redux';
import store from './src/store';
import FavoriteMovies from './src/screens/FavoriteMovies';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Main"
            component={BottomTabNavigator} // Use BottomTabNavigator for all screens
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{headerTitle: () => <HeaderTitle />}}
          />
          <Stack.Screen
            name="MyMovie"
            component={MyMovie}
            options={{headerTitle: () => <HeaderTitle />}} // Custom header
          />
          <Stack.Screen name="FavoriteMovies" component={FavoriteMovies} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
