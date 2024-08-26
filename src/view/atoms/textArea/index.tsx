/**
 * 
 * Text area component
 * @author - Faizal
 * @date - 23rd August 2024
 * 
 */
// GENERIC IMPORT
import clsx from 'clsx';
import {Controller} from 'react-hook-form';

// STYLE IMPORT
import './styles.css';

// COMPONENT PROPS
type TextFieldProps = {
    name: string;
    id?: string;
    placeholder?: string;
    rows?: number
    value?: string | number;
    register?: any;
    control?: any;
    errors?: any;
    handlerKeyDown?: (event: any) =>  void;
}

// TEXTFIELD COMPONENT DECLARE
const TextField = ({
    id,
    name,
    placeholder = '',
    rows = 4,
    value = '',
    control,
    errors,
    register,
    handlerKeyDown,
}: TextFieldProps) => {
    return (
        <Controller
            control={control}
            name={name}
            render={() => (
                <>
                <textarea 
                    {...register(name)} 
                    placeholder={placeholder} 
                    name={name} 
                    id={id || name}
                    className={clsx('input-field', errors?.message && 'error-field')}
                    rows={rows}
                    onKeyDown={(e) => {
                        if (handlerKeyDown) {
                            handlerKeyDown?.(e)
                        }
                    }}
                ></textarea>
                <div className='error-box'>{errors?.message}</div>
            </>
            )}
        /> 
    )
}

export default TextField;