// src/screens/MyMovie.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';

const MyMovie = ({route, navigation}) => {
  const selectedGenre = route.params?.selectedGenre;
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({});

  const BASE_URL = 'https://ww4.yts.nz/';

  useEffect(() => {
    console.log('Received Selected Genre:', selectedGenre);
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        'https://ww4.yts.nz/api/v2/list_movies.json',
      );
      const allMovies = response.data.data.movies || [];
      console.log('Movies Fetched:', allMovies);
      setMovies(allMovies);
      filterMoviesByGenre(allMovies);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  const filterMoviesByGenre = allMovies => {
    console.log('Filtering Movies by Genre:', selectedGenre);
    const filtered = allMovies.filter(
      movie => movie.genres && movie.genres.includes(selectedGenre),
    );
    console.log('Filtered Movies:', filtered);
    setFilteredMovies(filtered);
  };

  const handleSearch = query => {
    setSearchQuery(query);
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredMovies(filtered);
  };

  const handleImageLoadStart = id => {
    setImageLoading(prev => ({...prev, [id]: true}));
  };

  const handleImageLoadEnd = id => {
    setImageLoading(prev => ({...prev, [id]: false}));
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Movies...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {filteredMovies.length > 0 ? (
        <FlatList
          data={filteredMovies}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Details', {movie: item})}>
              <View style={styles.imageContainer}>
                {imageLoading[item.id] && (
                  <ActivityIndicator
                    size="small"
                    color="#0000ff"
                    style={styles.imageLoader}
                  />
                )}
                <Image
                  source={{uri: `${BASE_URL}${item.medium_cover_image}`}}
                  style={styles.movieImage}
                  resizeMode="contain"
                  onLoadStart={() => handleImageLoadStart(item.id)}
                  onLoadEnd={() => handleImageLoadEnd(item.id)}
                />
              </View>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.movieRating}>Rating: {item.rating}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noMoviesText}>
          No movies found for the selected genre "{selectedGenre}".
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 2 / 3,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  movieImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imageLoader: {
    position: 'absolute',
    zIndex: 1,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  movieRating: {
    fontSize: 12,
    color: '#7A7A7A',
  },
  noMoviesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#7A7A7A',
  },
});

export default MyMovie;
