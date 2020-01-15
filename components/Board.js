import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Button} from 'react-native';
import Cell from './Cell';
const GRID_LENGTH = 3;
class Board extends Component {
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

  getColumns() {
    return this.state.grid.map((row, index) => {
      return (
        <View style={styles.rowStyle} key={index}>
          {this.getRow(row, index)}
        </View>
      );
    });
  }

  getRow(row, colIdx) {
    return row.map((item, index) => {
      return this.getBox(index, colIdx, index);
    });
  }
  getBox(index, colIdx, rowIdx) {
    return (
      <Cell
        grid={this.state.grid}
        colIdx={colIdx}
        rowIdx={rowIdx}
        index={index}
        key={index}
        onPress={() => this.handleClick(colIdx, rowIdx)}></Cell>
    );
  }
  handleClick(colIdx, rowIdx) {
    if (!this.state.isTie && !this.state.isWin) {
      const tempGrid = [...this.state.grid];
      if (this.state.isX) {
        tempGrid[colIdx][rowIdx] = 1;
        this.setState({isX: false});
      } else {
        tempGrid[colIdx][rowIdx] = 2;
        this.setState({isX: true});
      }
      this.setState({grid: tempGrid});
      this.findWinner();
    }
  }
  findWinner() {
    this.setState({counterX: 0});
    let con = 0;
    let grid = this.state.grid;
    for (let i = 0; i < GRID_LENGTH; i++) {
      for (let j = 0; j < GRID_LENGTH; j++) {
        if (grid[i][j] === 0) {
          con = con + 1;
        }
      }
    }
    this.setState({counterX: con});
    for (let j = 0; j < GRID_LENGTH; j++) {
      for (let i = 0; i < GRID_LENGTH; i++) {
        //vertical
        if (
          (grid[j][i] !== 0 &&
            grid[j][i] !== 0 &&
            grid[j][i] !== 0 &&
            grid[j][i] === grid[j][i + 1] &&
            grid[j][i] === grid[j][i + 2] &&
            grid[j][i + 1] === grid[j][i + 2]) ||
          (grid[i][j] !== 0 &&
            grid[i][j] !== 0 &&
            grid[i][j] !== 0 &&
            grid[i][j] === grid[i][j + 1] &&
            grid[i][j] === grid[i][j + 2] &&
            grid[i][j + 1] === grid[i][j + 2]) ||
          (grid[i][i] !== 0 &&
            grid[i][j] !== 0 &&
            grid[j][j] !== 0 &&
            grid[i][i] === grid[i][j] &&
            grid[i][i] === grid[j][j] &&
            grid[i][j] === grid[j][j])
        ) {
          this.setState({isWin: true});
        } else {
          this.setState({isWin: false});
        }
      }
    }
    // if (
    //   (grid[0][0] !== 0 &&
    //     grid[0][1] !== 0 &&
    //     grid[0][2] !== 0 &&
    //     grid[0][0] === grid[0][1] &&
    //     grid[0][0] === grid[0][2] &&
    //     grid[0][1] === grid[0][2]) ||
    //   (grid[1][0] !== 0 &&
    //     grid[1][1] !== 0 &&
    //     grid[1][2] !== 0 &&
    //     grid[1][0] === grid[1][1] &&
    //     grid[1][0] === grid[1][2]) ||
    //   (grid[2][0] !== 0 &&
    //     grid[2][1] !== 0 &&
    //     grid[2][2] !== 0 &&
    //     grid[2][0] === grid[2][1] &&
    //     grid[2][0] === grid[2][2]) ||
    //   (grid[0][0] !== 0 &&
    //     grid[1][0] !== 0 &&
    //     grid[2][0] !== 0 &&
    //     grid[0][0] === grid[1][0] &&
    //     grid[0][0] === grid[2][0]) ||
    //   (grid[0][1] !== 0 &&
    //     grid[1][1] !== 0 &&
    //     grid[2][1] !== 0 &&
    //     grid[0][1] === grid[1][1] &&
    //     grid[0][1] === grid[2][1]) ||
    //   (grid[0][2] !== 0 &&
    //     grid[1][2] !== 0 &&
    //     grid[2][2] !== 0 &&
    //     grid[0][2] === grid[1][2] &&
    //     grid[0][2] === grid[2][2]) ||
    //   (grid[0][0] !== 0 &&
    //     grid[1][1] !== 0 &&
    //     grid[2][2] !== 0 &&
    //     grid[0][0] === grid[1][1] &&
    //     grid[0][0] === grid[2][2] &&
    //     grid[1][1] === grid[2][2]) ||
    //   (grid[2][0] !== 0 &&
    //     grid[1][1] !== 0 &&
    //     grid[0][2] !== 0 &&
    //     grid[0][2] === grid[1][1] &&
    //     grid[0][2] === grid[2][0] &&
    //     grid[1][1] === grid[2][0])
    // ) {
    //   this.setState({isWin: true});
    // } else {
    //   this.setState({isWin: false});
    // }
  }
  render() {
    let textWin = this.state.isX ? 'Player X Turn' : 'Player O Turn';
    let textTie = this.state.isTie ? 'Tie' : textWin;
    if (this.state.isWin) {
      textWin = !this.state.isX ? 'Player X wins' : 'Player O wins';
    } else if (this.state.isTie) {
      textWin = textTie;
    }
    return (
      <ScrollView>
        <View style={{marginBottom: 20}}>
          <Text>{textWin}</Text>
          <Button
            title="Restart"
            onPress={() => this.initializeGrid()}></Button>
        </View>
        <View>{this.getColumns()}</View>
      </ScrollView>
    );
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

export default Board;
