import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { backendUrl } from '../../appConstants';
import { ButtonOutline } from '../../components';
import FlightComponent from '../../components/FlightComponent';
import FlightImageComponent from '../../components/FlightImageComponent';
import { getAllFlightAddedByProvider } from '../../services';
import { airplane } from '../../theme/assets/svg/airplaneSvg';
import { DeleteSvg } from '../../theme/assets/svg/DeleteSvg';
import ShipDetailComponent from './components/ShipDetailComponent';
const ShipDetail = ({ route, navigation, status, myColor }: any) => {
    const { shipData } = route.params;

    return (
        <ScrollView>
            {console.log("shipdata from ship detail", shipData)}
            <View style={styles.container}>

                <View
                    style={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                    {shipData.provider.profilepic ? (
                        <Image
                            style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }}
                            source={{ uri: backendUrl + shipData.provider.profilepic }}
                        />
                    ) : (
                        <Image
                            style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }}
                            source={require('../../assets/aeroplane.png')}
                        />
                    )}

                    <Text style={{ fontSize: 30, color: '#EA4E28' }}>
                        {shipData.provider.firstname}

                    </Text>
                </View>
                <ShipDetailComponent
                    onPressEdit={() => {

                    }}
                    departureSeaport={shipData.departurePort}
                    destinationSeaport={shipData.destinationPort}
                    date={shipData.shipDate.slice(0, -14)}
                    departureTime={shipData.departureTime}
                    destinationTime={shipData.destinationTime}
                    myTicketImage={shipData.ticketImage}
                    mmsiNumber={shipData.mmsiNumber}
                />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        marginHorizontal: 20,
    },
});

export default ShipDetail;
