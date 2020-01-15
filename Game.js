import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Button, Group} from 'react-native';

const GRID_LENGTH = 3;
let turn = 'X';

const Game = () => {
  const [counterX, setCounterX] = useState(0);
  const [grid, setGrid] = useState([]);
  const [isX, setIsX] = useState(true);
  const [isWin, setWin] = useState(false);
  const [isTie, setTie] = useState(false);
  const initializeGrid = () => {
    setCounterX(-1);
    setIsX(true);
    setWin(false);
    setTie(false);
    const tempGrid = [];
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
      const tempArray = [];
      for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
        tempArray.push(0);
      }
      tempGrid.push(tempArray);
    }
    setGrid(tempGrid);
  };

  const getBox = (index, colIdx, rowIdx) => {
    let backgroundColor = 'red';
    const sum = colIdx + rowIdx;
    if (sum % 2 === 0) {
      backgroundColor = 'blue';
    }
    const gridValue = grid[colIdx][rowIdx];
    let content = '';
    if (gridValue === 1) {
      content = 'X';
    } else if (gridValue === 2) {
      content = 'O';
    }

    return (
      <View key={index} styles={{...styles.boxStyle, backgroundColor}}>
        <Text
          style={styles.textcontent}
          onPress={() => {
            if (grid[colIdx][rowIdx] === 0) {
              handleClick(colIdx, rowIdx);
            } else {
              alert('Already Played ');
            }
          }}>
          {content}
        </Text>
      </View>
    );
  };

  const getRow = (row, colIdx) => {
    return row.map((item, index) => {
      return getBox(index, colIdx, index);
    });
  };

  const getColumns = () => {
    return grid.map((row, index) => {
      return (
        <View style={styles.rowStyle} key={index}>
          {getRow(row, index)}
        </View>
      );
    });
  };

  const renderMainGrid = () => {
    let textWin = isX ? 'Player X Turn' : 'Player O Turn';
    let textTie = isTie ? 'Tie' : textWin;
    if (isWin) {
      textWin = !isX ? 'Player X wins' : 'Player O wins';
    } else if (isTie) {
      textWin = textTie;
    }
    return (
      <View style={{display: 'flex', justifyContent: 'center'}}>
        <View style={styles.columnsStyle}>{getColumns()}</View>
        <View>
          <Text>{textWin}</Text>
          <Button title="Restart" onPress={() => initializeGrid()}></Button>
        </View>
      </View>
    );
  };
  const findWinner = () => {
    setCounterX(0);
    let con = 0;
    for (let i = 0; i < GRID_LENGTH; i++) {
      for (let j = 0; j < GRID_LENGTH; j++) {
        if (grid[i][j] === 0) {
          con = con + 1;
          // console.log(
          //   '---incre-- grid ' +
          //     i +
          //     ',' +
          //     j +
          //     ' : ' +
          //     grid[i][j] +
          //     ' con:' +
          //     con,
          // );
        } else {
          // console.log('----- grid ' + i + ',' + j + ' : ' + grid[i][j]);
        }
      }
    }
    setCounterX(con);
    if (
      (grid[0][0] !== 0 &&
        grid[0][1] !== 0 &&
        grid[0][2] !== 0 &&
        grid[0][0] === grid[0][1] &&
        grid[0][0] === grid[0][2] &&
        grid[0][1] === grid[0][2]) ||
      (grid[1][0] !== 0 &&
        grid[1][1] !== 0 &&
        grid[1][2] !== 0 &&
        grid[1][0] === grid[1][1] &&
        grid[1][0] === grid[1][2]) ||
      (grid[2][0] !== 0 &&
        grid[2][1] !== 0 &&
        grid[2][2] !== 0 &&
        grid[2][0] === grid[2][1] &&
        grid[2][0] === grid[2][2]) ||
      (grid[0][0] !== 0 &&
        grid[1][0] !== 0 &&
        grid[2][0] !== 0 &&
        grid[0][0] === grid[1][0] &&
        grid[0][0] === grid[2][0]) ||
      (grid[0][1] !== 0 &&
        grid[1][1] !== 0 &&
        grid[2][1] !== 0 &&
        grid[0][1] === grid[1][1] &&
        grid[0][1] === grid[2][1]) ||
      (grid[0][2] !== 0 &&
        grid[1][2] !== 0 &&
        grid[2][2] !== 0 &&
        grid[0][2] === grid[1][2] &&
        grid[0][2] === grid[2][2]) ||
      (grid[0][0] !== 0 &&
        grid[1][1] !== 0 &&
        grid[2][2] !== 0 &&
        grid[0][0] === grid[1][1] &&
        grid[0][0] === grid[2][2] &&
        grid[1][1] === grid[2][2]) ||
      (grid[2][0] !== 0 &&
        grid[1][1] !== 0 &&
        grid[0][2] !== 0 &&
        grid[0][2] === grid[1][1] &&
        grid[0][2] === grid[2][0] &&
        grid[1][1] === grid[2][0])
    ) {
      setWin(true);
    } else {
      setWin(false);
    }
  };

  const handleClick = (colIdx, rowIdx) => {
    if (!isTie && !isWin) {
      const tempGrid = [...grid];
      if (isX) {
        tempGrid[colIdx][rowIdx] = 1;

        setIsX(false);
      } else {
        tempGrid[colIdx][rowIdx] = 2;
        setIsX(true);
      }
      setGrid(tempGrid);
      findWinner();
    }
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  useEffect(() => {
    // console.log('----- counter : ' + counterX);
    if (counterX === 0) {
      setTie(true);
    } else {
      setTie(false);
    }
  }, [counterX]);

  if (grid.length === 0) {
    return <Text> initializing </Text>;
  }
  return renderMainGrid();
};

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
