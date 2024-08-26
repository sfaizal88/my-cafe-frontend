/**
 * Header component
 * @author - Faizal
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import {Box} from '@mui/material';

// IMAGE
import ProfileImage from '../../../../assests/img/profile.png';

// STYLE IMPORT
import './styles.css';

const Header = () => {

    return (
        <header>
            <Box className='header-left-container'>Welcome back, <strong>Ahamed Faizal</strong></Box>
            <Box className='header-right-container'>
                <img src={ProfileImage} width={26} alt="Profile img" className='cursor-pointer'/>
            </Box>
        </header>
    )
}

export default Header;