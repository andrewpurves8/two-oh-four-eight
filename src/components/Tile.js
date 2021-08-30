import React, { Component, useEffect, useRef } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";

import Colors from "./Colors";

function AnimView(props) {
  const slideAnimation = new Animated.Value(0);
  const fadeInAnimation = new Animated.Value(0);

  Animated.sequence([
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }),
    Animated.timing(fadeInAnimation, {
      toValue: 1,
      duration: 75,
      useNativeDriver: true,
    }),
  ]).start();

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: props.isNew ? fadeInAnimation : 1,
        transform: [
          {
            translateX: slideAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [
                77 * props.oldCol + 8.4 * (props.oldCol + 1),
                77 * props.col + 8.4 * (props.col + 1),
              ],
            }),
          },
          {
            translateY: slideAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [
                77 * props.oldRow + 8.4 * (props.oldRow + 1),
                77 * props.row + 8.4 * (props.row + 1),
              ],
            }),
          },
        ],
      }}
    >
      {props.children}
    </Animated.View>
  );
}

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
    <AnimView
      style={{ ...styles.tile, backgroundColor: bgColor }}
      oldRow={oldRow}
      row={row}
      oldCol={oldCol}
      col={col}
      value={value}
      isNew={isNew}
    >
      <Text style={{ ...styles.text, color: textColor }}>{value}</Text>
    </AnimView>
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
