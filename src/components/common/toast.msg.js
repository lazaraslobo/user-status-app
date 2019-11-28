import React from 'react';
import {ToastsContainer, ToastsStore,  ToastsContainerPosition} from 'react-toasts';

const showToast = (props) => {
    return (
        <ToastsContainer store={props.store} position={ToastsContainerPosition.BOTTOM_CENTER}/>
    )
}

export default showToast;

export let toastStore = ToastsStore;