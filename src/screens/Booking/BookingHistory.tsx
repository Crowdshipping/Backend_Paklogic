import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CheckBoxState from '../../components/CheckBoxState';
import MyCard from '../../components/MyCard';
const BookingHistory = () => {
  return (
    <ScrollView>
      <View style={{marginHorizontal: 12}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <CheckBoxState text={'Canceled'} whenPressed={() => {}} />
          <CheckBoxState text={'Completed'} whenPressed={() => {}} />
          <CheckBoxState text={'In-progress'} whenPressed={() => {}} />
        </View>
        <MyCard status="Canceled" myColor={'red'} />
        <MyCard status="Completed" myColor={'green'} />
        <MyCard status="Pending" myColor={'red'} />
      </View>
    </ScrollView>
  );
};

export default BookingHistory;
