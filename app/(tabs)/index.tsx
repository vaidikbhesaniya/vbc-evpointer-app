import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import car from "../../assets/car.jpg";
import carcharge from "../../assets/charging.png";
import map from "../../assets/map.png";

const LandingPage = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={car} style={styles.carImage} />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.mainText}>
                    <Text style={styles.boldText}>Unlock</Text> the full
                    potential of your EV charging experience with our services
                </Text>
                <Text style={styles.subText}>
                    Find and Navigate To nearby Charging
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.chargeButton]}
                    onPress={() => navigation.navigate("Pricing")}
                >
                    <Image source={carcharge} style={styles.buttonImage} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.mapButton]}
                    onPress={() => navigation.navigate("Map")}
                >
                    <Image source={map} style={styles.buttonImage} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.getStartedButton]}
                    onPress={() =>
                        navigation.navigate("nextlandingpage" as never)
                    }
                >
                    <Text style={styles.getStartedButtonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00FF00",
    },
    imageContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    carImage: {
        width: "100%",
        height: "100%",
    },
    contentContainer: {
        flex: 2,
        alignItems: "center",
        paddingHorizontal: 20,
    },
    mainText: {
        fontFamily: "Poppins-Medium",
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
    },
    boldText: {
        fontWeight: "bold",
    },
    subText: {
        fontFamily: "Poppins-Medium",
        color: "green",
        marginVertical: 5,
        textAlign: "center",
    },
    buttonContainer: {
        flex: 3,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    button: {
        width: 60,
        height: 60,
        backgroundColor: "#000000",
        justifyContent: "space-between",
        alignItems: "center",
        // borderRadius: 30,
    },
    buttonImage: {
        width: 45,
        height: 45,
    },
    getStartedButton: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    getStartedButtonText: {
        fontFamily: "Poppins-Medium",
        color: "#cosgreen",
        fontSize: 18,
    },
});

export default LandingPage;
