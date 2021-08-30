import React, { Component, useEffect, useRef } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";

import Colors from "./Colors";

function BlankTile(props) {
  return (
    <View
      style={{
        ...styles.blankTile,
        top: 77 * props.row + 8.4 * (props.row + 1),
        left: 77 * props.col + 8.4 * (props.col + 1),
      }}
    />
  );
}

export default BlankTile;

const styles = StyleSheet.create({
  blankTile: {
    alignItems: "center",
    backgroundColor: Colors.blankTile,
    borderRadius: 5,
    height: 77,
    justifyContent: "center",
    position: "absolute",
    width: 77,
  },
});
