import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

class MainScreen extends Component {
  state = {
    values: [
      [0, 0, 0, 0],
      [0, 0, 0, 2],
      [0, 0, 0, 2],
      [0, 0, 2, 2],
    ],
  };

  constructor(props) {
    super(props);
  }

  onSwipeUp(gestureState) {
    console.log("You swiped up!");
  }

  onSwipeDown(gestureState) {
    console.log("You swiped down!");
  }

  onSwipeLeft(gestureState) {
    console.log("You swiped left!");
  }

  onSwipeRight(gestureState) {
    console.log("You swiped right!");
  }

  render() {
    const config = {
      velocityThreshold: 0.05,
      directionalOffsetThreshold: 80,
    };

    return (
      <GestureRecognizer
        // onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeUp={(state) => this.onSwipeUp(state)}
        onSwipeDown={(state) => this.onSwipeDown(state)}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        style={styles.gestureRecognizer}
      >
        <View style={styles.container}>
          <View style={styles.gameArea}>{this.createTiles()}</View>
        </View>
      </GestureRecognizer>
    );
  }

  createTiles() {
    let rows = [];

    for (let i = 0; i < 4; i++) {
      let tiles = [];

      for (let j = 0; j < 4; j++) {
        tiles.push(
          <View style={styles.tile} key={i * j}>
            <Text>{this.state.values[i][j]}</Text>
          </View>
        );
      }

      rows.push(
        <View style={styles.row} key={i + 16}>
          {tiles}
        </View>
      );
    }

    return rows;
  }
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  gameArea: {
    alignItems: "stretch",
    aspectRatio: 1,
    backgroundColor: "#808080",
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "90%",
  },
  gestureRecognizer: {
    // flex: 1,
    height: "100%",
    width: "100%",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    height: "23%",
    justifyContent: "space-evenly",
  },
  tile: {
    alignItems: "center",
    backgroundColor: "#a9a9a9",
    borderRadius: 5,
    height: "100%",
    justifyContent: "center",
    width: "23%",
  },
});
