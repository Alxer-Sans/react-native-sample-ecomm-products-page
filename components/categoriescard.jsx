import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';


function ProductItemCard({ product, onPress }) {
  return (
    <Pressable 
      onPress={() => onPress(product)} 
      style={({ pressed }) => [
        styles.productCardContainer,
        pressed && styles.pressedCard
      ]}
    >
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


export default function CategoriesCard({ category, products, isSingleCategoryView, onProductPress }) {
  const productsInCategory = products.filter(product => product.category_id === category.id);
  const productsPerCategoryLimit = 5;
  const productsToDisplay = isSingleCategoryView ? productsInCategory : productsInCategory.slice(0, productsPerCategoryLimit);
  const showSeeMore = productsInCategory.length > productsPerCategoryLimit;
  const renderProductListFooter = () => (
    <Pressable 
      style={({ pressed }) => [
        styles.viewMoreCard,
        pressed && styles.pressedCard
      ]}
    >
      <Text style={styles.viewMoreText}>view more &gt;</Text>
    </Pressable>
  );

 
  if (productsInCategory.length > 0) {
    return (
      <View style={styles.container}>
        {!isSingleCategoryView && (
          <Text style={styles.categoryHeader}>{category.name}</Text>
        )}
        <FlatList
          data={productsToDisplay}
          renderItem={({ item }) => (
            <ProductItemCard 
              product={item} 
              onPress={onProductPress}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal={!isSingleCategoryView}
          numColumns={isSingleCategoryView ? 2 : undefined}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={isSingleCategoryView}
          contentContainerStyle={isSingleCategoryView ? styles.productListContentVertical : styles.productListContentHorizontal}
          ListFooterComponent={!isSingleCategoryView && showSeeMore ? renderProductListFooter : null}
          columnWrapperStyle={isSingleCategoryView ? styles.columnWrapper : null}
        />
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  productCardContainer: {
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  pressedCard: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
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
  categoryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  productListContentHorizontal: {
    paddingHorizontal: 5,
  },
  productListContentVertical: {
    paddingHorizontal: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
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
});
