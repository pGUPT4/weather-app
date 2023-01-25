/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import database, { firebase } from '@react-native-firebase/database'
import { SearchBar } from "react-native-elements";
import {
   View, 
   Text,
   StyleSheet,
   TextInput, 
   ScrollView,
   FlatList
 } from 'react-native';
import {REACT_APP_API_KEY} from "@env";
 
const API_KEY = process.env.REACT_APP_API_KEY
let cityName = `Noida`

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const reference = firebase.database().ref("/0/country")
 
function WeatherApp(){

    // A) Brain of the app
        const [data, setData] = useState([])
        // const [searchLocation, setSearchLocation] = useState("")
        const [query, setQuery] = useState('')
        const [cities, setCities] = useState([])
        const[i, setI] = useState(0)
    
        const url_weather = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    
        // const url_location = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`

        const dates = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        const temperatures = [20, 21, 26, 19, 30, 32, 23, 22, 24]
        const city = ['LA', 'SAN', 'SFO', 'LGA', 'HND', 'KIX', 'DEN', 'MUC', 'BOM']

        // 1) get the location
        // const get_location = async() => {
        //     return fetch(url_get_weather, {
        //         method: 'GET'
        //     })
        //     .then(response => response.json())
        //     .then(json => {
        //         console.log(json.city.name)
        //         return json})
        //     .catch((e) => console.error(e))
        // }

        // const get_location = async() => {
        //     const res = await fetch(url_location);
        //     const json = await res.json();
        //     setData(JSON.parse(json));
        //     setCities(json.slice());
        // }

        // 2) apply the given location to get weather
        const get_weather = async() => {
            return fetch(url_weather)
            .then(response => response.json())
            .then(json => json)
            .catch((e) => console.error(e))

        }

        // 3 after getting city name and its weather information, display
        const buttonPressed = () => {
            if(i < 9){
                data.push(
                    <View style = {styles.weatherBoard}>
                        <Text key = {dates[i]} style = {styles.date}>{dates[i]}</Text>
                        <Text key = {temperatures[i]} style = {styles.temperature}>{temperatures[i]}</Text>
                        <Text key = {cities[i]} style = {styles.cityName}>{city[i]}</Text>
                    </View>
                )
                setData(data)
                setI(i => i + 1)
            }
        }

        useEffect(()=>{
            // get_location()
            get_weather()
        }, [i], [])

    // B) body of the app 
        return(
            <View style = {styles.appBackground}>

                <View style = {styles.searchBar}>
                    <TextInput style = {styles.searchText} placeholder = "Search City"></TextInput>
                    {/* <FlatList data={cities} keyExtractor = {(i) => i.id.toString()} 
                        extraData = {query} renderItem = {({item}) => 
                            <Text style = {styles.flatlist}> {`${item.name}`}</Text>
                        
                        }></FlatList> */}
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
        flexDirection: 'column',
        backgroundColor: 'white', 
        fontSize: 25
    },
    searchText:{
        flex: 1,
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
    },
    flatlist:{
        flex: 7,
        paddingLeft: 15,
        marginTop: 15,
        paddingBottom: 15,
        fontSize: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    }
 })
 
export default WeatherApp;
