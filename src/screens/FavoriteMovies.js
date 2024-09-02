import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://ww4.yts.nz/';

const FavoriteMovies = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          setFavorites(parsedFavorites);
        } else {
          console.log('No favorites found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error loading favorite movies:', error);
      }
    };

    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favorite Movies</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {favorites.length === 0 ? (
          <Text style={styles.noFavorites}>No favorite movies found.</Text>
        ) : (
          favorites.map((movie, index) => (
            <View key={index} style={styles.movieCard}>
              <Image
                source={{uri: `${BASE_URL}${movie.medium_cover_image}`}}
                style={styles.movieImage}
              />
              <View style={styles.movieDetails}>
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <Text style={styles.movieGenre}>
                  {movie.genres ? movie.genres.join(', ') : 'N/A'} |{' '}
                  {movie.year}
                </Text>
                <Text style={styles.movieDescription}>{movie.summary}</Text>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  backButton: {
    backgroundColor: '#6E6BE8',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  movieCard: {
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  movieImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 15,
  },
  movieDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  movieGenre: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  movieDescription: {
    fontSize: 14,
    color: '#666',
  },
  detailsButton: {
    backgroundColor: '#6E6BE8',
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noFavorites: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default FavoriteMovies;
