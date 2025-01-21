import Button from '../../atoms/button/button.atom';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../detail/detail.stylel';
import { Text, View, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainParamList, Screen } from '../../navigation/types';



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

