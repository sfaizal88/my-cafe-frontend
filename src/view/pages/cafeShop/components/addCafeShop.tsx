/**
 * Add Cafe Page component
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
import { Container, Loader, TextField, Button, TextArea } from '../../../atoms';
import {FormRow} from '../../../molecules';

// UTILS IMPORT
import type {CafeShopType} from '../../../../utils/types';

// ROUTER IMPORT
import * as PATH from '../../../routes/constants';

// LOGIN IMPORT
import schema from '../schema';

// CUSTOME HOOK 
import {useManageCafeShopHook} from '../useHook';

// STYLE IMPORT
import '../styles.css';

const AddCafeShopPage = () => {
    // PARAM
    const { id } = useParams();

    // DECLARE STATE
    const [cafeShop, setCafeShop] = useState<CafeShopType>({} as CafeShopType);
    const [isLoading, setLoading] = useState<boolean>(false);

    // DECLARE NAVIGATE
    const navigate = useNavigate();
    const manageCafeShopHook = useManageCafeShopHook({
        setLoading,
    });

    // REACT HOOK FORM DECLARE
    const {control, handleSubmit, register, formState: { errors }, watch, reset} = useForm<CafeShopType>({
        defaultValues: cafeShop,
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const formWatchData = watch();

    const onSubmit = (formData: CafeShopType) => {
        manageCafeShopHook.saveCafeShop(formData)
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(onSubmit)()
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const response = await manageCafeShopHook.getCafeShopById(id);
                setCafeShop(response);
                reset(response)
            }
        };
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (isLoading) return <Loader/>

    return (
        <Container title={id ? 'Edit Cafe Shop' : 'Create new Cafe Shop'} info="You can create / update cafe shop details.">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display='flex' flex={1}>
                    <Box flex={1}>
                        <input type='hidden' name="id" value={formWatchData.id ?? ''}/>
                        <FormRow label="Cafe shop name" required>
                            <TextField 
                                name="name" 
                                placeholder='Enter the cafe shop name' 
                                value={formWatchData.name}
                                register={register}
                                control={control}
                                errors={errors?.name}
                                handlerKeyDown={handleKeyPress}/>
                        </FormRow>
                    </Box>
                    <Box flex={1}>
                        <FormRow label="Location" required>
                            <TextField 
                            name="location" 
                            placeholder='Enter the cafe shop location' 
                            value={formWatchData.location}
                            register={register}
                            control={control}
                            errors={errors?.location}
                            handlerKeyDown={handleKeyPress}/>
                        </FormRow>
                    </Box>
                </Box>
                
                <Box display="flex" flex={1}>
                    <Box flex={1}>
                        <FormRow label="Description" required>
                            <TextArea 
                                name="description" 
                                placeholder='Enter the description' 
                                value={formWatchData.description} 
                                register={register}
                                control={control}
                                errors={errors?.description}
                                handlerKeyDown={handleKeyPress}
                            />
                        </FormRow>
                    </Box>
                </Box>
                <Box display='flex' flex={1} mt={2} mr={1.5}>
                    <Box flex={1} className='text-right'>
                        <Button label="Cancel" type='button' isSecondary onClickHandler={() => navigate(PATH.ALL_CAFE_PATH)}/>
                        <Button label={id ? "Save Cafe Shop" : "Create Cafe Shop"} type='submit'/>
                    </Box>
                </Box>
            </form>
        </Container>
    )
}

export default AddCafeShopPage;