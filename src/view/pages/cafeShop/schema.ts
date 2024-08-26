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
    .matches(/^[a-zA-Z0-9 ]+$/, formValidationMessages.alphaNumeric)
    .max(25, formValidationMessages.max(25)),
    location: yup.string().nullable()
    .transform((value) => value?.trim())
    .required(formValidationMessages.required)
    .max(100, formValidationMessages.max(100)),
    description: yup.string().nullable()
    .transform((value) => value?.trim())
    .required(formValidationMessages.required)
    .max(250, formValidationMessages.max(250)),
  });

export default schema;
