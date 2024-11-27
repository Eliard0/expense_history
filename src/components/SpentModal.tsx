import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Pressable, SafeAreaView, Alert } from 'react-native';
import { HomeStyles } from '../styles/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import DropdownButton from './ButtonDropdonwTypeSpent';
import CalendarModal from './Calendary';
import { insertData } from '../data/storeSql';

type SpentModalProps = {
    visible: boolean;
    onClose: () => void;
    spent: string;
    descriptionSpent: string;
    setDescriptionSpent: React.Dispatch<React.SetStateAction<string>>;
    setSpent: React.Dispatch<React.SetStateAction<string>>;
    handleSetMaxValue: () => void;
};

const SpentModal: React.FC<SpentModalProps> = ({ visible, onClose, spent, setSpent, descriptionSpent, setDescriptionSpent, handleSetMaxValue }) => {
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [selectedItemDate, setSelectedItemDate] = useState<string>('');
    const [formattedDate, setFormattedDate] = useState<string>('');
    const [typeSpent, setTypeSpent] = useState<string>('');

    const createSpent = async () => {
        try {
            const dataSpent = await insertData(spent, descriptionSpent, typeSpent, formattedDate);

            if (dataSpent) {
                console.log("Dados inseridos com sucesso!");
                setSpent('')
                setDescriptionSpent('')
                setTypeSpent('')
                setFormattedDate('')
                setSelectedItemDate('')
                closeCalendar()
                Alert.alert("Dados cadastrados com sucesso")
            } else {
                Alert.alert("Error ao castrar os dados")
            }
        } catch (error) {
            console.error("Erro durante a inserção dos dados:", error);
        }
    };

    const closeCalendar = () => {
        setCalendarVisible(false);
        onClose()
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
                            style={HomeStyles.inputMoney}
                            onChangeText={setSpent}
                            value={spent}
                        />
                        <TextInput
                            placeholder="Descrição: "
                            style={[HomeStyles.inputMoney, { marginTop: 10 }]}
                            onChangeText={setDescriptionSpent}
                            value={descriptionSpent}
                        />

                        <TouchableOpacity onPress={openCalendar}>
                            <TextInput
                                placeholder="Selecione a data: "
                                style={[HomeStyles.inputMoney, { marginTop: 10 }]}
                                value={formattedDate}
                                editable={false}
                            />
                            <Icon name='calendar-number-outline' size={28} color={'#000'} style={{ position: 'absolute', right: 15, top: 15 }} />
                        </TouchableOpacity>

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

