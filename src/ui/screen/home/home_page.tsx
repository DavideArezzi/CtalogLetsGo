import { Button, Text, View, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import { homeStyles } from './home_styles';
import React, { useCallback, useEffect, useState } from 'react';
import { useProducts } from '../hook/useProducts.facade';
import Card from '../../atoms/product/product.atom';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Home>;
}

enum FilterType {
  initial = 'initial',
  category = 'category',
  rating = 'rating',
  allFilterType = 'allFilterType',
}

const HomeScreen = ({ navigation }: Props) => {
  const {
    products,
    setProducts,
    initialProducts,
    favoriteIds,
    refreshProducts,
    loadFavorites,
    addFavorite,
  } = useProducts();

  const [filterType, setFilterType] = useState<FilterType>(FilterType.initial);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRatingOrder, setSelectedRatingOrder] = useState<'asc' | 'desc' | null>(null);

  const onFilterApply = useCallback(() => {
    let filteredProducts = [...initialProducts];

    if (filterType === FilterType.category && selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (filterType === FilterType.rating && selectedRatingOrder) {
      filteredProducts.sort((a, b) =>
        selectedRatingOrder === 'asc'
          ? a.rating.rate - b.rating.rate
          : b.rating.rate - a.rating.rate
      );
    }

    if (filterType === FilterType.allFilterType && selectedCategory && selectedRatingOrder) {
      filteredProducts = filteredProducts
        .filter((product) => product.category === selectedCategory)
        .sort((a, b) =>
          selectedRatingOrder === 'asc'
            ? a.rating.rate - b.rating.rate
            : b.rating.rate - a.rating.rate
        );
    }

    setProducts(filteredProducts);
  }, [filterType, selectedCategory, selectedRatingOrder, initialProducts, setProducts]);

  useEffect(() => {
    onFilterApply();
  }, [filterType, selectedCategory, selectedRatingOrder]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Favorites screen focused');
      refreshProducts();
      loadFavorites();
    });

    return unsubscribe;
  }, [loadFavorites, navigation, refreshProducts]);

  const renderFilterOptions = useCallback(() => (
    <View style={homeStyles.filtersContainer}>
      <Button
        title="Reset Filters"
        onPress={() => {
          setFilterType(FilterType.initial);
          setProducts(initialProducts);
        }}
      />
      <Button
        title="Filter by Category"
        onPress={() => {
          setFilterType(FilterType.category);
          setSelectedCategory('electronics');
        }}
      />
      <Button
        title="Filter by Rating Asc"
        onPress={() => {
          setFilterType(FilterType.rating);
          setSelectedRatingOrder('asc');
        }}
      />
      <Button
        title="Filter by Rating Desc"
        onPress={() => {
          setFilterType(FilterType.rating);
          setSelectedRatingOrder('desc');
        }}
      />
      <Button
        title="Filter by Category + Rating"
        onPress={() => {
          setFilterType(FilterType.allFilterType);
          setSelectedCategory('jewelery');
          setSelectedRatingOrder('desc');
        }}
      />
    </View>
  ), [setProducts, setFilterType]);

  const renderProduct = useCallback(
    ({ item }) => (
      <Card
        product={item}
        onAddFavorite={() => addFavorite(item)}
        selected={favoriteIds.includes(item.id)}
        onPress={() => {
          if (!item.id) return;
          navigation.navigate(Screen.Detail, { id: item.id });
        }}
      />
    ),
    [addFavorite, navigation, favoriteIds]
  );

  const ItemSeparatorComponent = useCallback(() => <View style={homeStyles.itemSeparator}></View>, []);

  return (
    <View style={homeStyles.container}>
      {renderFilterOptions()}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};

export default HomeScreen;
