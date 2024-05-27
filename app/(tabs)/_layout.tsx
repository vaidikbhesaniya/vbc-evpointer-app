import React from "react";
import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import Bookmark from "../../assets/images/Bookmark.png";
import mapgreen from "../../assets/images/mapgreen.png";
import searchgreen from "../../assets/images/searchgreen.png";
import profile from "../../assets/images/profile.png";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";
import { Image, View, Text } from "react-native";
// import * as Icons from "../../constants/Icons";
import Loader from "../../components/Loader";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="nextlandingpage"
                options={{ headerShown: false }}
            />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="search" options={{ headerShown: false }} />
            <Stack.Screen name="bookmark" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
        </Stack>
    );
}
