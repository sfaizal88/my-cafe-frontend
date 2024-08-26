/**
 * View Cafe Shop Page component
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import {Box} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';

// COMMON COMPONENT
import { Container, Loader, Button } from '../../../atoms';
import {FormRow} from '../../../molecules';

// ROUTER IMPORT
import * as PATH from '../../../routes/constants';

// API CALL
import {useCafeShopByIdQuery} from '../../../../api/cafeShop';

// STYLE IMPORT
import '../styles.css';

const ViewCafeShopPage = () => {
    // PARAM AND CUSTOME HOOK
    const { id } = useParams();

    // API CALL
    const {isLoading, data} = useCafeShopByIdQuery(id);

    // DECLARE NAVIGATE
    const navigate = useNavigate();

    if (isLoading) return <Loader/>

    return (
        <Container title='View Cafe shop details' info="You can view the cafe shop details here.">
            <Box display='flex' flex={1} mb={1}>
                <Box flex={1}>
                    <FormRow label="Cafe shop name">
                        {data.output?.name}
                    </FormRow>
                </Box>
            </Box>
            <Box display='flex' flex={1} mb={1}>
                <Box flex={1}>
                    <FormRow label="Total Employees">
                        <i className="fa fa-users" aria-hidden="true"></i>&nbsp;&nbsp;{data.output?.total_employees || '0'}
                    </FormRow>
                </Box>
                <Box flex={1}>
                    <FormRow label="Location">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;{data.output.location}
                    </FormRow>
                </Box>
            </Box>
            <Box display='flex' flex={1} mb={1}>
                <Box flex={1}>
                    <FormRow label="Description">
                        <Box className='flex flex-1'>{data.output.description}</Box>
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