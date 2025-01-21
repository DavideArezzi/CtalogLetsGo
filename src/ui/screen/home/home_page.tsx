import { Button, Text, View,FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import { homeStyles } from './home_styles';
import React, { useCallback, useEffect, useState } from 'react';
import { useProducts } from '../hook/useProducts.facade';


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

  // ** Funzione per applicare i filtri **
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

  // ** Render delle opzioni di filtro **
  const renderFilterOptions = useCallback(() => {
    return (
      <View style={homeStyles.filtersContainer}>
        <Button title="Reset" onPress={() => setProducts(initialProducts)} />
        <Button
          title="Filter by Category"
          onPress={() => {
            setFilterType(FilterType.category);
            setSelectedCategory('electronics'); // Esempio di categoria
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
            setSelectedCategory('jewelery'); // Esempio di categoria
            setSelectedRatingOrder('desc');
          }}
        />
        <Button title="Apply Filters" onPress={onFilterApply} />
      </View>
    );
  }, [onFilterApply, initialProducts]);

  // ** Render di ogni prodotto **
  const renderProduct = useCallback(
    ({ item }) => (
      <View style={homeStyles.productCard}>
        <Text>{item.title}</Text>
        <Text>Category: {item.category}</Text>
        <Text>Rating: {item.rating.rate}</Text>
        <Button
          title={favoriteIds.includes(item.id) ? 'Unfavorite' : 'Favorite'}
          onPress={() => addFavorite(item)}
        />
      </View>
    ),
    [addFavorite, favoriteIds]
  );

  return (
    <View style={homeStyles.container}>
      {renderFilterOptions()}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={homeStyles.listContainer}
      />
    </View>
  );
};

export default HomeScreen;