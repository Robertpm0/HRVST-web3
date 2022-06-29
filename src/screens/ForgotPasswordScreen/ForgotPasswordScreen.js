import React, {useState} from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';


const ForgotPasswordScreen = () => {
    const {control, handleSubmit} = useForm();
    const navigation = useNavigation();

    const onSignIn2Pressed = () => {
        navigation.navigate('SignIn');
    };

    const onSendPressed = async data => {
        try {
            await Auth.forgotPassword(data.username);
            navigation.navigate('NewPassword');
        } catch (e) {
          Alert.alert('Oops', e.message);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text style={styles.title}>Reset yo Password!</Text>

            <CustomInput
            name='username'
            control={control}
            placeholder="Username"
            rules={{
                required: 'Username is Required'
            }} 
            />

            <CustomButton text='Send' onPress={handleSubmit(onSendPressed)} />


            <CustomButton
             text="Back to Sign In"
             onPress={onSignIn2Pressed} 
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


export default ForgotPasswordScreen;