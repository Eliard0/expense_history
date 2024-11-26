import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';

type DropdownProps = {
    placeholder: string;
    options: string[];
    onSelect: (value: string) => void;
};

const ButtonDropdonwTypeSpent: React.FC<DropdownProps> = ({ placeholder, options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        onSelect(value);
        setIsOpen(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setIsOpen(!isOpen)}
            >
                <Text style={styles.buttonText}>
                    {selectedValue || placeholder}
                </Text>
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdown}>
                    <FlatList
                        data={options}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.dropdownItem}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.dropdownItemText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },

    button: {
        width: 250,
        padding: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },

    buttonText: {
        color: '#000',
        fontSize: 16,
    },

    dropdown: {
        width: '90%',
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    dropdownItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    dropdownItemText: {
        fontSize: 16,
    },
});

export default ButtonDropdonwTypeSpent;
