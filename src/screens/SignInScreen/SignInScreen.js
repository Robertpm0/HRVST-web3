import React, {useState} from 'react'
import { View, Text, TextInput, Image, StyleSheet, useWindowDimensions, ScrollView, Alert } from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import {useForm, Controller, set} from 'react-hook-form';
import {Auth} from 'aws-amplify';
const SignInScreen = () => {

    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const {
        control, 
        handleSubmit, 
        formState: {errors},
    } = useForm();
    
    const onSignInPressed =  async data => { 
        if (loading) { //looking for user in database
            return;
        }
        setLoading(true); //sending user to next page
        try {
            const response = await Auth.signIn(data.username, data.password); //checking if user exists 
            console.log(response);
        }   catch (e) {
            Alert.alert('Oops', e.message); //will emit error message that user does not exist 
        }
        setLoading(false); //will not send user to next page
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    };

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Image
             source={Logo}
             style={[styles.logo, {height: height * 0.3}]} 
             resizeMode='contain'
            />

            <CustomInput 
                name='username' 
                placeholder='Username'
                control={control}
                rules={{required: '!! UserName Required !!'}}
            />
            <CustomInput 
                name='password'
                placeholder='Password'
                secureTextEntry
                control={control}
                rules={{required: '!! PassWord Required !!', minLength: {value: 6, message: 'Password should be atleast 6 Characters'}}}
            />


            <CustomButton
             text={loading ? 'Loading...' : 'Sign In'}
             onPress={handleSubmit(onSignInPressed)} 

             />
            <CustomButton
             text="Forgot Password"
             onPress={onForgotPasswordPressed} 
             type='TERITIARY' 
            />

            <SocialSignInButtons />


            <CustomButton
             text="Sign Up Here!"
             onPress={onSignUpPressed}
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
});

export default SignInScreen;