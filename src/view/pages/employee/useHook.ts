/**
 * Manage Employee
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import {Dispatch, SetStateAction} from 'react';
import {useNavigate} from 'react-router-dom';

// UTILS IMPORT
import type {EmployeeType, SelectOptionsType} from '../../../utils/types';

// ROUTER IMPORT
import * as PATH from '../../routes/constants';

// UTILS IMPORT
import { formValidationMessages } from '../../../utils/validationMessages';
import useNotification from '../../../utils/notification';

// API IMPORT
import {GET_ALL_EMPLOYEE_API, GET_EMPLOYEE_API, SUBMIT_EMPLOYEE_API, DELETE_EMPLOYEE_API, GET_ALL_CAFE_SHOP_OPTIONS_API} from '../../../api/constants';

type ManageEmployeeHookProps = {
    setLoading: Dispatch<SetStateAction<boolean>>;
    setEmployeeList?: Dispatch<SetStateAction<EmployeeType[]>>;
    setEmployee?: Dispatch<SetStateAction<EmployeeType>>;
    setUnchangedEmployeeList?: Dispatch<SetStateAction<EmployeeType[]>>;
    setCafeShopList?: Dispatch<SetStateAction<SelectOptionsType[]>>;
}

export function useManageEmployeeHook({
    setLoading,
    setEmployeeList,
    setEmployee,
    setUnchangedEmployeeList,
    setCafeShopList,
}: ManageEmployeeHookProps) {

    // NOTIFICATION
    const setNotification = useNotification();

    // NAVIAGTE
    const navigate = useNavigate();

    const getEmployeeList = async () => {
        try {
            const response = await fetch(GET_ALL_EMPLOYEE_API);
            if (!response.ok) {
                throw new Error("Server error");
            } else {
                const result = await response.json();
                setEmployeeList?.(result.data);
                setUnchangedEmployeeList?.(result.data);
            }
        } catch (error) {
            setNotification.error();
        } finally {
            setLoading(false);
        }
    }

    const getCafeShopList = async () => {
        try {
            const response = await fetch(GET_ALL_CAFE_SHOP_OPTIONS_API);
            if (!response.ok) {
                throw new Error("Server error");
            } else {
                const result = await response.json();
                setCafeShopList?.(result.data);
            }
        } catch (error) {
            setNotification.error();
        } finally {
            setLoading(false);
        }
    }

    const saveEmployee = async (data: EmployeeType) => {
        try {
            console.log("data: ", data);
            
            const response = await fetch(SUBMIT_EMPLOYEE_API, {
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
            navigate(PATH.ALL_EMPLOYEE_PATH);
        } catch (error) {
            setNotification.error();
        } finally {
            setLoading(false);
        }
    }

    const getEmployeeById = async (id: string) => {
        let result = {} as EmployeeType;
        try {
            const response = await fetch(`${GET_EMPLOYEE_API}?id=${id}`);
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

    const deleteEmployeeById = async (id: string) => {
        try {
            console.log("id: ", id);
            if (id) {
                const response = await fetch(`${DELETE_EMPLOYEE_API}?id=${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error("Server error");
                } else {
                    setNotification.success(formValidationMessages.deleted);
                    await getEmployeeList();
                    navigate(PATH.ALL_EMPLOYEE_PATH);
                }
            }
        } catch (error) {
            setNotification.error();
        } finally {
            setLoading(false);
        }
    }

    const formDataToAPIData = (data: EmployeeType) => {
        return {
            ...data,
            name: data.name.trim(),
            email_address: data.email_address.trim(),
            phone_number: data.phone_number.trim(),
        }
    }

    return {
        getEmployeeList,
        saveEmployee,
        getEmployeeById,
        deleteEmployeeById,
        getCafeShopList,
    }
}