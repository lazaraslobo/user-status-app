const storageName = "_user_status_app_";

const setLocalStorageData = (data) =>{
    let dataString = JSON.stringify(data);
    return window.localStorage.setItem(storageName, dataString);
}

const getLocalStorage = () =>{
    let locResp = window.localStorage.getItem(storageName);
    return JSON.parse(locResp);
}

const setStorageKeyData = (key, data) =>{
    let localData = getLocalStorage();
    localData[key] = data;
    return setLocalStorageData(localData)
}

const resetLocalStorage = () =>{
    return window.localStorage.removeItem(storageName);
}

const removeKeyStorage = (key) =>{
    let local = getLocalStorage();
    if(local && local[key]){
        delete local[key];
        return setLocalStorageData(local)
    }else{
        return {}
    }
} 

export {
    setLocalStorageData,
    getLocalStorage,
    storageName,
    resetLocalStorage,
    removeKeyStorage,
    setStorageKeyData
};