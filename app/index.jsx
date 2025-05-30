import { View, Text, StyleSheet, FlatList, Image, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import useGetProducts from '../api/hooks/useGetProducts';
import useGetCategories from '../api/hooks/useGetCategories';
import { useState } from 'react';
import HeaderSection from '../components/HeaderSection';
import CategoriesSection from '../components/CategoriesSection';
import CategoriesCard from '../components/categoriescard';

export default function Index() {
  const router = useRouter();
  const { data: products, isLoading: isLoadingProducts, error: errorProducts } = useGetProducts();
  const { data: categories, isLoading: isLoadingCategories, error: errorCategories } = useGetCategories();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryPress = (category) => {
 
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null); 
    } else {
      setSelectedCategory(category); 
    }
    
  };

  const handleProductPress = (product) => {
    router.push({
      pathname: '/productDetail',
      params: {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        rating: product.rating,
        description: product.description
      }
    });
  };

  if (isLoadingProducts || isLoadingCategories) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (errorProducts || errorCategories) {
    return (
      <View style={styles.container}>
        <Text>Error loading data: {errorProducts?.message || errorCategories?.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderSection 
        displayTitle={selectedCategory ? selectedCategory.name : "All Products"}
        displaySubtitle={selectedCategory ? `Browse ${selectedCategory.name} items` : "Browse all available items"}
        backgroundImageSource={require('../assets/images/TeamLogo.jpg-modified.png')}
        selectedCategory={selectedCategory}
        handleBackPress={() => setSelectedCategory(null)}
      />

      <CategoriesSection 
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryPress={handleCategoryPress}
      />

      {selectedCategory ? (
        <CategoriesCard 
          key={selectedCategory.id}
          category={selectedCategory} 
          products={products}
          isSingleCategoryView={true}
          onProductPress={handleProductPress}
        />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CategoriesCard 
              key={item.id}
              category={item} 
              products={products}
              isSingleCategoryView={false}
              onProductPress={handleProductPress}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 