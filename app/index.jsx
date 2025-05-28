import { Pressable, Text, View } from "react-native";
import useGetProducts from "../api/hooks/useGetProducts"

export default function Index() {
  const {data: productData, isLoading: productLoading, isError: productError, refetch: productRefetch} = useGetProducts();

  // If products are loading, show a loading indicator
  if(productLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  // If there is an error fetching products, show an error message
  if(productError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Error fetching products</Text>
      </View>
    );
  }

  // If products are successfully fetched, display them
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable onPress={() => productRefetch()}><Text>Refetch</Text></Pressable>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
