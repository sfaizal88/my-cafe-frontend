/**
 * 
 * Notification component
 * @author - Faizal 
 * @date - 23rd August 2024
 * 
 */
// GENERIC IMPORT
import clsx from 'clsx';
import {useEffect, Dispatch, SetStateAction} from 'react';

// COMMON COMPONENT
import {Alert} from '../../atoms';

// UTILS IMPORT 
import {NotificationEnum} from '../../../utils/enum';
import {NotificationContextType} from '../../../utils/types';

// STYLE IMPORT
import './styles.css';

// COMPONENT PROPS
export type NotificationProps = NotificationContextType & {
    setNotification: Dispatch<SetStateAction<NotificationContextType>>
}

const Notification = ({
    message,
    type,
    isOpen,
    setNotification,
}: NotificationProps) => {
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setNotification({message: '', isOpen: false, type}), 10000);
        }
    }, [isOpen])// eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <div className={clsx('notify-container', isOpen && 'show-notification')}>
            <Alert type={NotificationEnum.error === type ? NotificationEnum.error: NotificationEnum.success} message={message}/>
        </div>  
    )
}

export default Notification;