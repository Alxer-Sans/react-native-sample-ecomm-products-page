import { MaterialIcons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import { onlineManager, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { default as BestSellersScreen, default as ProductsScreen, default as SalesScreen, default as SettingsScreen } from "../app/index";

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      networkMode: 'online',
    },
  },
});

const Drawer = createDrawerNavigator();

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
        <View style={[{flexDirection: "row", alignItems: "center", marginTop: "8"}]}>
          <View style={[
              {width: 10, height: 10, borderRadius: 5, marginRight: 6},
              {backgroundColor: netInfo.isConnected ? "#4caf50" : "#f44336"},
              ]}>
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
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
  },
  screenText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
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

function renderHeaderButtons() {
  return (
    <View style={{ flexDirection: 'row', marginRight: 15 }}>
      <Pressable
        onPress={() => console.log('Cart pressed')}
        style={({ pressed }) => [{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }]}
      >
        <MaterialIcons name="shopping-cart" size={24} color="black" />
      </Pressable>
      <Pressable
        onPress={() => console.log('Profile pressed')}
        style={({ pressed }) => [{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }]}
      >
        <MaterialIcons name="account-circle" size={24} color="black" />
      </Pressable>
    </View>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer.Navigator 
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#000',
            drawerActiveTintColor: '#000',
            drawerInactiveTintColor: '#666',
          }}
        >
          <Drawer.Screen 
            name="products"
            component={ProductsScreen}
            options={{
              drawerLabel: 'Products',
              title: '',
              headerRight: renderHeaderButtons,
              drawerIcon: ({ color }) => <MaterialIcons name="shopping-bag" size={24} color={color} />
            }}
          />
          <Drawer.Screen 
            name="BestSellers" 
            component={BestSellersScreen} 
            options={{
              drawerLabel: 'Best Sellers',
              title: '',
              headerRight: renderHeaderButtons,
              drawerIcon: ({ color }) => <MaterialIcons name="star" size={24} color={color} />
            }}
          />
          <Drawer.Screen 
            name="Sales" 
            component={SalesScreen} 
            options={{
              drawerLabel: 'Sales',
              title: '',
              headerRight: renderHeaderButtons,
              drawerIcon: ({ color }) => <MaterialIcons name="local-offer" size={24} color={color} />
            }}
          />
          <Drawer.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{
              drawerLabel: 'Settings',
              title: '',
              headerRight: renderHeaderButtons,
              drawerIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />
            }}
          />
        </Drawer.Navigator>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
