/**
 * 
 * Text field component
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
    value?: string | number | File[];
    placeholder?: string;
    type?: 'text' | 'file' | 'number' | 'password' | 'hidden';
    register?: any;
    control?: any;
    errors?: any;
    handlerKeyDown?: (event: any) =>  void;
    externalClassName?: string;
}

// TEXTFIELD COMPONENT DECLARE
const TextField = ({
    id,
    name,
    placeholder = '',
    value = '',
    type = 'text',
    control,
    errors,
    register,
    externalClassName,
    handlerKeyDown,
}: TextFieldProps) => {
    return (
        <div className={externalClassName}>
            <Controller
                control={control}
                name={name}
                defaultValue={value}
                render={({ field }) => (
                    <><input 
                        {...field}
                        {...register(name)}
                        type={type} placeholder={placeholder} 
                        id={id || name} 
                        value={type === 'file' ? undefined : value}
                        name={name}
                        onChange={(e) => {
                            if (type === 'file') {
                                field.onChange(e.target.files);
                            } else {
                                field.onChange(e);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (handlerKeyDown) {
                                handlerKeyDown?.(e)
                            }
                        }}
                        className={clsx('input-field', errors?.message && 'error-field')}
                    />
                    <div className='error-box'>{errors?.message}</div>
                    </>
                )}
            /> 
        </div>
    )
}

export default TextField;