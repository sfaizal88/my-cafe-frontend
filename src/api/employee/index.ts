/**
 * Employee API
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import { useQuery, useQueryClient, useMutation, QueryFunctionContext } from '@tanstack/react-query';

// API IMPORT
import queryKeys from './queryKeys';
import {callDataAPI} from '../apiCalls';
import {
    GET_ALL_EMPLOYEE_API, 
    DELETE_EMPLOYEE_API,
    GET_EMPLOYEE_API,
    CREATE_EMPLOYEE_API,
    UPDATE_EMPLOYEE_API
} from '../constants';

// UTILS IMPORT
import {EmployeeType} from '../../utils/types';

// USE TO FETCH ALL EMPLOYEE
export function useEmployeeListQuery() {
    return useQuery({ 
        queryKey: queryKeys.employeeList, 
        queryFn: getEmployeeListAPI
    });
}

// FETCH ALL EMPLOYEE API
const getEmployeeListAPI = () => {
    return callDataAPI({
        url: GET_ALL_EMPLOYEE_API,
        method: 'GET',
    });
}

// USE TO FETCH SPECIFIC EMPLOYEE BY ID
export function useEmployeeByIdQuery(id?: string) {
    return useQuery({
        queryKey: queryKeys.employeeById(id), 
        queryFn: getEmployeeByIdAPI, 
        enabled: Boolean(id)
    });
}

function getEmployeeByIdAPI({
    queryKey: [{id}],
  }: QueryFunctionContext<ReturnType<typeof queryKeys.employeeById>>) {
    return callDataAPI({
        url: `${GET_EMPLOYEE_API}?id=${id}`
    });
}

// USE TO DELETE EMPLOYEE BY ID
export function useDeleteEmployeeByIdMutation() {
    const queryClient = useQueryClient();
    return useMutation({ 
        mutationFn: deleteEmployeeByIdAPI, 
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: queryKeys.employeeList});
        },
    });
}

// DELETE EMPLOYEE BY ID API
const deleteEmployeeByIdAPI = (id: string) => {
    return callDataAPI({
        url: `${DELETE_EMPLOYEE_API}?id=${id}`,
        method: 'DELETE',
    });
}

// USE TO CREATE EMPLOYEE
export function useCreateEmployeeMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createEmployeeAPI,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: queryKeys.employeeList});
        },
    });
}

// CREATE EMPLOYEE API
const createEmployeeAPI = (data: EmployeeType) => {
    return callDataAPI({
        url: CREATE_EMPLOYEE_API,
        method: 'POST',
        data: JSON.stringify(data)
    });
}

// USE TO UPDATE EMPLOYEE
export function useUpdateEmployeeMutation(id?: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateEmployeeAPI,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: queryKeys.employeeList});
            if (id) {
                queryClient.invalidateQueries({ queryKey: queryKeys.employeeById(id)}); 
            }
        },
    });
}

// UPDATE EMPLOYEE API
const updateEmployeeAPI = (data: EmployeeType) => {
    return callDataAPI({
        url: UPDATE_EMPLOYEE_API,
        method: 'PUT',
        data: JSON.stringify(data)
    });
}