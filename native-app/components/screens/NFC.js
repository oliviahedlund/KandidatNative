import React from "react";
import { Text, View } from 'react-native';
import { SafeAreaView } from "react-native";
import styles from '../../styles/styles';
import {TouchableOpacity, StyleSheet} from 'react-native';
import NfcManager, {NfcTech, ByteParser, Ndef} from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
NfcManager.start();

const NfcScreen = ({navigation}) => {
    
    async function readNdef() {
        try {
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            let parsed = null;
            const tag = await NfcManager.getTag();
            if (tag.ndefMessage && tag.ndefMessage.length > 0) {
                // ndefMessage is actually an array of NdefRecords, 
                // and we can iterate through each NdefRecord, decode its payload 
                // according to its TNF & type
                const ndefRecords = tag.ndefMessage;

                function decodeNdefRecord(record) {
                    return Ndef.text.decodePayload(record.payload);
                    /*
                    if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
                        return ['text', Ndef.text.decodePayload(record.payload)];
                    } else if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
                        return ['uri', Ndef.uri.decodePayload(record.payload)];
                    }

                    return ['unknown', '---']
                    */
                }
                /*
                parsed = ndefRecords.map(decodeNdefRecord);

                //parsed = Array(Array("text", *meddelande*))
                const arr1 = parsed[0]; // arr1 = Array("text", *meddelande*)
                const textMessage = arr1[1]; //textMessage = *meddelande*
                console.warn('Meddelande: ', textMessage);
                */
                parsed = ndefRecords.map(decodeNdefRecord);
                console.warn(parsed[0]);
            }
        } catch (ex) {
            console.warn('Oops!', ex);
        } finally {
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
        }
    }
    async function writeNdef({type, value}) {
        let result = false;
      
        try {
           // STEP 1
            await NfcManager.requestTechnology(NfcTech.Ndef);

            const bytes = Ndef.encodeMessage([Ndef.textRecord('Du är grym!')]);

            if (bytes) {
                await NfcManager.ndefHandler // STEP 2
                    .writeNdefMessage(bytes); // STEP 3
                result = true;
            }
        } catch (ex) {
          console.warn(ex);
        } finally {
          // STEP 4
          NfcManager.cancelTechnologyRequest();
        }
      
        return result;
      }

    return (
        <SafeAreaView style={styles.centerContainer}>
            <View style={styles.button}>
                <TouchableOpacity onPress={readNdef}>
                    <Text>Read from Tag</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={writeNdef}>
                    <Text>Write to Tag</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default NfcScreen;

