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
    nonZeroTiles: [],
  };

  constructor(props) {
    super(props);
    let newValues = this.state.values;
    let newNonZeroTiles = this.state.nonZeroTiles;

    for (let i = 0; i < 2; i++) this.addTile(newValues, newNonZeroTiles);
  }

  addTile(values, nonZeroTiles) {
    let index;
    let row;
    let col;
    do {
      index = Math.floor(Math.random() * 16);
      row = Math.floor(index / 4);
      col = index % 4;
    } while (values[row][col] != 0);

    const value = Math.floor(Math.random() * 2 + 1) * 2;
    values[row][col] = value;
    const tile = {
      index: 4 * row + col,
      row: row,
      col: col,
      value: value,
      newRow: row,
      newCol: col,
      isNew: true,
    };
    nonZeroTiles.push(tile);
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

  postUpdate(newValues, oldValues, nonZeroTiles) {
    if (JSON.stringify(newValues) != JSON.stringify(oldValues)) {
      this.checkGameWon(newValues);
      this.addTile(newValues, nonZeroTiles);
      this.checkGameLost(newValues);
      this.setState({
        ...this.state,
        values: newValues,
        nonZeroTiles: nonZeroTiles,
      });
    }
  }

  onSwipeUp(gestureState) {
    // let newValues = _.cloneDeep(this.state.values);
    // for (let i = 0; i < 4; i++) {
    //   for (let j = 0; j < 3; j++) {
    //     this.shiftUp(newValues, i);
    //     if (newValues[j][i] === newValues[j + 1][i]) {
    //       newValues[j][i] *= 2;
    //       newValues[j + 1][i] = 0;
    //     }
    //   }
    // }
    // this.postUpdate(newValues, this.state.values);

    let newValues = _.cloneDeep(this.state.values);
    let newNonZeroTiles = _.cloneDeep(this.state.nonZeroTiles);

    for (let i = 0; i < newNonZeroTiles.length; i++) {
      let tile = newNonZeroTiles[i];
      tile.row = tile.newRow;
      tile.col = tile.newCol;
      tile.isNew = false;
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        this.shiftUp(newValues, i, newNonZeroTiles);
        if (newValues[j][i] !== 0 && newValues[j][i] === newValues[j + 1][i]) {
          newValues[j][i] *= 2;
          newValues[j + 1][i] = 0;
          let topTile, bottomTile;
          for (let k = 0; k < newNonZeroTiles.length; k++) {
            if (newNonZeroTiles[k].index === 4 * (j + 1) + i) {
              bottomTile = newNonZeroTiles[k];
            } else if (newNonZeroTiles[k].index === 4 * j + i) {
              topTile = newNonZeroTiles[k];
            }
          }
          if (typeof bottomTile != "undefined") {
            bottomTile.index = 4 * i + j;
            bottomTile.value *= 2;
            bottomTile.newRow = j;
          }
          const topTileIndex = newNonZeroTiles.indexOf(topTile);
          if (topTileIndex > -1) newNonZeroTiles.splice(topTileIndex, 1);
        }
      }
    }
    this.postUpdate(newValues, this.state.values, newNonZeroTiles);
  }

  onSwipeDown(gestureState) {
    // let newValues = _.cloneDeep(this.state.values);
    // for (let i = 0; i < 4; i++) {
    //   for (let j = 3; j > 0; j--) {
    //     this.shiftDown(newValues, i);
    //     if (newValues[j][i] === newValues[j - 1][i]) {
    //       newValues[j][i] *= 2;
    //       newValues[j - 1][i] = 0;
    //     }
    //   }
    // }
    // this.postUpdate(newValues, this.state.values);

    let newValues = _.cloneDeep(this.state.values);
    let newNonZeroTiles = _.cloneDeep(this.state.nonZeroTiles);

    for (let i = 0; i < newNonZeroTiles.length; i++) {
      let tile = newNonZeroTiles[i];
      tile.row = tile.newRow;
      tile.col = tile.newCol;
      tile.isNew = false;
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 3; j > 0; j--) {
        this.shiftDown(newValues, i, newNonZeroTiles);
        if (newValues[j][i] !== 0 && newValues[j][i] === newValues[j - 1][i]) {
          newValues[j][i] *= 2;
          newValues[j - 1][i] = 0;
          let topTile, bottomTile;
          for (let k = 0; k < newNonZeroTiles.length; k++) {
            if (newNonZeroTiles[k].index === 4 * (j - 1) + i) {
              topTile = newNonZeroTiles[k];
            } else if (newNonZeroTiles[k].index === 4 * j + i) {
              bottomTile = newNonZeroTiles[k];
            }
          }
          if (typeof topTile != "undefined") {
            topTile.index = 4 * j + i;
            topTile.value *= 2;
            topTile.newRow = j;
          }
          const bottomTileIndex = newNonZeroTiles.indexOf(bottomTile);
          if (bottomTileIndex > -1) newNonZeroTiles.splice(bottomTileIndex, 1);
        }
      }
    }
    this.postUpdate(newValues, this.state.values, newNonZeroTiles);
  }

  onSwipeLeft(gestureState) {
    // let newValues = _.cloneDeep(this.state.values);
    // for (let i = 0; i < 4; i++) {
    //   for (let j = 0; j < 3; j++) {
    //     this.shiftLeft(newValues, i);
    //     if (newValues[i][j] === newValues[i][j + 1]) {
    //       newValues[i][j] *= 2;
    //       newValues[i][j + 1] = 0;
    //     }
    //   }
    // }
    // this.postUpdate(newValues, this.state.values);

    let newValues = _.cloneDeep(this.state.values);
    let newNonZeroTiles = _.cloneDeep(this.state.nonZeroTiles);

    for (let i = 0; i < newNonZeroTiles.length; i++) {
      let tile = newNonZeroTiles[i];
      tile.row = tile.newRow;
      tile.col = tile.newCol;
      tile.isNew = false;
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        this.shiftLeft(newValues, i, newNonZeroTiles);
        if (newValues[i][j] !== 0 && newValues[i][j] === newValues[i][j + 1]) {
          newValues[i][j] *= 2;
          newValues[i][j + 1] = 0;
          let leftTile, rightTile;
          for (let k = 0; k < newNonZeroTiles.length; k++) {
            if (newNonZeroTiles[k].index === 4 * i + j + 1) {
              rightTile = newNonZeroTiles[k];
            } else if (newNonZeroTiles[k].index === 4 * i + j) {
              leftTile = newNonZeroTiles[k];
            }
          }
          if (typeof rightTile != "undefined") {
            rightTile.index = 4 * i + j;
            rightTile.value *= 2;
            rightTile.newCol = j;
          }
          const leftTileIndex = newNonZeroTiles.indexOf(leftTile);
          if (leftTileIndex > -1) newNonZeroTiles.splice(leftTileIndex, 1);
        }
      }
    }
    this.postUpdate(newValues, this.state.values, newNonZeroTiles);
  }

  onSwipeRight(gestureState) {
    let newValues = _.cloneDeep(this.state.values);
    let newNonZeroTiles = _.cloneDeep(this.state.nonZeroTiles);

    for (let i = 0; i < newNonZeroTiles.length; i++) {
      let tile = newNonZeroTiles[i];
      tile.row = tile.newRow;
      tile.col = tile.newCol;
      tile.isNew = false;
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 3; j > 0; j--) {
        this.shiftRight(newValues, i, newNonZeroTiles);
        if (newValues[i][j] !== 0 && newValues[i][j] === newValues[i][j - 1]) {
          newValues[i][j] *= 2;
          newValues[i][j - 1] = 0;
          let leftTile, rightTile;
          for (let k = 0; k < newNonZeroTiles.length; k++) {
            if (newNonZeroTiles[k].index === 4 * i + j - 1) {
              leftTile = newNonZeroTiles[k];
            } else if (newNonZeroTiles[k].index === 4 * i + j) {
              rightTile = newNonZeroTiles[k];
            }
          }
          if (typeof leftTile != "undefined") {
            leftTile.index = 4 * i + j;
            leftTile.value *= 2;
            leftTile.newCol = j;
          }
          const rightTileIndex = newNonZeroTiles.indexOf(rightTile);
          if (rightTileIndex > -1) newNonZeroTiles.splice(rightTileIndex, 1);
        }
      }
    }
    this.postUpdate(newValues, this.state.values, newNonZeroTiles);
  }

  shiftUp(values, column, nonZeroTiles) {
    for (let i = 0; i < 3; i++) {
      if (values[i][column] != 0) continue;

      let j = 1;
      while (j < 3 - i && values[i + j][column] == 0) j++;

      if (values[i + j][column] != 0) {
        let tile;
        for (let k = 0; k < nonZeroTiles.length; k++) {
          if (nonZeroTiles[k].index === 4 * (i + j) + column) {
            tile = nonZeroTiles[k];
            break;
          }
        }
        if (typeof tile != "undefined") {
          tile.newRow = i;
          tile.index = 4 * i + column;
          values[i][column] = values[i + j][column];
          values[i + j][column] = 0;
        }
      }
    }
  }

  shiftDown(values, column, nonZeroTiles) {
    for (let i = 3; i > 0; i--) {
      if (values[i][column] != 0) continue;

      let j = 1;
      while (j < i && values[i - j][column] == 0) j++;

      if (values[i - j][column] != 0) {
        let tile;
        for (let k = 0; k < nonZeroTiles.length; k++) {
          if (nonZeroTiles[k].index === 4 * (i - j) + column) {
            tile = nonZeroTiles[k];
            break;
          }
        }
        if (typeof tile != "undefined") {
          tile.newRow = i;
          tile.index = 4 * i + column;
          values[i][column] = values[i - j][column];
          values[i - j][column] = 0;
        }
      }
    }
  }

  shiftLeft(values, row, nonZeroTiles) {
    for (let i = 0; i < 3; i++) {
      if (values[row][i] != 0) continue;

      let j = 1;
      while (j < 3 - i && values[row][i + j] == 0) j++;

      if (values[row][i + j] != 0) {
        let tile;
        for (let k = 0; k < nonZeroTiles.length; k++) {
          if (nonZeroTiles[k].index === 4 * row + i + j) {
            tile = nonZeroTiles[k];
            break;
          }
        }
        if (typeof tile != "undefined") {
          tile.newCol = i;
          tile.index = 4 * row + i;
          values[row][i] = values[row][i + j];
          values[row][i + j] = 0;
        }
      }
    }
  }

  shiftRight(values, row, nonZeroTiles) {
    for (let i = 3; i > 0; i--) {
      if (values[row][i] != 0) continue;

      let j = 1;
      while (j < i && values[row][i - j] == 0) j++;

      if (values[row][i - j] != 0) {
        let tile;
        for (let k = 0; k < nonZeroTiles.length; k++) {
          if (nonZeroTiles[k].index === 4 * row + i - j) {
            tile = nonZeroTiles[k];
            break;
          }
        }
        if (typeof tile != "undefined") {
          tile.newCol = i;
          tile.index = 4 * row + i;
          values[row][i] = values[row][i - j];
          values[row][i - j] = 0;
        }
      }
    }
  }

  render() {
    const config = {
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
    let tiles = [];

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        tiles.push(<Tile value={0} key={4 * i + j} row={i} col={j} />);
      }
    }

    for (let i = 0; i < this.state.nonZeroTiles.length; i++) {
      const tile = this.state.nonZeroTiles[i];
      tiles.push(
        <Tile
          value={tile.value}
          row={tile.row}
          col={tile.col}
          newRow={tile.newRow}
          newCol={tile.newCol}
          isNew={tile.isNew}
          key={16 + tile.index}
        />
      );
    }

    return tiles;
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
    aspectRatio: 1,
    backgroundColor: Colors.gameBackGround,
    borderRadius: 5,
    width: 350,
  },
  gestureRecognizer: {
    height: "100%",
    width: "100%",
  },
});
