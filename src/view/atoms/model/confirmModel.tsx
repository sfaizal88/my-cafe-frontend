/**
 * 
 * Confirm model component
 * @author - Faizal
 * @date - 23rd August 2024
 * 
 */
// GENERIC IMPORT
import {Box} from '@mui/material';

// COMMON COMPONENT IMPORT
import {Button} from '../';

// STYLE IMPORT
import './styles.css';

// COMPONENT PROPS
type ConfirmModelProps = {
    title: string;
    info: string;
    confirmBtnLabel: string;
    confirmBtnEvent: () => void;
    cancelBtnLabel?: string;
    cancelBtnEvent: () => void;
}

// SELECT COMPONENT DECLARE
const ConfirmModel = ({
    title,
    info,
    confirmBtnLabel,
    confirmBtnEvent,
    cancelBtnLabel = 'Cancel',
    cancelBtnEvent,
}: ConfirmModelProps) => {
    return (
        <Box className='model-layover'>
            <Box className='model-box'>
                <Box className='model-header'>{title}</Box>
                <Box className='model-content'>{info}</Box>
                <Box className='model-btn-container' gap={0.5}>
                    <Button label={confirmBtnLabel} type='button' onClickHandler={confirmBtnEvent}/>
                    <Button label={cancelBtnLabel} type='button' onClickHandler={cancelBtnEvent} isSecondary/>
                </Box>
            </Box>
        </Box>
    )
}

export default ConfirmModel;