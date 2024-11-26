import React from 'react';
import { Modal, TouchableOpacity, Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { HomeStyles } from '../styles/Home';

type CalendarModalProps = {
    visible: boolean;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    onClose: () => void;
};

LocaleConfig.locales['pt-br'] = {
    monthNames: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ],
    dayNames: [
        'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt-br';

const CalendarModal: React.FC<CalendarModalProps> = ({ visible, selectedDate, setSelectedDate, onClose }) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={HomeStyles.centeredView}>
                <View style={HomeStyles.modalView}>
                    <Calendar
                        current={selectedDate}
                        markedDates={{
                            [selectedDate || '']: {
                                selected: true,
                                selectedColor: 'blue',
                                selectedTextColor: 'white',
                            },
                        }}
                        onDayPress={(day: { dateString: string }) => {
                            setSelectedDate(day.dateString)
                        }}
                        disabledByDefault={true}
                        monthFormat={'MMMM yyyy'}
                    />
                    <TouchableOpacity style={HomeStyles.closeButton} onPress={onClose}>
                        <Text style={HomeStyles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default CalendarModal;