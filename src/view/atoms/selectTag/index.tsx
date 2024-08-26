/**
 * 
 * Select tag  component
 * @author - Faizal
 * @date - 23rd August 2024
 * 
 */
// GENERIC IMPORT
import clsx from 'clsx';
import {Controller} from 'react-hook-form';

// UTILS IMPORT
import type {SelectOptionsType} from '../../../utils/types';

// STYLE IMPORT
import './styles.css';

// COMPONENT PROPS
type SelectTagProps = {
    options: SelectOptionsType[];
    name: string;
    id?: string;
    value?: string | number;
    register?: any;
    control?: any;
    errors?: any;
    placeholderOption?: string;
}

// SELECT COMPONENT DECLARE
const SelectTag = ({
    options,
    name,
    id,
    value = '',
    control,
    errors,
    register,
    placeholderOption = ''
}: SelectTagProps) => {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={value}
            render={() => (
                <>
                    <select 
                        {...register(name)} 
                        id={id || name} 
                        name={name} 
                        value={value}
                        className={clsx('select-field', errors?.message && 'error-field')}>
                            {placeholderOption && <option value='' key={`select-placeholder-${id || name}`}>{placeholderOption}</option>}
                        {options.map(item => <option value={item.value} key={`select-${item.value}`}>{item.label}</option>)}
                    </select>
                    <div className='error-box'>{errors?.message}</div>
                </>
            )}
        /> 
    )
}

export default SelectTag;