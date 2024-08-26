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
import {GET_ALL_CAFE_SHOP_API, GET_CAFE_SHOP_API, SUBMIT_SHOP_CAFE_API, DELETE_SHOP_CAFE_API, GET_ALL_CAFE_SHOP_OPTIONS_API} from '../../../api/constants';

type ManageCafeShopHookProps = {
    setLoading: Dispatch<SetStateAction<boolean>>;
    setCafeShopList?: Dispatch<SetStateAction<CafeShopType[]>>;
    setCafeShop?: Dispatch<SetStateAction<CafeShopType>>;
    setUnchangedCafeShopList?: Dispatch<SetStateAction<CafeShopType[]>>;
}

export function useManageCafeShopHook({
    setLoading,
    setCafeShopList,
    setCafeShop,
    setUnchangedCafeShopList,
}: ManageCafeShopHookProps) {

    // NOTIFICATION
    const setNotification = useNotification();

    // NAVIAGTE
    const navigate = useNavigate();

    const getCafeShopList = async () => {
        try {
            const response = await fetch(GET_ALL_CAFE_SHOP_API);
            if (!response.ok) {
                throw new Error("Server error");
            } else {
                const result = await response.json();
                setCafeShopList?.(result.data);
                setUnchangedCafeShopList?.(result.data);
            }
        } catch (error) {
            setNotification.error();
        } finally {
            setLoading(false);
        }
    }

    const saveCafeShop = async (data: CafeShopType) => {
        try {
            console.log("data: ", data);
            
            const response = await fetch(SUBMIT_SHOP_CAFE_API, {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataToAPIData(data)),
            });
            if (!response.ok) {
                throw new Error("Server error");
            }
            if (data?.id) {
                setNotification.success(formValidationMessages.updated);
            } else {
                setNotification.success(formValidationMessages.created);
            }
            navigate(PATH.ALL_CAFE_PATH);
        } catch (error) {
            setNotification.error();
        } finally {
            setLoading(false);
        }
    }

    const getCafeShopById = async (id: string) => {
        let result = {} as CafeShopType;
        try {
            const response = await fetch(`${GET_CAFE_SHOP_API}?id=${id}`);
            if (!response.ok) {
                throw new Error("Server error");
            } else {
                const output = await response.json();
                result = output.data;
            }
        } catch (error) {
            setNotification.error();
        } finally {
            setLoading(false);
        }
        return result;
    }

    const deleteCafeShopById = async (id: string) => {
        try {
            console.log("id: ", id);
            if (id) {
                const response = await fetch(`${DELETE_SHOP_CAFE_API}?id=${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error("Server error");
                } else {
                    setNotification.success(formValidationMessages.deleted);
                    await getCafeShopList();
                    navigate(PATH.ALL_CAFE_PATH);
                }
            }
        } catch (error) {
            setNotification.error();
        } finally {
            setLoading(false);
        }
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
        getCafeShopList,
        saveCafeShop,
        getCafeShopById,
        deleteCafeShopById,
    }
}