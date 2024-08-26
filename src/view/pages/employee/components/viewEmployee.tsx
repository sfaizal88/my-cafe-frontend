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
import {FormRow, EmptyLabel} from '../../../molecules';

// UTILS IMPORT
import type {EmployeeType} from '../../../../utils/types';
import {GenderOptions} from '../../../../utils/constants';
import {getDifferenceBetweenTwoDate} from '../../../../utils';

// ROUTER IMPORT
import * as PATH from '../../../routes/constants';

// CUSTOME HOOK 
import {useManageEmployeeHook} from '../useHook';

// STYLE IMPORT
import '../styles.css';

const ViewEmployeePage = () => {
    // DECLARE STATE
    const [employee, setEmployee] = useState<EmployeeType>({} as EmployeeType);
    const [isLoading, setLoading] = useState<boolean>(true);

    // PARAM AND CUSTOME HOOK
    const { id } = useParams();
    const manageEmployeeHook = useManageEmployeeHook({
        setEmployee,
        setLoading
    });

    // DECLARE NAVIGATE
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const response = await manageEmployeeHook.getEmployeeById(id);
                setEmployee(response);
            }
        };
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (isLoading) return <Loader/>

    return (
        <Container title='View Employee details' info="You can view the Employee details here.">
            <Box display='flex' flex={1} mb={1}>
                <Box flex={1}>
                    <FormRow label="Name (ID)">
                        {employee.name} ({employee?.id})
                    </FormRow>
                </Box>
                <Box flex={1}>
                    <FormRow label="Cafe shop">
                        {employee.cafe_shop_name? (<><i className="fa fa-coffee" aria-hidden="true"></i>&nbsp;&nbsp;{employee.cafe_shop_name}</>) : <EmptyLabel/>}
                    </FormRow>
                </Box>
            </Box>
            <Box display='flex' flex={1} mb={1}>
                <Box flex={1}>
                    <FormRow label="Email address">
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{employee.email_address}
                    </FormRow>
                </Box>
                <Box flex={1}>
                    <FormRow label="Contact no">
                        <i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;{employee.phone_number}
                    </FormRow>
                </Box>
            </Box>
            <Box display='flex' flex={1} mb={1}>
                <Box flex={1}>
                    <FormRow label="Gender">
                        {GenderOptions.find(gender => gender.value === employee.gender)?.label || ''}
                    </FormRow>
                </Box>
                <Box flex={1}>
                    <FormRow label="Duration">
                        {employee?.job_start_date && employee?.cafe_shop_id ? getDifferenceBetweenTwoDate(employee.job_start_date) : 0} day(s)
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