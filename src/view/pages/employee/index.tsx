/**
 * Employee component
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import {Box, Grid} from '@mui/material';
import {useEffect, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';

// COMMON COMPONENT
import { Container, Loader, SearchField, Button, ConfirmModel } from '../../atoms';
import { EmptyScreen } from '../../molecules';

// UTILS IMPORT
import type {EmployeeType} from '../../../utils/types';
import {GenderOptions} from '../../../utils/constants';
import {getDifferenceBetweenTwoDate} from '../../../utils';

// ROUTER IMPORT
import * as PATH from '../../routes/constants';

// CUSTOME HOOK 
import {useManageEmployeeHook} from './useHook';


// STYLE IMPORT
import './styles.css';


const EmployeePage = () => {
    // DECLARE STATE
    const [unchangedEmployeeList, setUnchangedEmployeeList] = useState<EmployeeType[]>([]);
    const [employeeList, setEmployeeList] = useState<EmployeeType[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType>({} as EmployeeType);
    const [isDeleteModelOpen, setDeleteModelOpen] = useState<boolean>(false);
    const cellWidth = [2, 2, 2, 1, 1, 2, 2];

    // DECLARE NAVIGATE
    const navigate = useNavigate();
    const manageEmployeeHook = useManageEmployeeHook({
        setEmployeeList,
        setLoading,
        setUnchangedEmployeeList,
    });

    // GO TO SPECIFIC PAGE
    const gotoPage = (path: string) => {
        navigate(path);
    }

    // HANDLE FILTER LIST
    const handleFilterChange = (event: any) => {
        const keyword = event.target.value.trim();
        const output = unchangedEmployeeList.filter(item => !keyword || item.cafe_shop_name.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
        setSearchKeyword(keyword);
        setEmployeeList(output);
    };

    useEffect(() => {
        manageEmployeeHook.getEmployeeList();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (isLoading) return <Loader/>

    return (
        <Container title='All Employee' info="A list of all the users in your account including their name, email and phone.">
            <Box className='table-controller'>
                <Box flex={1}>
                <SearchField name="search-field" placeholder="Search by cafe shop(s) name" 
                        onChangeHandler={handleFilterChange} value={searchKeyword}/>
                </Box>
                <Box className='text-right' flex={3}>
                    <Button label="Create new employee" type='button' onClickHandler={() => gotoPage(PATH.ADD_EMPLOYEE_PATH)}/>
                </Box>
            </Box>
            <Grid container className='table-header'>
                <Grid item xs={cellWidth[0]}>Name (ID)</Grid>
                <Grid item xs={cellWidth[1]}>Email</Grid>
                <Grid item xs={cellWidth[2]}>Phone</Grid>
                <Grid item xs={cellWidth[3]}>Gender</Grid>
                <Grid item xs={cellWidth[4]}>Duration</Grid>
                <Grid item xs={cellWidth[5]}>Cafe</Grid>
                <Grid item xs={cellWidth[6]} className='text-right'>Actions</Grid>
            </Grid>
            {employeeList?.length > 0  ? 
            employeeList.map(item => (
                <Grid container className='table-row' key={`employee-list-${item.id}`}>
                    <Grid item xs={cellWidth[0]}>{item.name} ({item.id})</Grid>
                    <Grid item xs={cellWidth[1]}>
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{item.email_address}
                    </Grid>
                    <Grid item xs={cellWidth[2]}>
                        <i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;{item.phone_number}
                    </Grid>
                    <Grid item xs={cellWidth[3]}>{GenderOptions.find(gender => gender.value === item.gender)?.label || ''}</Grid>
                    <Grid item xs={cellWidth[4]}>{item?.job_start_date ? getDifferenceBetweenTwoDate(item.job_start_date) : 0} day(s)
                    </Grid>
                    <Grid item xs={cellWidth[2]}>
                        <i className="fa fa-coffee" aria-hidden="true"></i>&nbsp;&nbsp;{item.cafe_shop_name}
                    </Grid>
                    <Grid item xs={cellWidth[5]} className='text-right'>
                        <Link to={`${PATH.ADD_EMPLOYEE_PATH}/${item.id}`}>Edit</Link>&nbsp;&nbsp;|&nbsp;&nbsp; 
                        <Box className='link' onClick={() => {setSelectedEmployee(item);setDeleteModelOpen(true)}}>Delete</Box>&nbsp;&nbsp;|&nbsp;&nbsp; 
                        <Link to={`${PATH.VIEW_EMPLOYEE_PATH}/${item.id}`}>View</Link>
                    </Grid>
                </Grid>)) : 
                <EmptyScreen
                    title="No employee found"
                    subtitle="Please add new employee by clicking create new employee button"
                    button={<Button label="Create new employee" type='button' onClickHandler={() => gotoPage(PATH.ADD_EMPLOYEE_PATH)}/>}
                    icon={<i className="fa fa-ban" aria-hidden="true"></i>}
                />}
                {isDeleteModelOpen && <ConfirmModel 
                    confirmBtnLabel='Delete' confirmBtnEvent={() => {manageEmployeeHook.deleteEmployeeById(selectedEmployee.id || '');setDeleteModelOpen(false);}}
                    cancelBtnLabel='Cancel' cancelBtnEvent={() => setDeleteModelOpen(false)}
                    title='Delete Employee'
                    info={`Do you want to delete the employee "${selectedEmployee.name}"?`}
                />}
        </Container>
    )
}

export default EmployeePage;