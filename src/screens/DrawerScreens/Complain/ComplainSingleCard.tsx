import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MineCard} from '../../../components';
import {colors} from '../../../theme';
const ComplainSingleCard = ({title, date, status, onPress}: any) => {
  return (
    <MineCard>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.txtheading}>{title}</Text>
        <Text style={{color: colors.black}}>Date: {date}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: colors.black}}>Status: </Text>
            <Text
              style={{
                paddingLeft: wp(1),
                color: status === 'Pending' ? '#2D96B7' : 'green',
              }}>
              {status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </MineCard>
  );
};

export default ComplainSingleCard;

const styles = StyleSheet.create({
  txtheading: {
    color: 'black',
    fontSize: 20,
  },

  card: {
    marginTop: 20,
    elevation: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 22,
    width: '100%',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 25,
  },
});
