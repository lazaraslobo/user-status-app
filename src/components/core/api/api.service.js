import axios from 'axios';
import qs from 'qs';
import apiMap from './api.map';

const apiMethod = {
    1   : "post",
    2   : "get"
}

const getHeaders = () =>{
    return {
        'Content-Type'  :   'application/x-www-form-urlencoded'
    }
}

const hitAPI = (method, apiUrl, dataToSend) =>{
    return axios({
        method      :   method,
        url         :   apiUrl,
        headers     :   getHeaders(),
        data        :   qs.stringify(dataToSend)
    }).then((response)=>{
        return response.data;
    }).catch((error)=>{
        console.log("API_error 1 =>", error.message);
        throw error;
    });
}

const fetchData = (apiId, methodId, dataToSend) => {
    let apiURL = apiMap[apiId];
    let method = apiMethod[methodId];
    if(!apiURL || !method){
        alert("API id or method missmatch");
        return;
    }

    return hitAPI(method, apiURL, dataToSend);
}

export default fetchData;

