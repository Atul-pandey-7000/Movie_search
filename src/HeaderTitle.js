import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const HeaderTitle = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('./assets/images/movies_icon.png')}
        style={styles.icon}
      />
      <Text style={styles.headerText}>My Movies</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HeaderTitle;
