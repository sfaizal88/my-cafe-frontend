/**
 * Manage Cafe hook as cafe shop form
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import {Dispatch, SetStateAction} from 'react';
import {useNavigate} from 'react-router-dom';

// UTILS IMPORT
import type {CafeShopType} from '../../../utils/types';

// ROUTER IMPORT
import * as PATH from '../../routes/constants';

// UTILS IMPORT
import { formValidationMessages } from '../../../utils/validationMessages';
import useNotification from '../../../utils/notification';

// API IMPORT
import {useDeleteCafeShopByIdMutation, useCreateMentorMutation} from '../../../api/cafeShop';

type ManageCafeShopHookProps = {
    setLoading: Dispatch<SetStateAction<boolean>>;
}

export function useManageCafeShopHook({
    setLoading,
}: ManageCafeShopHookProps) {

    // DECLARE API CALL
    const deleteCafeShopByIdMutation = useDeleteCafeShopByIdMutation();
    const createMentorMutation = useCreateMentorMutation();

    // NOTIFICATION
    const setNotification = useNotification();

    // NAVIAGTE
    const navigate = useNavigate();

    const saveCafeShop = async (data: CafeShopType) => {
        createMentorMutation.mutate(formDataToAPIData(data), {
            onSuccess: (response: any) => {
                // IF ERROR COMES
                if (response.code === -1) {
                    setNotification.error();
                } else {
                    if (data?.id) {
                        setNotification.success(formValidationMessages.updated);
                    } else {
                        setNotification.success(formValidationMessages.created);
                    }
                    navigate(PATH.ALL_CAFE_PATH);
                }
                setLoading(false);
            },
            onError(e: unknown) {
                setNotification.error(e);
                setLoading(false);
            },
        });
    }

    const deleteCafeShopById = async (id: string) => {
        deleteCafeShopByIdMutation.mutate(id, {
            onSuccess: (response: any) => {
                // IF ERROR COMES
                if (!response.ok) {
                    setNotification.error();
                } else {
                    setNotification.success(formValidationMessages.deleted);
                }
                setLoading(false);
            },
            onError(e: unknown) {
                setNotification.error(e);
                setLoading(false);
            },
        });
    }

    const formDataToAPIData = (data: CafeShopType) => {
        return {
            ...data,
            name: data.name.trim(),
            description: data.description.trim(),
            location: data.location.trim(),
        }
    }

    return {
        saveCafeShop,
        deleteCafeShopById,
    }
}