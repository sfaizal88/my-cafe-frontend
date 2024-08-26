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
import { Container, Loader, TextField, Button, TextArea, SelectTag } from '../../../atoms';
import {FormRow} from '../../../molecules';

// UTILS IMPORT
import type {EmployeeType, SelectOptionsType} from '../../../../utils/types';
import {GenderEnum} from '../../../../utils/enum';
import {GenderOptions} from '../../../../utils/constants';

// ROUTER IMPORT
import * as PATH from '../../../routes/constants';

// LOGIN IMPORT
import schema from '../schema';

// CUSTOME HOOK 
import {useManageEmployeeHook} from '../useHook';

// STYLE IMPORT
import '../styles.css';

const AddEmployeePage = () => {
    // PARAM
    const { id } = useParams();

    // DECLARE STATE
    const [employee, setEmployee] = useState<EmployeeType>({} as EmployeeType);
    const [cafeShopList, setCafeShopList] = useState<SelectOptionsType[]>([] as SelectOptionsType[]);
    const [isLoading, setLoading] = useState<boolean>(false);

    // DECLARE NAVIGATE
    const navigate = useNavigate();
    const manageEmployeeHook = useManageEmployeeHook({
        setEmployee,
        setLoading,
        setCafeShopList
    });

    // REACT HOOK FORM DECLARE
    const {control, handleSubmit, register, formState: { errors }, watch, reset} = useForm<EmployeeType>({
        defaultValues: employee,
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const formWatchData = watch();

    const onSubmit = (formData: EmployeeType) => {
        console.log(formData)
        manageEmployeeHook.saveEmployee(formData)
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(onSubmit)()
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await manageEmployeeHook.getCafeShopList();
            if (id) {
                const response = await manageEmployeeHook.getEmployeeById(id);
                setEmployee(response);
                reset(response)
            }
        };
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (isLoading) return <Loader/>

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
                                options={cafeShopList.length ? cafeShopList : []} 
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