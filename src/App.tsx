/**
 * App component
 * @author - Faizal
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import {useState} from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

  // TANSTACK QUERY
  const queryClient = new QueryClient();

  // GENERAL DECLARE VARIABLE
  const value = { notification, setNotification };

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationContext.Provider value={value}>
        <EntryRoutes/>
        <Notification {...value.notification} setNotification={setNotification}/>
      </NotificationContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
