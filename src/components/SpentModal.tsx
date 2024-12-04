import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Pressable, SafeAreaView, Alert } from 'react-native';
import { HomeStyles } from '../styles/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import DropdownButton from './ButtonDropdonwTypeSpent';
import CalendarModal from './Calendary';
import { fetchDataBalance, insertDataBalance, insertDataSpent } from '../data/storeSql';

type SpentModalProps = {
    visible: boolean;
    onClose: () => void;
    spent: number;
    descriptionSpent: string;
    setDescriptionSpent: React.Dispatch<React.SetStateAction<string>>;
    setSpent: React.Dispatch<React.SetStateAction<number>>;
    handleSetMaxValue: () => void;
};

const SpentModal: React.FC<SpentModalProps> = ({ visible, onClose, spent, setSpent, descriptionSpent, setDescriptionSpent, handleSetMaxValue }) => {
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [selectedItemDate, setSelectedItemDate] = useState<string>('');
    const [formattedDate, setFormattedDate] = useState<string>('');
    const [typeSpent, setTypeSpent] = useState<string>('');

    const currentDate = new Date();
    const dateCurrentFormated = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    const createSpent = async () => {
        try {
            const balance = await fetchDataBalance();
            console.log(balance.length)
            if (balance.length > 0) {
                const saldo = balance[balance.length - 1].currentBalance
                if (saldo >= spent) {
                    const dataSpent = await insertDataSpent(spent, descriptionSpent, typeSpent, formattedDate);
                    const newSaldo = saldo - spent
                    const dataBalance = insertDataBalance(newSaldo, dateCurrentFormated);

                    setSpent(0)
                    setDescriptionSpent('')
                    setTypeSpent('')
                    setFormattedDate('')
                    setSelectedItemDate('')
                    onClose()
                } else {
                    Alert.alert("Você não possui saldo suficiente")
                }
            } else {
                Alert.alert("Você ainda não adicionou saldo")
            }
        } catch (error) {
            console.error("Erro durante a inserção dos dados:", error);
        }
    };

    const closeCalendar = () => {
        setCalendarVisible(false);
    };

    const openCalendar = () => {
        setCalendarVisible(true);
    };

    const formatDateBR = (date: string): string => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };

    const handleDateSelect = (date: string) => {
        setSelectedItemDate(date);
        setFormattedDate(formatDateBR(date));
    };

    useEffect(() => {
        if (selectedItemDate != ' ') {
            setCalendarVisible(false);
        }
    }, [selectedItemDate])

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
                        <TextInput
                            placeholder="Valor Ex: 2000"
                            keyboardType="numeric"
                            placeholderTextColor='#808080'
                            style={HomeStyles.inputMoney}
                            onChangeText={(text) => {
                                if (text == "") {
                                    setSpent(0);
                                } else {
                                    const numericValue = parseFloat(text);
                                    if (!isNaN(numericValue)) {
                                        setSpent(numericValue);
                                    }
                                }
                            }}
                            value={spent === 0 ? "" : spent.toString()} 
                        />
                        <TextInput
                            placeholder="Descrição: "
                            placeholderTextColor='#808080'
                            style={[HomeStyles.inputMoney, { marginTop: 10 }]}
                            onChangeText={setDescriptionSpent}
                            value={descriptionSpent}
                        />

                        <View>
                            <TouchableOpacity onPress={openCalendar}>
                                <TextInput
                                    placeholder="Selecione a data: "
                                    placeholderTextColor='#808080'
                                    style={[HomeStyles.inputMoney, { marginTop: 10 }]}
                                    value={formattedDate}
                                    editable={false}
                                />
                                <Icon name='calendar-number-outline' size={28} color={'#000'} style={{ position: 'absolute', right: 15, top: 15 }} />
                            </TouchableOpacity>
                        </View>

                        <DropdownButton
                            placeholder="Tipo de Gasto"
                            options={[
                                'Casa', 'Trabalho', 'Lazer',
                                'Amigos', 'Familia', 'Presente'
                            ]}
                            onSelect={setTypeSpent}
                        />

                        <Pressable
                            style={HomeStyles.buttonClose}
                            onPress={createSpent}>
                            <Text style={HomeStyles.textStyle}>Concluir</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <CalendarModal
                visible={calendarVisible}
                selectedDate={selectedItemDate}
                onClose={closeCalendar}
                setSelectedDate={handleDateSelect}
            />

        </SafeAreaView>
    );
};

export default SpentModal;

