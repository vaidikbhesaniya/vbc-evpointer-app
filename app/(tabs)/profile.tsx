import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { motion } from "framer-motion";
import { useNavigation } from "@react-navigation/native";
import profileImage from "../../assets/profile/profile.png";
import username from "../../assets/profile/username.png";
import email from "../../assets/profile/email.png";
import phone from "../../assets/profile/phone.png";
import edit from "../../assets/profile/edit.png";
import back from "../../assets/profile/back.png";
import NavBar from "../../components/NavBar";
import Input from "../../components/Input";
import { Store } from "../../store/store";

function Profile() {
    const store = Store();
    const [isediting, setisediting] = useState(false);
    const [profilePicture, setProfilePicture] = useState(
        store.user?.profilePicture
    );
    const [profilePreview, setProfilePreview] = useState(null);
    const navigation = useNavigation();
    const [updataeUser, setupdataeUser] = useState({
        userName: store.user?.userName,
        email: store.user?.email,
        phoneno: store.user?.phoneno,
    });
    const fileInputRef = useRef(null);

    // useEffect(() => {
    //     async function fetchData() {
    //         await store.getUser(navigation);
    //     }
    //     if (store.user === undefined) {
    //         fetchData();
    //     }
    // }, []);

    const register = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("userName", updataeUser.userName);
        formData.append("email", updataeUser.email);
        formData.append("phoneno", updataeUser.phoneno);
        formData.append("profilePicture", profilePicture);
        store.updateUser(formData);
    };

    function handleProfileChange(e) {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setProfilePicture(file);
            setProfilePreview(URL.createObjectURL(file));
        }
    }

    function handleProfileClicked() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const pickFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles], // You can specify the type of files you want to pick here
            });

            console.log("URI: ", res.uri);
            console.log("Type: ", res.type);
            console.log("Name: ", res.name);
            console.log("Size: ", res.size);

            setPickedFile(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("User cancelled the picker");
            } else {
                console.log("Error while picking the file: ", err);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    {isediting && (
                        <TouchableOpacity onPress={() => setisediting(false)}>
                            <Image source={back} style={styles.icon} />
                        </TouchableOpacity>
                    )}
                    <Text style={styles.headerText}>Profile</Text>
                    <TouchableOpacity onPress={() => setisediting(true)}>
                        {!isediting && (
                            <Image source={edit} style={styles.icon} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {isediting ? (
                    <View style={styles.editContainer}>
                        <TouchableOpacity
                            style={styles.profilePictureContainer}
                            onPress={handleProfileClicked}
                        >
                            <Image
                                title="Pick File"
                                onPress={pickFile}
                                source={
                                    profilePreview
                                        ? { uri: profilePreview }
                                        : store.user?.profilePicture
                                        ? { uri: store.user.profilePicture }
                                        : profileImage
                                }
                                style={styles.profilePicture}
                            />
                            {/* <Input
                                type="file"
                                style={{ display: "none" }}
                                ref={fileInputRef}
                                onChange={handleProfileChange}
                            /> */}
                        </TouchableOpacity>
                        <View style={styles.inputContainer}>
                            <Input
                                id="name"
                                type="text"
                                label="Username"
                                value={updataeUser.userName}
                                onChange={(e) =>
                                    setupdataeUser({
                                        ...updataeUser,
                                        userName: e.target.value,
                                    })
                                }
                            />
                            <Input
                                id="email"
                                type="email"
                                label="Email"
                                value={updataeUser?.email}
                                onChange={(e) =>
                                    setupdataeUser({
                                        ...updataeUser,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <Input
                                id="phoneno"
                                type="phoneno"
                                label="Phone. no."
                                value={updataeUser?.phoneno}
                                onChange={(e) =>
                                    setupdataeUser({
                                        ...updataeUser,
                                        phoneno: e.target.value,
                                    })
                                }
                            />
                            <TouchableOpacity
                                style={styles.updateButton}
                                onPress={register}
                            >
                                <Text style={styles.updateButtonText}>
                                    Update
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.viewContainer}>
                        <TouchableOpacity
                            style={styles.profilePictureContainer}
                            onPress={handleProfileClicked}
                        >
                            <Image
                                source={
                                    profilePreview
                                        ? { uri: profilePreview }
                                        : store.user?.profilePicture
                                        ? { uri: store.user.profilePicture }
                                        : profileImage
                                }
                                style={styles.profilePicture}
                            />
                        </TouchableOpacity>
                        <View style={styles.detailsContainer}>
                            <View style={styles.detailRow}>
                                <Image
                                    source={username}
                                    style={styles.detailIcon}
                                />
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailLabel}>
                                        Username:
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {store.user?.userName}
                                    </Text>
                                    <Text style={styles.detailDescription}>
                                        This is your Unique username. this will
                                        be visible to our ev station partners
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.detailRow}>
                                <Image
                                    source={email}
                                    style={styles.detailIcon}
                                />
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailLabel}>
                                        Email:
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {store.user?.email}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.detailRow}>
                                <Image
                                    source={phone}
                                    style={styles.detailIcon}
                                />
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailLabel}>
                                        Phone no:
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {store.user?.phoneno}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
            <NavBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#cosgreen",
    },
    header: {
        height: "10%",
        backgroundColor: "#1b1b1b",
        justifyContent: "center",
        alignItems: "center",
    },
    headerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
    },
    headerText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    icon: {
        width: 30,
        height: 30,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    editContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    profilePictureContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    inputContainer: {
        gap: 20,
    },
    updateButton: {
        backgroundColor: "#007bff",
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 20,
    },
    updateButtonText: {
        color: "#fff",
        fontSize: 18,
    },
    viewContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    detailsContainer: {
        gap: 20,
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    detailIcon: {
        width: 37,
        height: 37,
        marginRight: 10,
    },
    detailTextContainer: {
        flex: 1,
    },
    detailLabel: {
        fontWeight: "bold",
        color: "#fff",
    },
    detailText: {
        color: "#fff",
        fontSize: 16,
    },
    detailDescription: {
        color: "#fff",
        fontSize: 10,
    },
});

export default Profile;
