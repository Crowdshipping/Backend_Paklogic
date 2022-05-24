import React from 'react';
import {View} from 'react-native';
const VerticalDivider = ({width}: any) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: width ? width : 17,
      }}></View>
  );
};

export default VerticalDivider;
