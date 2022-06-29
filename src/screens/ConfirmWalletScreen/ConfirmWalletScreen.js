import React, {useState} from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, Div, TouchableOpacity } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Auth, autoShowTooltip } from 'aws-amplify';
import { useRoute } from '@react-navigation/native';
import 'react-native-get-random-values'
import '@ethersproject/shims'
import { ethers } from 'ethers';
import { SafeAreaView } from 'react-native-safe-area-context';
import Clipboard from '@react-native-community/clipboard';

const ConfirmWalletScreen = () => {
    const {control, handleSubmit} = useForm();
    //const [mnemonic, setMnemonic] = useState('');
    const route = useRoute();
    const navigation = useNavigation();
    const ConfirmWalletPressed = () => {
        navigation.navigate('SignIn');
    };
    /*const onCreateWalletPressed = mnemonic => {
      const wallet = ethers.Wallet.createRandom();
      const createMnemonic = wallet.mnemonic.phrase;
      return setMnemonic(createMnemonic);
    };
*/
    
    const {mnemonic} = route.params;

    
    const copyToClipBoard = () => {
        Clipboard.setString(mnemonic);
    };

    const renderMnemonic = () => {
        console.log({mnemonic});
        const split = mnemonic.split(' ');
        return (
            <View style={styles.mnemonicTextContainer}>
                {split.map((text) => {
                    return (
                        <TouchableOpacity style={{margin: 5}} key={text}>
                        <Text style={styles.mnemonicText}>{text}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.mainBody}>
            <Text style={styles.mnemonicHeaderText}>Write Down Recovery Phrase</Text>
            <View style={styles.card}>
              {renderMnemonic()}
              <TouchableOpacity style={styles.copyToClipboardButton} onPress={() => copyToClipBoard()}>
                <Text style={styles.copyToClipBoardText}>Copy To Clipboard</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.subtextContainer}>
              <Text>These 12 Words are They Keys to your Wallet! DO NOT SHARE THEM WITH ANYONE BUT YOU!!!</Text>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton text='SignUp' onPress={handleSubmit(ConfirmWalletPressed)} />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: '#fff'
  },
  card: {
    marginTop: 22, 
    maxWidth: '90%',
    height: 161,
    borderColor: '#c2c2c2', 
    borderWidth: 1,
    borderRadius: 5, 
    alignSelf: 'center'
  },
  mnemonicHeaderText: {
    textAlign: 'center', 
    fontSize: 12, 
    color: '#C2C2C2'
  },
  copyToClipboardButton: {
    position: 'absolute',
    bottom: 10, 
    alignSelf: 'center'
  },
  copyToClipboardText: {
    color: '#1652F0', 
    textAlign: 'center', 
    fontSize: 12
  },
  subtextContainer: {
    width: '90%', 
    alignSelf: 'center', 
    marginTop: 20
  },
  buttonContainer: {
    position: 'absolute', 
    bottom: 45, 
    width: '100%'
  },
  mnemonicTextContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    alignSelf: 'center', 
    //alignSelf: 'center'
  },
  mnemonicText: {
    textAlign: 'center', 
    fontSize: 20,
    borderRadius: 10, 
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    backgroundColor:'black',
    color: 'white'
  },
});


export default ConfirmWalletScreen;