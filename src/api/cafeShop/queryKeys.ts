/**
 * 
 * QueryKeys file
 * @author - NA 
 * @date - 24th August, 2024
 * 
 */

// HOLD ALL QUERY KEYS
const queryKeys = {
    cafeShopList:  [{scope: 'cafe-shop', entity: 'all-cafe-shop'}] as const,
    cafeShopById: (id?: string) =>
        [{scope: 'cafe-shop', entity: 'cafe-shop-by-id', id}] as const,
};

export default queryKeys;