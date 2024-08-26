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
import {FormRow, EmptyLabel} from '../../../molecules';

// UTILS IMPORT
import {GenderOptions} from '../../../../utils/constants';
import {getDifferenceBetweenTwoDate} from '../../../../utils';

// API CALL
import {useEmployeeByIdQuery} from '../../../../api/employee';

// ROUTER IMPORT
import * as PATH from '../../../routes/constants';

// STYLE IMPORT
import '../styles.css';

const ViewEmployeePage = () => {

    // PARAM AND CUSTOME HOOK
    const { id } = useParams();

    // API CALL
    const {isLoading, data} = useEmployeeByIdQuery(id);

    // DECLARE NAVIGATE
    const navigate = useNavigate();

    if (isLoading) return <Loader/>

    return (
        <Container title='View Employee details' info="You can view the Employee details here.">
            <Box display='flex' flex={1} mb={1}>
                <Box flex={1}>
                    <FormRow label="Name (ID)">
                        {data.output?.name} ({data.output?.id})
                    </FormRow>
                </Box>
                <Box flex={1}>
                    <FormRow label="Cafe shop">
                        {data.output?.cafe_shop_name? (<><i className="fa fa-coffee" aria-hidden="true"></i>&nbsp;&nbsp;{data.output?.cafe_shop_name}</>) : <EmptyLabel/>}
                    </FormRow>
                </Box>
            </Box>
            <Box display='flex' flex={1} mb={1}>
                <Box flex={1}>
                    <FormRow label="Email address">
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{data.output?.email_address}
                    </FormRow>
                </Box>
                <Box flex={1}>
                    <FormRow label="Contact no">
                        <i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;{data.output?.phone_number}
                    </FormRow>
                </Box>
            </Box>
            <Box display='flex' flex={1} mb={1}>
                <Box flex={1}>
                    <FormRow label="Gender">
                        {GenderOptions.find(gender => gender.value === data.output?.gender)?.label || ''}
                    </FormRow>
                </Box>
                <Box flex={1}>
                    <FormRow label="Duration">
                        {data.output?.job_start_date && data.output?.cafe_shop_id ? getDifferenceBetweenTwoDate(data.output?.job_start_date) : 0} day(s)
                    </FormRow>
                </Box>
            </Box>
            <Box display='flex' flex={1} mt={2} mr={0}>
                <Box flex={1} className='text-right'>
                    <Button label="Cancel" type='button' isSecondary onClickHandler={() => navigate(PATH.ALL_EMPLOYEE_PATH)}/>
                </Box>
            </Box>
                    
            
        </Container>
    )
}

export default ViewEmployeePage;