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

const Card = ({product,selected, onAddFavorite, onPress }: ProductCardProps) => {
    return (
        <>
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleStyle}>USER PRODUCT: {product.title}</Text>
                </View>

            </View>
        </View>
        </>
    )
}

