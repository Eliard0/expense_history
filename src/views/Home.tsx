import React, { useEffect, useRef, useState } from 'react';
import {
    Alert, Animated, FlatList, ScrollView, Text, TouchableOpacity, View,
} from 'react-native';
import { HomeStyles } from '../styles/Home';

import Svg, { Circle, G, loadLocalRawResource } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import CalendarModal from '../components/Calendary';
import MoneyModal from '../components/RegisterValue';
import SpentModal from '../components/SpentModal';
import { fetchDataBalance, fetchDataSpent, insertDataBalance } from '../data/storeSql';

interface Expense {
    id: number;
    spent: string;
    descriptionSpent: string;
    typeSpent: string;
    formattedDate: string;
}

type ItemProps = Expense

function Home(): React.JSX.Element {
    const [maxValue, setMaxValue] = useState(0)
    const [value, setValue] = useState(maxValue)
    const [modalMoneyVisible, setModalMoneyVisible] = useState(false)
    const [modalSpentVisible, setModalSpentVisible] = useState(false)
    const [money, setMoney] = useState('')
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [selectedItemDate, setSelectedItemDate] = useState<string>('');
    const [spent, setSpent] = useState<number>(0);
    const [descriptionSpent, setDescriptionSpent] = useState('');
    const [data, setData] = useState<Expense[]>([])
    const opacityGrafo = useRef(new Animated.Value(0.1)).current

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    const remainingValue = value > 0 ? value : 0;
    const percentage = remainingValue / maxValue;

    const size = 250;
    const strokeWidth = 15;
    const radius = (size - strokeWidth) / 2;

    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - percentage);

    const handleSetMaxValue = async () => {
        const balance = await getBalance();

        const numericMoney = parseFloat(money);
        if (!isNaN(numericMoney) && numericMoney > 0) {
            const newBalance = numericMoney + balance;

            await insertDataBalance(newBalance, formattedDate);
            setMaxValue(newBalance);
            setValue(newBalance);

            setModalMoneyVisible(false);
            setMoney('');
        } else {
            Alert.alert('Valor inválido', 'Por favor, insira um número maior que 0.');
        }
    };

    const getBalance = async (): Promise<number> => {
        const getBalance = await fetchDataBalance();

        if (getBalance.length > 0) {
            const balance = getBalance[getBalance.length - 1].currentBalance
            setValue(balance);

            return balance

        } else {
            setValue(0);

            return 0
        }
    }

    const getMaxBalance = async (): Promise<number> => {
        const maxValue = await fetchDataBalance();

        if (maxValue.length > 0) {
            const max = maxValue[maxValue.length - 1].currentBalance
            setMaxValue(max);

            return max

        } else {
            setMaxValue(0);

            return 0
        }
    }

    const loadExpenses = async () => {
        try {
            const expenses = await fetchDataSpent();

            const formattedExpenses = expenses.map(expense => ({
                ...expense,
                formattedDate: formatDateForCalendar(expense.formattedDate)
            }));

            setData(formattedExpenses);
            getBalance()

        } catch (error) {
            console.error("Erro ao carregar os dados:", error);
        }
    };

    useEffect(() => {
        Animated.timing(opacityGrafo, {
            toValue: 1,
            duration: 4500,
            useNativeDriver: true
        }).start()

        getMaxBalance()
        getBalance()
        loadExpenses();
    }, []);

    const formatDateForCalendar = (date: string) => {
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
    };

    const openCalendar = (date: string) => {
        setSelectedItemDate(date);
        setCalendarVisible(true);
    };

    const closeCalendar = () => {
        setCalendarVisible(false);
        loadLocalRawResource()
    };

    const Item = ({ spent, formattedDate, descriptionSpent, typeSpent }: ItemProps) => (
        <View style={HomeStyles.item}>
            <View style={HomeStyles.positionCategory}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Text style={HomeStyles.title} numberOfLines={1}>
                        {typeSpent}
                    </Text>
                </ScrollView>
            </View>
            <View style={{ flexDirection: 'column', width: '50%' }}>
                <Text style={HomeStyles.textValue}>R$: {spent}</Text>
                <Text style={HomeStyles.textDescription}>{descriptionSpent}</Text>
            </View>
            <View style={HomeStyles.positionCalendary}>
                <TouchableOpacity onPress={() => openCalendar(formattedDate)}>
                    <Icon name="calendar-number-outline" size={32} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={HomeStyles.container}>
            <Animated.View style={{ marginTop: '15%', opacity: opacityGrafo }}>
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
            </Animated.View>

            <View style={HomeStyles.viewAddMoney}>
                <TouchableOpacity style={HomeStyles.buttonAddMoney} onPress={() => setModalMoneyVisible(true)}>
                    <Text style={HomeStyles.textButton}>Registrar Valor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={HomeStyles.buttonAddSpent} onPress={() => setModalSpentVisible(true)}>
                    <Text style={HomeStyles.textButton}>Registrar Gasto</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={data}
                renderItem={({ item }) => <Item {...item} />}
                keyExtractor={item => item.id.toString()}
                inverted
                style={{ width: '90%' }}
            />

            <CalendarModal
                visible={calendarVisible}
                selectedDate={selectedItemDate}
                onClose={closeCalendar}
                setSelectedDate={() => { }}

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
                onClose={() => {
                    setModalSpentVisible(false)
                    loadExpenses()
                }
                }
                spent={spent}
                setSpent={setSpent}
                handleSetMaxValue={handleSetMaxValue}
                descriptionSpent={descriptionSpent}
                setDescriptionSpent={setDescriptionSpent}
            />
        </View>
    );
}

export default Home;
