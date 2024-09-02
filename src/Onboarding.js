import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const genresList = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi'];

const Onboarding = ({navigation}) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const selectGenre = genre => {
    setSelectedGenre(prevSelected => (prevSelected === genre ? null : genre));
  };

  const goToMyMovie = () => {
    if (selectedGenre) {
      navigation.navigate('MyMovie', {selectedGenre});
    } else {
      alert('Please select a genre.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.genresContainer}>
        {genresList.map(genre => (
          <TouchableOpacity
            key={genre}
            style={[
              styles.genreButton,
              selectedGenre === genre && styles.selectedGenreButton,
            ]}
            onPress={() => selectGenre(genre)}>
            <Text
              style={[
                styles.genreText,
                selectedGenre === genre && styles.selectedGenreText,
              ]}>
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={goToMyMovie}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: 'center', // Center the content vertically
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 100,
  },
  genreButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
    backgroundColor: '#FFFFFF',
  },
  selectedGenreButton: {
    backgroundColor: '#5664F5',
    borderColor: '#5664F5',
  },
  genreText: {
    color: '#000000',
    fontSize: 14,
  },
  selectedGenreText: {
    color: '#FFFFFF',
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 50,
    backgroundColor: '#5664F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Onboarding;
