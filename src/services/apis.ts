import axios, { AxiosRequestConfig } from 'axios';

import { backendUrl } from '../appConstants';

export const userData = () => {
  // var body = JSON.stringify(data);

  var config: AxiosRequestConfig = {
    method: 'get',
    url: backendUrl + '/user',
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Cookie': 'connect.sid=s%3AAJ5U0zHvWxuV9gz2D-IPaiHlRj6k72GW.8SP5k5qYepCYA%2BZXMTSRZwMa1aFaYVZFuG8uMpuboyw'
    // },
    // data : body
  };
  // return axios(config)
  axios(config)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log('error/n', error);
    });
};
export const otp = (data: any) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3A7HQTTK8X2VB99JiXXq4aVEAP96QutJIp.9547xug%2BFG%2B0n9xe3v2mLEp%2Fvg1tLaVZJ82u7HEDF%2Bw',
  );

  var raw = JSON.stringify(data);

  var requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(backendUrl + '/user/sendotp', requestOptions);
};
export const otpEmail = (data: any) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3A7HQTTK8X2VB99JiXXq4aVEAP96QutJIp.9547xug%2BFG%2B0n9xe3v2mLEp%2Fvg1tLaVZJ82u7HEDF%2Bw',
  );

  var raw = JSON.stringify(data);

  var requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(backendUrl + '/user/forgetpassword2', requestOptions);
};
export const verifyOtp = (data: any) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3A7HQTTK8X2VB99JiXXq4aVEAP96QutJIp.9547xug%2BFG%2B0n9xe3v2mLEp%2Fvg1tLaVZJ82u7HEDF%2Bw',
  );

  var raw = JSON.stringify({
    otp: data,
  });

  var requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(backendUrl + '/user/confirmotp', requestOptions);
};
export const verifyOtpEmail = (data: any) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3A7HQTTK8X2VB99JiXXq4aVEAP96QutJIp.9547xug%2BFG%2B0n9xe3v2mLEp%2Fvg1tLaVZJ82u7HEDF%2Bw',
  );

  var raw = JSON.stringify({
    resetPasswordOtp: data,
  });

  var requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(backendUrl + '/user/verifyotp', requestOptions);
};
export const register = (data: any) => {
  var formdata = new FormData();
  formdata.append('firstname', data.fname);
  formdata.append('lastname', data.lname);
  formdata.append('email', data.email);
  formdata.append('password', data.pass);
  formdata.append('address', data.addr);
  formdata.append('phoneno', data.phone);
  formdata.append('role', data.role);
  formdata.append('countrycode', data.dialcode);

  var requestOptions: RequestInit = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };
  console.log('data:::', data);

  return fetch(backendUrl + '/user/', requestOptions);
};
export const login = (data: any) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3A-UB3ftZg8zNkjlSd4kDxRtfU1khdwVZp.Y%2Fj%2Fb2TGLa8yw3JHfBBFv%2Bwe5NTcFGqc6li6JHHsCmA',
  );

  var raw = JSON.stringify(data);

  var requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(backendUrl + '/user/login', requestOptions);
};
export const resetPassword = (data: any) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3A-UB3ftZg8zNkjlSd4kDxRtfU1khdwVZp.Y%2Fj%2Fb2TGLa8yw3JHfBBFv%2Bwe5NTcFGqc6li6JHHsCmA',
  );
  var raw = JSON.stringify(data);
  var requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(backendUrl + '/user/resetpassword', requestOptions);
};
export const company = (data: any) => {
  var formdata = new FormData();
  formdata.append('companyName', data.name);
  formdata.append('companyRegNo', data.totalVehicle);
  formdata.append('totalvehicles', data.totalVehicle);
  formdata.append('businessLicense', data.businessLicense);
  formdata.append('TaxIDnumber', data.TaxIDnumber);
  formdata.append('businessOwnersName', data.businessOwnersName);
  formdata.append('ownerGovernmentissuedID', data.ownerGovernmentissuedID);
  formdata.append('user', data.uid);

  console.log(formdata);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  return fetch(
    'https://backend-crowdshipping.herokuapp.com/company/',
    requestOptions,
  );
};
export const driver = (data: any) => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3AHN6Z0ksAWH-ofcxp7qGkmvomS-WWiNc7.r7o1qkgoxSW6Ev63f1D5S8tWQk9pvHXoJE1enmChzGM',
  );

  var formdata = new FormData();
  formdata.append('vehicletype', data.type);
  formdata.append('vehiclename', data.name);
  formdata.append('vehiclecolor', data.color);
  formdata.append('user', data.uid);
  formdata.append('vehicleimage', data.vehicleImage);
  formdata.append('vehiclelicence', data.vehicleLicence);
  formdata.append('vehicleLicenceRegno', data.vehicleLicenceRegNo);
  formdata.append('vehicleInsurance', data.vehicleInsurance);
  formdata.append('vehicleResidenceProof', data.vehicleResidenceProof);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  return fetch(
    'https://backend-crowdshipping.herokuapp.com/driver/',
    requestOptions,
  );
};
export const handleUpload = async (image: any) => {
  var formdata = new FormData();
  formdata.append('image', image);
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };
  return fetch(
    'https://backend-crowdshipping.herokuapp.com/company/singlepicture',
    requestOptions,
  );
};
/*Air stuff here */

export const getFlightLatestPosition = (faFlightId: any) => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3A6hMX10t8PgFYpxazKNv_NXL1bZOcOZL8.Vxtk7Dra9v6en25MI9MEt5Sksj9jmoGfSbzOxE%2FvfZk',
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    `https://backend-crowdshipping.herokuapp.com/customer/flightlatestposition/${faFlightId}`,
    requestOptions,
  );
};
export const getAirportName = (data: any) => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3AkOibYULMrMpHGkJeCUiz_MZp-T3xqELW.pulk%2Fi%2FvGBqd8ZykrNwi8VAYLzI%2F9AasyrTHzUcbZGo',
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  return fetch(
    `https://backend-crowdshipping.herokuapp.com/provider/searchairport/${data}`,
    requestOptions,
  );
};
export const addFlight = (data: any) => {
  console.log('addFlightdata', data);
  console.log("flight departure date", data.date)
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3Af9q0zvwWfY42EyMEtkdvcrP45368XuaC.2V2KO%2FA0jnjbDJGWSusbEufNfLdehDVK3eY2nc8gS3U',
  );
  var formdata = new FormData();
  formdata.append('providerId', data.providerId);
  formdata.append('pickupCity', 'Islamabad');
  formdata.append('dropoffCity', 'Karachi');
  formdata.append('flightDate', data.date);
  formdata.append('departureAirport', data.departureAirport);
  formdata.append('destinationAirport', data.destinationAirport);
  formdata.append('departureTime', data.departureTime);
  formdata.append('destinationTime', data.destinationTime);
  formdata.append('flightNumber', data.flightNumber);
  formdata.append('flightAirline', data.airline);
  formdata.append('ticketImage', data.image);
  formdata.append('fa_flight_id', data.flightId);
  formdata.append('pickupIATACityCode', data.departureAirportCode);
  formdata.append('dropoffIATACityCode', data.destinationAirportCode);
  formdata.append('flightarrivalDate', data.flightArrivalDate);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };
  return fetch(
    'https://backend-crowdshipping.herokuapp.com/provider/addflight',
    requestOptions,
  );
};
export const searchFlight = (
  departureAirportCode: any,
  destinationAirportCode: any,
  flightNumber: any,
  myDate: any,
) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3A0LG0rIVpESZN2w-yB8qtWyVJqED8INPo.nTi%2F4ddJqej0QZX0svLjLBgNKwPQsokiIvHlIOI2fmM',
  );

  var raw = JSON.stringify({
    departCode: departureAirportCode,
    arrivalCode: destinationAirportCode,
    flightnumber: flightNumber,
    date: myDate,
  });
  console.log('raw bodyfrom apis', raw);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(
    'https://backend-crowdshipping.herokuapp.com/provider/searchflight',
    requestOptions,
  );
};
export const getRequestsToAllProviders = (userId: any) => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3AycbJyGiUleehiezqzRXv9lCxHC3eRk61.6Mx3YlrFJOLPd%2FRlz0YWg3EuzsPY1g4wkJX0WpGeDOQ',
  );
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  return fetch(
    `https://backend-crowdshipping.herokuapp.com/provider/getRequestsToAllProviders/${userId}`,
    requestOptions,
  );
};
export const setAcceptOrReject = (requestId: any, newStatus: any) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3Ab5NQCCDbNCpKMUdhXstuvcFiphd78l-9.owTrcsN%2BgDPaGoQO6RW8OTN8x0tQwiMpc8rFDU1WJqg',
  );

  var raw = JSON.stringify({
    requestId: requestId,
    newStatus: newStatus,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(
    'https://backend-crowdshipping.herokuapp.com/provider/changerequeststatus',
    requestOptions,
  );
};
export const getAllFlightAddedByProvider = (userId: any) => {
  console.log('providerid from api function ', userId);
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3AYR40fI_zqmaZFhqZkOlIYQTehRqsn2hk.LfExvmFaoAkGNZaFuQZh6ljR5G2jY2kjssaxXT%2B%2B9Fc',
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    `https://backend-crowdshipping.herokuapp.com/provider/getproviderflights/${userId}`,
    requestOptions,
  );
};
export const getFlightsDate = (faFlightId: any) => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3AtE3pONZ6qNZNPegpFnmWrEnC3jk3IL_B.9SAFfVrYzPTT%2Bq2gOoWYzxm2TSGE%2F%2F5VdFxv7tdnv40',
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    `https://backend-crowdshipping.herokuapp.com/customer/staticinfobyfaflightid/${faFlightId}`,
    requestOptions,
  );
};
export const getAllPostRequests = () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  return fetch(
    'https://backend-crowdshipping.herokuapp.com/provider/allpostrequests',
    requestOptions,
  );
};
export const changePostRequestStatus = (
  postRequestId: any,
  providerId: any,
) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3AU8xqFWhyglrgAoqvsfZ0nifDa86VtpSA.MZnOyFTVT5%2F%2BxQrtKBbN3zjecsYAf7uG7WK8gVXdRzg',
  );

  var raw = JSON.stringify({
    postrequestId: postRequestId,
    providerId: providerId,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(
    'https://backend-crowdshipping.herokuapp.com/provider/changepostrequeststatus',
    requestOptions,
  );
};
export const addFlightAfterPost = (flightDataFromPostRequest: any) => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3AU8xqFWhyglrgAoqvsfZ0nifDa86VtpSA.MZnOyFTVT5%2F%2BxQrtKBbN3zjecsYAf7uG7WK8gVXdRzg',
  );

  var formdata = new FormData();
  formdata.append('providerId', flightDataFromPostRequest.providerId);
  formdata.append('pickupCity', flightDataFromPostRequest.pickupCity);
  formdata.append('dropoffCity', flightDataFromPostRequest.dropoffCity);
  formdata.append('flightDate', flightDataFromPostRequest.flightDate);
  formdata.append(
    'departureAirport',
    flightDataFromPostRequest.departureAirport,
  );
  formdata.append(
    'destinationAirport',
    flightDataFromPostRequest.destinationAirport,
  );
  formdata.append('departureTime', flightDataFromPostRequest.departureTime);
  formdata.append('destinationTime', flightDataFromPostRequest.destinationTime);
  formdata.append('flightNumber', flightDataFromPostRequest.flightNumber);
  formdata.append('flightAirline', flightDataFromPostRequest.flightAirline);
  formdata.append('ticketImage', flightDataFromPostRequest.ticketImage);
  formdata.append('fa_flight_id', flightDataFromPostRequest.fa_flight_id);
  formdata.append(
    'pickupIATACityCode',
    flightDataFromPostRequest.pickupIATACityCode,
  );
  formdata.append(
    'dropoffIATACityCode',
    flightDataFromPostRequest.dropoffIATACityCode,
  );
  formdata.append('postrequestId', flightDataFromPostRequest.postrequestId);
  formdata.append('customerId', flightDataFromPostRequest.customerId);
  formdata.append('bookingId', flightDataFromPostRequest.bookingId);
  formdata.append(
    'flightarrivalDate',
    flightDataFromPostRequest.flightarrivalDate,
  );

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  return fetch(
    'https://backend-crowdshipping.herokuapp.com/provider/addflightafterpost',
    requestOptions,
  );
};
export const changeStateByProvider = (state: any, requestId: any) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3AO0hdh4M60sPg4fyfkl3hiJQ4QV-SDmtp.9vDASPjdRAnclaACJt0TRhCqyZ%2B03rrqfqfN3fRXeEg',
  );

  var raw = JSON.stringify({
    requestId: requestId,
    state: state,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(
    'https://backend-crowdshipping.herokuapp.com/provider/setrequeststate',
    requestOptions,
  );
};
export const verifyBookingForCompletion = (image: any, requestId: any) => {
  console.log(
    'verify booking for completion image requestID ',
    image,
    requestId,
  );
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3AO0hdh4M60sPg4fyfkl3hiJQ4QV-SDmtp.9vDASPjdRAnclaACJt0TRhCqyZ%2B03rrqfqfN3fRXeEg',
  );
  var formdata = new FormData();
  formdata.append('verificationImage', image);
  formdata.append('requestId', requestId);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };
  return fetch(
    'https://backend-crowdshipping.herokuapp.com/provider/verifyingbookingcompletion',
    requestOptions,
  );
};

/* SHIP Things */
/////get seaaport

export const getShipFromDate = (mmsi: any, pickupPortUnlocode: any, eta: any) => {
  console.log("data of api, ", mmsi, pickupPortUnlocode, eta);

  var myHeaders = new Headers();
  myHeaders.append("Cookie", "connect.sid=s%3A1ua6t4NsGVvH0z9una33ulhUJMKiKva3.67X8mwYHpQylO7GEpM6qNS6hQHd5TBMOE3pkZkh5R6A");
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch(`https://backend-crowdshipping.herokuapp.com/provider/getdeparturetime/{${mmsi}/${pickupPortUnlocode}/${eta}`, requestOptions);
}



export const getSeaportName = (data: any) => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3AMTbRbdlC1iXSx9uxn1XZDaWEE3JCq_6O.d5R7tQ6BZvLY9WTgUMB8bE08GIg1M32vZIwcmDlhSk0',
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    `https://backend-crowdshipping.herokuapp.com/provider/searchport/${data}`,
    requestOptions,
  );
};

export const addShipToServer = (shipData: AddShip) => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3AMTbRbdlC1iXSx9uxn1XZDaWEE3JCq_6O.d5R7tQ6BZvLY9WTgUMB8bE08GIg1M32vZIwcmDlhSk0',
  );

  var formdata = new FormData();
  formdata.append('providerId', shipData.providerId);
  formdata.append('pickupCity', shipData.pickupCity);
  formdata.append('dropoffCity', shipData.dropoffCity);
  formdata.append('shipDate', shipData.date);
  formdata.append('departurePort', shipData.departureSeaport);
  formdata.append('destinationPort', shipData.destinationSeaport);
  formdata.append('departureTime', shipData.departureTime);
  formdata.append('mmsiNumber', shipData.mmsiNumber);
  formdata.append('ticketImage', shipData.image);
  formdata.append('pickupPortUnlocode', shipData.pickupPortUnlocode);
  formdata.append('dropoffPortUnlocode', shipData.dropoffPortUnlocode);
  formdata.append('destinationTime', shipData.destinationTime);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  return fetch(
    'https://backend-crowdshipping.herokuapp.com/provider/addship',
    requestOptions,
  );
};
export const getAllShipAddedByProvider = (userId: any) => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3ATxYIr2uWFt93Y0scgBAxxu5462TN4hbE.V4I5S6FdwvvgAYBxAdhXXsJ26w21uE87EnhC%2BsxD9Ro',
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    `https://backend-crowdshipping.herokuapp.com/provider/getproviderships/${userId}`,
    requestOptions,
  );
};
export const deleleFlightRecord = (flightId: any) => {
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow',
  };
  return fetch(
    `https://backend-crowdshipping.herokuapp.com/provider/deleteflight/${flightId}`,
    requestOptions,
  );
};
export const deleteShipRecord = (shipId: any) => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3Awls0FQ5Goy7QXzmUmdahX5QUxCxuDpN7.Fjd1n2Z%2BOPlJSJucFJlo0PtlmL4zjNQzhCG2nQorpdY',
  );

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    `https://backend-crowdshipping.herokuapp.com/provider/deleteship/${shipId}`,
    requestOptions,
  );
};
export const addShipAfterPost = (
  shipDataFromPostRequest: AddShipPostRequest,
) => {
  var formdata = new FormData();
  formdata.append('providerId', shipDataFromPostRequest.providerId);
  formdata.append('pickupCity', shipDataFromPostRequest.pickupCity);
  formdata.append('dropoffCity', shipDataFromPostRequest.dropoffCity);
  formdata.append('departureTime', shipDataFromPostRequest.departureTime);
  formdata.append('destinationTime', shipDataFromPostRequest.destinationTime);
  formdata.append('mmsiNumber', shipDataFromPostRequest.mmsiNumber);
  formdata.append('ticketImage', shipDataFromPostRequest.ticketImage);
  formdata.append(
    'pickupPortUnlocode',
    shipDataFromPostRequest.pickupPortUnlocode,
  );
  formdata.append(
    'dropoffPortUnlocode',
    shipDataFromPostRequest.dropoffPortUnlocode,
  );
  formdata.append('postrequestId', shipDataFromPostRequest.postrequestId);
  formdata.append('customerId', shipDataFromPostRequest.customerId);
  formdata.append('bookingId', shipDataFromPostRequest.bookingId);
  formdata.append('shipArrivaldate', shipDataFromPostRequest.shipArrivaldate);
  formdata.append('departurePort', shipDataFromPostRequest.departurePort);
  formdata.append('destinationPort', shipDataFromPostRequest.destinationPort);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  return fetch(
    'https://backend-crowdshipping.herokuapp.com/provider/addshipafterpost',
    requestOptions,
  );
};
export const getShipLatestPosition = (mmsi: any) => {
  console.log('from api mmsi', mmsi);
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3AnqLGgVOsKiirs0LvwsPm92d4qg-oVsyc.K%2F3MMwAmoFoAB5PgUl9h93gA4d%2Fd6gQMmf08l5mdAuc',
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    `https://backend-crowdshipping.herokuapp.com/customer/shiplatestposition/${mmsi}/false`,
    requestOptions,
  );
};
///history

export const providerOrderHistory = (userId: any) => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3Aml3FT3a4i7mTLhr-9MEKW0EPW1Juc1hF.tuWpCy3GbsBC5RQilZpRTm9YSbL3xxL4KHIwGvYTCTg',
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    `https://backend-crowdshipping.herokuapp.com/provider/providerorderhistory/${userId}`,
    requestOptions,
  );
};

//users things //
export const logoutUser = (userId: any) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  return fetch(
    `https://backend-crowdshipping.herokuapp.com/user/logout/${userId}`,
    requestOptions,
  );
};

/*
driver things here
*/

export const getAllVehicles = (driverId: any) => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3Ac9ap3k_umKtuIkvvcSWsOOyw4qFY1029.VHy%2Fu6zZtHoFIdC8ZWyu0zvgm6JHNlL5D8ZKkJXO7Lw',
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  return fetch(
    `https://backend-crowdshipping.herokuapp.com/driver/getallvehicles/${driverId}`,
    requestOptions,
  );
};
export const addVehicle = (vehicle: AddVehicle) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3AmzAxQxmim5IE9KvghS8yLZQlZ0nQ_One.%2Bk2uZG0FbSZSRJV%2FExAjvD03998A4K6%2FVfKQO6ctj3U',
  );

  var raw = JSON.stringify({
    vehicleType: vehicle.vehicleType,
    vehicleName: vehicle.vehicleName,
    vehicleColor: vehicle.vehicleColor,
    vehicleModel: vehicle.vehicleModel,
    licenseNumber: vehicle.licenseNumber,
    vehicleImage: vehicle.vehicleImage,
    vehicleLicence: vehicle.vehicleLicence,
    vehicleInsurance: vehicle.vehicleInsurance,
    vehicleResidenceProof: vehicle.vehicleResidence,
    driverId: vehicle.driverId,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(
    'https://backend-crowdshipping.herokuapp.com/driver/addingvehicle',
    requestOptions,
  );
  //   .then(response => response.text())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));
};
export const getImageUrlFromServer = async (image: any) => {
  var formdata = new FormData();
  formdata.append('image', image);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  const response = await fetch(
    'https://backend-crowdshipping.herokuapp.com/company/singlepicture',
    requestOptions,
  );
  return await response.json();
};
export const getImageUrlFromServerNew = async (image: any, name:any, isEdited?:boolean) => {
  console.log('dataaaaa 123123',isEdited)
  isEdited=isEdited!==undefined?isEdited:true
  console.log('dataaaaa 123123',isEdited)
  console.log("data",image)
  return new Promise(async (resolve, reject) => {
    if(!isEdited){
      resolve({imageName:name,res:{"success":true,"imageUrl":image.Image}})
      console.log('dataaaaa 123123')
      return
    }
    console.log('promiseeee 123123')
    var formdata = new FormData();
    formdata.append('image', image);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch(
    'https://backend-crowdshipping.herokuapp.com/company/singlepicture',
    requestOptions,
  ).then(data=>data.json())
  .then((response)=>{
    console.log("new",response)

    resolve({imageName:name,res:response})
  }).catch((err)=>{
    console.log("error",err)
  });
  // return await response.json();
  })
  
};
export const getVehicleRequest = (lat: any, lng: any) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3A1N3uaP9BKyFPZlE60mSOZaQqZoDfJ74P. 9W1aXW%2Bf2qgeGgZK2DwuCb5RaqQNyhvNw4mjZVcr7YM',
  );

  var raw = JSON.stringify({
    driverLocation: {
      lat: lat,
      lng: lng,
    },
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  console.log({ requestOptions });

  return fetch(
    'https://backend-crowdshipping.herokuapp.com/driver/getdriverrequests',
    requestOptions,
  );
};
export const changeStatusByDriver = (
  requestId: any,
  driverId: any,
  newStatus: any,
) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3A1N3uaP9BKyFPZlE60mSOZaQqZoDfJ74P.9W1aXW%2Bf2qgeGgZK2DwuCb5RaqQNyhvNw4mjZVcr7YM',
  );

  var raw = JSON.stringify({
    requestId: requestId,
    driverId: driverId,
    newStatus: newStatus,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(
    'https://backend-crowdshipping.herokuapp.com/driver/changedriverrequestStatus',
    requestOptions,
  );
};

export const getDriverHistory = (driverId: any) => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3AyulJxLavmCWWcJPfR99ffsX-tEGgaRKa.k6L4OXZAX1lq%2F2ROv%2BFgg9%2Bj6zBXf3OWrH1HooexOaU',
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    `https://backend-crowdshipping.herokuapp.com/driver/driverorderhistory/${driverId}`,
    requestOptions,
  );
};



export const cancelRequestByDriver = (requestId: any) => {
  console.log("yes here we go", requestId);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "connect.sid=s%3AE06OkH6IkGlxFRcP6w3fA_gc72UR3h43.y67Yewm2LSPGxD%2Fbk7zIhHj%2FL2vt2TdgeE2jlmaNAEc");

  var raw = JSON.stringify({
    "requestId": requestId,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  return fetch("https://backend-crowdshipping.herokuapp.com/driver/cancelrequest", requestOptions);
}



export const vehicleVerifyOtp = (otp: any) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "connect.sid=s%3AH471m4z_5IV7LTnf4zQNcxDmm8tH4L1G.wgNppXzHMCwnDaG1SmpqN%2Feb%2FyVObUE8aYLsUrNPonI");

  var raw = JSON.stringify({
    "completionOtp": otp
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch("https://backend-crowdshipping.herokuapp.com/provider/verifyingbookingotp", requestOptions);

}


export const vehicleResendOtp = (requestId: any) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "connect.sid=s%3AzW5VbEp1OuLvAfaKRM7G5LSjnAWyC3yN.06nf25L6XCFpUDSTkcfxgV64DbiCJJvVc7KrCB7SJcM");

  var raw = JSON.stringify({
    "requestId": requestId
  });

  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch("https://backend-crowdshipping.herokuapp.com/provider/resendotp", requestOptions);

}

export const vehicleDelete = (requestId: any, driverId: any) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "connect.sid=s%3AFZsOLF5nt9g8ecQHsFGdy_LWpj644Jyr.OVXtEEAj%2F27d2u1N9v9R9RVlUZW%2BboWWE8%2BrQwGuQsM");

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(`https://backend-crowdshipping.herokuapp.com/driver/deletevehicle/${requestId}/${driverId}`, requestOptions);

}
export const inviteDriver = async (countrycode: string,phoneno:number,companyId:string) => {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${backendUrl}/company/invitedriver`,
      data: {
        countrycode:countrycode,
        phoneno:phoneno,
        companyId: companyId
        
      },
    };
    axios(config)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response.data);
      });
  });
};

export const addVehicleCompany = (vehicle: AddVehicleCompany) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    'connect.sid=s%3AmzAxQxmim5IE9KvghS8yLZQlZ0nQ_One.%2Bk2uZG0FbSZSRJV%2FExAjvD03998A4K6%2FVfKQO6ctj3U',
  );

  var raw = JSON.stringify({
    vehicleType: vehicle.vehicleType,
    vehicleName: vehicle.vehicleName,
    vehicleColor: vehicle.vehicleColor,
    vehicleModel: vehicle.vehicleModel,
    licenseNumber: vehicle.licenseNumber,
    vehicleImage: vehicle.vehicleImage,
    vehicleLicence: vehicle.vehicleLicence,
    vehicleInsurance: vehicle.vehicleInsurance,
    vehicleResidenceProof: vehicle.vehicleResidence,
    companyId: vehicle.companyId,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(
    "https://backend-crowdshipping.herokuapp.com/company/addvehicle",
    requestOptions,
  );
  }
  export const getAllVehiclesCompany = (companyId: any) => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Cookie',
      'connect.sid=s%3Ac9ap3k_umKtuIkvvcSWsOOyw4qFY1029.VHy%2Fu6zZtHoFIdC8ZWyu0zvgm6JHNlL5D8ZKkJXO7Lw',
    );
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    return fetch(
      `https://backend-crowdshipping.herokuapp.com/company/getvehicles/${companyId}`,
      requestOptions,
    );
  };
  export const vehicleDeleteCompany = (requestId: any, companyId: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3AFZsOLF5nt9g8ecQHsFGdy_LWpj644Jyr.OVXtEEAj%2F27d2u1N9v9R9RVlUZW%2BboWWE8%2BrQwGuQsM");
  
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    return fetch(`https://backend-crowdshipping.herokuapp.com/company/deletevehicle/${requestId}/${companyId}`, requestOptions);
  
  }

  export const updateVehicleCompany = (vehicle: AddVehicleCompany,vehicleId:string) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Cookie',
      'connect.sid=s%3AmzAxQxmim5IE9KvghS8yLZQlZ0nQ_One.%2Bk2uZG0FbSZSRJV%2FExAjvD03998A4K6%2FVfKQO6ctj3U',
    );
  
    var raw = JSON.stringify({
      vehicleType: vehicle.vehicleType,
      vehicleName: vehicle.vehicleName,
      vehicleColor: vehicle.vehicleColor,
      vehicleModel: vehicle.vehicleModel,
      licenseNumber: vehicle.licenseNumber,
      vehicleImage: vehicle.vehicleImage,
      vehicleLicence: vehicle.vehicleLicence,
      vehicleInsurance: vehicle.vehicleInsurance,
      vehicleResidenceProof: vehicle.vehicleResidence,
      companyId: vehicle.companyId,
    });
  
    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    return fetch(
      `https://backend-crowdshipping.herokuapp.com/company/editvehicle/${vehicleId}`,
      requestOptions,
    );
    }
    export const getAllDriversCompany = (companyId: any) => {
      var myHeaders = new Headers();
      myHeaders.append(
        'Cookie',
        'connect.sid=s%3Ac9ap3k_umKtuIkvvcSWsOOyw4qFY1029.VHy%2Fu6zZtHoFIdC8ZWyu0zvgm6JHNlL5D8ZKkJXO7Lw',
      );
    
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      return fetch(
        `https://backend-crowdshipping.herokuapp.com/company/getdrivers/${companyId}`,
        requestOptions,
      );
    };
    export const assignDriversCompany = (driverId: any,vehicleId:any) => {
      var myHeaders = new Headers();
      myHeaders.append(
        'Cookie',
        'connect.sid=s%3Ac9ap3k_umKtuIkvvcSWsOOyw4qFY1029.VHy%2Fu6zZtHoFIdC8ZWyu0zvgm6JHNlL5D8ZKkJXO7Lw',
      );
    
      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        redirect: 'follow',
      };
      return fetch(
        `https://backend-crowdshipping.herokuapp.com/company/assignvehicle/${driverId}/${vehicleId}`,
        requestOptions,
      );
    };
    export const driverDeleteCompany = ( driverId: any,companyId: any ) => {
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "connect.sid=s%3AFZsOLF5nt9g8ecQHsFGdy_LWpj644Jyr.OVXtEEAj%2F27d2u1N9v9R9RVlUZW%2BboWWE8%2BrQwGuQsM");
    
      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };
    
      return fetch(`https://backend-crowdshipping.herokuapp.com/company/deletedriver/${driverId}/${companyId}`, requestOptions);
    
    }
    export const getCompanyData = (companyId: any) => {
      var myHeaders = new Headers();
      myHeaders.append(
        'Cookie',
        'connect.sid=s%3AyulJxLavmCWWcJPfR99ffsX-tEGgaRKa.k6L4OXZAX1lq%2F2ROv%2BFgg9%2Bj6zBXf3OWrH1HooexOaU',
      );
    
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
    
      return fetch(
        `https://backend-crowdshipping.herokuapp.com/company/getcompanyinfo/${companyId}`,
        requestOptions,
      );
    };

    export const updateProfile = (data: any,userId:any) => {
      console.log("Datatatat",data)
      var formdata = new FormData();
      formdata.append('firstname', data.firstname);
      formdata.append('email', data.email);
      formdata.append('address', data.address);
      formdata.append('lastname', data.lastname);
      formdata.append('profilepic', data.profilepic);
      
      console.log(formdata);
    
      var requestOptions = {
        method: 'PATCH',
        body: formdata,
        redirect: 'follow',
      };
    
      return fetch(
        `https://backend-crowdshipping.herokuapp.com/user/updateuser/${userId}`,
        requestOptions,
      );
    };

    export const updateCompanyDetails = (data:any,companyId:string) => {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append(
        'Cookie',
        'connect.sid=s%3AmzAxQxmim5IE9KvghS8yLZQlZ0nQ_One.%2Bk2uZG0FbSZSRJV%2FExAjvD03998A4K6%2FVfKQO6ctj3U',
      );
    
      var raw = JSON.stringify({
      companyName: data.companyName,
      companyRegNo: data.companyRegNo,
      totalvehicles: data.totalvehicles
      });
    
      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      return fetch(
        `https://backend-crowdshipping.herokuapp.com/company/updatecompany/${companyId}`,
        requestOptions,
      );
      }
      export const getUserData = (userId: any) => {
        var myHeaders = new Headers();
        myHeaders.append(
          'Cookie',
          'connect.sid=s%3AyulJxLavmCWWcJPfR99ffsX-tEGgaRKa.k6L4OXZAX1lq%2F2ROv%2BFgg9%2Bj6zBXf3OWrH1HooexOaU',
        );
      
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
      
        return fetch(
          `https://backend-crowdshipping.herokuapp.com/user/getuser/${userId}`,
          requestOptions,
        );
      };

      interface IFlightData {
        playerId: string,
        UserId: string
    }
    
    export const AddPlayer = async (props: IFlightData) => {
        const {
            playerId,
            UserId
        } = props;
        return new Promise((resolve, reject) => {
            const config: AxiosRequestConfig = {
                method: 'post',
                url: `${backendUrl}/user/createnewplayer/${UserId}`,
                data: {
                    playerId: playerId
                },
            };
    
            axios(config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    };
    export const addClaim = (claimTitle:any,claimDetail:any,userId:any ) => {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append(
        'Cookie',
        'connect.sid=s%3AmzAxQxmim5IE9KvghS8yLZQlZ0nQ_One.%2Bk2uZG0FbSZSRJV%2FExAjvD03998A4K6%2FVfKQO6ctj3U',
      );
    
      var raw = JSON.stringify({
        claimTitle: claimTitle,
        claimDescription: claimDetail,
        claimBy: userId
      });
    
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      return fetch(
        "https://backend-crowdshipping.herokuapp.com/complainclaim/createclaim",
        requestOptions,
      );
      }
      export const getClaim = (userId: any) => {
        var myHeaders = new Headers();
        myHeaders.append(
          'Cookie',
          'connect.sid=s%3AyulJxLavmCWWcJPfR99ffsX-tEGgaRKa.k6L4OXZAX1lq%2F2ROv%2BFgg9%2Bj6zBXf3OWrH1HooexOaU',
        );
      
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
      
        return fetch(
          `https://backend-crowdshipping.herokuapp.com/complainclaim/getclaimsbyuser/${userId}`,
          requestOptions,
        );
      };