import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      padding: 16,
    },
    headerImage: {
      width: '100%',
      height: 300,
      resizeMode: 'cover',
    },
    content: {
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 8,
    },
    category: {
      fontSize: 16,
      fontWeight: '600',
      color: '#777777',
      marginBottom: 16,
    },
    price: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: 16,
    },
    description: {
      fontSize: 16,
      color: '#555555',
      marginBottom: 16,
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    reviews: {
      fontSize: 14,
      color: '#555555',
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    error: {
      fontSize: 18,
      color: 'red',
    },
    backButton: {
      marginHorizontal: 16,
    },
  });
  