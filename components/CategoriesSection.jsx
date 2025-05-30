import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CategoriesSection({ categories, selectedCategory, handleCategoryPress }) {
  const renderCategoryItem = ({ item }) => (
    <Pressable
      style={[
        styles.categoryItem,
        selectedCategory?.id === item.id && styles.selectedCategoryItem
      ]}
      onPress={() => handleCategoryPress(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory?.id === item.id && styles.selectedCategoryText
        ]}
      >
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.divisionTwo}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  divisionTwo: {
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  categoryListContent: {
    paddingHorizontal: 10,
  },
  categoryItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCategoryItem: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#fff',
  },
});