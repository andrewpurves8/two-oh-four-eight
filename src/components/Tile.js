import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Colors from "./Colors";

function Tile(props) {
  let bgColor = Colors.blankTile;

  if (props.value !== 0) {
    const valueLog = Math.log2(props.value);
    bgColor = Colors.tileColors[valueLog - 1];
  }

  const textColor = props.value > 4 ? Colors.lightText : Colors.darkText;

  return (
    <View style={[styles.tile, { backgroundColor: bgColor }]}>
      <Text style={[styles.text, { color: textColor }]}>
        {props.value === 0 ? "" : props.value}
      </Text>
    </View>
  );
}

export default Tile;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  tile: {
    alignItems: "center",
    borderRadius: 5,
    height: "100%",
    justifyContent: "center",
    width: "22%",
  },
});
