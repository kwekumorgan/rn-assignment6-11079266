import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CartScreen({ navigation }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    };
    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  const renderItem = ({ item }) => (
    <View style={styles.product}>
      <Image source={item.product.image} style={styles.image} />
      <View style={{flexDirection:'row',justifyContent:'center'}} >
      <Text>{item.product.name}</Text>
      <Text>${item.product.price}</Text>
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <Image source={require('../assets/remove.png')}/>
      </TouchableOpacity>
    </View>
    </View>
  );

  return (
    <View style={styles.container}>
         <View style={styles.header}>
          <Image source={require('../assets/Logo.png')}/>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image source={require('../assets/Search(1).png')}/>
          </View>
        </View>

      

      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />


<View style={{justifyContent: 'center', flexDirection: 'row'}}>
          <Text style={styles.checkText}>CHECKOUT</Text>
          <Image/>
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'center'

  },

  checkText: {
    fontSize: 20,
    paddingTop: 10,
    
  },
  product: {
    padding: 10,
    flexDirection:'row',
    
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default CartScreen;
