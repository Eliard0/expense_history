import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

function Home(): React.JSX.Element {
    const [value, setValue] = useState(100)
    const [maxValue, setMaxValue] = useState(100)

    function sum() {
        setValue(value + 1)
    }

    function min() {
        setValue(value - 1)
    }

    const remainingValue = value > 0 ? value : 0;
    const percentage = remainingValue / maxValue;

    const size = 250;
    const strokeWidth = 15;
    const radius = (size - strokeWidth) / 2;

    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - percentage);

    return (
        <View style={styles.container}>
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

                <View style={styles.containerViewMoney}>
                    <Text style={styles.textMoney}>{remainingValue}</Text>
                </View>
            </View>

            <View style={styles.viewAddMoney}>
                <TouchableOpacity style={styles.buttonAddMoney} onPress={sum}>
                    <Text style={styles.textButtonLogin}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        justifyContent: 'flex-end'
    },

    buttonAddMoney: {
        marginTop: 30,
        backgroundColor: '#00d4ff',
        width: '20%',
        height: '100%',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textButtonLogin: {
        color: 'green',
        fontSize: 35,
        fontWeight: '600'
    },
});

export default Home;
