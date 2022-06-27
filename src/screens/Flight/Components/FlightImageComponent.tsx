import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { airplane } from '../../../theme/assets/svg/airplaneSvg';
import { DeleteSvg } from '../../../theme/assets/svg/DeleteSvg';
const FlightImageComponent = ({
  onPressEdit,
  departureAirport,
  destinationAirport,
  date,
  departureTime,
  destinationTime,
  flightNumber,
  airline,
  myImage,
}: any) => {
  return (
    <View style={styles.cardView}>
      <View style={styles.singleRow}>
        <View style={styles.rowKey}>
          <Text>Departure Airport </Text>
        </View>
        <View style={styles.rowValue}>
          <Text> {departureAirport} </Text>
        </View>
      </View>
      <View style={styles.singleRow}>
        <View style={styles.rowKey}>
          <Text>Destination Airport </Text>
        </View>
        <View style={styles.rowValue}>
          <Text> {destinationAirport} </Text>
        </View>
      </View>
      <View style={styles.singleRow}>
        <View style={styles.rowKey}>
          <Text>Ticket No. </Text>
        </View>
        <View style={styles.rowValue}>
          <Text> DF586 </Text>
        </View>
      </View>
      <View style={styles.singleRow}>
        <View style={styles.rowKey}>
          <Text>Date</Text>
        </View>
        <View style={styles.rowValue}>
          <Text> {date} </Text>
        </View>
      </View>
      <View style={styles.singleRow}>
        <View style={styles.rowKey}>
          <Text>Departure Time</Text>
        </View>
        <View style={styles.rowValue}>
          <Text> {departureTime} </Text>
        </View>
      </View>
      <View style={styles.singleRow}>
        <View style={styles.rowKey}>
          <Text>Destination Time</Text>
        </View>
        <View style={styles.rowValue}>
          <Text>{destinationTime}</Text>
        </View>
      </View>
      <View style={styles.singleRow}>
        <View style={styles.rowKey}>
          <Text>Flight No.</Text>
        </View>
        <View style={styles.rowValue}>
          <Text> {flightNumber} </Text>
        </View>
      </View>
      <View style={styles.singleRow}>
        <View style={styles.rowKey}>
          <Text>Airline </Text>
        </View>
        <View style={styles.rowValue}>
          <Text> {airline} </Text>
        </View>
      </View>

      <View style={styles.bottomImage}>
        <Image style={{ width: '80%', height: 100 }} source={{ uri: myImage }} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cardView: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 25,
    width: '100%',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    marginBottom: 25,
  },
  singleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: 8,
  },
  rowKey: {
    flex: 0.5,
  },
  rowValue: {
    flex: 0.5,
    borderBottomWidth: 0.3,
  },
  bottomImage: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FlightImageComponent;
