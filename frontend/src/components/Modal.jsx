import { forwardRef, useImperativeHandle } from "react";
import {createPortal} from 'react-dom';
import { useRef } from "react";

const Modal = forwardRef(function Modal({children},ref){
    const dialog = useRef();


    useImperativeHandle(ref,()=>{
        return{
            open: ()=>{
                dialog.current.showModal();
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 py-10 px-20 rounded-md w-1/2">
            {children}
        </dialog>,
        document.getElementById("modal")
    );
});

export default Modal;