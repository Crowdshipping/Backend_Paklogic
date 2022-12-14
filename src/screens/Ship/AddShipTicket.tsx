import React, { useEffect } from 'react';
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
import { addShipToServer, getAirportName, getSeaportName } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyLoader from '../../components/MyLoader';
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

const AddShipTicket = ({ navigation }: any) => {

    const [userId, setUserId] = React.useState('');

    const getUserId = async () => {
        const value: any = await AsyncStorage.getItem('@user_Id');
        setUserId(value);
    }
    useEffect(() => {
        getUserId()
    }, [])
    //date varibales
    const [date, setDate] = React.useState(new Date());
    const [open, setOpen] = React.useState(false);

    //departure time
    const [departureTime, setDepartureTime] = React.useState(new Date());
    const [departureTimeOpen, setDepartureTimeOpen] = React.useState(false);

    //destination time
    const [destinationTime, setDestinationTime] = React.useState(new Date());
    const [destinationTimeOpen, setDestinationTimeOpen] = React.useState(false);

    const [destinationSeaport, setDestinationSeaport] = React.useState('');
    const [destinationSeaportCode, setDestinationSeaportCode] =
        React.useState('');
    const [image, setImage] = React.useState<any>({});

    const [mmsiNumber, setMMSINumber] = React.useState('');

    const [departureSeaport, setDepartureSeaport] = React.useState('');
    const [departureSeaportCode, setDepartureSeaportCode] = React.useState('');

    const [departureData, setDepartureData] = React.useState<any[]>([]);
    const [destinationData, setDestinationData] = React.useState<any[]>([]);


    const [dropOffPortUnlocode, setDropOffPortUnlocode] = React.useState('');
    const [pickupPortUnlocode, setPickupPortUnlocode] = React.useState('');
    //////validation of each varible
    const [isValidDepartureSeaport, setIsValidDepartureSeaport] =
        React.useState(true);
    const [isValidDestinationSeaport, setIsValidDestinationSeaport] =
        React.useState(true);
    const [isValidMMSINumber, setIsValidMMSINumber] = React.useState(true);
    const [isValidImage, setIsValidImage] = React.useState(true);





    const [isLoading, setIsLoading] = React.useState(false);

    const validateMMSINumber = () => {
        if (mmsiNumber === "") {
            setIsValidMMSINumber(false);
            return false;
        } else {
            setIsValidMMSINumber(true);
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

    const validateDepartureSeaport = () => {
        if (departureSeaport === '' || isValidDepartureSeaport === false
        ) {
            setIsValidDepartureSeaport(false);
            return false;
        } else {
            setIsValidDepartureSeaport(true);
            return true;
        }
    };

    const validateDestinationSeaport = () => {
        if (
            destinationSeaport === '' ||
            isValidDestinationSeaport === false
        ) {
            setIsValidDestinationSeaport(false);
            return false;
        } else {
            setIsValidDestinationSeaport(true);
            return true;
        }
    };

    const validateForm = () => {
        const mmsiValid = validateMMSINumber();
        const imagevalid = validateImage();
        const destinationvalid = validateDestinationSeaport();
        const departurevalid = validateDepartureSeaport();
        console.log("departure code country+ location", pickupPortUnlocode);
        if (
            mmsiValid &&
            imagevalid &&
            destinationvalid &&
            departurevalid
        ) {
            console.log("validation passed")
            let shipData: AddShip = {
                date: date.toISOString().slice(0, -14),
                departureSeaport: departureSeaport,
                destinationSeaport: destinationSeaport,
                departureTime: getMyTime(departureTime),
                destinationTime: getMyTime(destinationTime),
                mmsiNumber: mmsiNumber,
                image: image,
                providerId: userId,
                departureSeaportCode: departureSeaportCode,
                destinationSeaportCode: destinationSeaportCode,
                pickupPortUnlocode: pickupPortUnlocode,
                dropoffPortUnlocode: dropOffPortUnlocode,
                pickupCity: departureSeaport,
                dropoffCity: destinationSeaport
            };
            setIsLoading(true);
            addShipToServer(shipData)
                .then(response => response.json())
                .then(result => {
                    setIsLoading(false);
                    if (result.success) {
                        Alert.alert('Alert', result.message, [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    navigation.navigate('ALLSHIPS');
                                },
                                style: 'cancel',
                            },
                        ]);
                    } else {
                        Alert.alert('Alert', result.message, [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    navigation.navigate('ALLSHIPS');
                                },
                                style: 'cancel',
                            },
                        ]);
                    }

                    console.log(result, "result of ship")
                })
                .catch(error => {
                    setIsLoading(false);
                    console.log('error', error)
                });
        }
    };
    const onChangeTextDeparture = async (text: string) => {
        setDepartureSeaport(text);
        let res = await getSeaportName(departureSeaport);
        let data: any = await res.json();
        setDepartureData(data.ports);
    };
    const onChangeTextDestination = async (text: string) => {
        setDestinationSeaport(text);
        let res = await getSeaportName(destinationSeaport);
        let data: any = await res.json();
        setDestinationData(data.ports);
    };

    const getItemText = (item: any) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
                <View style={{ marginLeft: 10, flexShrink: 1 }}>
                    <Text style={{ fontWeight: '700' }}>{item.Name}</Text>
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
            if (result.didCancel) {
                return;
            }
            let data: any = result.assets?.[0];
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
            {isLoading ? <MyLoader /> :
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
                                <Text style={styles.singleItemText}>Departure Seaport</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeTextDeparture}
                                    value={departureSeaport}
                                    placeholder="Enter Seaport"
                                />
                            </View>
                            {!isValidDepartureSeaport && (
                                <Text style={{ color: 'red' }}>Pick Departure Seaport from list</Text>
                            )}
                            <View style={styles.singleItemView}>
                                <Text style={styles.singleItemText}>Destination Seaport</Text>
                                {/* <TextInputSuggestion /> */}
                                <TextInput
                                    onChangeText={onChangeTextDestination}
                                    value={destinationSeaport}
                                    style={styles.input}
                                    placeholder="Enter Seaport"
                                />
                            </View>
                            {!isValidDestinationSeaport && (
                                <Text style={{ color: 'red' }}>Pick Destination Seaport from list</Text>
                            )}
                            {departureSeaport && departureData.length > 0 ? (
                                <FlatList
                                    data={departureData}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <Pressable
                                            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                                            onPress={
                                                () => {
                                                    setDepartureSeaport(item.Name);
                                                    setDepartureSeaportCode(item.Location);
                                                    setIsValidDepartureSeaport(true);
                                                    setPickupPortUnlocode(item.Country + item.Location)
                                                    setDepartureData([]);
                                                }

                                            }>
                                            {getItemText(item)}
                                        </Pressable>
                                    )}
                                    keyExtractor={(item, index) => item.place_id + index}
                                />
                            ) : null}
                            {destinationSeaport && destinationData.length > 0 ? (
                                <FlatList
                                    data={destinationData}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <Pressable
                                            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                                            onPress={
                                                () => {
                                                    setDestinationSeaport(item.Name);
                                                    setDestinationSeaportCode(item.Location);
                                                    setIsValidDestinationSeaport(true);
                                                    setDropOffPortUnlocode(item.Country + item.Location)
                                                    setDestinationData([]);
                                                }
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
                                <Text style={styles.singleItemText}>MMSI Number</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setMMSINumber}
                                    value={mmsiNumber}
                                    placeholder="1979H6"
                                />
                            </View>
                            {!isValidMMSINumber && (
                                <Text style={{ color: 'red' }}>MMSI Number is require</Text>
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
                </ScrollView>}

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

export default AddShipTicket;
