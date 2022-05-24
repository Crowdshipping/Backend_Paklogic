import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {Button} from '../../components';
import {SvgXml} from 'react-native-svg';
import {dateSvg} from '../../theme/assets/svg/dateSvg';
import {timeSvg} from '../../theme/assets/svg/timeSvg';
import {ImageSvg} from '../../theme/assets/svg/ImageSvg';

import DatePicker from 'react-native-date-picker';
import {EditSvg} from '../../theme/assets/svg/EditSvg';
const formatAMPM = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'Pm' : 'Am';
  hours %= 12;
  hours = hours || 12;
  minutes = Number(minutes < 10 ? `0${minutes}` : minutes);
  const strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
};

const EditTicketDetail = ({status, myColor}: any) => {
  //date varibales
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  //departure time
  const [departureTime, setDepartureTime] = React.useState(new Date());
  const [departureTimeOpen, setDepartureTimeOpen] = React.useState(false);

  //destination time
  const [destinationTime, setDestinationTime] = React.useState(new Date());
  const [destinationTimeOpen, setDestinationTimeOpen] = React.useState(false);

  const [number, onChangeNumber] = React.useState(null);
  return (
    <ScrollView>
      <View style={styles.container}>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <DatePicker
          modal
          mode="time"
          open={departureTimeOpen}
          date={departureTime}
          onConfirm={date => {
            setDepartureTimeOpen(false);
            setDepartureTime(date);
          }}
          onCancel={() => {
            setDepartureTimeOpen(false);
          }}
        />
        <DatePicker
          modal
          mode="time"
          open={destinationTimeOpen}
          date={destinationTime}
          onConfirm={date => {
            setDestinationTimeOpen(false);
            setDestinationTime(date);
          }}
          onCancel={() => {
            setDestinationTimeOpen(false);
          }}
        />
        <View style={styles.cardView}>
          <View style={styles.singleItemView}>
            <Text style={styles.singleItemText}>Departure Airport</Text>
            <View style={styles.inputContainer2}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Enter Airport"
              />
              <SvgXml style={styles.icon} xml={EditSvg} width={20} />
            </View>
          </View>
          <View style={styles.singleItemView}>
            <Text style={styles.singleItemText}>Destination Airport</Text>

            <View style={styles.inputContainer2}>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  onChangeNumber(text);
                }}
                value={number}
                placeholder="Enter Airport"
              />
              <SvgXml style={styles.icon} xml={EditSvg} width={20} />
            </View>
          </View>
          <View style={styles.singleItemView}>
            <Text style={styles.singleItemText}>Date</Text>

            <TouchableOpacity
              onPress={() => {
                setOpen(true);
              }}
              style={styles.inputContainer2}>
              <Text style={{fontSize: 12, marginLeft: 10}}>
                {date.toDateString().slice(4)}
              </Text>
              <SvgXml style={styles.icon} xml={dateSvg} width={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.singleItemView}>
            <Text style={styles.singleItemText}>Departure Time</Text>
            <TouchableOpacity
              onPress={() => {
                setDepartureTimeOpen(true);
              }}
              style={styles.inputContainer2}>
              <Text style={{fontSize: 12, marginLeft: 10}}>
                {formatAMPM(departureTime)}
              </Text>
              <SvgXml style={styles.icon} xml={timeSvg} width={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.singleItemView}>
            <Text style={styles.singleItemText}>Destination Time</Text>
            <TouchableOpacity
              onPress={() => {
                setDestinationTimeOpen(true);
              }}
              style={styles.inputContainer2}>
              <Text style={{fontSize: 12, marginLeft: 10}}>
                {formatAMPM(destinationTime)}
              </Text>
              <SvgXml style={styles.icon} xml={timeSvg} width={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.singleItemView}>
            <Text style={styles.singleItemText}>Flight Number</Text>

            <View style={styles.inputContainer2}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="1979-H-6"
              />
              <SvgXml style={styles.icon} xml={EditSvg} width={20} />
            </View>
          </View>
          <View style={styles.singleItemView}>
            <Text style={styles.singleItemText}>Airline</Text>

            <View style={styles.inputContainer2}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="PIA"
              />
              <SvgXml style={styles.icon} xml={EditSvg} width={20} />
            </View>
          </View>
          <View style={styles.singleItemView}>
            <Text style={styles.singleItemText}>Ticket Image</Text>
            <TouchableOpacity style={styles.inputContainer2}>
              <TextInput
                editable={false}
                style={styles.input2}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Image"
              />
              <SvgXml style={styles.icon} xml={ImageSvg} width={20} />
            </TouchableOpacity>
          </View>
        </View>
        <Button
          containerStyle={{marginHorizontal: widthPercentageToDP(4)}}
          title="SUBMIT VEHICLE REQUEST"
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  cardView: {
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
  singleItemView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
  },
  input: {
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 11,
  },
  touchableOpacity: {
    width: '55%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 11,
    paddingLeft: 5,
  },
  singleItemText: {
    fontSize: 14,
  },
  inputContainer2: {
    justifyContent: 'center',
    width: '55%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',

    borderRadius: 5,
  },
  input2: {
    padding: 10,
    height: 50,
    fontSize: 11,
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
});

export default EditTicketDetail;
