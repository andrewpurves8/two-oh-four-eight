import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

import Colors from "../components/Colors";
import Tile from "../components/Tile";

import _ from "lodash";

class MainScreen extends Component {
  state = {
    gameLost: false,
    gameWon: false,
    values: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  };

  constructor(props) {
    super(props);
    let newValues = this.state.values;

    for (let i = 0; i < 2; i++) this.addTile(newValues);

    let newState = this.state;
    newState.values = newValues;
    this.state = newState;
  }

  checkGameLost(values) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (values[i][j] === 0 || values[i][j] === values[i][j + 1])
          return false;
      }

      if (values[i][3] === 0) return false;
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (values[j][i] === 0 || values[j][i] === values[j + 1][i])
          return false;
      }

      if (values[3][i] === 0) return false;
    }

    return true;
  }

  checkGameWon(values) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (values[i][j] === 2048) return true;
      }
    }
    return false;
  }

  addTile(values) {
    let index;
    let row;
    let col;

    do {
      index = Math.floor(Math.random() * 16);
      row = Math.floor(index / 4);
      col = index % 4;
    } while (values[row][col] != 0);

    values[row][col] = Math.floor(Math.random() * 2 + 1) * 2;
  }

  postUpdate(newValues, oldValues) {
    if (JSON.stringify(newValues) != JSON.stringify(oldValues)) {
      this.checkGameWon(newValues);
      this.addTile(newValues);
      this.checkGameLost(newValues);

      let newState = this.state;
      newState.values = newValues;

      this.setState(newState);
    }
  }

  onSwipeUp(gestureState) {
    let newValues = _.cloneDeep(this.state.values);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        this.shiftUp(newValues, i);
        if (newValues[j][i] === newValues[j + 1][i]) {
          newValues[j][i] *= 2;
          newValues[j + 1][i] = 0;
        }
      }
    }

    this.postUpdate(newValues, this.state.values);
  }

  onSwipeDown(gestureState) {
    let newValues = _.cloneDeep(this.state.values);
    for (let i = 0; i < 4; i++) {
      for (let j = 3; j > 0; j--) {
        this.shiftDown(newValues, i);
        if (newValues[j][i] === newValues[j - 1][i]) {
          newValues[j][i] *= 2;
          newValues[j - 1][i] = 0;
        }
      }
    }

    this.postUpdate(newValues, this.state.values);
  }

  onSwipeLeft(gestureState) {
    let newValues = _.cloneDeep(this.state.values);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        this.shiftLeft(newValues, i);
        if (newValues[i][j] === newValues[i][j + 1]) {
          newValues[i][j] *= 2;
          newValues[i][j + 1] = 0;
        }
      }
    }

    this.postUpdate(newValues, this.state.values);
  }

  onSwipeRight(gestureState) {
    let newValues = _.cloneDeep(this.state.values);
    for (let i = 0; i < 4; i++) {
      for (let j = 3; j > 0; j--) {
        this.shiftRight(newValues, i);
        if (newValues[i][j] === newValues[i][j - 1]) {
          newValues[i][j] *= 2;
          newValues[i][j - 1] = 0;
        }
      }
    }

    this.postUpdate(newValues, this.state.values);
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

  render() {
    const config = {
      // velocityThreshold: 0.3,
      velocityThreshold: 0.1,
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
    backgroundColor: Colors.screenBackGround,
    flex: 1,
    justifyContent: "center",
  },
  gameArea: {
    alignItems: "stretch",
    aspectRatio: 1,
    backgroundColor: Colors.gameBackGround,
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
