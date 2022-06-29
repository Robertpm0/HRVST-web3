import React, {useState} from 'react';
import {Image, View, Text, SafeAreaView, TouchableOpacity, Div,} from 'react-native';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import Power from '../../../assets/images/power-button.png';
import { WebView } from 'react-native-webview';

const HomeScreen = () => {
    const signOut = () => {
        Auth.signOut();
    };
    const [shown, setShown] = React.useState(false);
    const addy = '0x54612a1b7A81d8c355D83fD613a3e9DA749B291E';

    /*const onBuyCryptoPressed = () => {
        window.open(('https://staging-global.transak.com/?apiKey=7bdd0629-a424-4d9a-abfe-a28ec48bfb0a'))
    };*/
    //onPress={() => Linking.openURL(`https://staging-global.transak.com/?apiKey=7bdd0629-a424-4d9a-abfe-a28ec48bfb0a&redirectURL=https://transak.com&cryptoCurrencyList=USDC&defaultCryptoCurrency=USDC&walletAddress=${addy}&disableWalletAddressForm=true&exchangeScreenTitle=My%20dApp%20is%20the%20best&isFeeCalculationHidden=true`)}>
    state = { showWebview: false }
    const {showWebview} = this.state;

        {showWebview ? (
        <WebView 
            source={{html: `
                            <iframe
                             width="100%"
                             height="100%"
                             src= "https://staging-global.transak.com/?apiKey=7bdd0629-a424-4d9a-abfe-a28ec48bfb0a&redirectURL=https://transak.com&cryptoCurrencyList=USDC&defaultCryptoCurrency=USDC&walletAddress=${addy}&disableWalletAddressForm=true&exchangeScreenTitle=My%20dApp%20is%20the%20best&isFeeCalculationHidden=true" 
                             frameborder="0" >]
                            </iframe>
                            `
                        ,
                    }}
            />
                        ) : (
                            onPress={() => this.setState({showWebview: true})}
                        )}
                            


    return(
        <SafeAreaView style={{backgroundColor:'tan', flex:1}}>
            <View style={{alignSelf: 'flex-end', marginTop: '50%', position:'absolute', paddingRight: 10}}>
                <Text style={{fontWeight:'700'}}>APY: 13.36%</Text>
            </View>
            
            <View style={{marginTop: '50%'}}> 
                <Text style={{fontSize: 16,fontWeight: '400' ,textAlign: 'center'}}>@Chad</Text>
                <Text style={{fontWeight:'700', fontSize: 80, textAlign: 'center'}}>$9,493.59</Text>
            </View>

            <Div>
            {shown ? <openTransak /> : null}
            <View style={{backgroundColor: '#9C7562', width: 302, height: 47, borderRadius: 15, alignSelf: 'center', marginTop:20, flexDirection:'row'}}>
                <TouchableOpacity style={{width: '33%', justifyContent: 'center', borderRightColor: '#fff', borderRightWidth: 1}} onPress={() => setShown(!shown)}>
                    <Text style={{fontWeight:'700', textAlign:'center'}}>Deposit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '33%', justifyContent: 'center', borderRightColor: '#fff', borderRightWidth: 1}}>
                    <Text style={{fontWeight:'700', textAlign:'center'}}>Withdrawl</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '33%', justifyContent: 'center'}}>
                    <Text style={{fontWeight:'700', textAlign:'center'}}>Send</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity>
                <Image source={Power}  style={{alignSelf:'center', marginTop: '10%', width:125, height:125, resizeMode:'contain'}}/>
                </TouchableOpacity>
            </View>
            </Div>
            
            <Text
                onPress={signOut}
                style={{
                    width: '100%',
                    textAlign: 'center',
                    color: 'red',
                    marginTop: 'auto',
                    marginVertical: 20,
                    fontSize: 20,
                }}>
                SIGN OUT BRUH
            </Text>
        </SafeAreaView>
    );


};


export default HomeScreen;