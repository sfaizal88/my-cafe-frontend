/**
 * App component
 * @author - Faizal
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import {useState} from 'react';

// GENERIC COMPONENT IMPORT
import {Notification} from './view/molecules';

// CONTEXT IMPORT
import {NotificationContext} from './context/notificationContext';

// UTILS IMPORT
import {NotificationContextType} from './utils/types';
import {NotificationEnum} from './utils/enum';

// STYLE IMPORT
import './App.css';

// ROUTER IMPORT
import EntryRoutes from './view/routes/entryRoutes';

function App() {
  // STATE DECLARE
  const [notification, setNotification] = useState<NotificationContextType>({
    type: NotificationEnum.success,
    message: '',
    isOpen: false,
  });

  // GENERAL DECLARE VARIABLE
  const value = { notification, setNotification };

  return (
    <NotificationContext.Provider value={value}>
      <EntryRoutes/>
      <Notification {...value.notification} setNotification={setNotification}/>
    </NotificationContext.Provider>
  );
}

export default App;
