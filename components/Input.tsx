import React, { ChangeEvent } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

interface InputProps {
    id: string;
    onChange: (text: string) => void;
    value: string;
    label: string;
    type: string;
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholderTextColor="#ffffff"
                placeholder=" "
            />
            <Text style={styles.label}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
    },
    input: {
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 5,
        width: "100%",
        borderWidth: 2,
        borderColor: "#00FF00", // Adjust border color as needed
        fontSize: 16,
        color: "#ffffff",
        backgroundColor: "transparent",
    },
    label: {
        position: "absolute",
        fontSize: 16,
        color: "#ffffff",
        top: 14,
        left: 26,
        transform: [{ translateY: -3 }, { scale: 0.75 }],
    },
});

export default Input;
