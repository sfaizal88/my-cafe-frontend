/**
 * 
 * Notification generator
 * @author - Faizal 
 * @date - 24th August 2024
 * 
 */
// GENERIC IMPORT
import {useContext} from 'react';

// UTILS IMPORT
import {formValidationMessages} from './validationMessages';
import {NotificationEnum} from './enum';

// CONTEXT IMPORT
import {NotificationContext} from '../context/notificationContext';

function useNotification() {
    const { notification, setNotification } = useContext(NotificationContext);// eslint-disable-line @typescript-eslint/no-unused-vars

    const error = (message: unknown = formValidationMessages.error) => {
        setNotification({type: NotificationEnum.error, message: message as string, isOpen: true});
    }

    const success = (message: unknown = formValidationMessages.success) => {
        setNotification({type: NotificationEnum.success, message: message as string, isOpen: true});
    }
    return {
        error,
        success,
    }
}

export default useNotification;