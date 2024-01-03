import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '@/service/User_Service';
import { toast, Flip } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuUser() {
    const navigate = useNavigate();
    

    const handleLogout = async () => {
        let res = await logoutUser();

        if (res && res.success === true) {
            localStorage.removeItem('jwt');
            localStorage.removeItem('login');

            navigate('/account/login');

            toast.success('Logout success', {
                transition: Flip,
                autoClose: 2000,
            });
        } else {
            toast.error('Logout failed', {
                transition: Flip,
                autoClose: 2000,
            });
        }
    };
    return (
        <div className={cx('menu-user-container')}>
            <div className={cx('menu-user-wrapper')}>
                <FontAwesomeIcon icon={icon({ name: 'user', style: 'solid' })} className={cx('menu-user-icon-user')} />
                <Link to="/account/profile" className={cx('menu-user-item')}>
                    Profile
                </Link>
            </div>
            <div className={cx('menu-user-wrapper')}>
                <FontAwesomeIcon
                    icon={icon({ name: 'right-from-bracket', style: 'solid' })}
                    className={cx('menu-user-icon-logout')}
                />
                <div onClick={() => handleLogout()} className={cx('menu-user-item')}>
                    Logout
                </div>
            </div>
        </div>
    );
}

export default MenuUser;
