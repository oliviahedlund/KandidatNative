import React from "react";
import { Text, View } from 'react-native';
import { SafeAreaView } from "react-native";
import styles from '../styles/styles';

const CameraScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text>Welcome to camera!</Text>
            </View>
        </SafeAreaView>
    );
}

export default CameraScreen;

