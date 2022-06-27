import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { changePostRequestStatus, getAllPostRequests } from '../../../../../services';
import RequestCard from '../RequestCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyLoader from '../../../../../components/MyLoader';

const PostRequestsTab = ({ navigation }: any) => {
    const [userId, setUserId] = React.useState("");
    const [postRequestResponse, setPostRequestResponse] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const getPostRequestData = async () => {
        setIsLoading(true)
        const value: any = await AsyncStorage.getItem('@user_Id');
        setUserId(value);
        getAllPostRequests()
            .then(response => response.json())
            .then(result => {
                setIsLoading(false)
                if (result.success) {
                    setPostRequestResponse(result.postRequests);
                }
            }).catch((err) => {
                console.log("error");
                setIsLoading(false)
            });
    };
    React.useEffect(() => {
        getPostRequestData();
    }, [])
    const renderPostRequest = () => {
        console.log("post request called")
        if (postRequestResponse) {
            return postRequestResponse.map((item: any) => {
                console.log('tab post request3 items', item);
                if (item.requestedBy && item.type === "Flight") {
                    return (
                        <RequestCard
                            isPostRequest={true}
                            myImage={item.requestedBy.profilepic}
                            firstName={item.requestedBy.firstname}
                            lastName={item.requestedBy.lastname}
                            mmsiOrflightNumber={item.flightNumber}
                            departurePort={item.departureAirport}
                            destinationPort={item.destinationAirport}
                            acceptPress={() => {
                                Alert.alert("",
                                    "You need to register this flight in order to accept this request?",
                                    [
                                        {
                                            text: 'Yes', onPress: () => {
                                                setIsLoading(true);
                                                changePostRequestStatus(item._id, userId)
                                                    .then(response => response.json())
                                                    .then((result) => {
                                                        setIsLoading(false);
                                                        navigation.navigate('AddFlightPostRequest', {
                                                            postRequestData: result.updatedPostRequest
                                                        });
                                                    })
                                                    .catch(error => {
                                                        console.log("error", error);
                                                        setIsLoading(false);
                                                    });
                                            },
                                            style: 'default',
                                        },
                                        { text: 'No' },
                                    ],
                                    { cancelable: false }
                                )

                            }}
                            date={item.date.slice(0, -14)}

                        />
                    );
                }
                else if (item.type === "Ship") {
                    return (
                        <RequestCard
                            isForShip={true}
                            isPostRequest={true}
                            myImage={item.requestedBy.profilepic}
                            firstName={item.requestedBy.firstname}
                            lastName={item.requestedBy.lastname}
                            mmsiOrFlightNumber={item.mmsiNumber}
                            departurePort={item.departurePort}
                            destinationPort={item.destinationPort}
                            acceptPress={() => {
                                Alert.alert("",
                                    "You need to register this Ship in order to accept this request?",
                                    [
                                        {
                                            text: 'Yes', onPress: () => {
                                                setIsLoading(true);
                                                changePostRequestStatus(item._id, userId)
                                                    .then(response => response.json())
                                                    .then((result) => {
                                                        setIsLoading(false);
                                                        if (result.success) {
                                                            navigation.navigate('AddShipPostRequest', {
                                                                postRequestData: result.updatedPostRequest
                                                            });
                                                        }
                                                        console.log("result from all request ship", result)

                                                    })
                                                    .catch(error => {
                                                        console.log("error", error);
                                                        setIsLoading(false);
                                                    });
                                            },
                                            style: 'default',
                                        },
                                        { text: 'No' },
                                    ],
                                    { cancelable: false }
                                )

                            }}
                            date={item.shipArrivaldate.slice(0, -14)}
                        />
                    );
                }
            });
        }
    }
    return (
        <View>
            {isLoading ? <MyLoader /> : renderPostRequest()}
        </View>
    )
}

export default PostRequestsTab

const styles = StyleSheet.create({})