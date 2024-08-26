/**
 * Footer component
 * @author - Faizal
 * @date - 23rd August 2024
 */
// STYLE IMPORT
import './styles.css';

const Footer = () => {
    // CURRENT YEAR
    const currentYear = new Date().getFullYear();
    
    return (
        <footer>Copyright © {currentYear} My Cafe Inc.</footer>
    )
};

export default Footer;