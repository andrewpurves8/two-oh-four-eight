import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

import Colors from "../components/Colors";
import Tile from "../components/Tile";

class MainScreen extends Component {
  state = {
    values: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  };

  constructor(props) {
    super(props);
    const newValues = this.state.values;

    for (let i = 0; i < 2; i++) {
      let index = Math.floor(Math.random() * 16);
      let row = Math.floor(index / 4);
      let col = index % 4;

      console.log(index);
      console.log(row);
      console.log(col);
      while (newValues[row][col] != 0) {
        index = Math.floor(Math.random() * 16);
        row = Math.floor(index / 4);
        col = index % 4;
      }

      newValues[row][col] = Math.floor(Math.random() * 2 + 1) * 2;
    }

    let newState = this.state;
    newState.values = newValues;
    this.state = newState;
  }

  shiftUp(values, column) {
    for (let i = 0; i < 3; i++) {
      if (values[i][column] != 0) continue;

      let j = 1;
      while (j < 3 - i && values[i + j][column] == 0) j++;

      if (values[i + j][column] != 0) {
        values[i][column] = values[i + j][column];
        values[i + j][column] = 0;
      }
    }
  }

  onSwipeUp(gestureState) {
    const newValues = this.state.values;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        this.shiftUp(newValues, i);
        if (newValues[j][i] === newValues[j + 1][i]) {
          newValues[j][i] *= 2;
          newValues[j + 1][i] = 0;
        }
      }
    }

    let newState = this.state;
    newState.values = newValues;

    this.setState(newState);
  }

  shiftDown(values, column) {
    for (let i = 3; i > 0; i--) {
      if (values[i][column] != 0) continue;

      let j = 1;
      while (j < i && values[i - j][column] == 0) j++;

      if (values[i - j][column] != 0) {
        values[i][column] = values[i - j][column];
        values[i - j][column] = 0;
      }
    }
  }

  onSwipeDown(gestureState) {
    const newValues = this.state.values;
    for (let i = 0; i < 4; i++) {
      for (let j = 3; j > 0; j--) {
        this.shiftDown(newValues, i);
        if (newValues[j][i] === newValues[j - 1][i]) {
          newValues[j][i] *= 2;
          newValues[j - 1][i] = 0;
        }
      }
    }

    let newState = this.state;
    newState.values = newValues;

    this.setState(newState);
  }

  shiftLeft(values, row) {
    for (let i = 0; i < 3; i++) {
      if (values[row][i] != 0) continue;

      let j = 1;
      while (j < 3 - i && values[row][i + j] == 0) j++;

      if (values[row][i + j] != 0) {
        values[row][i] = values[row][i + j];
        values[row][i + j] = 0;
      }
    }
  }

  onSwipeLeft(gestureState) {
    const newValues = this.state.values;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        this.shiftLeft(newValues, i);
        if (newValues[i][j] === newValues[i][j + 1]) {
          newValues[i][j] *= 2;
          newValues[i][j + 1] = 0;
        }
      }
    }

    let newState = this.state;
    newState.values = newValues;

    this.setState(newState);
  }

  shiftRight(values, row) {
    for (let i = 3; i > 0; i--) {
      if (values[row][i] != 0) continue;

      let j = 1;
      while (j < i && values[row][i - j] == 0) j++;

      if (values[row][i - j] != 0) {
        values[row][i] = values[row][i - j];
        values[row][i - j] = 0;
      }
    }
  }

  onSwipeRight(gestureState) {
    let newValues = this.state.values;
    for (let i = 0; i < 4; i++) {
      for (let j = 3; j > 0; j--) {
        this.shiftRight(newValues, i);
        if (newValues[i][j] === newValues[i][j - 1]) {
          newValues[i][j] *= 2;
          newValues[i][j - 1] = 0;
        }
      }
    }

    let newState = this.state;
    newState.values = newValues;

    this.setState(newState);
  }

  render() {
    const config = {
      velocityThreshold: 0.05,
      directionalOffsetThreshold: 80,
    };

    return (
      <GestureRecognizer
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
        tiles.push(<Tile value={this.state.values[i][j]} key={4 * i + j} />);
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
    backgroundColor: Colors.darkGrey,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "90%",
  },
  gestureRecognizer: {
    height: "100%",
    width: "100%",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    height: "22%",
    justifyContent: "space-evenly",
  },
});
