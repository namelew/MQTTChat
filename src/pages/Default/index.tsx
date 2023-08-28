import styles from './Default.module.scss';
import { Outlet } from 'react-router-dom';

const Default = () => {
    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    )
};

export default Default;