// store.js
import {createStore, combineReducers} from 'redux';
import favoriteMoviesReducer from './reducer/favoriteMoviesReducer';

const rootReducer = combineReducers({
  favoriteMovies: favoriteMoviesReducer,
});

const store = createStore(rootReducer);

export default store;
