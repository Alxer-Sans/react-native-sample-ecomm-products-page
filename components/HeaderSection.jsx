import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HeaderSection({ displayTitle, displaySubtitle, backgroundImageSource, selectedCategory, handleBackPress }) {
  const router = useRouter();

  return (
    <View style={styles.divisionOne}>
      <Image
        source={backgroundImageSource}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        {selectedCategory && (
          <Pressable onPress={handleBackPress} style={styles.backArrowContainer}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </Pressable>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{displayTitle}</Text>
          <Text style={styles.subtitle}>{displaySubtitle}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Pressable onPress={() => router.push('/search')}>
            <MaterialIcons name="search" size={24} color="white" style={styles.icon} />
          </Pressable>
          <Pressable onPress={() => router.push('/filter')}>
            <MaterialIcons name="filter-list" size={24} color="white" style={styles.icon} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  divisionOne: {
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
  backArrowContainer: {
    marginRight: 10,
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
    color: 'white',
  },
});