import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Cell = props => {
  let backgroundColor = 'red';
  const sum = props.colIdx + props.rowIdx;
  if (sum % 2 === 0) {
    backgroundColor = 'blue';
  }
  const gridValue = props.grid[props.colIdx][props.rowIdx];
  let content = ' - ';
  if (gridValue === 1) {
    content = 'X';
  } else if (gridValue === 2) {
    content = 'O';
  }
  return (
    <View key={props.index} styles={{...stylesGame.boxStyle, backgroundColor}}>
      <Text
        style={stylesGame.textcontent}
        // onPress={() => {
        //   if (props.grid[props.colIdx][props.rowIdx] === 0) {
        //     //handleClick(colIdx, rowIdx);
        //     alert('Clicked' + props.colIdx + ' , ' + props.rowIdx);
        //   } else {
        //     alert('Already Played ');
        //   }
        // }}

        onPress={() => props.onPress()}>
        {content}
      </Text>
    </View>
  );
};

const stylesGame = StyleSheet.create({
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

export default Cell;
