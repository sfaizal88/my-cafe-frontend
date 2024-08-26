/**
 * 
 * Notification context
 * @author - Faizal 
 * @date - 24th August 2024
 * 
 */
// GENERIC IMPORT
import {createContext, Dispatch, SetStateAction} from 'react';

// UTILS IMPORT
import {NotificationEnum} from '../utils/enum';
import {NotificationContextType} from '../utils/types';

// CREATING CONTEXT WITH INITIAL VALUES
export const NotificationContext = createContext<{ 
    notification: NotificationContextType; 
    setNotification: Dispatch<SetStateAction<NotificationContextType>>
  }>({
    notification: {
      type: NotificationEnum.success,
      message: '',
      isOpen: false,
    },
    setNotification: () => {}
});