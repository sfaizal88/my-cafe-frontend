/**
 * 
 * App Routes
 * @author - Faizal 
 * @date - 23rd August 2024
 * 
 */
// GENERIC IMPORT
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// ROUTER IMPORT
import './styles.css';
import * as PATH from './constants';

// COMMON IMPORT 
import Header from '../pages/common/header';
import Footer from '../pages/common/footer';
import Menu from '../pages/common/menu';
import NoPage from '../pages/common/error/noPage';

// PAGE IMPORT
import CafeShopPage from '../pages/cafeShop';
import AddCafeShopPage from '../pages/cafeShop/components/addCafeShop';
import ViewCafeShopPage from '../pages/cafeShop/components/viewCafeShop';
import EmployeePage from '../pages/employee';
import AddEmployeePage from '../pages/employee/components/addEmployee';
import ViewEmployeePage from '../pages/employee/components/viewEmployee';

const AppRoutes = () => {
    // DECLARE STATE
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

    // RENDER HTML
    return (
        <div className="app-container">
            <div className="left-layout">
                <Menu {...{showMobileMenu, setShowMobileMenu}}/>
            </div>
            <div className="right-layout">
                <Header {...{setShowMobileMenu}}/>
                <div className="body-content">
                    <Routes>
                        <Route path={PATH.ALL_CAFE_PATH} element={<CafeShopPage />}/>
                        <Route path={`${PATH.ADD_CAFE_PATH}/:id?`} element={<AddCafeShopPage />}/>
                        <Route path={`${PATH.VIEW_CAFE_PATH}/:id`} element={<ViewCafeShopPage />}/>
                        <Route path={PATH.ALL_EMPLOYEE_PATH} element={<EmployeePage />}/>
                        <Route path={`${PATH.ADD_EMPLOYEE_PATH}/:id?`} element={<AddEmployeePage />}/>
                        <Route path={`${PATH.VIEW_EMPLOYEE_PATH}/:id`} element={<ViewEmployeePage />}/>
                        <Route path="*" element={<NoPage />} />
                    </Routes>
                </div>
                <Footer/>
            </div>
        </div>
    );
};

export default AppRoutes;