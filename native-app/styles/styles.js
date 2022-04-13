import { StyleSheet } from "react-native";
import { Platform } from "react-native";
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 1,
    elevation: 3,
    backgroundColor: "#e5e4df",
    margin: 10,
  },

  buttonText: {
    color: "#000",
  },

  buttonTextFlipBtn: {
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    paddingLeft: Platform.OS === "ios" ? 20 : 10,
    color: "#fff",
    fontSize: Platform.OS === "ios" ? 55 : 40,
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },

  h1: {
    fontSize: 40,
    paddingTop: 40,
    paddingBottom: 80,
  },

  h3: {
    fontSize: 16,
    textAlign: "center",
  },

  innerContainer: {
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffff",
    alignItems: "center",
  },

  centerContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  navBar: {
    backgroundColor: "#e5e4df",
  },

  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },

  cameraContainer: {
    flex: 1,
    width: "100%",
  },

  flexStyle: {
    flex: 1,
  },

  flipBtn: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginTop: "5%",
    marginLeft: "85%",
    height: 40,
    width: 40,
    borderRadius: 10,
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },

  bottomCameraContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
  },

  shadow: {
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },

  alignCenter: {
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
  },

  snapBtn: {
    width: 70,
    height: 70,
    bottom: 0,
    backgroundColor: "#fff",
    borderRadius: 100,
    alignSelf: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#525252",
  },

  imageContainer: {
    backgroundColor: "transparent",
    flex: 1,
    width: "100%",
    height: "100%",
  },

  flipimage: {
    flex: 1,
    transform: [{ scaleX: -1 }],
  },
});

export default styles;
