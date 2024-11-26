import React, { useState } from 'react';
import {
    Alert, FlatList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { HomeStyles } from '../styles/Home';

import Svg, { Circle, G } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import CalendarModal from '../components/Calendary';
import MoneyModal from '../components/RegisterValue';
import SpentModal from '../components/SpentModal';

function Home(): React.JSX.Element {
    const [maxValue, setMaxValue] = useState(0)
    const [value, setValue] = useState(maxValue)
    const [modalMoneyVisible, setModalMoneyVisible] = useState(false)
    const [modalSpentVisible, setModalSpentVisible] = useState(true)
    const [money, setMoney] = useState('')
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [selectedItemDate, setSelectedItemDate] = useState<string>('');
    const [spent, setSpent] = useState('');
    const [descriptionSpent, setDescriptionSpent] = useState('');
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
            setModalMoneyVisible(false);
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
            date: '2024-11-30',
            value: 2000,
            description: 'aluguel'
        },
        {
            id: '2',
            category: 'lazer',
            date: '2024-12-03',
            value: 5000,
            description: 'churrasco'
        },
        {
            id: '3',
            category: 'carro',
            date: '2024-09-20',
            value: 1000,
            description: 'manutencao do carro'
        },
        {
            id: '4',
            category: 'carro',
            date: '2024-09-20',
            value: 1000,
            description: 'manutencao do carro'
        },
        {
            id: '5',
            category: 'carro',
            date: '2024-09-20',
            value: 1000,
            description: 'manutencao do carro'
        },
    ];

    type ItemProps = {
        category: string
        date: string
        value: number
        description: string
    };

    const openCalendar = (date: string) => {
        setSelectedItemDate(date);
        setCalendarVisible(true);
    };

    const closeCalendar = () => {
        setCalendarVisible(false);
        setSelectedItemDate('');
    };

    const Item = ({ category, date, value, description }: ItemProps) => (
        <View style={styles.item}>
            <View style={styles.positionCategory}>
                <Text style={styles.title}>{category}</Text>
            </View>

            <View style={{ flexDirection: 'column', width: '50%' }}>
                <Text style={styles.textValue}>R$: {value.toFixed(2)}</Text>
                <Text style={styles.textDescription}>{description}</Text>
            </View>

            <View style={styles.positionCalendary}>
                <TouchableOpacity onPress={() => openCalendar(date)}>
                    <Icon name='calendar-number-outline' size={32} color={'#000'} />
                </TouchableOpacity>
            </View>
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
                <TouchableOpacity style={HomeStyles.buttonAddMoney} onPress={() => setModalMoneyVisible(true)}>
                    <Text style={HomeStyles.textButton}>Registrar Valor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={HomeStyles.buttonAddSpent} onPress={() => setModalSpentVisible(true)}>
                    <Text style={HomeStyles.textButton}>Registrar Gasto</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item {...item} />}
                keyExtractor={item => item.id}
                style={{ width: '90%' }}
            />

            <CalendarModal
                visible={calendarVisible}
                selectedDate={selectedItemDate}
                onClose={closeCalendar}
                setSelectedDate={() => {}}
            />

            <MoneyModal
                visible={modalMoneyVisible}
                onClose={() => setModalMoneyVisible(false)}
                money={money}
                setMoney={setMoney}
                handleSetMaxValue={handleSetMaxValue}
            />
            
            <SpentModal
                visible={modalSpentVisible}
                onClose={() => setModalSpentVisible(false)}
                spent={spent}
                setSpent={setSpent}
                handleSetMaxValue={handleSetMaxValue}
                descriptionSpent={descriptionSpent}
                setDescriptionSpent={setDescriptionSpent}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    item: {
        width: '100%',
        flexDirection: 'row',
        borderWidth: 0.5,
        borderRadius: 15,
        borderColor: '#000',
        padding: 20,
        marginVertical: 8,
        alignItems: 'center',
        paddingStart: 30,
        justifyContent: 'center',
        marginTop: 15,
    },

    title: {
        fontSize: 32,
    },

    textValue: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    textDescription: {
        fontSize: 15,
        fontWeight: '400'
    },

    positionCategory: {
        position: 'absolute',
        left: 10,
    },

    positionCalendary: {
        position: 'absolute',
        right: 10,
    }
})

export default Home;
