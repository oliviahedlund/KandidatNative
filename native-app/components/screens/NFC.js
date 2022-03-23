import React from "react";
import { Text, View } from 'react-native';
import { SafeAreaView } from "react-native";
import styles from '../../styles/styles';
import {TouchableOpacity, StyleSheet} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
NfcManager.start();

const NfcScreen = ({navigation}) => {
    async function readNdef() {
        try {
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            // the resolved tag object will contain `ndefMessage` property
            const tag = await NfcManager.getTag();
            console.warn('Tag found', tag);
        } catch (ex) {
            console.warn('Oops!', ex);
        } finally {
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
        }
    }

    return (
        <SafeAreaView style={styles2.container}>
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={readNdef}>
                    <Text>Scan a Tag</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles2 = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
export default NfcScreen;

