import React from "react";
import { Text, SafeAreaView} from 'react-native';
import styles from '../../styles/styles';
import ButtonContainer from "../ButtonContainer";

const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.h1}>Welcome home!</Text>
            <ButtonContainer navigation={navigation}/>
        </SafeAreaView>
    );
}

export default HomeScreen;

