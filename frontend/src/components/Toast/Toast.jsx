import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (type, message, onClose) => {
    toast[type](message,  {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        onClose: onClose,
        });
};

export default showToast;
