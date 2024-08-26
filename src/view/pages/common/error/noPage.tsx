/**
 * 
 * No page found component
 * @author - Faizal 
 * @date - 23rd August 2024
 * 
 */
// GENERIC IMPORT
import {useNavigate} from 'react-router-dom';

// COMMON COMPONENT
import { Button} from '../../../atoms';
import { EmptyScreen } from '../../../molecules';

// ROUTER IMPORT
import * as PATH from '../../../routes/constants';

const NoPage = () => {
    // DECLARE NAVIGATE
    const navigate = useNavigate();

    // GO TO SPECIFIC PAGE
    const gotoPage = (path: string) => {
        navigate(path);
    }
    return (
        <EmptyScreen
            title="No page found"
            subtitle="Sorry, the page you are looking for does not exist."
            button={<Button label="Go to My Cafe" type='button' onClickHandler={() => gotoPage(PATH.ALL_CAFE_PATH)}/>}
            icon={<i className="fa fa-ban" aria-hidden="true"></i>}
        />
    );
};

export default NoPage;