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
    const [cancelWrite, setCancelWrite] = useState(false);

    async function readNdef() {
        setScanModal(true);
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
                
                }
                parsed = ndefRecords.map(decodeNdefRecord);
                console.warn(parsed[0]);
                setReadText(parsed[0]);

            }
        } catch (ex) {
            //console.warn('Oops!', ex);
            setReadText('Could not read nfc message');
        } finally {
            setScanModal(false);
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();

            // visa läst meddelande
            setReadModal(true);
        }
    
    }

    
    async function writeNdef() {
        // ta input från användare    
        const userInput = writeModal;

        let result = false;
        setScanModal(true);
        try {
           // STEP 1
            await NfcManager.requestTechnology(NfcTech.Ndef);

            const bytes = Ndef.encodeMessage([Ndef.textRecord(userInput)]);
            
            if (bytes) {
                await NfcManager.ndefHandler // STEP 2
                    .writeNdefMessage(bytes); // STEP 3
                result = true;
            }
            
        } catch (ex) {
          //console.warn(ex);
        } finally {
          setScanModal(false);
          // STEP 4
          NfcManager.cancelTechnologyRequest();
        }
      
        return result;
    }

    function cancelScan(){
        try {
            NfcManager.cancelTechnologyRequest();
        }
        finally{
            setScanModal(!scanModal);
        }
    }
    function writeOk(){
        setWriteModal(false);
        writeNdef();
    }

    function writeCancel(){
        setWriteModal(false);
    }

    function writeHelper(){
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
                        <Text style={styles.modalText}>Scan tag</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => cancelScan()}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
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
                        <Text style={styles.modalText}>{readText}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setReadModal(false)}
                        >
                            <Text style={styles.textStyle}>OK</Text>
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
                            style={styles.input}
                            onChangeText={setWriteText}
                            value={writeText}
                            placeholder="Write your text here"
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => writeOk()}
                        >
                            <Text style={styles.textStyle}>OK</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => writeCancel()}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
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

