import React from "react";
import { StyleSheet, Text } from "react-native";

import AnimatedViewTile from "./AnimatedViewTile";
import Colors from "./Colors";

function Tile(props) {
  const value = props.value;
  const oldRow = props.row;
  const oldCol = props.col;
  const row = props.newRow;
  const col = props.newCol;
  const isNew = props.isNew;

  let bgColor = Colors.blankTile;

  const valueLog = Math.log2(value);
  bgColor = Colors.tileColors[valueLog - 1];

  const textColor = value > 4 ? Colors.lightText : Colors.darkText;

  return (
    <AnimatedViewTile
      style={{ ...styles.tile, backgroundColor: bgColor }}
      oldRow={oldRow}
      row={row}
      oldCol={oldCol}
      col={col}
      value={value}
      isNew={isNew}
    >
      <Text style={{ ...styles.text, color: textColor }}>{value}</Text>
    </AnimatedViewTile>
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
    height: 77,
    justifyContent: "center",
    position: "absolute",
    width: 77,
  },
});
