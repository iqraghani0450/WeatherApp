/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

//libraries
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient'
//customComponents
import CurrentTime from '../components/CurrentTime';
//Images
import Humidity from '../Images/Humidity.png'
import Temperature from '../Images/Temperature.png'
import WindSpeed from '../Images/WindSpeed.png'
import LightRain from "../Images/LightRain.png"
import BrokenClouds from "../Images/BrokenClouds.png"
import FewClouds from "../Images/FewClouds.png"
import HeavyRain from "../Images/HeavyRain.png"
import ModRain from "../Images/ModRain.png"
import OvercastClouds from "../Images/OvercastClouds.png"
import Snow from "../Images/Snow.png"
import Sunny from "../Images/Sunny.jpg"
import Haze from '../Images/Haze.webp'





export default function Home() {

    //states
    const [input, setInput] = useState(null)
    const [city, setCity] = useState("Lahore")
    const [icon, setIcon] = useState(Sunny)
    const [humidity, setHumidity] = useState(null)
    const [temperature, setTemperature] = useState(null)
    const [windSpeed, setWindSpeed] = useState(null)
    const [description, setDescription] = useState(null)

    //functions
    const weatherAPI = () => {


        const API_URL1 = 'https://api.openweathermap.org/data/2.5/weather?q='
        const API_URL2 = input
        const API_URL3 = '&appid=231b69114d55044cd51d1c84d846f758&units=metric'
        return fetch(API_URL1 + API_URL2 + API_URL3)
            .then(response => {
                return response.json();
            })
            .then(response => {
                return update(response)

            })
            .catch(error => {
                console.error(error);
            });
    }

    const update = (response) => {
        //if city not found
        if (response.message != undefined) {
            alert(response.message)
            setInput("")
        }
        else {
            //setting states
            switch (response.weather[0].description) {
                case "sunny": {
                    setIcon(Sunny)
                    break;
                }
                case "haze": {
                    setIcon(Haze)
                    break;
                }
                case "light rain": {
                    setIcon(LightRain)
                    break;
                }
                case "moderate rain": {
                    setIcon(ModRain)
                    break;
                }
                case "heavy intensity rain": {
                    setIcon(HeavyRain)
                    break;
                }
                case "broken clouds": {
                    setIcon(BrokenClouds)
                    break;
                }
                case "scattered clouds": {
                    setIcon(BrokenClouds)
                    break;
                }
                case "few clouds": {
                    setIcon(FewClouds)
                    break;
                }
                case "overcast clouds": {
                    setIcon(OvercastClouds)
                    break;
                }
                case "snow": {
                    setIcon(Snow)
                    break;
                }
                case "light snow": {
                    setIcon(Snow)
                    break;
                }
                case "sky is clear": {
                    setIcon(FewClouds)
                    break;
                }
                default: {
                    setIcon(Sunny)
                    break;
                }
            }
            if (input != "")
                setCity(input)
            setInput("")
            setHumidity(response.main.humidity)
            setTemperature(response.main.temp)
            setWindSpeed(response.wind.speed)
            setDescription(" : " + response.weather[0].description)
        }
    }

    return (
        <View style={styles.bg}>

            <View style={styles.row2}>
                <TextInput
                    placeholder='Write city name'
                    placeholderTextColor={"gray"}
                    style={styles.textInput}
                    value={input}
                    onChangeText={(txt) => { setInput(txt) }}
                />
                {input == "" ?
                    <View style={[styles.btn, { opacity: 0.7 }]}>
                        <Text style={{ color: "gray" }}>Search</Text>
                    </View>
                    :
                    <TouchableOpacity style={styles.btn} onPress={() => { weatherAPI() }}>
                        <Text style={{ color: "gray" }}>Search</Text>
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.weatherView}>
                <Image source={icon} style={styles.weather} />
                <Text style={[styles.white, { fontSize: 20 }]}>{city}{description}</Text>
            </View>
            <LinearGradient style={styles.gradient}
                colors={[
                    'rgba(0,0,0,0.50)',
                    'rgba(0,0,0,0.15)',
                    'rgba(0,0,0,0.58)',
                ]}
            >
                <View style={styles.row1}>
                    <Text style={styles.white}>Today's weather</Text>
                    <TouchableOpacity>
                        <Text style={styles.txt}><CurrentTime /></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row2}>
                    <View style={styles.center}>
                        <Image source={Humidity} style={[styles.img, { width: "61%" }]} />
                        <Text style={styles.white}>Humidity</Text>
                        <Text style={styles.white}>{humidity}%</Text>
                    </View>
                    <View style={styles.center}>
                        <Image source={Temperature} style={styles.img} />
                        <Text style={styles.white}>Temperature</Text>
                        <Text style={styles.white}>{temperature}°C</Text>
                    </View>
                    <View style={styles.center}>
                        <Image source={WindSpeed} style={styles.img} />
                        <Text style={styles.white}>Wind Speed</Text>
                        <Text style={styles.white}>{windSpeed}m/s</Text>
                    </View>
                </View>
            </LinearGradient>

        </View>
    );
}
const styles = StyleSheet.create({
    bg: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: "#264d73"
    },
    textInput: {
        width: "75%",
        alignSelf: "center",
        paddingHorizontal: 30,
        backgroundColor: "#e6e6e6",
        borderRadius: 20,
    },
    row1: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    row2: {
        flexDirection: "row",
        justifyContent: 'space-evenly'
    },
    txt: {
        color: "white"
    },
    white: {
        color: "white"
    },
    gradient: {
        height: "28%",
        width: "85%",
        alignSelf: "center",
        justifyContent: "space-around",
        borderRadius: 20,
    },
    center: {
        alignItems: "center"
    },
    btn: {
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e6e6e6",
        borderRadius: 20,
    },
    img: {
        height: "40%",
        width: "45%",
        backgroundColor: "#e6e6e6",
        borderRadius: 10

    },
    weather: {
        height: "90%",
        width: "70%",
        borderRadius: 20
    },
    weatherView: {
        height: "35%",
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
