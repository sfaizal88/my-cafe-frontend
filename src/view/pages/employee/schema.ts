/**
 * Add / Edit Cafe Validation schema for cafe shop form
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import * as yup from 'yup';

// UTILS IMPORT
import {formValidationMessages} from '../../../utils/validationMessages';

const schema = 
  yup.object({
    name: yup.string().nullable()
    .transform((value) => value?.trim())
    .required(formValidationMessages.required)
    .matches(/^[a-zA-Z ]+$/, formValidationMessages.alphaSpace).max(50, formValidationMessages.max(50)),
    gender: yup.string().nullable()
    .required(formValidationMessages.required),
    email_address: yup.string()
    .email(formValidationMessages.email)
    .transform((value) => value?.trim())
    .required(formValidationMessages.required),
    phone_number: yup.string().nullable()
    .transform((value) => value?.trim())
    .required(formValidationMessages.required)
    .matches(/^[89]\d{7}$/, formValidationMessages.contactNo),
  });

export default schema;
