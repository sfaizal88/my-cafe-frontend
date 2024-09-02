/**
 * API URL
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// CAFE SHOP API
// http://localhost:3002
const HOST = "https://my-cafe-backend.onrender.com/";
export const GET_ALL_CAFE_SHOP_API = `${HOST}api/cafes/getAllCafeShop`;
export const GET_CAFE_SHOP_API = `${HOST}api/cafes/getCafeShopDetailsById`;
export const CREATE_SHOP_CAFE_API = `${HOST}api/cafes/createShopCafe`;
export const UPDATE_SHOP_CAFE_API = `${HOST}api/cafes/updateShopCafe`;
export const DELETE_SHOP_CAFE_API = `${HOST}api/cafes/deleteShopCafeById`;

// EMPLOYEE API
export const GET_ALL_EMPLOYEE_API = `${HOST}api/employees/getAllEmployee`;
export const GET_EMPLOYEE_API = `${HOST}api/employees/getEmployeeDetailsById`;
export const CREATE_EMPLOYEE_API = `${HOST}api/employees/createEmployee`;
export const UPDATE_EMPLOYEE_API = `${HOST}api/employees/updateEmployee`;
export const DELETE_EMPLOYEE_API = `${HOST}api/employees/deleteEmployeeById`;