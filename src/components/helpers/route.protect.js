import {getLocalStorage} from '../utilities/local-storage.util';
import fetchData from '../core/api/api.service';

const goToRoute = (supParentProps, route) =>{
    supParentProps.history.push(route);
}

const checkSession = (parentProps) =>{
    let localData = getLocalStorage();
    if(localData && Object.keys(localData).length){
        let loclData = {
            email_id     :   localData.email_id,
            session_hash :   localData.session_hash
        }

        fetchData(5, 1, loclData).then(result =>{
            console.log(result)
            if(result.data.isValidHash){
                return{
                    isValidHash     :       true
                }
            }else{
                goToRoute(parentProps, '/login');
                return false;
            }
        });
    }else{
        goToRoute(parentProps, '/login');
        return;
    }
}

export default checkSession;