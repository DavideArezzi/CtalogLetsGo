import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FD9CDA',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  filtersContainerCategory: {
    flexDirection: 'column', // Organizza i pulsanti in colonne
    justifyContent: 'space-around',
    marginBottom: 16,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10, // Spazio tra le righe
  },
 
  listContainer: {
    paddingBottom: 16,
  },

  productCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },

  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  productCategory: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },

  productRating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },

  favoriteButton: {
    marginTop: 8,
    backgroundColor: '#ff5722',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  favoriteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },

  textlabel: {
    fontSize: 14,
    color: "#fff"
  },
  buttonpadding: {
    margin: 20,
  }
});
