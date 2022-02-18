import React from "react";
import { Text, View } from 'react-native';
import { SafeAreaView } from "react-native";
import styles from '../styles/styles';

const BluetoothScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text>Welcome to Bluetooth!</Text>
            </View>
        </SafeAreaView>
    );
}

export default BluetoothScreen;
