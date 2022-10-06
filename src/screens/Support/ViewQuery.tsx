import React, { useEffect } from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    ScrollView,
    ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CheckBoxState, Header } from '../../components';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import MyLoader from '../../components/MyLoader';

import { getQuestions } from '../../API';
import QuerySingleCard from './QuerSingleCard';
import { colors } from '../../theme';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewQuery = ({ navigation }: any) => {
    const [QueryResponse, setQueryResponse] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [pending, setPending] = React.useState(false);
    const [resolved, setResolved] = React.useState(true);
    const isfocus = useIsFocused();

    const getData = async () => {
        setIsLoading(true);
        getQuestions()
            .then((result: any) => {
                setIsLoading(false);
                result.success && setQueryResponse(result.customerSupportQuestions);
            })
            .catch(async error => {
                setIsLoading(false);
                if (error.response.status === 401) {
                    await AsyncStorage.clear();
                    navigation.navigate('Welcome')
                }
            });
    };

    useEffect(() => {
        if (isfocus) {
            getData();
        }
    }, [isfocus]);

    const renderQuery = (item: any) => {
        return (
            <QuerySingleCard
                onPress={() => {
                    navigation.navigate("QueryDetail", { item })
                }}
                state={"Pending"}
                title={item.customerSupportTitle}
                subtitle={item.customerSupportDescription} />
        )
    }

    const noQueryAvailable = () => {
        return (
            <View style={{ height: '75%', justifyContent: 'center', flex: 1, marginTop: hp('15%') }}>
                <View style={{ backgroundColor: "#f0f0f0", height: 250, borderRadius: 10, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: colors.red }}>No query available</Text>
                </View>
            </View>
        )
    }

    const renderQueryCheck = () => {
        return <View >
            {QueryResponse.length !== 0 ?
                QueryResponse.map((item: any) => {
                    if (pending === true && item.customerSupportStatus === 'Pending') {
                        return renderQuery(item)
                    }
                    else if (resolved === true && item.customerSupportStatus === 'Resolved') {
                        return renderQuery(item)
                    }
                })
                :
                noQueryAvailable()
            }
        </View>
    }




    return (
        <SafeAreaView style={{ backgroundColor: colors.white, height: "100%" }}>
            <Header title={'Support'} pressMethod={() => navigation.goBack()} />
            {isLoading ?
                <ActivityIndicator
                    size={'small'}
                    color={colors.red}
                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                />

                :
                <ScrollView>
                    <View style={styles.maincontainer}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("AddQuery")
                        }} style={styles.addbtn}>
                            <Text style={styles.txt}>ADD QUERY</Text>
                        </TouchableOpacity>
                        <View style={styles.radio}>
                            <CheckBoxState
                                text={'Resolved'}
                                onPress={() => { setResolved(!resolved) }}
                                checked={true}
                            />
                            <CheckBoxState text={'Pending'} onPress={() => { setPending(!pending) }} />
                        </View>
                        {renderQueryCheck()}
                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    txt: {
        color: 'black',
        fontSize: 15,
    },
    radio: {
        width: '60%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    addbtn: {
        borderRadius: hp(2),
        paddingHorizontal: hp(0.5),
        paddingVertical: hp(1),
        alignItems: 'center',
        // justifyContent: 'center',
        width: wp(25),
        borderWidth: 1,
        alignSelf: 'flex-end',
    },
    maincontainer: {
        paddingVertical: wp(5),
        paddingHorizontal: hp(3),
    },
    txtheading: {
        color: 'black',
        fontSize: 22,
        paddingVertical: hp(2),
    },



});
export default ViewQuery;