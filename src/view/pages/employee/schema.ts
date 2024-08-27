/**
 * Add / Edit Cafe Validation schema for cafe shop form
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import * as yup from 'yup';

// UTILS IMPORT
import {formValidationMessages} from '../../../utils/validationMessages';
import {EmployeeType} from '../../../utils/types';

type SchemaType = {
  datalist: EmployeeType[];
  employeeId?: string
}

const schema = ({datalist, employeeId}: SchemaType) =>
  yup.object({
    name: yup.string().nullable()
    .transform((value) => value?.trim())
    .required(formValidationMessages.required)
    .matches(/^[a-zA-Z ]+$/, formValidationMessages.alphaSpace).max(50, formValidationMessages.max(50))
    .test('is-duplicate-name', formValidationMessages.duplicateEmployee, function(value) {
      if (!employeeId) {
        return !datalist.some((item: EmployeeType) => value && item.name.trim().toLowerCase() === value.trim().toLowerCase());
      } else {
          return !datalist.some((item: EmployeeType) => {
              return value && employeeId !== item.id && item.name.trim().toLowerCase() === value.trim().toLowerCase()
          });
      }
    }),
    gender: yup.string().nullable()
    .required(formValidationMessages.required),
    email_address: yup.string()
    .email(formValidationMessages.email)
    .transform((value) => value?.trim())
    .required(formValidationMessages.required)
    .test('is-duplicate-email', formValidationMessages.duplicateEmail, function(value) {
      if (!employeeId) {
        return !datalist.some((item: EmployeeType) => value && item.email_address.trim().toLowerCase() === value.trim().toLowerCase());
      } else {
          return !datalist.some((item: EmployeeType) => {
              return value && employeeId !== item.id && item.email_address.trim().toLowerCase() === value.trim().toLowerCase()
          });
      }
    }),
    phone_number: yup.string().nullable()
    .transform((value) => value?.trim())
    .required(formValidationMessages.required)
    .matches(/^[89]\d{7}$/, formValidationMessages.contactNo)
    .test('is-duplicate-phone', formValidationMessages.duplicateContactNo, function(value) {
      if (!employeeId) {
        return !datalist.some((item: EmployeeType) => value && item.phone_number.trim().toLowerCase() === value.trim().toLowerCase());
      } else {
          return !datalist.some((item: EmployeeType) => {
              return value && employeeId !== item.id && item.phone_number.trim().toLowerCase() === value.trim().toLowerCase()
          });
      }
    }),
    
  });

export default schema;
