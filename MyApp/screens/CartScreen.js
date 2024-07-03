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
      <View style={{flexDirection:'row',justifyContent:'center',marginTop:30}} >
        <View style={{flexDirection:'column',}}>
      <Text style={{fontSize:20,textTransform:'uppercase'}}>{item.product.name}</Text>
      
      <Text style={{fontSize:20,color:'orange'}}>${item.product.price}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <Image source={require('../assets/remove.png')} style={{marginLeft:20,marginTop:190}}/>
      </TouchableOpacity>
    </View>
    </View>
  );

  return (
    <View style={styles.container}>
         <View style={styles.header}>
          <Image source={require('../assets/Logo.png')} style={{alignContent:'flex-start', left:120}}/>
          <View style={{flexDirection: 'row'}}>
            <Image source={require('../assets/Search(1).png')}  style={{alignContent:'flex-start',left:200}}/>
          </View>
          <Text></Text>
        </View>

      

      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
<View style={{flexDirection:'row',marginBottom:15}}>
<Text style={{alignContent:'flex-start',paddingRight:180,fontSize:22}}>EST. TOTAL</Text>
<Text style={{alignContent:'flex-end',fontSize:22, color:'orange'}}>$240</Text>
</View>

<View style={styles.checkBox}>
<Text style={styles.checkText}>CHECKOUT</Text>
       
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
    alignItems:'baseline',
    marginTop:-10,
    marginBottom:10,
   
    

  },

  checkText: {
    textAlign:'center',
    color:'#fff',
    fontSize: 20,
    paddingTop: 10,},

    checkBox:{
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    backgroundColor: '#000',
    width:'100%',
    justifyContent: 'center',
     flexDirection: 'row',
     position:'relative',
    },
  
  product: {
    padding: 10,
    flexDirection:'row',
    
  },
  image: {
    width: 180,
    height: 240,
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
