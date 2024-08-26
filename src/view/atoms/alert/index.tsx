/**
 * 
 * Alert component
 * @author - Faizal 
 * @date - 23rd August 2024
 * 
 */
// GENERIC IMPORT
import clsx from 'clsx';

// UTILS IMPORT
import {NotificationEnum} from '../../../utils/enum';

// STYLE IMPORT
import './styles.css';

// COMPONENT PROPS
type AlertProps = {
  type: NotificationEnum;
  message: string;
}

const Alert = ({
  type,
  message,
}: AlertProps) => {
  // DECLARE COLOR
  const AlertClass = {
    [NotificationEnum.success]: 'success-alert',
    [NotificationEnum.error]: 'error-alert',
  }
  return (
    <div className={clsx("alert", AlertClass[type])}>{message}</div>
  )
}

export default Alert;