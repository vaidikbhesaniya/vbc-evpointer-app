import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { observer } from "mobx-react";
import { Store } from "../../store/store";

// Import your image asset
const evcharge = require("../../assets/evcharge.gif");

const Register: React.FC = observer(() => {
    const navigation = useNavigation();
    const store = Store();
    const [registerData, setRegisterData] = useState({
        userName: "",
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const register = async () => {
        setIsLoading(true);
        try {
            await store.handleRegister(
                {
                    userName: registerData.userName,
                    email: registerData.email,
                    password: registerData.password,
                },
                navigation as NavigationProp<any>
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={evcharge} style={styles.logo} />
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.title}>Register</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={registerData.userName}
                        onChangeText={(text) =>
                            setRegisterData({ ...registerData, userName: text })
                        }
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={registerData.email}
                        onChangeText={(text) =>
                            setRegisterData({ ...registerData, email: text })
                        }
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={registerData.password}
                        onChangeText={(text) =>
                            setRegisterData({ ...registerData, password: text })
                        }
                    />
                    <TouchableOpacity
                        style={[
                            styles.button,
                            isLoading && styles.buttonDisabled,
                        ]}
                        onPress={register}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.buttonText} onPress={register}>
                                Register
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: "20%",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 100,
        height: 100,
    },
    formContainer: {
        height: "80%",
        padding: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        // color: "white",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        color: "white",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonDisabled: {
        backgroundColor: "#8BC34A",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
});

export default Register;
