/**
 * Menu component
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import clsx from 'clsx';
import {Box} from '@mui/material';
import {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

// ROUTER IMPORT
import * as PATH from '../../../routes/constants';

// STYLE IMPORT
import './styles.css';

const Menu = () => {
    // LOCATION VAR
    const location = useLocation();

    // DECLARE STATE
    const [currentMenu, setCurrentMenu] = useState<string>(location.pathname);

    // DECLARE NAVIGATE
    const navigate = useNavigate();

    const gotoPage = (path: string) => {
        navigate(path);
    }

    // CHECK WHETHER MENU ACTIVE OR NOT
    const isMenuActive = (paths: string[]) => {
        if (paths.length) {
            return paths.some(item => {
                const sublinkPathName = item.split("/")[1];
                const currentMenuPathName = currentMenu.split("/")[1];
                return sublinkPathName === currentMenuPathName;
            })
        }
        return false;
    }

    useEffect(() => {
        setCurrentMenu(location.pathname);
    }, [currentMenu, location.pathname]);

    return (
        <Box className={clsx('menu-container')}>
            <Box className='logo-container'>
                <i className="fa fa-coffee" aria-hidden="true"></i>&nbsp;My Cafe
            </Box>
            <ul className='menu-list'>
                <li className={clsx(isMenuActive([PATH.ALL_CAFE_PATH, PATH.ADD_CAFE_PATH, PATH.VIEW_CAFE_PATH]) && 'active-menu')}>
                    <Box onClick={() => gotoPage(PATH.ALL_CAFE_PATH)}>
                        <i className="fa fa-building-o" aria-hidden="true"></i>&nbsp;Coffee shops
                    </Box>
                </li>
                <li className={clsx(isMenuActive([PATH.ALL_EMPLOYEE_PATH, PATH.VIEW_EMPLOYEE_PATH, PATH.ADD_EMPLOYEE_PATH]) && 'active-menu')}>
                    <Box onClick={() => gotoPage(PATH.ALL_EMPLOYEE_PATH)}>
                        <i className="fa fa-users" aria-hidden="true"></i>&nbsp;All Employee
                    </Box>
                </li>
            </ul>
        </Box>
    )
}

export default Menu;