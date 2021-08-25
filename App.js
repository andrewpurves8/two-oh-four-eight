import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.gameArea}>
        <View style={styles.row}>
          <View styles={styles.tile}>
            <Text>asdasd</Text>
          </View>
          <View styles={styles.tile}>
            <Text>zxczxc</Text>
          </View>
          <View styles={styles.tile}>
            <Text>dfgdfgdf</Text>
          </View>
          <View styles={styles.tile}>
            <Text>dfgdsf</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View styles={styles.tile}>
            <Text>asdasd</Text>
          </View>
          <View styles={styles.tile}>
            <Text>zxczxc</Text>
          </View>
          <View styles={styles.tile}>
            <Text>dfgdfgdf</Text>
          </View>
          <View styles={styles.tile}>
            <Text>dfgdsf</Text>
          </View>
        </View>
        <View style={styles.row}></View>
        <View style={styles.row}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gameArea: {
    backgroundColor: "#a9a9a9",
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "90%",
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    backgroundColor: "#a9a9a9",
    alignItems: "stretch",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  tile: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
