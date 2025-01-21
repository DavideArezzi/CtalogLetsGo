import styles from "./product.style";
import { Image, Text, TouchableOpacity, View } from 'react-native';

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
        {/* Header */}
        <View style={styles.containerHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>{product.title}</Text>
          </View>
        </View>
  
        {/* Immagine */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.imageStyle} />
        </View>
  
        {/* Prezzo */}
        <Text style={styles.priceText}>${product.price.toFixed(2)}</Text>
  
        {/* Descrizione */}
        <Text style={styles.descriptionText}>{product.description}</Text>
  
        {/* Recensioni */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ {product.rating.rate} ({product.rating.count} reviews)</Text>
        </View>
  
        {/* Pulsanti */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onAddFavorite}>
            <Text style={styles.buttonText}>Favorite</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

