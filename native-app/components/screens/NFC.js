import React, {useState} from "react";
import { Text, View, Alert, Modal} from 'react-native';
import { SafeAreaView } from "react-native";
import styles from '../../styles/styles';
import {TouchableOpacity, StyleSheet, Pressable, TextInput} from 'react-native';
import NfcManager, {NfcTech, ByteParser, Ndef} from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
NfcManager.start();

const NfcScreen = ({navigation}) => {
    const [scanModal, setScanModal] = useState(false);
    const [readModal, setReadModal] = useState(false);
    const [readText, setReadText] = useState('');
    const [writeModal, setWriteModal] = useState(false);
    const [writeText, setWriteText] = useState('');

    const readNdef = async() => {
        setScanModal(true);
        try {
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            const tag = await NfcManager.getTag();
            let parsed = null;
            
            if (tag.ndefMessage && tag.ndefMessage.length > 0) {
 
                const ndefRecords = tag.ndefMessage;

                function decodeNdefRecord(record) {
                    return Ndef.text.decodePayload(record.payload);
                }

                parsed = ndefRecords.map(decodeNdefRecord);
                setReadText(parsed[0]);
            }
        } catch (ex) {
            setReadText('Could not read nfc message');
            console.log(ex);
        } finally {
            setScanModal(false);
            NfcManager.cancelTechnologyRequest(); // stop scanning
            setReadModal(true); // show read text
        }
    }

    
    const writeNdef = async() => {
        const userInput = writeText; // input from user  
        setScanModal(true);
        try {
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            const bytes = Ndef.encodeMessage([Ndef.textRecord(userInput)]);
            
            if (bytes) {
                await NfcManager.ndefHandler 
                    .writeNdefMessage(bytes); 
            }
            
        } catch (ex) {
          console.log(ex);
        } finally {
          setScanModal(false);
          NfcManager.cancelTechnologyRequest(); // stop scanning
        }
    }

    const cancelScan = () => {
        try {
            NfcManager.cancelTechnologyRequest();
        }
        finally{
            setScanModal(!scanModal);
        }
    }
    const writeOk = () => {
        setWriteModal(false);
        writeNdef();
    }

    const writeCancel = () => {
        setWriteModal(false);
    }

    const writeHelper = () => {
        setWriteText('');
        setWriteModal(true);
    }

    return (
        <SafeAreaView style={styles.centerContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={scanModal}
                onRequestClose={() => {
                    setScanModal(!scanModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Scan tag</Text>
                        <Pressable
                            style={styles.button}
                            onPress={() => cancelScan()}
                        >
                            <Text>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={readModal}
                onRequestClose={() => {
                    setReadModal(!readModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>{readText}</Text>
                        <Pressable
                            style={styles.button}
                            onPress={() => setReadModal(false)}
                        >
                            <Text>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={writeModal}
                onRequestClose={() => {
                    setWriteModal(!writeModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            onChangeText={setWriteText}
                            value={writeText}
                            placeholder="Write your text here"
                        />
                        <Pressable
                            style={styles.button}
                            onPress={() => writeOk()}
                        >
                            <Text>OK</Text>
                        </Pressable>
                        <Pressable
                            style={styles.button}
                            onPress={() => writeCancel()}
                        >
                            <Text>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>


            <View style={styles.button}>
                <TouchableOpacity onPress={readNdef}>
                    <Text>Read from Tag</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={writeHelper}>
                    <Text>Write to Tag</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default NfcScreen;
