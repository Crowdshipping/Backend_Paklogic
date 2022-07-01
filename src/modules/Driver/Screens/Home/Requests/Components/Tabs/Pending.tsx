import React from 'react'
import VehicleRequestCard from '../VehicleRequestCard';
import { getVehicleRequest } from '../../../../../../../services';
import MyLoader from '../../../../../../../components/MyLoader';

const Pending = ({ navigation }: any) => {
    const [vehicleResponse, setVehicleResponse] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const getDataOfVehicle = () => {
        setIsLoading(true);
        getVehicleRequest(33.7008114, 73.0634073)
            .then(response => response.json())
            .then(result => {

                setIsLoading(false);
                setVehicleResponse(result.DriverRequests);
            }).catch((error) => {
                setIsLoading(false);
            });
    }
    React.useEffect(() => {
        getDataOfVehicle();
    }, [])

    return (
        <>
            {isLoading ? <MyLoader /> :
                vehicleResponse && vehicleResponse.map((item: any) => {
                    console.log("ppppppppppppp", item)
                    if (item.status === "Pending") {

                        return <VehicleRequestCard
                            acceptPress={() => {
                                navigation.navigate('ACCEPTORREJECTFORVEHICLE', {
                                    vehicleData: item,
                                });
                            }}
                            isAccepted={false}
                            myImage={item.requestedBy.profilepic}
                            firstName={item.requestedBy.firstname}
                            lastName={item.requestedBy.lastname}
                            pickupType={item.bookingId.pickupType}
                            departurePort={"Adiyla rd rawalpindi pakistan"}
                            destinationPort={"Quettaasdasdasdasdasdasasdasdasddadasdasdsd"}
                            date={"2-2-2022"}
                        />
                    }
                })
            }
        </>
    )
}
export default Pending;