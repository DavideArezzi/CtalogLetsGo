import { Button, Text, View, FlatList } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import { favoritesStyles } from './favorites_styles';
import Card from '../../atoms/product/product.atom';
import { useProducts } from '../hook/useProducts.facade';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Favorites>;
}

const FavoritesScreen = ({ navigation }: Props) => {
  const { products, favoriteIds,refreshProducts,loadFavorites, addFavorite} = useProducts();
  
  //**DATA **//
  const favorites = useMemo(
    () => products.filter((product) => favoriteIds.includes(product.id)),
    [products, favoriteIds]
  );
  
  // **CALLBACKS ** //
  const renderItem = useCallback(
    ({ item }) => (
      <Card
      product={item}
      onAddFavorite={() => addFavorite(item)}
      selected={favoriteIds.includes(item.id)}
      />
    ),
    [addFavorite, favoriteIds]
  );
  
  const ItemSeparatorComponent = useCallback(() => <View style={favoritesStyles.itemSeparator}></View>, []);
  
  //**USE EFFECT **//
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Favoreite screen focused');
      refreshProducts();
      loadFavorites();
    });

    return unsubscribe;
  }, [loadFavorites,navigation,refreshProducts]);


  return (
    <View style={favoritesStyles.container}>
      {
        favorites.length > 0 ? (
          <FlatList
          showsVerticalScrollIndicator={false}
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparatorComponent}
          />
        ) : (
          <Text>Nofavorites yet</Text>
        )} 
    </View>
  );
};

export default FavoritesScreen;