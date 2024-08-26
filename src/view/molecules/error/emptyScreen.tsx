/**
 * 
 * Empty message component
 * @author - Faizal 
 * @date - 23rd August 2024
 * 
 */
// GENERIC IMPORT
import {ReactElement} from 'react';

// STYLE IMPORT
import './styles.css';

// COMPONENT PROPS
type EmptyScreenProps = {
    title: string;
    subtitle?: string;
    button?: ReactElement;
    icon?: ReactElement;
    showButton?: boolean;
}

const EmptyScreen = ({
    title,
    subtitle,
    button,
    showButton =  true,
    icon,
}: EmptyScreenProps) => {
    return (
        <div className='empty-container'>
            <div className='empty-icon'>{icon}</div>
            <div className='empty-title'>{title}</div>
            <div className='empty-subtitle'>{subtitle}</div>
            {showButton && button}
        </div>
    )
}

export default EmptyScreen;