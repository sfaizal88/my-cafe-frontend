/**
 * 
 * Container component
 * @author - Faizal
 * @date - 23rd August 2024
 * 
 */
// GENERIC IMPORT
import clsx from 'clsx';
import {PropsWithChildren} from 'react';

// STYLE IMPORT
import  './styles.css';

// COMPONENT PROPS
type ContainerProps = {
    title: string;
    info: string;
}

const Container = ({
    title,
    info,
    children,
}: PropsWithChildren<ContainerProps>) => {
    return (
        <div className={clsx("main-container", "container")}>
            <div className='container-title'>
                {title}
                <div className='container-info'>{info}</div>
            </div>
            <div className={clsx("content")}>
                {children}
            </div>
        </div>
    )
}

export default Container;