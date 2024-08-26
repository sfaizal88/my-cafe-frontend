/**
 * 
 * QueryKeys file
 * @author - NA 
 * @date - 24th August, 2024
 * 
 */

// HOLD ALL QUERY KEYS
const queryKeys = {
    employeeList:  [{scope: 'employee', entity: 'all-employee'}] as const,
    employeeById: (id?: string) =>
        [{scope: 'employee', entity: 'employee-by-id', id}] as const,
};

export default queryKeys;