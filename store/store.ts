import { create, SetState } from "zustand";
// import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { makeAutoObservable } from "mobx";
import { Dispatch } from "react";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface User {
    userName: string;
    email: string;
    phoneno: string;
    profilePicture: string;
}

interface RegisterData {
    userName: string;
    email: string;
    password: string;
}

interface Review {
    // Define review properties here
}

interface Station {
    // Define station properties here
}

interface StoreState {
    SidebarOpen: boolean;
    setSidebarOpen: (state: boolean) => void;

    allstation: boolean;
    setallstation: (state: boolean) => void;

    isclickondirection: boolean;
    setisclickondirection: (state: boolean) => void;

    location: any[];
    setlocation: (state: any[]) => void;

    reviews: Review[];
    setreviews: (state: Review[]) => void;

    bookmarks: Station[];
    setbookmarks: (state: Station[]) => void;

    stations: Station[];
    setStations: (newStations: Station[]) => void;

    user: User | undefined;
    setUser: (state: User | undefined) => void;

    handleGetstations: () => Promise<void>;
    handleRegister: (
        formData: RegisterData,
        redirect: NavigationProp<any>
    ) => Promise<void>;
    verifyEmail: (
        formData: FormData,
        redirect: (path: string) => void
    ) => Promise<void>;
    sendEmailVerificationMail: (
        formData: FormData,
        navigate: (path: string) => void
    ) => Promise<void>;
    handleLogin: (
        formData: FormData,
        redirect: (path: string) => void
    ) => Promise<void>;
    getUser: (navigate: (path: string) => void) => Promise<void>;
    updateUser: (formData: FormData) => Promise<void>;
    getstation: (offset: number) => Promise<void>;
    handleallstations: () => Promise<void>;
    handlelogout: (navigate: (path: string) => void) => Promise<void>;
    addbookmark: (data: any) => Promise<void>;
    getbookmark: () => Promise<void>;
    removebookmark: (data: any) => Promise<void>;
    removereview: (data: any) => Promise<void>;
    addreview: (data: any) => Promise<void>;
    getreview: (data: any) => Promise<void>;
}

export const Store = create<StoreState>((set: SetState<StoreState>) => ({
    SidebarOpen: false,
    setSidebarOpen: (state) => set({ SidebarOpen: state }),

    allstation: false,
    setallstation: (state) => set({ allstation: state }),

    isclickondirection: false,
    setisclickondirection: (state) => set({ isclickondirection: state }),

    location: [],
    setlocation: (state) => set({ location: state }),

    reviews: [],
    setreviews: (state) => set({ reviews: state }),

    bookmarks: [],
    setbookmarks: (state) => set({ bookmarks: state }),

    stations: [],
    setStations: (newStations) =>
        set((state) => ({ stations: [...state.stations, ...newStations] })),

    user: undefined,
    setUser: (state) => set({ user: state }),

    handleGetstations: async () => {
        await axios.get("/api/v1/stations").then((res) => {
            const { setStations } = Store.getState();
            setStations(res.data);
        });
    },

    handleRegister: async (formData, redirect) => {
        // set({ isLoading: true });

        await axios.post("/api/v1/user/register", formData).then((res) => {
            // toast.success(res.data?.message);

            // set({ isLoggedIn: true });
            setTimeout(() => redirect.navigate("home"), 1000);
        });
    },

    verifyEmail: async (formData, redirect) => {
        const { handleRegister } = Store.getState();

        // set({ isLoading: true });

        const OTP = formData;

        await axios
            .post(`api/v1/user/verifyOtp`, { userOtp: OTP })
            .then((res) => {
                Cookies.remove("userEmail");
                handleRegister(formData, redirect);
                // toast.success(res.data?.message);
            });
    },

    sendEmailVerificationMail: async (formData, navigate) => {
        // set({ isLoading: true });

        await axios
            .post("api/v1/user/sendVerificationMail", formData)
            .then((res) => {
                // toast.success(res.data?.message);
                navigate("/UserVerification");
                const email = formData.get("email");

                if (email) {
                    Cookies.set("userEmail", email);
                }
            });
    },

    handleLogin: async (formData, redirect) => {
        // set({ isLoading: true });

        await axios.post("api/v1/user/login", formData).then((res) => {
            // toast.success(res.data?.message);
            Store.getState().handleGetstations();
            redirect("/Home");
        });
    },

    getUser: async (navigate) => {
        const { user } = Store.getState();

        if (user == undefined) {
            await axios.get("/api/v1/user").then((res) => {
                Store.getState().setUser(res.data.user);
                // console.log(Store.getState().user);
                navigate("/home");
            });
        }
    },

    updateUser: async (formData) => {
        await axios.put("/api/v1/user/update", formData).then((res) => {
            // toast.success(res.data?.message);
            Store.getState().setUser(res.data.user);
        });
    },

    getstation: async (offset: number) => {
        if (offset < 2100) {
            try {
                const res = await axios.get(`/station/${offset}`);
                Store.getState().setStations(res.data);

                // Store the stations in AsyncStorage
                await AsyncStorage.setItem(
                    "stations",
                    JSON.stringify(Store.getState().stations)
                );
            } catch (error) {
                console.error("Error fetching stations:", error);
                // Handle error, e.g., show a toast message
                // toast.error(error.response?.data?.message || "Error fetching stations");
            } finally {
                console.log("Done fetching stations");
            }
        }
    },

    handleallstations: async () => {
        console.log("request trigger");
        await axios.get(`/stationall`).then((res) => {
            localStorage.setItem("stationsall", JSON.stringify(res.data));
        });
    },

    handlelogout: async (navigate) => {
        await axios.post("/api/v1/user/logout").then((res) => {
            // toast.success(res.data?.message);
            Cookies.remove("token");
            navigate("/");
        });
    },

    addbookmark: async (data) => {
        await axios.post("/api/v1/bookmark/add", data).then((res) => {
            // toast.success(res.data?.message);
        });
    },

    getbookmark: async () => {
        await axios.get("/api/v1/bookmarks").then((res) => {
            // toast.success("success");
            Store.getState().setbookmarks(res.data.stations);
            localStorage.setItem(
                "bookmarks",
                JSON.stringify(Store.getState().bookmarks)
            );
        });
    },

    removebookmark: async (data) => {
        await axios.delete("/api/v1/bookmark/remove", data).then((res) => {
            // toast.success(res.data?.message);
        });
    },

    removereview: async (data) => {
        await axios.post("/api/v1/review/delete", data).then((res) => {
            // toast.success(res.data?.message);
        });
    },
    addreview: async (data) => {
        await axios.post("/api/v1/review/add", data).then((res) => {
            // toast.success(res.data?.message);
        });
    },
    getreview: async (data) => {
        await axios.post("/api/v1/reviews", data).then((res) => {
            Store.getState().setreviews(res.data);
            console.log("====================================");
            console.log(res.data);
            console.log("====================================");
            localStorage.setItem(
                "reviews",
                JSON.stringify(Store.getState().reviews)
            );
        });
    },
}));
