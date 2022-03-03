import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Storage,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  Button,
  Pressable,
} from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/styles";

let camera: Camera;

const CameraScreen = ({ navigation }) => {
  const [startCamera, setStartCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    __startCamera();
  }, []);

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  const __takePicture = async () => {
    const photo: any = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const __savePhoto = () => {};

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  const __switchCamera = () => {
    if (cameraType === "back") {
      setCameraType("front");
    } else {
      setCameraType("back");
    }
  };
  return (
    <View style={styles.container}>
      {startCamera ? (
        <View style={styles.cameraContainer}>
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              savePhoto={__savePhoto}
              retakePicture={__retakePicture}
            />
          ) : (
            <Camera
              type={cameraType}
              style={styles.flexStyle}
              ref={(r) => {
                camera = r;
              }}
            >
              <View style={styles.cameraContainer}>
                <TouchableOpacity
                  onPress={__switchCamera}
                  style={styles.flipBtn}
                >
                  <Text style={styles.buttonTextFlipBtn}>⥂</Text>
                </TouchableOpacity>

                <View style={styles.bottomCameraContainer}>
                  <View style={styles.alignCenter}>
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={styles.snapBtn}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : null}
      <StatusBar style="auto" />
    </View>
  );
};

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
  console.log("picture object: ", photo);
  return (
    <View style={styles.imageContainer}>
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={styles.flexStyle}
      >
        <View style={styles.bottomCameraContainer}>
          <View style={styles.alignCenter}>
            <TouchableOpacity onPress={retakePicture}>
              <Ionicons name="close" size={50} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CameraScreen;
