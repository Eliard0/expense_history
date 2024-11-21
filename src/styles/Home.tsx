import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fffafa'
    },

    containerViewMoney: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 250,
    },

    textMoney: {
        textAlign: 'center',
        fontSize: 35
    },

    viewAddMoney: {
        flexDirection: 'row',
        width: '90%',
        height: '10%',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    buttonAddMoney: {
        marginTop: 30,
        backgroundColor: 'green',
        width: '40%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    buttonAddSpent: {
        marginTop: 30,
        backgroundColor: 'red',
        width: '40%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textButton: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600'
    },

    closeButton: {
        position: 'absolute',
        top: 10,
        right: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },

    closeButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    buttonClose: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        marginTop: 20,
        padding: 15,
        elevation: 2,
        width: '40%',
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    modalText: {
        marginTop: 10,
        marginBottom: 15,
        textAlign: 'center',
    },

    inputMoney: {
        borderWidth: 1,
        width: 250,
        paddingStart: 10,
        borderRadius: 10
    }
});