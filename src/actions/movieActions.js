import AsyncStorage from '@react-native-async-storage/async-storage';

export const addToFavorites = movie => {
  return async dispatch => {
    try {
      console.log('Dispatching ADD_TO_FAVORITES action:', movie);

      const currentFavorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = currentFavorites ? JSON.parse(currentFavorites) : [];

      favoritesArray.push(movie);

      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));

      dispatch({
        type: 'ADD_TO_FAVORITES',
        payload: movie,
      });
    } catch (error) {
      console.error('Error saving favorite movie:', error);
    }
  };
};
