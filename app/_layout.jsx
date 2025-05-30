import { Drawer } from 'expo-router/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import NetInfo from "@react-native-community/netinfo";
import { onlineManager, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DrawerItemList } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function CustomDrawerContent(props) {
  const netInfo = NetInfo.useNetInfo();

  return (
    <View style={styles.drawerContentContainer}>
      <View style={styles.logoContainer}>
        <Image 
          source={require("../assets/images/TeamLogo.jpg-modified.png")}
          style={styles.logo} 
        />
        <Text style={styles.logoText}>DEVSIX Apparel</Text>
        <View style={[{flexDirection: "row", alignItems: "center", marginTop: "8"}]} >
          <View style={[{width: 10, height: 10, borderRadius: 5, marginRight: 6}, {backgroundColor: netInfo.isConnected ? "#4caf50" : "#f44336"}]} >
          </View>
          <Text style={[{fontSize: 12, color: '#000'}]}>{netInfo.isConnected ? "Online" : "Offline"}</Text>
        </View>
      </View>
      <ScrollView style={styles.drawerItemListContainer}>
         <DrawerItemList {...props} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  drawerItemListContainer: {
    flex: 1,
    marginTop: 10,
  },
  logoContainer: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export function renderHeaderButtons() {
  const router = useRouter();
  return (
    <View style={{ flexDirection: 'row', marginRight: 15 }}>
      <Pressable onPress={() => router.push('/cart')} style={{ marginRight: 15 }}>
        <MaterialIcons name="shopping-cart" size={24} color="black" />
      </Pressable>
      <Pressable onPress={() => router.push('/profile')}>
        <MaterialIcons name="person" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      networkMode: 'online',
    },
  },
});

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#000',
            drawerActiveTintColor: '#000',
            drawerInactiveTintColor: '#666',
            headerRight: renderHeaderButtons,
            headerShown: true,
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Products',
              title: '',
              drawerIcon: ({ color }) => (
                <MaterialIcons name="shopping-bag" size={24} color={color} />
              ),
              headerRight: renderHeaderButtons,
            }}
          />
          <Drawer.Screen
            name="productDetail"
            options={{
              drawerLabel: 'Product Detail',
              title: '',
              drawerItemStyle: { display: 'none' },
              headerRight: renderHeaderButtons,
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
