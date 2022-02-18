import React from "react";
import { Text, View, Pressable } from 'react-native';
import styles from '../styles/styles';

const ButtonContainer = ({navigation}) => {
    return (
        <View>
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
        </View>
    );
}

export default ButtonContainer;

