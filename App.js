import React from "react";
import Loading from "./Loading";
import * as Location from "expo-location";
import {Alert} from "react-native";
import axios from "axios";

const API_KEY = "a5500cc502db479920889789ba9f4f11";

export default class extends React.Component {
    state = {
        isLoading: true
    }

    getWeather = async (latitude, longitude) => {
        const { data } = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
        );
        console.log(data);
    };

    getLocation = async () => {
        try {
            await Location.requestPermissionsAsync();

            const {
                coords: { latitude, longitude }
            } = await Location.getCurrentPositionAsync();

            console.log(latitude, longitude);

            this.getWeather(latitude, longitude);
            this.setState({ isLoading: false });
        } catch (e) {
            Alert.alert("Can't find you.", "So sad");
        }
    }

    componentDidMount() {
        this.getLocation();
    }

    render() {
        const { isLoading } = this.state;
        return isLoading ? <Loading /> : <Loading />;
    }
}

