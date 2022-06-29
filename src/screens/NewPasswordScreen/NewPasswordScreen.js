import React, {useState} from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';



const NewPasswordScreen = () => {
    const {control, handleSubmit, watch} = useForm();
    const pwd = watch('password');
    const navigation = useNavigation();

    const onSignIn2Pressed = () => {
        navigation.navigate('SignIn');
    };

    const onChangePressed = async data => {
        try {
            await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
            navigation.navigate('SignIn');
        } catch (e) {
          Alert.alert('Oops', e.message);
        }
    };


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text style={styles.title}>Reset yo Password!</Text>
            <CustomInput 
            placeholder='Username'
            name='username'
            control={control}
            rules={{required: 'Username Required'}}
            />
            
            <CustomInput 
            placeholder='Code'
            name='code'
            control={control}
            rules={{required: 'Code is Required'}}
            />

            <CustomInput 
            placeholder='Enter your New Password'
            name='password'
            control={control}
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
            placeholder='Re-enter New Password'
            name='password-repeat'
            control={control}
            secureTextEntry
            rules={{
                validate: value => value == pwd || 'Passwords do not match',
    
            }}
            />
            <CustomButton text='Change' onPress={handleSubmit(onChangePressed)} />


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


export default NewPasswordScreen;