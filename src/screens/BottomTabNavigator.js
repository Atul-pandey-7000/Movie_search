import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import Welcome from './Welcome';
import Onboarding from '../Onboarding';
import FavoriteMovies from './FavoriteMovies';
import MyMovie from '../MyMovie';

import homeIcon from '../assets/images/home_icon.png';
import searchIcon from '../assets/images/search_icon.png';
import heartIcon from '../assets/images/favourite.png';
import filmIcon from '../assets/images/my_movie.png';

const BottomTab = createBottomTabNavigator();

const iconMap = {
  Welcome: homeIcon,
  Onboarding: searchIcon,
  FavoriteMovies: heartIcon,
  MyMovie: filmIcon,
};

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          const icon = iconMap[route.name];
          return (
            <Image
              source={icon}
              style={{width: size, height: size, tintColor: color}}
            />
          );
        },
      })}>
      <BottomTab.Screen name="Welcome" component={Welcome} />
      <BottomTab.Screen name="Onboarding" component={Onboarding} />
      <BottomTab.Screen name="MyMovie" component={MyMovie} />
      <BottomTab.Screen name="FavoriteMovies" component={FavoriteMovies} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
