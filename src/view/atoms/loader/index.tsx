/**
 * 
 * Page loader component
 * @author - Faizal 
 * @date - 23rd August 2024
 * 
 */
// ICON IMPORT
import LoaderIcon from '../../../assests/icons/loader.svg';

// STYLE IMPORT
import './styles.css';

const Loader = () => {
  return (
    <div className="loader-container"> 
      <img src={LoaderIcon}  alt="Loading..." width={100}/>
    </div>
  )
}

export default Loader;