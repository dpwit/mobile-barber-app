import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import messaging from "@react-native-firebase/messaging";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
    useEffect(() => {
        messaging().requestPermission();
    }, []);

    return (
        <StripeProvider publishableKey="YOUR_STRIPE_PUBLISHABLE_KEY" merchantIdentifier="merchant.com.yourapp">
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </StripeProvider>
    );
}
