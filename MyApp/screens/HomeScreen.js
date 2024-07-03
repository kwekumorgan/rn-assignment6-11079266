import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = [
        { id: '1', name: 'Office Wear', price: 120, image: require('../assets/dress1.png') },
        { id: '2', name: 'Black', price: 120, image: require('../assets/dress2.png') },
        { id: '3', name: 'Church Wear', price: 120, image: require('../assets/dress3.png') },
        { id: '4', name: 'Lamerei', price: 120, image: require('../assets/dress4.png') },
        { id: '5', name: '21WN', price: 120, image: require('../assets/dress5.png') },
        { id: '6', name: 'Lopo', price: 120, image: require('../assets/dress6.png') },
        { id: '7', name: '21WN', price: 120, image: require('../assets/dress7.png') },
        { id: '8', name: 'Lamess', price: 120, image: require('../assets/dress3.png') },
      ];
      setProducts(productData);
    };
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    let cart = await AsyncStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    const newProduct = { id: `${product.id}-${new Date().getTime()}`, product };
    cart.push(newProduct);
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  };

  const renderItem = ({ item }) => (
    <View style={styles.product}>
      <Image source={item.image} style={styles.image} />
      <TouchableOpacity onPress={() => addToCart(item)}>
        <Image source={require('../assets/add_circle.png')} style={styles.cartImage} />
      </TouchableOpacity>
      <Text style={{ fontSize: 16 }}>{item.name}</Text>
      <Text style={{ fontSize: 18, color: 'orange' }}>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Image source={require('../assets/Menu.png')} style={{ marginLeft: 10 }} />
        <Image source={require('../assets/Logo.png')} />
        <View style={{ flexDirection: 'row' }}>
          <Image source={require('../assets/Search(1).png')} />
          <Image style={{ marginLeft: 10 }} source={require('../assets/shoppingBag.png')} />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 24}}>Our Story</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingLeft: 190 }}>
          <Image source={require('../assets/Listview.png')} style={{ marginRight: 20 }} />
          <Image source={require('../assets/Filter.png')} />
        </View>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  product: {
    marginLeft: 12,
    marginRight: 3,
    alignContent: 'center',
    textAlign: 'left',
  },
  image: {
    width: 160,
    height: 240,
    marginBottom: 10,
    position: 'relative',
  },
  row: {
    marginVertical: 5,
  },
  cartImage: {
    position: 'absolute',
    right: 6,
    bottom: 18,
  },
});

export default HomeScreen;
