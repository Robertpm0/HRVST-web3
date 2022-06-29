import React from 'react';
import {View, Text} from 'react-native';
import CustomButton from '../CustomButton';

const SocialSignInButtons = () => {
    const onSignInApple = () => {
        console.warn('onSignInApple');
    };

    const onSignInGoogle = () => {
        console.warn('onSignInGoogle');
    };

    const onSignInFacebook = () => {
        console.warn('onSignInFacebook');
    };
    
    return (
        <>
            <CustomButton
             text='Sign In with Apple' 
             onPress={onSignInApple}
             bgColor='#e3e3e3'
             fgColor='#363636'
            />
            <CustomButton    
             text='Sign In with Google' 
             onPress={onSignInGoogle}
             bgColor='#FAE9EA'
             fgColor='#DD4D44'
            />
            <CustomButton
             text='Sign In with Facebook' 
             onPress={onSignInFacebook}
             bgColor='#E7EAF4'
             fgColor='#4765A9'
            />
        </>
    );
    };

    export default SocialSignInButtons;
