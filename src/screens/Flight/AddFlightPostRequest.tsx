import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Platform,
    Alert,
    SafeAreaView,
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

import { addFlightAfterPost } from '../../services';
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

const AddFlightPostRequest = ({ navigation, route }: any) => {
    const [userId, setUserId] = React.useState('');

    const getUserId = async () => {
        const value: any = await AsyncStorage.getItem('@user_Id');
        setUserId(value);
    };

    React.useEffect(() => {
        getUserId();
    }, []);

    const { postRequestData } = route.params;
    console.log('coooooool', postRequestData);
    //date varibales
    const [date, setDate] = React.useState(new Date());
    const [open, setOpen] = React.useState(false);
    //departure time
    const [departureTime, setDepartureTime] = React.useState(new Date());
    const [departureTimeOpen, setDepartureTimeOpen] = React.useState(false);

    //destination time
    const [destinationTime, setDestinationTime] = React.useState(new Date());
    const [destinationTimeOpen, setDestinationTimeOpen] = React.useState(false);
    const [image, setImage] = React.useState<any>({});

    //////validation of each varible
    const [isValidImage, setIsValidImage] = React.useState(true);

    const [isLoading, setIsLoading] = React.useState(false);
    const validateImage = () => {
        if (Object.keys(image).length === 0) {
            setIsValidImage(false);
            return false;
        } else {
            setIsValidImage(true);
            return true;
        }
    };

    const validateForm = () => {
        const imagevalid = validateImage();
        if (imagevalid) {
            let flightData: AddFlightPostRequest = {
                flightAirline: postRequestData.airline,
                flightDate: date.toISOString().slice(0, -14),
                departureAirport: postRequestData.departureAirport,
                destinationAirport: postRequestData.destinationAirport,
                departureTime: getMyTime(departureTime),
                destinationTime: getMyTime(destinationTime),
                flightNumber: postRequestData.flightNumber,
                ticketImage: image,
                providerId: userId,
                pickupCity: postRequestData.pickupCity,
                dropoffCity: postRequestData.dropoffCity,
                fa_flight_id: postRequestData.fa_flight_id,
                pickupIATACityCode: postRequestData.pickupIATACityCode,
                dropoffIATACityCode: postRequestData.dropoffIATACityCode,
                postrequestId: postRequestData._id,
                customerId: postRequestData.requestedBy,
                bookingId: postRequestData.bookingId,
                flightarrivalDate: postRequestData.flightarrivalDate,
            };
            setIsLoading(true);

            addFlightAfterPost(flightData)
                .then(response => response.json())
                .then(result => {
                    setIsLoading(false);
                    //   navigation.navigate('AllRequest');
                    Alert.alert('', 'Request Accepted', [
                        {
                            text: 'Ok',
                            onPress: () => {
                                // console.log('knvsldxkn')
                                navigation.navigate('AllRequest');
                                // props.navigation.navigate('SignIn')
                            },
                            style: 'cancel',
                        },
                    ]);
                    console.log('result of addflightafterpost', result);
                })
                .catch(error => {
                    setIsLoading(false);
                    console.log('error', error);
                });
        }
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
            {isLoading ? (
                <MyLoader />
            ) : (
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
                                <TextInput
                                    editable={false}
                                    style={styles.input}
                                    value={postRequestData.departureAirport}
                                    placeholder="Enter Airport"
                                />
                            </View>
                            <View style={styles.singleItemView}>
                                <Text style={styles.singleItemText}>Destination Airport</Text>
                                <TextInput
                                    editable={false}
                                    value={postRequestData.destinationAirport}
                                    style={styles.input}
                                    placeholder="Enter Airport"
                                />
                            </View>
                            <View style={styles.singleItemView}>
                                <Text style={styles.singleItemText}>Date</Text>

                                <TouchableOpacity disabled style={styles.inputContainer2}>
                                    <Text style={{ fontSize: 12, marginLeft: 10 }}>
                                        {/* {date.toDateString()} */}
                                        {postRequestData.date.slice(0, -14)}
                                    </Text>
                                    <SvgXml style={styles.icon} xml={dateSvg} width={20} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.singleItemView}>
                                <Text style={styles.singleItemText}>Departure Time</Text>
                                <TouchableOpacity
                                    disabled
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
                                    disabled
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
                                    editable={false}
                                    style={styles.input}
                                    value={postRequestData.flightNumber}
                                    placeholder="1979H6"
                                />
                            </View>
                            <View style={styles.singleItemView}>
                                <Text style={styles.singleItemText}>Airline</Text>
                                <TextInput
                                    editable={false}
                                    style={styles.input}
                                    value={postRequestData.airline}
                                    placeholder="PIA"
                                />
                            </View>
                            <View style={styles.singleItemView}>
                                <Text style={styles.singleItemText}>Ticket Image</Text>
                                <TouchableOpacity
                                    onPress={imagePicker}
                                    style={styles.inputContainer2}>
                                    <TextInput
                                        editable={false}
                                        style={styles.input2}
                                        value={image ? image.name : ''}
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
            )}
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

export default AddFlightPostRequest;