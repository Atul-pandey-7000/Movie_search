const initialState = {
  favorites: [],
};

const favoriteMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      const isAlreadyFavorite = state.favorites.some(
        movie => movie.id === action.payload.id,
      );
      if (isAlreadyFavorite) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

export default favoriteMoviesReducer;
