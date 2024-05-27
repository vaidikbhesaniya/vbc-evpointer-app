import React, { useState, useEffect } from "react";

import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import station_data from "./export";
import NavBar from "../../components/NavBar";
import { useEffect } from "react";

const HomeScreen: React.FC = () => {
    useEffect(() => {
        let offset = 0;

        async function fetchData() {
            const intervalId = setInterval(() => {
                if (offset > 2800) {
                    clearInterval(intervalId); // Clear the interval if offset is greater than 80000
                    console.log("Offset limit reached, stopping the interval.");
                    return;
                }
                store.getstation(offset);
                offset += 1000; // Increase offset by 1000 each second

                // console.log(store.stations);
            }, 1000);
            // setstationsall(store.stations);
        }

        fetchData();
    }, []);
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {station_data.map((station, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: parseFloat(station.Latitude),
                            longitude: parseFloat(station.Longitude),
                        }}
                        title={station.Station_Name}
                        description={station.Station_address}
                    />
                ))}
            </MapView>
            <NavBar></NavBar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    map: {
        height: "90%",
        flex: 1,
    },
});

export default HomeScreen;
