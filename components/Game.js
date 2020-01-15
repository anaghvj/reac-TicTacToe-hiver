import React, {useState, useEffect, Component} from 'react';
import {Text, StyleSheet, View, Button, Group, ScrollView} from 'react-native';
import Cell from './Cell';
import Board from './Board';

const GRID_LENGTH = 3;
let turn = 'X';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      isX: true,
      counterX: -1,
      isWin: false,
      isTie: false,
    };
  }
  componentDidMount() {
    this.initializeGrid();
  }

  initializeGrid() {
    this.setState({isX: true, isTie: false, isWin: false, counterX: -1});

    const tempGrid = [];
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
      const tempArray = [];
      for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
        tempArray.push(0);
      }
      tempGrid.push(tempArray);
    }
    this.setState({grid: tempGrid});
  }

  renderMainGrid() {
    return (
      <View style={{display: 'flex', justifyContent: 'center'}}>
        <Board style={styles.columnsStyle} size={GRID_LENGTH}></Board>
      </View>
    );
  }

  render() {
    return this.renderMainGrid();
  }
}

const styles = StyleSheet.create({
  columnsStyle: {
    flexDirection: 'column',
    height: 300,
    width: 100,
  },
  rowStyle: {
    flexDirection: 'row',
    height: 100,
    width: 300,
  },
  boxStyle: {
    height: 100,
    width: 100,
  },
  textcontent: {
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    height: 100,
    width: 100,
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default Game;
