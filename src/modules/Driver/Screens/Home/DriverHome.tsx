import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import { earning, history, request } from '../../../../theme/assets/svg';
import HomeContainer from './Components/HomeContainer';

const DriverHome = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <HomeContainer onPress={() => {
        navigation.navigate("VEHICLEREQUEST")
      }} title={"Request"} mySvg={request} />
      <HomeContainer onPress={() => {
      }} title={"Earning"} mySvg={earning} />
      <HomeContainer onPress={() => {
        navigation.navigate("VEHICLEHISTORY")
      }} title={"History"} mySvg={history} />
    </View>
  );
};
export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
});

export default DriverHome;
