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

export const otp = data => {
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

export const otpEmail = data => {
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

export const verifyOtp = data => {
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

export const verifyOtpEmail = data => {
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

export const register = data => {
  var formdata = new FormData();
  formdata.append('firstname', data.fname);
  formdata.append('lastname', data.lname);
  formdata.append('email', data.email);
  formdata.append('address', data.addr);
  formdata.append('password', data.pass);
  formdata.append('phoneno', data.phone);
  formdata.append('countrycode', data.dialcode);

  var requestOptions: RequestInit = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };
  console.log('data:::', data);

  return fetch(backendUrl + '/user/', requestOptions);
};

export const login = data => {
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

export const resetPassword = data => {
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

export const company = data => {
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

export const driver = data => {
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

  // const data = new FormData()
  // data.append('file', image)
  // data.append("upload_preset", "gohp28zp")
  // data.append("cloud_name", "resbook")
  // return await fetch("https://api.cloudinary.com/v1_1/resbook/image/upload", {
  //   method: "post",
  //   body: data
  // })
  // .then(res => res.json())
  // .then(data => {
  //   // setPhoto(data.secure_url)
  //   // imgdata.push({ name: d.name, url: data.secure_url })
  //   console.log('res', data.secure_url)
  // }).catch(err => {
  //   console.log('err', err)
  //   error = { error: true, err: err }
  //   // Alert.alert("An Error Occured While Uploading")
  // })

  // let imgdata: Array<any> = []
  // let error: Array<any> = []
  // let isError = false
  // console.log("handling image")
  // const data2 = new FormData()
  // data2.append("file", image)
  // data2.append("upload_preset", "gohp28zp")
  // data2.append("cloud_name", "ResBook")
  // const URL = " https://api.cloudinary.com/v1_1/resbook/image/upload";
  // return axios.post(URL, data2)
  // console.log('array', imageArr)
  // await imageArr.map(async (d, i) => {
  // const data = new FormData()
  // data.append('file', d.data)
  // data.append("upload_preset", "gohp28zp")
  // data.append("cloud_name", "resbook")
  // await fetch("https://api.cloudinary.com/v1_1/resbook/image/upload", {
  //   method: "post",
  //   body: data
  // })
  //   .then(res => res.json())
  //   .then(data => {
  //     // setPhoto(data.secure_url)
  //     imgdata.push({ name: d.name, url: data.secure_url })
  //     console.log('res', data.secure_url)
  //   }).catch(err => {
  //     console.log('err', err)
  //     error = { error: true, err: err }
  //     // Alert.alert("An Error Occured While Uploading")
  //   })

  // var formdata = new FormData();
  // formdata.append("image", d.data);
  // var requestOptions = {
  //   method: 'POST',
  //   body: formdata,
  //   redirect: 'follow'
  // };
  // await fetch("https://backend-crowdshipping.herokuapp.com/company/singlepicture", requestOptions)
  //   .then(res => res.json())
  //   .then(data => {
  //     // setPhoto(data.secure_url)
  //     console.log()
  //     imgdata.push({ name: d.name, url: data.imageUrl })
  //     // console.log('res', data.imageUrl)
  //   }).catch(err => {
  //     console.log('err', err)
  //     error.push({ error: true, err: err, name: d.name })
  //     isError = true
  //     // Alert.alert("An Error Occured While Uploading")
  //   })
  // if (isError) {
  //   return error
  // } else {
  //   // console.log(imgdata)
  //   return imgdata
  // }
  // .then(response => response.text())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));
  // })
};

//////api for ge airport from
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

export const getAllFlightAddedByProvider = userId => {
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
export const changePostRequestStatus = (postRequestId: any, providerId: any) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "connect.sid=s%3AU8xqFWhyglrgAoqvsfZ0nifDa86VtpSA.MZnOyFTVT5%2F%2BxQrtKBbN3zjecsYAf7uG7WK8gVXdRzg");

  var raw = JSON.stringify({
    "postrequestId": postRequestId,
    "providerId": providerId
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch("https://backend-crowdshipping.herokuapp.com/provider/changepostrequeststatus", requestOptions)
};


export const addFlightAfterPost = (flightDataFromPostRequest: any) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "connect.sid=s%3AU8xqFWhyglrgAoqvsfZ0nifDa86VtpSA.MZnOyFTVT5%2F%2BxQrtKBbN3zjecsYAf7uG7WK8gVXdRzg");

  var formdata = new FormData();
  formdata.append("providerId", flightDataFromPostRequest.providerId);
  formdata.append("pickupCity", flightDataFromPostRequest.pickupCity);
  formdata.append("dropoffCity", flightDataFromPostRequest.dropoffCity);
  formdata.append("flightDate", flightDataFromPostRequest.flightDate);
  formdata.append("departureAirport", flightDataFromPostRequest.departureAirport);
  formdata.append("destinationAirport", flightDataFromPostRequest.destinationAirport);
  formdata.append("departureTime", flightDataFromPostRequest.departureTime);
  formdata.append("destinationTime", flightDataFromPostRequest.destinationTime);
  formdata.append("flightNumber", flightDataFromPostRequest.flightNumber);
  formdata.append("flightAirline", flightDataFromPostRequest.flightAirline);
  formdata.append("ticketImage", flightDataFromPostRequest.ticketImage);
  formdata.append("fa_flight_id", flightDataFromPostRequest.fa_flight_id);
  formdata.append("pickupIATACityCode", flightDataFromPostRequest.pickupIATACityCode);
  formdata.append("dropoffIATACityCode", flightDataFromPostRequest.dropoffIATACityCode);
  formdata.append("postrequestId", flightDataFromPostRequest.postrequestId);
  formdata.append("customerId", flightDataFromPostRequest.customerId);
  formdata.append("bookingId", flightDataFromPostRequest.bookingId);
  formdata.append("flightarrivalDate", flightDataFromPostRequest.flightarrivalDate);


  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  return fetch("https://backend-crowdshipping.herokuapp.com/provider/addflightafterpost", requestOptions);

}

export const changeStateByProvider = (state: any, requestId: any) => {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "connect.sid=s%3AO0hdh4M60sPg4fyfkl3hiJQ4QV-SDmtp.9vDASPjdRAnclaACJt0TRhCqyZ%2B03rrqfqfN3fRXeEg");

  var raw = JSON.stringify({
    "requestId": requestId,
    "state": state
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch("https://backend-crowdshipping.herokuapp.com/provider/setrequeststate", requestOptions);

}

export const verifyBookingForCompletion = (image: any, requestId: any) => {
  console.log("verify booking for completion image requestID ", image, requestId);
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "connect.sid=s%3AO0hdh4M60sPg4fyfkl3hiJQ4QV-SDmtp.9vDASPjdRAnclaACJt0TRhCqyZ%2B03rrqfqfN3fRXeEg");
  var formdata = new FormData();
  formdata.append("verificationImage", image);
  formdata.append("requestId", requestId);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  return fetch("https://backend-crowdshipping.herokuapp.com/provider/verifyingbookingcompletion", requestOptions);
}