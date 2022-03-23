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
  Dimensions,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/styles";

let camera: Camera;

const CameraScreen = ({ navigation }) => {
  const [startCamera, setStartCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [preview, setPreview] = useState(false);
  const [image, setImage] = useState(null);
  const [mirrorImage, setMirrorImage] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [ratio, setRatio] = useState("4:3"); // default is 4:3
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);
  const [imagePadding, setImagePadding] = useState(0);

  useEffect(() => {
    initCamera();
  }, []);

  const prepareRatio = async () => {
    let desiredRatio = "4:3"; // Start with the system default
    // This issue only affects Android
    if (Platform.OS === "android") {
      const ratios = await camera.getSupportedRatiosAsync();
      console.log(ratios);
      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      // set the preview padding and preview ratio
      setImagePadding(remainder);
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  const initCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  const takePicture = async () => {
    const photo: any = await camera.takePictureAsync();
    console.log(photo);
    setPreview(true);
    setImage(photo);
  };

  const savePicture = () => {};

  const retakeImage = () => {
    setImage(null);
    setPreview(false);
    initCamera();
  };

  const flipCamera = () => {
    if (cameraType === "back") {
      setCameraType("front");
      setMirrorImage(true);
    } else {
      setCameraType("back");
      setMirrorImage(false);
    }
  };
  return (
    <View style={styles.container}>
      {startCamera ? (
        <View style={styles.cameraContainer}>
          {preview && image ? (
            <CameraPreview
              photo={image}
              savePhoto={savePicture}
              retakePicture={retakeImage}
              mirrorImage={mirrorImage}
            />
          ) : (
            <Camera
              type={cameraType}
              style={styles.flexStyle}
              onCameraReady={setCameraReady}
              ratio={ratios}
              ref={(r) => {
                camera = r;
              }}
            >
              <View style={styles.cameraContainer}>
                <TouchableOpacity onPress={flipCamera} style={styles.flipBtn}>
                  <Text style={styles.buttonTextFlipBtn}>⥂</Text>
                </TouchableOpacity>

                <View style={styles.bottomCameraContainer}>
                  <View style={styles.alignCenter}>
                    <TouchableOpacity
                      onPress={takePicture}
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

const CameraPreview = ({
  photo,
  retakePicture,
  savePhoto,
  mirrorImage,
}: any) => {
  console.log("picture object: ", photo);
  return (
    <View style={styles.imageContainer}>
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={
          mirrorImage ? { flex: 1, transform: [{ scaleX: -1 }] } : { flex: 1 }
        }
      >
        <View style={styles.bottomCameraContainer}>
          <View style={styles.alignCenter}>
            <TouchableOpacity onPress={retakePicture}>
              <Ionicons
                name="close"
                size={60}
                color="white"
                style={styles.shadow}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CameraScreen;
