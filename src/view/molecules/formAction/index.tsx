/**
 * 
 * Form action component
 * @author - Faizal
 * @date - 23rd August 2024
 * 
 */
// GENERIC IMPORT
import clsx from 'clsx';

// GENERIC COMPONENT
import {Button} from '../../atoms';

// STYLE IMPORT
import './styles.css';

// COMPONENT PROPS
type FormActionProps = {
    showSubmit: boolean;
    submitLabel?: string;
    onSubmit?: () => void;
    disableSubmit?: boolean;
    submitBtnType?: "button" | "submit";
    cancelLabel?: string;
    onCancel?: () => void;
    externalClasses?: string,
    isFullWidth?: boolean;
}

const FormAction = ({
    showSubmit,
    submitLabel = "Submit",
    onSubmit,
    disableSubmit = false,
    submitBtnType = 'submit',
    cancelLabel = "Cancel",
    onCancel,
    isFullWidth = false,
    externalClasses,
}: FormActionProps) => {
    return (
        <div className={clsx("formActionContainer", externalClasses)}>    
            {onCancel && (
                <Button label={cancelLabel} type="button" 
                    {...(onSubmit && { onClickHandler: onCancel })} isSecondary/>
            )}
            
            {showSubmit && (
                <div className={clsx(isFullWidth && 'full-width')}>
                    <Button 
                        label={submitLabel}
                        type={submitBtnType} 
                        externalClassName={clsx(isFullWidth && 'full-width')}
                        {...(onSubmit && { onClickHandler: onSubmit })}
                        disabled={disableSubmit}/>
                </div>
            )}
        </div>
    )
        
}

export default FormAction;