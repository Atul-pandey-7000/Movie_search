import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {addToFavorites} from './actions/movieActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = ({route}) => {
  const {movie} = route.params;
  const BASE_URL = 'https://ww4.yts.nz/';

  const handleAddToFavorites = async (event, movie) => {
    event.persist();

    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      favorites.push(movie);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      console.log('Movie added to favorites:', movie);
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.movieImage}
        source={{uri: `${BASE_URL}${movie.medium_cover_image}`}}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.description}>
        {movie.summary || 'No description available.'}
      </Text>
      <View style={styles.detailsRow}>
        <Text style={styles.detailsLabel}>Release Date:</Text>
        <Text style={styles.detailsValue}>{movie.year}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.detailsLabel}>Genre:</Text>
        <Text style={styles.detailsValue}>
          {movie.genres ? movie.genres.join(', ') : 'N/A'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={event => handleAddToFavorites(event, movie)}>
        <Text style={styles.buttonText}>Mark as Favorite</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 15,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  movieImage: {
    width: 220,
    height: 330,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  detailsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },
  detailsValue: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#5664F5',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    width: '80%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

const mapDispatchToProps = {
  addToFavorites,
};

export default connect(null, mapDispatchToProps)(Details);
