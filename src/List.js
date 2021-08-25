import React from 'react'
import { useState, useEffect } from 'react'
import { StyleSheet, FlatList, Text, View, Image, TouchableOpacity} from 'react-native'

export default function List() {

    const [countries, setCountries] = useState([])
    const [weather, setWeather] = useState([]);
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
            fetch("https://restcountries.eu/rest/v2/all")
            .then(response => response.json())
            .then(data => {
                setCountries(data)

            })
            .catch(err => console.error(err))

    }, [])

  const getWather=((capital) => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=f3eb4593d204d7c9ef653e251c75e235`)
      .then(res => res.json())
      .then(res => {
         setWeather( [res.weather[0].main, res.main.temp])

      })

})
const handlePress = (capital)=>{
  setPressed(true);
  getWather(capital)
    
}




  

    
    return (
        <View style={styles.container}>
    
            <FlatList data={countries}
              renderItem={({ item }) =>(
                
                <View>   
                         <Text style= {styles.text}>Country : {item.name}</Text> 
                         <TouchableOpacity  onPress={()=>handlePress(item.capital)}>
                         <Image source={{ uri: item.flag }} style={styles.image} /></TouchableOpacity >
                 {pressed? 
                  <View>
                    <Text style={styles.Text}>Capital city: {item.capital}</Text>
                    <Text>Weather: {weather[0]}</Text>
                     <Text>Temperature: {(weather[1] - 273, 15)}°C</Text>
                  </View>
                : null }
                        
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