import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
  Pressable,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Button } from '../../components';
import { SvgXml } from 'react-native-svg';
import { dateSvg } from '../../theme/assets/svg/dateSvg';
import { timeSvg } from '../../theme/assets/svg/timeSvg';
import { ImageSvg } from '../../theme/assets/svg/ImageSvg';
import { launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import { getAirportName } from '../../services';
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
const getMyTime = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours %= 12;
  hours = hours || 12;
  minutes = Number(minutes < 10 ? `0${minutes}` : minutes);
  const strTime = `${hours}:${minutes}`;
  return strTime;
};

const AddTicketDetails = ({ navigation, status, myColor }: any) => {
  //date varibales
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  //departure time
  const [departureTime, setDepartureTime] = React.useState(new Date());
  const [departureTimeOpen, setDepartureTimeOpen] = React.useState(false);

  //destination time
  const [destinationTime, setDestinationTime] = React.useState(new Date());
  const [destinationTimeOpen, setDestinationTimeOpen] = React.useState(false);

  const [destinationAirport, setDestinationAirport] = React.useState('');
  const [destinationAirportCode, setDestinationAirportCode] =
    React.useState('');

  const [number, onChangeNumber] = React.useState(null);
  const [image, setImage] = React.useState<any>({});

  const [flightNumber, setFlightNumber] = React.useState('');
  const [airline, setAirline] = React.useState('');

  const [departureAirport, setDepartureAirport] = React.useState('');
  const [departureAirportCode, setDepartureAirportCode] = React.useState('');

  const [departureData, setDepartureData] = React.useState<any[]>([]);
  const [destinationData, setDestinationData] = React.useState<any[]>([]);

  //////validation of each varible
  const [isValidDepartureAirport, setIsValidDepartureAirport] =
    React.useState(true);
  const [isValidDestinationAirport, setIsValidDestinationAirport] =
    React.useState(true);
  const [isValidFlightNumber, setIsValidFlightNumber] = React.useState(true);
  const [isValidAirLine, setIsValidAirLine] = React.useState(true);
  const [isValidImage, setIsValidImage] = React.useState(true);

  const validateFlightNumber = () => {
    if (
      flightNumber === '' ||
      flightNumber === undefined ||
      flightNumber === null
    ) {
      setIsValidFlightNumber(false);
      return false;
    } else {
      setIsValidFlightNumber(true);
      return true;
    }
  };
  const validateAirline = () => {
    if (airline === '' || airline === undefined || airline === null) {
      setIsValidAirLine(false);
      return false;
    } else {
      setIsValidAirLine(true);
      return true;
    }
  };
  const validateImage = () => {
    if (Object.keys(image).length === 0) {
      setIsValidImage(false);
      return false;
    } else {
      setIsValidImage(true);
      return true;
    }
  };

  const validateDepartureAirport = () => {
    if (
      departureAirport === '' ||
      departureAirport === undefined ||
      departureAirport === null ||
      isValidDepartureAirport === false
    ) {
      setIsValidDepartureAirport(false);
      return false;
    } else {
      setIsValidDepartureAirport(true);
      return true;
    }
  };

  const validateDestinationAirport = () => {
    if (
      destinationAirport === '' ||
      destinationAirport === undefined ||
      destinationAirport === null ||
      isValidDestinationAirport === false
    ) {
      setIsValidDestinationAirport(false);
      return false;
    } else {
      setIsValidDestinationAirport(true);
      return true;
    }
  };

  const validateForm = () => {
    const flightvalid = validateFlightNumber();
    const airlinevalid = validateAirline();
    const imagevalid = validateImage();
    const destinationvalid = validateDestinationAirport();
    const departurevalid = validateDepartureAirport();
    if (
      flightvalid &&
      airlinevalid &&
      imagevalid &&
      destinationvalid &&
      departurevalid
    ) {
      let flightData: AddFlight = {
        airline: airline,
        date: date.toISOString().slice(0, -14),
        departureAirport: departureAirport,
        destinationAirport: destinationAirport,
        departureTime: getMyTime(departureTime),
        destinationTime: getMyTime(destinationTime),
        flightNumber: flightNumber,
        image: image,
        departureAirportCode: departureAirportCode,
        destinationAirportCode: destinationAirportCode,
        providerId: '',
        flightId: '',
        flightArrivalDate: ''
      };
      console.log('flight data from flight add', flightData);
      navigation.navigate('AvailableFlight', {
        flightData: flightData,
      });
    }
  };
  const onChangeTextDeparture = async (text: string) => {
    setDepartureAirport(text);
    let res = await getAirportName(departureAirport);
    let data: any[] = await res.json();
    setDepartureData(data.airports);
  };
  const onChangeTextDestination = async (text: string) => {
    setDestinationAirport(text);
    let res = await getAirportName(destinationAirport);
    let data: any[] = await res.json();
    setDestinationData(data.airports);
  };

  const getItemText = (item: any) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
        <View style={{ marginLeft: 10, flexShrink: 1 }}>
          <Text style={{ fontWeight: '700' }}>{item.name}</Text>
        </View>
      </View>
    );
  };
  const imagePicker = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
      });
      let data = result.assets[0];
      if (Platform.OS === 'ios') {
        data.uri = data?.uri?.slice(7);
      }
      let imageFile = {
        uri: data.uri,
        type: data.type,
        name: data.fileName,
      };
      setImage(imageFile);
      console.log('myimage', image);
    } catch (err: any) {
      Alert.alert(err);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <DatePicker
            minimumDate={new Date()}
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
              <TextInput
                style={styles.input}
                onChangeText={onChangeTextDeparture}
                value={departureAirport}
                placeholder="Enter Airport"
              />

              {console.log('saved', departureAirport)}
            </View>
            {!isValidDepartureAirport && (
              <Text style={{ color: 'red' }}>Pick Departure Airport from list</Text>
            )}
            <View style={styles.singleItemView}>
              <Text style={styles.singleItemText}>Destination Airport</Text>
              {/* <TextInputSuggestion /> */}
              <TextInput
                onChangeText={onChangeTextDestination}
                value={destinationAirport}
                style={styles.input}
                placeholder="Enter Airport"
              />
            </View>
            {!isValidDestinationAirport && (
              <Text style={{ color: 'red' }}>Pick Destination Airport from list</Text>
            )}
            {departureAirport && departureData.length > 0 ? (
              <FlatList
                data={departureData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                    onPress={
                      () => {
                        setDepartureAirport(item.name);
                        setDepartureAirportCode(item.code);
                        setIsValidDepartureAirport(true);
                        setDepartureData([]);
                      }
                      // alert('navigate to page passing in ' + JSON.stringify(item))
                    }>
                    {getItemText(item)}
                  </Pressable>
                )}
                keyExtractor={(item, index) => item.place_id + index}
              />
            ) : null}
            {destinationAirport && destinationData.length > 0 ? (
              <FlatList
                data={destinationData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                    onPress={
                      () => {
                        setDestinationAirport(item.name);
                        setDestinationAirportCode(item.code);
                        setIsValidDestinationAirport(true);
                        setDestinationData([]);
                      }
                      // alert('navigate to page passing in ' + JSON.stringify(item))
                    }>
                    {getItemText(item)}
                  </Pressable>
                )}
                keyExtractor={(item, index) => item.place_id + index}
              />
            ) : null}
            <View style={styles.singleItemView}>
              <Text style={styles.singleItemText}>Date</Text>

              <TouchableOpacity
                onPress={() => {
                  setOpen(true);
                }}
                style={styles.inputContainer2}>
                <Text style={{ fontSize: 12, marginLeft: 10 }}>
                  {date.toDateString()}
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
                <Text style={{ fontSize: 12, marginLeft: 10 }}>
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
                <Text style={{ fontSize: 12, marginLeft: 10 }}>
                  {formatAMPM(destinationTime)}
                </Text>
                <SvgXml style={styles.icon} xml={timeSvg} width={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.singleItemView}>
              <Text style={styles.singleItemText}>Flight Number</Text>
              <TextInput
                style={styles.input}
                onChangeText={setFlightNumber}
                value={flightNumber}
                placeholder="1979H6"
              />
            </View>
            {!isValidFlightNumber && (
              <Text style={{ color: 'red' }}>Flight Number is require</Text>
            )}
            <View style={styles.singleItemView}>
              <Text style={styles.singleItemText}>Airline</Text>
              <TextInput
                style={styles.input}
                onChangeText={setAirline}
                value={airline}
                placeholder="PIA"
              />
            </View>
            {!isValidAirLine && (
              <Text style={{ color: 'red' }}>Airline is require</Text>
            )}
            <View style={styles.singleItemView}>
              <Text style={styles.singleItemText}>Ticket Image</Text>
              <TouchableOpacity
                onPress={imagePicker}
                style={styles.inputContainer2}>
                <TextInput
                  editable={false}
                  style={styles.input2}
                  value={image.name}
                  placeholder="Image"
                />
                <SvgXml style={styles.icon} xml={ImageSvg} width={20} />
              </TouchableOpacity>
            </View>
            {!isValidImage && (
              <Text style={{ color: 'red' }}>Image is require</Text>
            )}
          </View>
          <Button
            onPress={() => {
              validateForm();
            }}
            containerStyle={{ marginHorizontal: widthPercentageToDP(4) }}
            title="SUBMIT FLIGHT DETAILS"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    width: '55%',
    height: 50,
    borderWidth: 1,
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

export default AddTicketDetails;
