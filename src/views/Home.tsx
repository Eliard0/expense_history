import React, { useState } from 'react';
import {
    Alert, FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput,
    TouchableOpacity, View,
} from 'react-native';
import { HomeStyles } from '../styles/Home';

import Svg, { Circle, G } from 'react-native-svg';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';

function Home(): React.JSX.Element {
    const [maxValue, setMaxValue] = useState(0)
    const [value, setValue] = useState(maxValue)
    const [modalVisible, setModalVisible] = useState(false)
    const [money, setMoney] = useState('')
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [selectedItemDate, setSelectedItemDate] = useState<string>('');
console.log(selectedItemDate)

    const remainingValue = value > 0 ? value : 0;
    const percentage = remainingValue / maxValue;

    const size = 250;
    const strokeWidth = 15;
    const radius = (size - strokeWidth) / 2;

    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - percentage);

    const handleSetMaxValue = () => {
        const numericMoney = parseFloat(money);
        if (!isNaN(numericMoney) && numericMoney > 0) {
            setMaxValue((prevMaxValue) => prevMaxValue + numericMoney);
            setValue((prevValue) => prevValue + numericMoney);
            setModalVisible(false);
            setMoney('')
        } else {
            Alert.alert('Valor inválido', 'Por favor, insira um número maior que 0.');
        }
    };

    function min() {
        setValue(value - 1)
    }

    const DATA = [
        {
            id: '1',
            category: 'casa',
            date: new Date(),
            value: 2000,
            description: 'aluguel'
        },
        {
            id: '2',
            category: 'lazer',
            date: new Date(),
            value: 5000,
            description: 'churrasco'
        },
        {
            id: '3',
            category: 'carro',
            date: new Date(),
            value: 1000,
            description: 'manutencao do carro'
        },
    ];

    type ItemProps = {
        category: string
        date: Date
        value: number
        description: string
    };

    const openCalendar = (date: Date) => {
        setSelectedItemDate(date.toISOString().split('T')[0]);
        setCalendarVisible(true);
    };

    // Função para fechar o calendário
    const closeCalendar = () => {
        setCalendarVisible(false);
    };

    const [selected, setSelected] = useState('');

    const Item = ({ category, date, value, description }: ItemProps) => (
        <View style={styles.item}>
            <Text style={styles.title}>{category}</Text>

            <View style={{ flexDirection: 'column' }}>
                <Text>{value.toFixed(1)}</Text>
                <Text>{description}</Text>
            </View>

            <View style={{
                position: 'absolute',
                right: 10,
            }}>
                <TouchableOpacity onPress={()=>openCalendar(date)}>
                    <Icon name='calendar-number-outline' size={32} color={'#000'} />
                </TouchableOpacity>
            </View>
            <Modal
                transparent={true}
                animationType="slide"
                visible={calendarVisible}
                onRequestClose={closeCalendar}
            >
                <View style={HomeStyles.centeredView}>
                    <View style={HomeStyles.modalView}>
                        <Calendar
                            current={selectedItemDate}
                            onDayPress={() => {
                                closeCalendar();
                            }}
                            disabledByDefault={true}
                            monthFormat={'MM yyyy'}
                        />
                        <TouchableOpacity style={HomeStyles.closeButton} onPress={closeCalendar}>
                            <Text style={HomeStyles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );

    return (
        <View style={HomeStyles.container}>
            <View style={{ marginTop: '15%' }}>
                <Svg width={size} height={size}>
                    <G rotation="-90" originX={size / 2} originY={size / 2}>
                        <Circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            strokeWidth={strokeWidth}
                            fill="none"
                        />
                        <Circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke={value >= 100 ? "green" : "red"}
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeDasharray={`${circumference} ${circumference}`}
                            strokeDashoffset={strokeDashoffset}
                        />
                    </G>
                </Svg>

                <View style={HomeStyles.containerViewMoney}>
                    <Text style={HomeStyles.textMoney}>{remainingValue}</Text>
                </View>
            </View>

            <View style={HomeStyles.viewAddMoney}>
                <TouchableOpacity style={HomeStyles.buttonAddMoney} onPress={() => setModalVisible(true)}>
                    <Text style={HomeStyles.textButton}>Registrar Valor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={HomeStyles.buttonAddSpent} onPress={() => min()}>
                    <Text style={HomeStyles.textButton}>Registrar Gasto</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item {...item} />}
                keyExtractor={item => item.id}
                style={{ width: '90%' }}
            />

            <SafeAreaView style={HomeStyles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={HomeStyles.centeredView}>
                        <View style={HomeStyles.modalView}>
                            <TouchableOpacity
                                style={HomeStyles.closeButton}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={HomeStyles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                            <Text style={HomeStyles.modalText}>Informe um valor para Começarmos</Text>
                            <TextInput
                                placeholder="Valor Ex: 2000"
                                keyboardType='numeric'
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
        </View>
    );
}
const styles = StyleSheet.create({
    item: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        alignItems: 'center',
        paddingStart: 30,
    },

    title: {
        fontSize: 32,
    },
})

export default Home;
