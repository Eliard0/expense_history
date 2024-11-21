import {
    StyleSheet
} from 'react-native';

export const stylesLogin = StyleSheet.create({
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
})