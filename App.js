import React from "react";
import Loading from "./Loading";
import * as Location from "expo-location";
import {Alert} from "react-native";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "a5500cc502db479920889789ba9f4f11";

export default class extends React.Component {
    state = {
        isLoading: true
    }

    getWeather = async (latitude, longitude) => {
        const { data } = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=matric`
        );

        this.setState({ isLoading: false, temp: data.main.temp});
    };

    getLocation = async () => {
        try {
            await Location.requestPermissionsAsync();

            const {
                coords: { latitude, longitude }
            } = await Location.getCurrentPositionAsync();

            this.getWeather(latitude, longitude);
        } catch (e) {
            Alert.alert("Can't find you.", "So sad");
        }
    }

    componentDidMount() {
        this.getLocation();
    }

    render() {
        const { isLoading, temp } = this.state;
        return isLoading ? <Loading /> : <Weather temp={Math.round(temp)}/>;
    }
}

