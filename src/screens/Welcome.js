import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../assets/images/movie_logo_main.png')}
          style={styles.icon}
        />
      </View>
      <Text style={styles.title}>Welcome to My Movies</Text>
      <Text style={styles.subtitle}>Let’s get to know you!</Text>
      <Text style={styles.inputLabel}>Enter your name</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor="#C7C7C7"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Onboarding')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: 10,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    color: '#000',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#5664F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Welcome;
