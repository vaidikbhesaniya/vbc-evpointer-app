import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Linking,
    Dimensions,
} from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
// import carcharging from "../../assets/carcharge.jpg";
import station from "../../assets/station.png";
import mapred from "../../assets/mapred.png";
import bell from "../../assets/bell.png";
import vd from "../../assets/greenthird.mp4";

const { width, height } = Dimensions.get("window");

const NextLanding = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Video
                source={vd}
                style={styles.backgroundVideo}
                resizeMode="cover"
                isLooping
                shouldPlay
                isMuted
            />

            <View style={styles.headingContainer}>
                <View style={styles.textContainer}>
                    {/* <Image source={carcharging} style={styles.image} /> */}
                    <Text style={styles.heading}>
                        <Text style={styles.boldText}>Discover</Text> nearby
                        station with{" "}
                        <Text style={styles.dancingScript}>ease</Text> and{" "}
                        <Text style={styles.dancingScript}>speed</Text>
                    </Text>
                </View>
            </View>

            <View style={styles.featureContainer}>
                <Feature icon={mapred} text="Locating nearby station" />
                <Feature icon={bell} text="Adding station to your favourites" />
                <Feature icon={station} text="Customize station preferences" />
            </View>

            <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate("register" as never)}
            >
                <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.loginLink}
                onPress={() => navigation.navigate("login" as never)}
            >
                <Text style={styles.loginText}>
                    Already have an account?{" "}
                    <Text style={styles.underline}>Login</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const Feature = ({ icon, text }) => {
    return (
        <View style={styles.feature}>
            <Image source={icon} style={styles.featureIcon} />
            <Text style={styles.featureText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundVideo: {
        position: "absolute",
        width: width,
        height: height,
    },
    headingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    image: {
        width: width * 0.8,
        height: height * 0.4,
        marginBottom: 20,
    },
    heading: {
        fontFamily: "Poppins-Medium",
        color: "green",
        fontSize: 35,
        textAlign: "center",
    },
    boldText: {
        fontFamily: "Poppins-Bold",
    },
    dancingScript: {
        fontFamily: "Poppins-Light",
        fontSize: 45,
    },
    featureContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    feature: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    featureIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    featureText: {
        fontFamily: "Poppins-Light",
        color: "white",
        fontSize: 14,
    },
    registerButton: {
        backgroundColor: "green",
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignSelf: "center",
        marginBottom: 20,
    },
    registerButtonText: {
        fontFamily: "Poppins-Medium",
        color: "white",
        fontSize: 20,
    },
    loginLink: {
        alignSelf: "center",
    },
    loginText: {
        fontFamily: "Poppins-Light",
        color: "white",
        fontSize: 15,
    },
    underline: {
        textDecorationLine: "underline",
    },
});

export default NextLanding;
