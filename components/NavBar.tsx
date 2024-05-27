import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Store } from "../store/store";

interface NavItem {
    name: string;
    path: string;
    img: any; // Adjust type as per your image handling in React Native
    onclick?: () => void;
}

const NavBar: React.FC = () => {
    const store = Store(navigation);
    const navigation = useNavigation<any>();

    const nav: NavItem[] = [
        {
            name: "Map",
            path: "home",
            img: require("../assets/mapgreen.png"),
        },
        {
            name: "Search",
            path: "search",
            img: require("../assets/searchgreen.png"),
        },
        {
            name: "Bookmark",
            path: "bookmark",
            img: require("../assets/Bookmark.png"),
        },
        {
            name: "Profile",
            path: "profile",
            img: require("../assets/profile.png"),
            onclick: async () => {
                await store.getUser();
                navigation.navigate("Profile");
            },
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            await store.getbookmark();
        };
        fetchData();
    }, [store]);

    return (
        <View style={styles.container}>
            {nav.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate(item.path)}
                >
                    <View style={styles.itemContainer}>
                        <Image source={item.img} style={styles.icon} />
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "10%",
        backgroundColor: "#00FF00", // Adjust background color as needed
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
    },
    itemContainer: {
        alignItems: "center",
    },
    icon: {
        width: 30, // Adjust icon size as needed
        height: 30, // Adjust icon size as needed
    },
    text: {
        color: "green",
        fontSize: 12,
        fontFamily: "Poppins-Medium",
        marginTop: 5,
    },
});

export default NavBar;
