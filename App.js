/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
import {
   View, 
   Text,
   StyleSheet,
   TextInput, 
   ScrollView
 } from 'react-native';
import {REACT_APP_API_KEY} from "@env";
 
const API_KEY = process.env.REACT_APP_API_KEY
//let LOCATION
 
function WeatherApp(){
    const [data, setData] = useState([])
    // const [searchLocation, setSearchLocation] = useState("")
    const[i, setI] = useState(0)
 
    const url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${API_KEY}`
 
    const dates = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const temperatures = [20, 21, 26, 19, 30, 32, 23, 22, 24]
    const cities = ['LA', 'SAN', 'SFO', 'LGA', 'HND', 'KIX', 'DEN', 'MUC', 'BOM']

    // console.log(LOCATION)
    const buttonPressed = () => {
        if(i < 9){
            data.push(
                <View style = {styles.weatherBoard}>
                    <Text key = {dates[i]} style = {styles.date}>{dates[i]}</Text>
                    <Text key = {temperatures[i]} style = {styles.temperature}>{temperatures[i]}</Text>
                    <Text key = {cities[i]} style = {styles.cityName}>{cities[i]}</Text>
                </View>
            )
            setData(data)
            setI(i => i + 1)
        }
    }

    const getLocation = async() => {
        return fetch(url, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => {
            console.log(json.city.name)
            return json})
        .catch((e) => console.error(e))
    }

    useEffect(()=>{
        getLocation()
    }, [i])
    return(
        <View style = {styles.appBackground}>

            <View style = {styles.searchBar}>
                <TextInput style = {styles.searchText} placeholder = "Search City"></TextInput>
                <Text onPress={() => buttonPressed()} style = {styles.addButton}>+</Text>
            </View>
             
            {/* ScrollView can only have one view in it */}
            <ScrollView style = {styles.weatherPanel}>
                <View>
                    {data}
                </View>
            </ScrollView>
 
        </View>
    )
}
 
const styles = StyleSheet.create({
    appBackground:{
        flex: 1,
        backgroundColor: 'black', 
        flexDirection: 'column'
    },
 
    searchBar:{
        flex: 0.1,
        flexDirection: 'row',
        backgroundColor: 'white', 
        fontSize: 25
    },
    searchText:{
        flex: 8,
        borderWidth: 1
    },
    addButton:{
        flex: 2,
        textAlign: 'center',
        fontSize: 40,
        borderWidth: 1
    },
    // Place where all cities' weather are shown
    weatherPanel:{
        flex: 0.9,
        flexDirection: 'column',
        padding: 15
    },
 
     // Style for each city 
    weatherBoard:{
        flex: 9, 
        backgroundColor: 'blue',
        borderRadius: 10,
        marginTop: 12
    },
 
     // Temorary styles - 
    date: {
        fontSize: 20,
        color: 'white'
    },
    temperature:{
        fontSize: 30
    },
    cityName:{
        fontSize: 30
    }
 })
 
export default WeatherApp;
