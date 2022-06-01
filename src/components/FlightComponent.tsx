import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { airplane } from '../theme/assets/svg/airplaneSvg';
import { DeleteSvg } from '../theme/assets/svg/DeleteSvg';

const FlightComponent = ({
  onPressEdit,
  departureAirport,
  destinationAirport,
  date,
  departureTime,
  destinationTime,
  flightNumber,
  airline,
  myImage,
  leftSvg,
}: any) => {
  return (
    <View style={styles.cardView}>
      <View style={{ flexDirection: 'row-reverse', marginBottom: 10 }}>
        <SvgXml xml={DeleteSvg} width={20} height={20} />
      </View>
      <View style={styles.topView}>
        <View style={styles.left}>
          <SvgXml xml={leftSvg} width={60} />
        </View>
        <View style={styles.right}>
          <View style={styles.singleTextRowView}>
            <Text style={{ marginRight: 18 }}>Destination Airport</Text>
            <Text style={{ flex: 1, flexWrap: 'wrap' }}>{departureAirport}</Text>
          </View>
          <View style={styles.singleTextRowView}>
            <Text style={{ marginRight: 18 }}>Destination Airport</Text>
            <Text style={{ flex: 1, flexWrap: 'wrap' }}>
              {destinationAirport}
            </Text>
          </View>
          <View style={styles.singleTextRowView}>
            <Text>Date</Text>
            <Text>{date}</Text>
          </View>
          <View style={styles.singleTextRowView}>
            <Text>Departure Time</Text>
            <Text>{departureTime}</Text>
          </View>
          <View style={styles.singleTextRowView}>
            <Text>Destination Time</Text>
            <Text>{destinationTime}</Text>
          </View>
          <View style={styles.singleTextRowView}>
            <Text>Flight Number</Text>
            <Text>{flightNumber}</Text>
          </View>
          <View style={styles.singleTextRowView}>
            <Text>Airline</Text>
            <Text>{airline}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomView}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image style={{ width: 200, height: 100 }} source={{ uri: myImage }} />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.left}></View>
        <View style={styles.lastTextRow}>
          {/* <Text style={styles.lastTextStyle}>Completed</Text> */}
          {/* <Text onPress={onPressEdit} style={styles.lastTextStyle}>
            Edit
          </Text> */}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  // cardView: {
  //   paddingHorizontal: 20,
  //   paddingVertical: 30,
  //   marginTop: 25,
  //   width: '100%',
  //   borderRadius: 12,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 2,
  //   marginBottom: 25,
  // },
  cardView: {
    display: 'flex',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
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
    elevation: 5,
  },
  topView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  bottomView: { flex: 1, paddingVertical: 10 },
  left: { flex: 1 },
  right: { flex: 2.5 },
  singleTextRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastTextRow: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastTextStyle: {
    color: 'green',
  },
});

export default FlightComponent;
