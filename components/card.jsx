import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

function ProductItemCard({ product, onPress }) {
  return (
    <Pressable onPress={() => onPress(product)} style={styles.productCardContainer}>
      <Image
        source={product.image_url ? { uri: product.image_url } : require('../assets/images/TeamLogo.jpg-modified.png')}
        style={styles.productImage}
        resizeMode="cover"
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Rating: {product.rating || 'N/A'}</Text>
      </View>

      <Text style={styles.productDescription} numberOfLines={2} ellipsizeMode='tail'>
        {product.description || 'No description available.'}
      </Text>
    </Pressable>
  );
}


export default function Card() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/TeamLogo.jpg-modified.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>All Products</Text>
          <Text style={styles.subtitle}>Browse all available items</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
  },
  // Removed container style for the main page layout
  // container: {
  //   flex: 1,
  // },
  // Removed styles for divisionOne and its children
  // divisionOne: { ... },
  // backgroundImage: { ... },
  // overlay: { ... },
  // textContainer: { ... },
  // title: { ... },
  // subtitle: { ... },
  // iconContainer: { ... },
  // icon: { ... },
  // Removed styles for divisionTwo and its children
  // divisionTwo: { ... },
  // categoryListContent: { ... },
  // categoryItem: { ... },
  // categoryText: { ... },

  // Styles for the individual product card
  productCardContainer: {
    width: 150,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 130,
    height: 130,
    borderRadius: 4,
    marginBottom: 5,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  ratingContainer: {
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 12,
    color: '#ffc107',
  },
  productDescription: {
    fontSize: 10,
    color: '#555',
    textAlign: 'center',
  },

  // Styles for the category section header
  categoryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  // Styles for the horizontal product list
  productListContent: {
    paddingHorizontal: 5,
  },
  // Styles for the product list footer (See More Card)
  viewMoreCard: {
    width: 150,
    height: 150,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  viewMoreText: {
    fontSize: 14,
    color: 'blue',
    fontWeight: 'bold',
  },
})