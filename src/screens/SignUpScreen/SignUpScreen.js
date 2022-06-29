import React, {useState} from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const EMAIL_REGEX = 
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
    const {control, handleSubmit, watch} = useForm();
    const pwd = watch('password');
    const navigation = useNavigation();

    const onRegisterPressed = async (data) => {
        const {username, password, email} = data;
        try {
            await Auth.signUp({
                username,
                password,
                attributes: {email, preferred_username: username},
            });
            navigation.navigate('ConfirmEmail', {username});
        } catch (e) {
          Alert.alert('Oops', e.message);
        }
    };

    const onSignIn2Pressed = () => {
        navigation.navigate('SignIn');
    };

    const onTermsOfUsePressed = () => {
        console.warn('onTermsPressed');
    };

    const onPrivacyPressed = () => {
        console.warn('onPrivacyPressed');
    };
    const onEnterCodePressed = () => {
        navigation.navigate('ConfirmEmail');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text style={styles.title}>Create an Account</Text>
            <CustomInput 
                name='username'
                control={control}
                placeholder='Username'
                rules={{
                    required: 'Username is Required',
                    minLength: {
                        value: 4,
                        message: 'Username Must be atleast 4 Characters',
                    },
                    maxLength: {
                        value: 20,
                        message: 'Username Cannot Exceed 20 Characters',
                    },
                }}
            />
            <CustomInput 
                name='email'
                control={control} 
                placeholder='Email'
                rules={{
                    required: 'Email is Required',
                    pattern: {value: EMAIL_REGEX, message: 'Invalid Email'},
                }} 
            />
            <CustomInput 
                name='password'
                control={control}
                placeholder="Password"
                secureTextEntry
                rules={{
                    required: 'Password is Required',
                    minLength: {
                        value: 8,
                        message: 'Password Must be atleast 8 Characters',
                    },
                }}
            />
            <CustomInput 
                name='password-repeat'
                control={control}
                placeholder='Repeat Password'
                secureTextEntry
                rules={{
                    validate: value => value == pwd || 'Passwords Do NOT Match!',
                }}
            />

            <CustomButton text='Register' onPress={handleSubmit(onRegisterPressed)} />

            <Text style={styles.text}>
                By registering, you are confirming acceptance to our{' '}
                <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text>
                &{' '} <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>
            </Text>

            <SocialSignInButtons />

            <CustomButton
             text="Have an Account? Sign in"
             onPress={onSignIn2Pressed} 
             type='TERITIARY' 
            />
            <CustomButton
             text="Enter Signup Code"
             onPress={onEnterCodePressed} 
             type='TERITIARY' 
            />

        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075'
    },
});


export default SignUpScreen;