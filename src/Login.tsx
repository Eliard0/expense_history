import React from 'react';
import {
    Alert, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackParamList } from '../App';
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
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(2,0,36,1)', 'rgba(9,9,121,1)', 'rgba(0,212,255,1)']}
                style={styles.gradient}>
                <TouchableOpacity style={styles.buttonLogin} onPress={() => handleLogin(navigation)}>
                    <Text style={styles.textButtonLogin}>
                        Entrar
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
    },

    buttonLogin: {
        marginTop: 20,
        backgroundColor: '#ffff',
        width: '40%',
        height: '7%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textButtonLogin: {
        color: 'green',
        fontSize: 18,
        fontWeight: '600'
    },
});

export default Login;
