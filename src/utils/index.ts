/**
 * Utils component
 * @author - Faizal 
 * @date - 23rd August 2024
*/
// GENERIC IMPORT
import moment from 'moment';

// GENERATE UNIQUE ID
export const generateUniqueId = () => {
  return Math.floor(1000000 + Math.random() * 9000000);
}

// GENERATE UNIQUE ID
export const getDifferenceBetweenTwoDate = (startDateParam: string) => {
  const startDate: Date = new Date(startDateParam);
  const today: Date = new Date();
  const differenceInTime: number = today.getTime() - startDate.getTime();
  return Math.floor(differenceInTime / (1000 * 3600 * 24)).toLocaleString();
}

// CONVERT SERVER TIME TO DISPLAY TIME
export const convertServerDateToDisplayDate = (serverDate: string) => {
  return moment(serverDate).format('Do MMMM YYYY');
}

