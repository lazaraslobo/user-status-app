import {getLocalStorage} from '../utilities/local-storage.util';
import fetchData from '../core/api/api.service';

const goToRoute = (supParentProps, route) =>{
    supParentProps.history.push(route);
}

const checkSession = (parentProps) =>{
    let localData = getLocalStorage();
    let localSessionHash = localData && localData.session_hash ? localData.session_hash : false; 

    if(!localSessionHash){
        goToRoute(parentProps, '/login');
        return;
    }

    let res = {isValidHash : false};//fetchData(4, 1, {session_hash : localSessionHash});
    if(res.isValidHash){
        return{
            isValidHash     :       true
        }
    }else{
        goToRoute(parentProps, '/login');
        return false;
    }
}

export default checkSession;