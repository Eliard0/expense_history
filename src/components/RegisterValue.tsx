import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Pressable, SafeAreaView } from 'react-native';
import { HomeStyles } from '../styles/Home';

type MoneyModalProps = {
    visible: boolean;
    onClose: () => void;
    money: string;
    setMoney: React.Dispatch<React.SetStateAction<string>>;
    handleSetMaxValue: () => void;
};

const MoneyModal: React.FC<MoneyModalProps> = ({ visible, onClose, money, setMoney, handleSetMaxValue }) => {
    return (
        <SafeAreaView style={HomeStyles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}>
                <View style={HomeStyles.centeredView}>
                    <View style={HomeStyles.modalView}>
                        <TouchableOpacity
                            style={HomeStyles.closeButton}
                            onPress={onClose}>
                            <Text style={HomeStyles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <Text style={HomeStyles.modalText}>Informe um valor para Começarmos</Text>
                        <TextInput
                            placeholder="Valor Ex: 2000"
                            keyboardType="numeric"
                            style={HomeStyles.inputMoney}
                            onChangeText={setMoney}
                            value={money}
                        />
                        <Pressable
                            style={HomeStyles.buttonClose}
                            onPress={handleSetMaxValue}>
                            <Text style={HomeStyles.textStyle}>Concluir</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default MoneyModal;
