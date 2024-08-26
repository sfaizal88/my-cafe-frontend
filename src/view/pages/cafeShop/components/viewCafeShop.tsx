/**
 * View Cafe Shop Page component
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import {Box} from '@mui/material';
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

// COMMON COMPONENT
import { Container, Loader, Button } from '../../../atoms';
import {FormRow} from '../../../molecules';

// UTILS IMPORT
import type {CafeShopType} from '../../../../utils/types';

// ROUTER IMPORT
import * as PATH from '../../../routes/constants';

// CUSTOME HOOK 
import {useManageCafeShopHook} from '../useHook';

// STYLE IMPORT
import '../styles.css';

const ViewCafeShopPage = () => {
    // DECLARE STATE
    const [cafeShop, setCafeShop] = useState<CafeShopType>({} as CafeShopType);
    const [isLoading, setLoading] = useState<boolean>(true);

    // PARAM AND CUSTOME HOOK
    const { id } = useParams();
    const manageCafeShopHook = useManageCafeShopHook({
        setLoading
    });

    // DECLARE NAVIGATE
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const response = await manageCafeShopHook.getCafeShopById(id);
                setCafeShop(response);
            }
        };
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (isLoading) return <Loader/>

    return (
        <Container title='View Cafe shop details' info="You can view the cafe shop details here.">
            <Box display='flex' flex={1} mb={1}>
                <Box flex={1}>
                    <FormRow label="Cafe shop name">
                        {cafeShop?.name}
                    </FormRow>
                </Box>
            </Box>
            <Box display='flex' flex={1} mb={1}>
                <Box flex={1}>
                    <FormRow label="Total Employees">
                        <i className="fa fa-users" aria-hidden="true"></i>&nbsp;&nbsp;{cafeShop?.total_employees || '0'}
                    </FormRow>
                </Box>
                <Box flex={1}>
                    <FormRow label="Location">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;{cafeShop.location}
                    </FormRow>
                </Box>
            </Box>
            <Box display='flex' flex={1} mb={1}>
                <Box flex={1}>
                    <FormRow label="Description">
                        <Box className='flex flex-1'>{cafeShop.description}</Box>
                    </FormRow>
                </Box>
            </Box>
            <Box display='flex' flex={1} mt={2}>
                <Box className='flex-1 text-right mr-3'>
                    <Button label="Back" type='button' isSecondary onClickHandler={() => navigate(PATH.ALL_CAFE_PATH)} externalClassName='mt-3 sm:mt-0'/>
                </Box>
            </Box>
                    
            
        </Container>
    )
}

export default ViewCafeShopPage;