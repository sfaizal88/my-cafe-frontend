/**
 * Manage Cafe hook as cafe shop form
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import {Dispatch, SetStateAction} from 'react';
import {useNavigate} from 'react-router-dom';

// UTILS IMPORT
import type {CafeShopType, RefetchFunction} from '../../../utils/types';

// ROUTER IMPORT
import * as PATH from '../../routes/constants';

// UTILS IMPORT
import { formValidationMessages } from '../../../utils/validationMessages';
import useNotification from '../../../utils/notification';

// API IMPORT
import {
    useDeleteCafeShopByIdMutation, 
    useCreateCafeShopMutation,
    useUpdateCafeShopMutation
} from '../../../api/cafeShop';

type ManageCafeShopHookProps = {
    setLoading: Dispatch<SetStateAction<boolean>>;
    cafeShopId?: string;
}

export function useManageCafeShopHook({
    setLoading,
    cafeShopId
}: ManageCafeShopHookProps) {

    // DECLARE API CALL
    const deleteCafeShopByIdMutation = useDeleteCafeShopByIdMutation();
    const createCafeShopMutation = useCreateCafeShopMutation();
    const updateCafeShopMutation = useUpdateCafeShopMutation(cafeShopId);

    // NOTIFICATION
    const setNotification = useNotification();

    // NAVIAGTE
    const navigate = useNavigate();

    const saveCafeShop = async (postData: CafeShopType) => {
        // FORMING POST RESPONSE
        const postResponse = {
            onSuccess: (response: any) => {
                if (!response.ok) {
                    setNotification.error();
                } else {
                    if (postData?.id) {
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
            },
        };
        if (postData.id) {
            updateCafeShopMutation.mutate(formDataToAPIData(postData), postResponse);
        } else {
            createCafeShopMutation.mutate(formDataToAPIData(postData), postResponse);
        }
    }

    const deleteCafeShopById = async (id: string, refetch?: RefetchFunction) => {
        deleteCafeShopByIdMutation.mutate(id, {
            onSuccess: (response: any) => {
                // IF ERROR COMES
                if (!response.ok) {
                    setNotification.error();
                } else {
                    setNotification.success(formValidationMessages.deleted);
                    refetch?.();
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