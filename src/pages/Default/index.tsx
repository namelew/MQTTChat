import { useEffect } from 'react';
import styles from './Default.module.scss';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

interface Props {
    isAuth: boolean
}

const Default = ( { isAuth }: Props ) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/auth');
        }
    }, [isAuth]);

    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    )
};

export default Default;