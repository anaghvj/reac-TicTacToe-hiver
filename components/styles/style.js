import React from 'react';
import {StyleSheet} from 'react-native';

export default function stylesGame() {
  StyleSheet.create({
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
}
