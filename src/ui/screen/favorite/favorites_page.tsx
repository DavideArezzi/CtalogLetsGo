import { Button, Text, View, FlatList } from 'react-native';
import React  { useCallback, useEffect, useMemo } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import { favoritesStyles } from './favorites_styles';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Favorites>;
}

const FavoritesScreen = ({ navigation }: Props) => {
  const { products}
  return (
    <View style={favoritesStyles.container}>
      <Text>Schermata favorites</Text>
      <Button title={'Go to home'} onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default FavoritesScreen;