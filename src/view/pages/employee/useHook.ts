/**
 * Manage Employee
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import {Dispatch, SetStateAction} from 'react';
import {useNavigate} from 'react-router-dom';

// UTILS IMPORT
import type {EmployeeType} from '../../../utils/types';

// ROUTER IMPORT
import * as PATH from '../../routes/constants';

// UTILS IMPORT
import { formValidationMessages } from '../../../utils/validationMessages';
import useNotification from '../../../utils/notification';

// API IMPORT
import {
    useDeleteEmployeeByIdMutation, 
    useCreateEmployeeMutation,
    useUpdateEmployeeMutation
} from '../../../api/employee';

type ManageEmployeeHookProps = {
    setLoading: Dispatch<SetStateAction<boolean>>;
    employeeId?: string
}

export function useManageEmployeeHook({
    setLoading,
    employeeId
}: ManageEmployeeHookProps) {

    // DECLARE API CALL
    const deleteEmployeeByIdMutation = useDeleteEmployeeByIdMutation();
    const createEmployeeMutation = useCreateEmployeeMutation();
    const updateEmployeeMutation = useUpdateEmployeeMutation(employeeId);

    // NOTIFICATION
    const setNotification = useNotification();

    // NAVIAGTE
    const navigate = useNavigate();

    const saveEmployee = async (postData: EmployeeType) => {
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
                    navigate(PATH.ALL_EMPLOYEE_PATH);
                }
                setLoading(false);
            },
            onError(e: unknown) {
                setNotification.error(e); 
            },
        };
        if (postData.id) {
            updateEmployeeMutation.mutate(formDataToAPIData(postData), postResponse);
        } else {
            createEmployeeMutation.mutate(formDataToAPIData(postData), postResponse);
        }
    }

    const deleteEmployeeById = async (id: string) => {
        deleteEmployeeByIdMutation.mutate(id, {
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

    const formDataToAPIData = (data: EmployeeType) => {
        return {
            ...data,
            name: data.name.trim(),
            email_address: data.email_address.trim(),
            phone_number: data.phone_number.trim(),
        }
    }

    return {
        saveEmployee,
        deleteEmployeeById,
    }
}