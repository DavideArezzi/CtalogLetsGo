import styles from "./product.style";
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image:string;
    rating: {
        rate: number;
        count: number;
      };
}
interface ProductCardProps {
    product: Product;
    selected: boolean;
    onPress: () => void;
    onAddFavorite: () => void;
}

const Card = ({ product, selected, onAddFavorite, onPress }: ProductCardProps) => {
    return (
      <View style={styles.container}>
        
        <View style={styles.containerHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>{product.title}</Text>
          </View>
          <Ionicons
            onPress={onAddFavorite}
            name={selected ? 'heart-sharp' : 'heart-outline'}
            size={28}
            color={'#ffd700'}
          />
        </View>
  
        
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.imageStyle} />
        </View>
  
      
        <Text style={styles.priceText}>${product.price.toFixed(2)}</Text>
  
       
        <Text style={styles.descriptionText}>{product.description}</Text>
  
       
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ {product.rating.rate} ({product.rating.count} reviews)</Text>
        </View>
  
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
         
        </View>
      </View>
    );
  };

export default memo(Card);