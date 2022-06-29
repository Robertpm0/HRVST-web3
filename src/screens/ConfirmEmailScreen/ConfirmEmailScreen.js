import React, {useState} from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { useRoute } from '@react-navigation/native';
import 'react-native-get-random-values'
import '@ethersproject/shims'
import { ethers, Wallet } from 'ethers';

const ConfirmEmailScreen = () => {
    const route = useRoute();

    const {control, handleSubmit, watch} = useForm({
        defaultValues: {username: route?.params?.username},
    });
    const username = watch('username');

    const navigation = useNavigation();


    const onSignIn2Pressed = () => {
        navigation.navigate('SignIn');
    };
    const onConfirmPressed = async data => {
        try {
            await Auth.confirmSignUp(data.username, data.code);
            const wallet = ethers.Wallet.createRandom();
            const userAddress = wallet.address;
            const mnemonic = wallet.mnemonic.phrase;
            const privateKey = wallet.privateKey;
            console.log(mnemonic);
            console.log(userAddress);
            //nextPage(mnemonic);
            navigation.navigate('ConfirmWallet', {mnemonic: mnemonic});
        }   catch (e) {
            Alert.alert('Oops', e.message);
        }
    };

    /*const nextPage = (mnemonic) => {
        navigation.push('ConfirmWallet', {mnemonic: route.params});
    *///};


    const onResendPressed = async () => {
        try {
            await Auth.resendSignUp(username);
            Alert.alert('Success', 'New Code has Been Sent!');
        } catch (e) {
          Alert.alert('Oops', e.message);
        }
    };


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text style={styles.title}>Confirm Yo Email!</Text>
            <CustomInput 
             name='username'
             control={control}
             placeholder='Username'
             rules={{
                 required: 'Username equired'
             }}
            />

            <CustomInput 
             name='code'
             control={control}
             placeholder='Enter Your Code'
             rules={{
                 required: 'Confirmation Code Required'
             }}
            />

            <CustomButton text='Confirm' onPress={handleSubmit(onConfirmPressed)} />

            <CustomButton
             text="Resend Code"
             onPress={onResendPressed} 
             type='SECONDARY' 
            />

            <CustomButton
             text="Have an Account? Sign in"
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


export default ConfirmEmailScreen;