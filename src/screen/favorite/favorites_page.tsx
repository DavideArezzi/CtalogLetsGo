import { Button, Text, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../src/types';
import { favoritesStyles } from '../favorite/favorites_styles';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Favorites>;
}

const FavoritesScreen = ({ navigation }: Props) => {
  return (
    <View style={favoritesStyles.container}>
      <Text>Schermata favorites</Text>
      <Button title={'Go to home'} onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default FavoritesScreen;