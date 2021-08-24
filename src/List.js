import React from 'react'
import { useState, useEffect } from 'react'
import { StyleSheet, FlatList, Text, View, Image} from 'react-native'

export default function List() {

    const [countries, setCountries] = useState([])

    useEffect(() => {
            fetch("https://restcountries.eu/rest/v2/all")
            .then(response => response.json())
            .then(data => {
                setCountries(data)

            })
            .catch(err => console.error(err))

    }, [])

    console.log("countries", countries);

    
    return (
        <View style={styles.container}>
    
            <FlatList data={countries}
              renderItem={({ item }) =>(
                <View>
                         <Image source={{ uri: item.flag }} style={styles.image} />
                        <Text style= {styles.text}>Country : {item.name}</Text> 
                        <Text style= {styles.text}>Capital : {item.capital}</Text>
                </View>
              )} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    text:{
        fontSize : 20,
        fontWeight : 'bold'
    },
    image:{
        width:300,
        height:100,
        margin: 30
    }
    
  });