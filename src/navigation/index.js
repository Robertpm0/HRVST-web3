import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ConfirmWalletScreen from '../screens/ConfirmWalletScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import {Auth, Hub} from 'aws-amplify';
import { ConsoleLogger } from '@aws-amplify/core';
const Stack = createNativeStackNavigator();

const Navigation = () => {
    const [user, setUser] = useState(undefined);
    const checkUser = async () => {
    try {
        const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
        setUser(authUser);
    } catch (e) {
        setUser(null);
        }
    };
    useEffect(() => {
        checkUser();
    }, []);
    
    useEffect(() => {
        const listener = (data) => {
            if (data.payload.event == 'signIn' || data.payload.event == 'signOut') {
                checkUser();
            }
        };
        Hub.listen('auth', listener);
        return() => Hub.remove('auth', listener);
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {user ? (
                    <Stack.Screen name="Home" component={HomeScreen} />
                ): (
                <>
                    <Stack.Screen name="SignIn" component={SignInScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
                    <Stack.Screen name="ConfirmWallet" component={ConfirmWalletScreen} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                    <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
                </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
