import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

import CustomerTabs from "./CustomerTabs";
import BarberTabs from "./BarberTabs";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const sub = auth().onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);

                const ref = doc(db, "users", firebaseUser.uid);
                const snap = await getDoc(ref);

                if (snap.exists()) {
                    setRole(snap.data().role);
                }
            } else {
                setUser(null);
                setRole(null);
            }
        });

        return sub;
    }, []);

    if (!user) {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
        );
    }

    if (role === "barber") return <BarberTabs />;
    return <CustomerTabs />;
}
