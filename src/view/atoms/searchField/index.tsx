/**
 * 
 * Search field component
 * @author - Faizal
 * @date - 23rd August 2024
 * 
 */
// GENERIC IMPORT
import clsx from 'clsx';

// STYLE IMPORT
import './styles.css';

// COMPONENT PROPS
type SearchFieldProps = {
    name: string;
    id?: string;
    value?: string | number;
    placeholder?: string;
    onChangeHandler?: (val?: any) =>  void;
    externalClassName?: string;
}

// SEARCH FIELD COMPONENT DECLARE
const SearchField = ({
    id,
    name,
    placeholder = '',
    value = '',
    onChangeHandler,
    externalClassName
}: SearchFieldProps) => {
    return (
        <div className={externalClassName}>
            <input 
                placeholder={placeholder} 
                id={id || name} 
                name={name}
                value={value}
                {...(onChangeHandler && { onChange: onChangeHandler })}
                className={clsx('input-field')}
            />
        </div>
    )
}

export default SearchField;