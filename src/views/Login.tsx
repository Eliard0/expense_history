import React from 'react';
import {
    Alert, Text, TouchableOpacity, View,
} from 'react-native';
import { stylesLogin } from '../styles/Login';

import LinearGradient from 'react-native-linear-gradient';
import { StackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';

import ReactNativeBiometrics from 'react-native-biometrics';

type LoginScreenNavigationProp = StackNavigationProp<StackParamList, 'Login'>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

const rnBiometrics = new ReactNativeBiometrics()

const handleLogin = (navigation: LoginScreenNavigationProp) => {
    rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
        .then((resultObject) => {
            const { success } = resultObject
            if (success) {
                navigation.navigate('Home')
            } else {
                Alert.alert("Para entrar no app coloque sua impressão digital")
            }
        })
        .catch(() => {
            console.log('biometrics failed')
        })
};

function Login({ navigation }: Props): React.JSX.Element {
    return (
        <View style={stylesLogin.container}>
            <LinearGradient
                colors={['rgba(2,0,36,1)', 'rgba(9,9,121,1)', 'rgba(0,212,255,1)']}
                style={stylesLogin.gradient}>
                <TouchableOpacity style={stylesLogin.buttonLogin} onPress={() => handleLogin(navigation)}>
                    <Text style={stylesLogin.textButtonLogin}>
                        Entrar
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

export default Login;
