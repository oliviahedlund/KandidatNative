import { StyleSheet } from "react-native";

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
    color: "#525252",
    fontSize: 55,
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
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginTop: "5%",
    marginLeft: "85%",
    height: 52,
    width: 40,
    padding: 1.5,
    borderRadius: 10,
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
});

export default styles;
