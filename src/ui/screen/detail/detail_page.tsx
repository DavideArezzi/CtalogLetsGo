import React, { useEffect, useState, memo } from 'react';
import { Image, Text, View, TouchableOpacity} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../detail/detail_style';
import { Ionicons } from '@expo/vector-icons';
import { MainParamList, Screen } from '../../navigation/types';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Detail>;
  route: {
    params: { id: number };
  };
}

const DetailScreen = ({navigation, route }: Props) => {
  const { id } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch the product');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Unknown error occurred');
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity
        onPress={() => navigation.navigate(Screen.goBack)}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
         </TouchableOpacity>
      {/* Header with image */}
      <Image source={{ uri: product.image }} style={styles.headerImage} />
      
      {/* Product details */}
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        {/* Rating with stars */}
        <View style={styles.rating}>
          {Array.from({ length: Math.round(product.rating.rate) }).map((_, index) => (
            <Ionicons key={index} name="star" size={20} color="#FFD700" />
          ))}
        </View>
        <Text style={styles.reviews}>({product.rating.count} reviews)</Text>
      </View>
    </View>
  );
};

export default memo(DetailScreen);
