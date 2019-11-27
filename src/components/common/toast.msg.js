import React from 'react';
import {ToastsContainer, ToastsStore} from 'react-toasts';

const toastType = {
    1   : (msg)=>ToastsStore.success(msg),
    2   : (msg)=>ToastsStore.warning(msg),
    3   : (msg)=>ToastsStore.info(msg),
    4   : (msg)=>ToastsStore.error(msg)
}

const show = () => ToastsStore.success("hi");

const showToast = (toastTypeID, toastMsg) => {
    console.log("reached")
    show()
    return (
        <div>
            <ToastsContainer store={ToastsStore}/>
        </div>
    )
}

export default showToast;