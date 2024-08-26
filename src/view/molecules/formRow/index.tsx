/**
 * 
 * Form row component
 * @author - Faizal
 * @date - 23rd August 2024
 * 
 */
// GENERIC IMPORT
import clsx from 'clsx';
import {Box} from '@mui/material';
import {PropsWithChildren} from 'react';

// COMMON COMPONENT
import {EmptyLabel} from '../';

// STYLE IMPORT
import  './styles.css';

// COMPONENT PROPS
type FormRowProps = {
    label: string;
    required?: boolean;
    externalClasses?: string,
}

const FormRow = ({
    label,
    required,
    externalClasses,
    children,
}: PropsWithChildren<FormRowProps>) => {
    return (
        <Box className={clsx("field-set", externalClasses)}>
            <Box className={clsx("field-label")}>
                {label} {required && <span className="required">&nbsp;*</span>}
            </Box>
            <Box className={clsx("field")}>
                {children || <EmptyLabel/>}
            </Box>
        </Box>
    )
}

export default FormRow;