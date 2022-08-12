import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import { getDriverHistory, getVehicleRequest } from '../../../../../services';
import { ScrollView } from 'react-native-gesture-handler';
import MyLoader from '../../../../../components/MyLoader';
import VerticalDivider from '../../../../../components/VerticalDivider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabButton from '../../../../../components/TabButton';
import InProgress from './Components/Tabs/InProgress';
import Pending from './Components/Tabs/Pending';

const VehicleRequests = ({ navigation }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tabSelected, setTabSelected] = React.useState(1);
    const getVehicleLocation = () => {
        let crd = {}
        Geolocation.getCurrentPosition((pos) => {
            crd = pos.coords;
        })
    }
    useEffect(() => {
        getVehicleLocation();
        const willFocusSubscription = navigation.addListener('focus', () => {
            console.log("from back navigation all flight")
        });
        return willFocusSubscription;
    }, []);
    const renderTabs = () => {
        if (tabSelected === 1) {
            return <InProgress navigation={navigation} />
        }
        else if (tabSelected === 2) {
            return <Pending navigation={navigation} />
        }
    }
    return (
        <ScrollView>
            {isLoading ? <MyLoader /> :
                <View style={styles.container}>
                    <View style={styles.tabStyle}>
                        <View
                            style={[
                                styles.acceptedTabStyle,
                                { borderBottomColor: tabSelected === 1 ? 'black' : '#f0f0f0' },
                            ]}>
                            <TabButton
                                isFontBold={tabSelected === 1 && true}
                                onPress={() => {
                                    setTabSelected(1);
                                }}
                                text="In Progress"
                            />
                        </View>
                        <VerticalDivider width={7} />
                        <View
                            style={[
                                styles.pendingTabStyle,
                                { borderBottomColor: tabSelected === 2 ? 'black' : '#f0f0f0' },
                            ]}>
                            <TabButton
                                isFontBold={tabSelected === 2 && true}
                                onPress={() => {
                                    setTabSelected(2);
                                }}
                                text="Pendings"
                            />
                        </View>
                    </View>
                    {renderTabs()}
                </View>}
        </ScrollView>
    )
}
export default VehicleRequests;
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15
    },
    tabStyle: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
    },
    acceptedTabStyle: {
        flex: 1,
        borderBottomWidth: 2,
    },
    pendingTabStyle: {
        flex: 1,
        borderBottomColor: 'red',
        borderBottomWidth: 2,
    },
})