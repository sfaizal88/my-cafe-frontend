/**
 * Add / Edit Cafe Validation schema for cafe shop form
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import * as yup from 'yup';

// UTILS IMPORT
import {formValidationMessages} from '../../../utils/validationMessages';
import {CafeShopType} from '../../../utils/types';

type SchemaType = {
  datalist: CafeShopType[];
  cafeShopId?: string
}

const schema = ({datalist, cafeShopId}: SchemaType) =>
  yup.object({
    name: yup.string().nullable()
    .transform((value) => value?.trim())
    .min(6, formValidationMessages.min(6))
    .max(10, formValidationMessages.min(10))
    .required(formValidationMessages.required)
    .matches(/^[a-zA-Z0-9 ]+$/, formValidationMessages.alphaNumeric)
    .test('is-duplicate', formValidationMessages.duplicateCafeShop, function(value) {
      if (!cafeShopId) {
        return !datalist.some((item:CafeShopType) => value && item.name.trim().toLowerCase() === value.trim().toLowerCase());
      } else {
          return !datalist.some((item:CafeShopType) => {
              return value && cafeShopId !== item.id && item.name.trim().toLowerCase() === value.trim().toLowerCase()
          });
      }
    }),
    location: yup.string().nullable()
    .transform((value) => value?.trim())
    .required(formValidationMessages.required)
    .max(100, formValidationMessages.max(100)),
    description: yup.string().nullable()
    .transform((value) => value?.trim())
    .required(formValidationMessages.required)
    .max(256, formValidationMessages.max(250)),
  });

export default schema;
