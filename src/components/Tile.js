import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Colors from "./Colors";

function Tile(props) {
  return (
    <View style={styles.tile}>
      <Text style={styles.text}>{props.value === 0 ? "" : props.value}</Text>
    </View>
  );
}

export default Tile;

const styles = StyleSheet.create({
  text: {
    color: Colors.charcoal,
    fontSize: 30,
    fontWeight: "bold",
  },
  tile: {
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
    borderRadius: 5,
    height: "100%",
    justifyContent: "center",
    width: "22%",
  },
});
