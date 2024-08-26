/**
 * 
 * Button component
 * @author - Faizal
 * @date - 23rd August 2024
 * 
 */
// GENERIC IMPORT
import clsx from 'clsx';
import { ReactElement } from 'react';

// STYLE IMPORT
import  './styles.css';
  
// COMPONENT PROPS
type ButtonProps = {
  label: string;
  type: 'submit' | 'button';
  isSecondary?: boolean;
  onClickHandler?: () =>  void;
  disabled?: boolean,
  externalClassName?: string;
  icon?: ReactElement
}
  const Button = ({
    label,
    type,
    isSecondary,
    onClickHandler,
    disabled = false,
    externalClassName
  }: ButtonProps) => {
    return (
      <input type={type}
        className={clsx(isSecondary ? 'secondary-btn' : 'primary-btn', externalClassName, 'w-full sm:w-auto')}
        value={label}
        onClick={onClickHandler}
        disabled={disabled}/>
    );
  };
  
export default Button;