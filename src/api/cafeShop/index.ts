/**
 * Cafe shop API
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import { useQuery, useQueryClient, useMutation, QueryFunctionContext } from '@tanstack/react-query';

// API IMPORT
import queryKeys from './queryKeys';
import {callDataAPI} from '../apiCalls';
import {
    GET_ALL_CAFE_SHOP_API, 
    DELETE_SHOP_CAFE_API,
    GET_CAFE_SHOP_API,
    CREATE_SHOP_CAFE_API,
    UPDATE_SHOP_CAFE_API
} from '../constants';

// UTILS IMPORT
import {CafeShopType} from '../../utils/types';

// USE TO FETCH ALL CAFE SHOP
export function useCafeShopListQuery() {
    return useQuery({ 
        queryKey: queryKeys.cafeShopList, 
        queryFn: getCafeShopListAPI
    });
}

// USE TO FETCH ALL CAFE SHOP AS OPTIONS
export function useCafeShopOptionsQuery() {
    return useQuery({
        queryKey: queryKeys.cafeShopList, 
        queryFn: getCafeShopListAPI,
        select: ({output}) => output.map((item: CafeShopType) => ({
            label: item.name, value: item.id
        }))
    });
}

// FETCH ALL CAFE SHOP API
const getCafeShopListAPI = () => {
    return callDataAPI({
        url: GET_ALL_CAFE_SHOP_API,
        method: 'GET',
    });
}

// USE TO FETCH SPECIFIC CAFE SHOP BY ID
export function useCafeShopByIdQuery(id?: string) {
    return useQuery({
        queryKey: queryKeys.cafeShopById(id), 
        queryFn: getCafeShopByIdAPI, 
        enabled: Boolean(id)
    });
}

function getCafeShopByIdAPI({
    queryKey: [{id}],
  }: QueryFunctionContext<ReturnType<typeof queryKeys.cafeShopById>>) {
    return callDataAPI({
        url: `${GET_CAFE_SHOP_API}?id=${id}`
    });
}

// USE TO DELETE CAFE SHOP BY ID
export function useDeleteCafeShopByIdMutation() {
    const queryClient = useQueryClient();
    return useMutation({ 
        mutationFn: deleteCafeShopByIdAPI, 
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: queryKeys.cafeShopList});
        },
    });
}

// DELETE CAFE SHOP BY ID API
const deleteCafeShopByIdAPI = (id: string) => {
    return callDataAPI({
        url: `${DELETE_SHOP_CAFE_API}?id=${id}`,
        method: 'DELETE',
    });
}

// USE TO CREATE CAFE SHOP
export function useCreateCafeShopMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCafeShopAPI,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: queryKeys.cafeShopList});
        },
    });
}

// CREATE CAFE SHOP API
const createCafeShopAPI = (data: CafeShopType) => {
    return callDataAPI({
        url: CREATE_SHOP_CAFE_API,
        method: 'POST',
        data: JSON.stringify(data)
    });
}

// USE TO UPDATE CAFE SHOP
export function useUpdateCafeShopMutation(id?: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCafeShopAPI,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: queryKeys.cafeShopList});
            if (id) {
                queryClient.invalidateQueries({ queryKey: queryKeys.cafeShopById(id)}); 
            }
        },
    });
}

// UPDATE CAFE SHOP API
const updateCafeShopAPI = (data: CafeShopType) => {
    return callDataAPI({
        url: UPDATE_SHOP_CAFE_API,
        method: 'PUT',
        data: JSON.stringify(data)
    });
}