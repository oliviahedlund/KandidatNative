import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Pressable,
  Alert,
  PermissionsAndroid,
} from "react-native";
import styles from "../../styles/styles";
import { BleManager } from "react-native-ble-plx";

export const manager = new BleManager();

const requestPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: "Request for Location Permission",
      message: "Bluetooth Scanner requires access to Fine Location Permission",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    }
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

const BluetoothScreen = () => {
  const [logData, setLogData] = useState([]);
  const [logCount, setLogCount] = useState(0);
  const [scannedDevices, setScannedDevices] = useState({});
  const [deviceCount, setDeviceCount] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const [scanBtn, setScanBtn] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    manager.onStateChange((state) => {
      const subscription = manager.onStateChange(async (state) => {
        console.log(state);
        const newLogData = logData;
        newLogData.push(state);
        await setLogCount(newLogData.length);
        await setLogData(newLogData);
        subscription.remove();
      }, true);
      return () => subscription.remove();
    });
  }, [manager]);

  const handleStopScanClick = () => {
    manager.stopDeviceScan();
    setIsClicked(false);
    setScanBtn(true);
  };

  const AlertNoBlt = () =>
    Alert.alert("Bluetooth is not activated", "Please turn on Bluetooth", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Turn on",
        onPress: async () => {
          const bltState = await manager.state();
          setIsEnabled((bltOn) => !bltOn);
          /*if (bltState === "Unsupported") {
            alert("Bluetooth is not supported");
            return false;
          }
          if (bltState !== "PoweredOn") {
            await manager.enable();
          }*/
          return true;
        },
      },
    ]);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ flex: 2, padding: 10 }}>
        <Text style={{ fontWeight: "bold" }}>
          Scanned Devices ({deviceCount})
        </Text>
        <FlatList
          data={Object.values(scannedDevices)}
          renderItem={({ item }) => {
            return <Text>{`${item.name} (${item.id})`}</Text>;
          }}
        />
        {scanBtn && (
          <Pressable
            style={styles.button}
            title="Scan"
            onPress={async () => {
              const bltState = await manager.state();
              if (bltState !== "PoweredOn") {
                AlertNoBlt();
                return false;
              }
              setScanBtn(false);
              setIsClicked(true);
              const permission = await requestPermission();
              if (permission) {
                manager.startDeviceScan(null, null, async (error, device) => {
                  if (error) {
                    console.log(error);
                    return;
                  }
                  if (device && device.name !== null) {
                    console.log(`${device.name}`);
                    const newScannedDevices = scannedDevices;
                    newScannedDevices[device.id] = device;
                    await setDeviceCount(Object.keys(newScannedDevices).length);
                    await setScannedDevices(scannedDevices);
                  }
                });
              }
              return true;
            }}
          >
            <Text style={styles.buttonText}>Scan Devices</Text>
          </Pressable>
        )}
        {isClicked && (
          <Pressable
            style={styles.button}
            title="Stop Scan"
            onPress={handleStopScanClick}
          >
            <Text style={styles.buttonText}>Stop Scan</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default BluetoothScreen;
