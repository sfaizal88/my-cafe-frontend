/**
 * Add Employee Page component
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import {Box} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';

// COMMON COMPONENT
import { Container, Loader, TextField, Button, SelectTag } from '../../../atoms';
import {FormRow} from '../../../molecules';

// UTILS IMPORT
import type {EmployeeType} from '../../../../utils/types';
import {GenderOptions} from '../../../../utils/constants';

// ROUTER IMPORT
import * as PATH from '../../../routes/constants';

// LOGIN IMPORT
import schema from '../schema';

// CUSTOME HOOK 
import {useManageEmployeeHook} from '../useHook';

// API CALL
import {useEmployeeByIdQuery, useEmployeeListQuery} from '../../../../api/employee';
import {useCafeShopOptionsQuery} from '../../../../api/cafeShop';

// STYLE IMPORT
import '../styles.css';

const AddEmployeePage = () => {
    // PARAM
    const { id } = useParams();

    // API CALL
    const employeeByIdQuery = useEmployeeByIdQuery(id);
    const cafeShopOptionsQuery = useCafeShopOptionsQuery();
    const employeeListQuery = useEmployeeListQuery();

    // DECLARE STATE
    const [isPageLoading, setLoading] = useState<boolean>(false);

    // DECLARE NAVIGATE
    const navigate = useNavigate();
    const manageEmployeeHook = useManageEmployeeHook({
        setLoading,
        employeeId: id
    });

    // REACT HOOK FORM DECLARE
    const {control, handleSubmit, register, formState: { errors }, watch, reset} = useForm<EmployeeType>({
        defaultValues: {} as EmployeeType,
        mode: 'onChange',
        resolver: yupResolver(schema({datalist: employeeListQuery?.data?.output || [], employeeId: id})),
    });
    const formWatchData = watch();

    const onSubmit = (formData: EmployeeType) => {
        manageEmployeeHook.saveEmployee(formData)
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(onSubmit)()
        }
    };
    
    useEffect(() => {
        if (id && !employeeByIdQuery.isLoading) {
            reset(employeeByIdQuery.data.output)
        }
    }, [employeeByIdQuery.data]);// eslint-disable-line react-hooks/exhaustive-deps

    if (isPageLoading || employeeByIdQuery.isLoading || cafeShopOptionsQuery.isLoading) return <Loader/>

    return (
        <Container title={id ? 'Edit Employee' : 'Create new Employee'} info="You can create / update employee details.">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display='flex' flex={1}>
                    <Box flex={1}>
                        <input type='hidden' name="id" value={formWatchData.id ?? ''}/>
                        <FormRow label="Name" required>
                            <TextField 
                                name="name" 
                                placeholder='Enter the name' 
                                value={formWatchData.name}
                                register={register}
                                control={control}
                                errors={errors?.name}
                                handlerKeyDown={handleKeyPress}/>
                        </FormRow>
                    </Box>
                    <Box flex={1}>
                        <FormRow label="Gender" required>
                            <SelectTag 
                                name="gender" 
                                options={GenderOptions} 
                                value={formWatchData?.gender} 
                                register={register}
                                control={control}
                                errors={errors?.gender}
                                placeholderOption='Select the gender'/>
                        </FormRow>
                    </Box>
                </Box>
                
                <Box display="flex" flex={1}>
                    <Box flex={1}>
                        <FormRow label="Email address" required>
                            <TextField 
                                name="email_address" 
                                placeholder='Enter the email address' 
                                value={formWatchData.email_address}
                                register={register}
                                control={control}
                                errors={errors?.email_address}
                                handlerKeyDown={handleKeyPress}/>
                        </FormRow>
                    </Box>
                    <Box flex={1}>
                        <FormRow label="Contact no" required>
                            <TextField 
                                name="phone_number" 
                                placeholder='Enter the contact no' 
                                value={formWatchData.phone_number}
                                register={register}
                                control={control}
                                errors={errors?.phone_number}
                                handlerKeyDown={handleKeyPress}/>
                        </FormRow>
                    </Box>
                </Box>
                <Box display="flex" flex={1}>
                    <Box flex={1}>
                        <FormRow label="Cafe Shop">
                            <SelectTag 
                                name="cafe_shop_id" 
                                options={cafeShopOptionsQuery?.data ? cafeShopOptionsQuery.data : []} 
                                value={formWatchData?.cafe_shop_id || ''} 
                                register={register}
                                control={control}
                                placeholderOption='Select the Cafe shop'
                                errors={errors?.cafe_shop_id}/>
                        </FormRow>
                    </Box>
                </Box>
                <Box display='flex' flex={1} mt={2} mr={1.5}>
                    <Box flex={1} className='text-right'>
                        <Button label="Cancel" type='button' isSecondary onClickHandler={() => navigate(PATH.ALL_EMPLOYEE_PATH)}/>
                        <Button label={id ? "Save Employee" : "Create Employee"} type='submit'/>
                    </Box>
                </Box>
            </form>
        </Container>
    )
}

export default AddEmployeePage;