import React from "react";
import { Text, View } from 'react-native';
import { Pressable } from 'react-native';
import styles from '../styles/styles';
import { SafeAreaView } from "react-native";

const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.h1}>Welcome home!</Text>
            <Text style={styles.h3}>Here are your options:</Text>

            <View style={styles.innerContainer}>
                <Pressable 
                    style={styles.button}
                    onPress={() => navigation.navigate('Camera')}>
                    <Text style={styles.buttonText}>Camera</Text>
                </Pressable>
                <Pressable 
                    style={styles.button}
                    onPress={() => navigation.navigate('Bluetooth')}>
                    <Text style={styles.buttonText}>Bluetooth</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;

