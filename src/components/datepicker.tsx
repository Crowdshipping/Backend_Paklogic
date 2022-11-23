interface datePicker {
  text?: string;
  onChange: Function;
  errormsg?: string;
  datePrev?: string;
  disable?: boolean;
  initialDate?: Date;
}

import moment from 'moment';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SvgXml} from 'react-native-svg';
import {calendar} from '../theme/assets/svg';
import {styles} from './style';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {colors} from '../theme';
export const Datepicker = (props: datePicker) => {
  const {text, onChange, errormsg, datePrev, disable, initialDate} = props;
  const [date, setDate] = useState(datePrev);
  const [show, setshow] = useState(false);

  const showDatePicker = () => {
    setshow(!show);
  };

  const handleConfirm = (date: Date) => {
    let finaldate = moment(date).format('YYYY-MM-DD');

    showDatePicker();
    setDate(finaldate);
    onChange(finaldate);
  };

  return (
    <>
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {text ? <Text style={styles.txt1}>{text}</Text> : null}

        <TouchableOpacity
          style={styles.Touch}
          onPress={() => {
            !disable && setshow(true);
          }}>
          {date ? (
            <Text style={{color: colors.black}}>{date}</Text>
          ) : (
            <SvgXml style={{marginLeft: wp(1.5)}} xml={calendar} />
          )}
          <DateTimePickerModal
            isVisible={show}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={showDatePicker}
            minimumDate={initialDate ? initialDate : new Date()}
            date={initialDate ? initialDate : new Date()}
          />
        </TouchableOpacity>
      </View>
      {errormsg ? <Text style={styles.errorMsg}>{errormsg}</Text> : null}
    </>
  );
};
