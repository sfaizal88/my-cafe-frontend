/**
 * 
 * Validation messager
 * @author - Faizal 
 * @date - 24th August 2024
 * 
 */
// GENERIC FE MESSAGE
export const formValidationMessages = {
    error:  'Something went wrong, please try again after sometime.',
    success:  'Data has been saved successfully!',
    created:  'Created successfully!',
    updated:  'Updated successfully!',
    deleted:  'Deleted successfully!',
    required:  'This field is required',
    email: 'Please provide valid email address.',
    contactNo: 'Contact number must start with 8 or 9 and have exactly 8 digits.',
    duplicateCafeShop:  'The cafe shop name already exists. Please write a different name.',
    duplicateEmployee:  'The employee name already exists. Please write a different name.',
    duplicateEmail:  'The email address already exists. Please write a different email address.',
    duplicateContactNo:  'The phone no already exists. Please write a different phone no.',
    alphaNumeric: 'This field can only contain letters, numbers, and spaces',
    alphaSpace: 'This field can only contain letters and spaces',
    onlyNumber: (name: string) => `${name} must be a valid number`,
    max: (val: number) => `Ensure this field has no more than ${val} characters`,
    min: (val: number) => `Ensure this field has no less than ${val} characters`,
};