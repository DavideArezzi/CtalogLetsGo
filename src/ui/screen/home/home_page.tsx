import { Text, View, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';
import { homeStyles } from './home_styles';
import React, { useCallback, useEffect, useState } from 'react';
import { useProducts } from '../hook/useProducts.facade';
import Card from '../../atoms/product/product.atom';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../atoms/button/button.atom';

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Home>;
}

enum FilterType {
  initial = 'initial',
  category = 'category',
  rating = 'rating',
}

const HomeScreen = ({ navigation }: Props) => {
  const {
    products: initialProducts,
    setProducts,
    favoriteIds,
    refreshProducts,
    loadFavorites,
    addFavorite,
  } = useProducts();

  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRatingOrder, setSelectedRatingOrder] = useState<'asc' | 'desc' | null>(null);

  const applyFilters = useCallback(() => {
    let updatedProducts = [...initialProducts];

    if (selectedCategory) {
      updatedProducts = updatedProducts.filter((product) => product.category === selectedCategory);
    }

    if (selectedRatingOrder) {
      updatedProducts.sort((a, b) =>
        selectedRatingOrder === 'asc'
          ? a.rating.rate - b.rating.rate
          : b.rating.rate - a.rating.rate
      );
    }

    setFilteredProducts(updatedProducts);
  }, [initialProducts, selectedCategory, selectedRatingOrder]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshProducts();
      loadFavorites();
    });

    return unsubscribe;
  }, [navigation, refreshProducts, loadFavorites]);

  const renderFilterOptions = useCallback(
    () => (
      <View>
        <View style={homeStyles.filtersContainer}>
          <Button onPress={() => setSelectedRatingOrder('asc')}>
            <Ionicons
              name="arrow-up"
              size={24}
              color={selectedRatingOrder === 'asc' ? 'gray' : '#ffffff'}
            />
          </Button>
          <Button onPress={() => setSelectedRatingOrder('desc')}>
            <Ionicons
              name="arrow-down"
              size={24}
              color={selectedRatingOrder === 'desc' ? 'gray' : '#ffffff'}
            />
          </Button>
          <Button
            onPress={() => {
              setSelectedCategory(null);
              setSelectedRatingOrder(null);
            }}>
            <Ionicons name="refresh" size={24} color={'white'} />
          </Button>
        </View>
        <View style={homeStyles.filtersContainerCategory}>
          <View style={homeStyles.filterRow}>
            <Button onPress={() => setSelectedCategory('electronics')}>
              <Text style={homeStyles.textlabel}>electronics</Text>
            </Button>
            <Button onPress={() => setSelectedCategory('jewelery')}>
              <Text style={homeStyles.textlabel}>jewelery</Text>
            </Button>
          </View>
          <View style={homeStyles.filterRow}>
            <Button onPress={() => setSelectedCategory("women's clothing")}>
              <Text style={homeStyles.textlabel}>womens clothing</Text>
            </Button>
            <Button onPress={() => setSelectedCategory("men's clothing")}>
              <Text style={homeStyles.textlabel}>mens clothing</Text>
            </Button>
          </View>
        </View>
      </View>
    ),
    [selectedCategory, selectedRatingOrder]
  );

  const renderProduct = useCallback(
    ({ item }) => (
      <Card
        product={item}
        onAddFavorite={() => addFavorite(item)}
        selected={favoriteIds.includes(item.id)}
        onPress={() => {
          if (!item.id) {
            return;
          }
          navigation.navigate(Screen.Detail, {
            id: item.id,
          });
        }}
      />
    ),
    [addFavorite, navigation, favoriteIds]
  );

  const ItemSeparatorComponent = useCallback(
    () => <View style={homeStyles.itemSeparator}></View>,
    []
  );

  return (
    <View style={homeStyles.container}>
      {renderFilterOptions()}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};

export default HomeScreen;
