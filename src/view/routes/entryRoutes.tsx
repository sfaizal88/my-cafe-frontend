/**
 * 
 * Entry Routes
 * @author - Faizal 
 * @date - 23rd August 2024
 * 
 */
// GENERIC IMPORT
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// ROUTER IMPORT
import AppRoutes from './appRoutes';
import * as PATH from './constants';

// ENTRY ROUTER VARIABLE DECLARE
const EntryRoutes = () => (
  <BrowserRouter basename="">
    <Routes>
      <Route path={PATH.OTHER_PATH} element={<AppRoutes />}/>
    </Routes>
  </BrowserRouter>
);

// EXPORT COMPONENT
export default EntryRoutes;
