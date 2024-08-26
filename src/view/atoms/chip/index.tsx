/**
 * 
 * Chip component
 * @author - Faizal 
 * @date - 23rd August 2024
 * 
 */
// GENERIC IMPORT
import clsx from 'clsx';

// UTILS IMPORT
import {ChipTypeEnum} from '../../../utils/enum';

// STYLE IMPORT
import './styles.css';

// COMPONENT PROPS
type ChipProps = {
  label: ChipTypeEnum;
}

const Chip = ({
  label,
}: ChipProps) => {
  // DECLARE COLOR
  const ChipClass = {
    [ChipTypeEnum.error]: 'red-chip',
    [ChipTypeEnum.warning]: 'yellow-chip',
    [ChipTypeEnum.info]: 'blue-chip',
    [ChipTypeEnum.success]: 'green-chip',
  }
  return (
    <div className={clsx("chip-container", ChipClass[label])}>{label}</div>
  )
}

export default Chip;