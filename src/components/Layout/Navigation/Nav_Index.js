import classNames from 'classnames/bind';
import styles from './Nav_Index.module.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from '@/icons';
import { useShoppingContext } from '@/contexts/Shopping_Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import Cart from '../Cart/Cart';
import MenuUser from '../Menu/Menu_User';
import { loginUser } from '@/service/User_Service';

const cx = classNames.bind(styles);

function NavBarIndex() {
    const [show, setShow] = useState(false);
    const { cartQuantity, remove, showPoper, dataName } =
        useShoppingContext();

    const navigate = useNavigate();

    const token = localStorage.getItem('jwt');

    // useEffect(() => {

    //     if (!token) {
    //        return     
    //     } else{
    //         let loginAgain = async () => {
    //             const res = await loginUser( );

    //             if (res && res.success === true) {
    //                 localStorage.setItem('jwt', res.response.access_token);

    //                 setInterval(async () => {
    //                     localStorage.removeItem('jwt');
    //                     localStorage.removeItem('login');

    //                     try {
    //                         const res = await loginUser();
    //                         if (res && res.success === true) {
    //                             localStorage.setItem('jwt', res.response.access_token);
    //                             localStorage.setItem('login', true);
    //                             setCheckLogin(true);
    //                         } else {
    //                             navigate('/account/login');
    //                         }
    //                     } catch (error) {
    //                         console.log(error);
    //                     }
    //                 }, 55 * 10 * 1000);
    //             } else {
    //                 navigate('/');
    //             }
    //         };
    //         loginAgain();
    //     }
    // }, []);

    const handleCart = () => {
        setShow(true);
        showPoper();
    };

    const handleHideCart = () => {
        setShow(false);
    };

    return (
        <div className={cx('nav-container')}>
            <div className={cx('nav-wrapper')}>
                <div className={cx('nav-outner')}>
                    <ul className={cx('nav-list-left')}>
                        <li className={cx('nav-item-left')}>
                            <Link to="/" className={cx('nav-item-link')}>
                                HOME
                            </Link>
                        </li>
                        <li className={cx('nav-item-left')}>
                            <Link to="/product" className={cx('nav-item-link')}>
                                PRODUCT
                            </Link>
                        </li>
                        <li className={cx('nav-item-left')}>
                            <Link to="/contact" className={cx('nav-item-link')}>
                                CONTACT
                            </Link>
                        </li>
                        <li className={cx('nav-item-left')}>
                            <Link to="/about" className={cx('nav-item-link')}>
                                ABOUT US
                            </Link>
                        </li>
                        <li className={cx('nav-item-left')}>
                            <Link to="/sitemap" className={cx('nav-item-link')}>
                                SITEMAP
                            </Link>
                        </li>
                    </ul>
                    <ul className={cx('nav-list-right')}>
                        <li className={cx('nav-item-right')}>
                            <Link to="/#" className={cx('nav-item-link')}>
                                <input type="text" className={cx('nav-item-search')} placeholder="Search" />
                                <div className={cx('nav-item-outner-icon')}>
                                    <Search className={cx('nav-item-icon')} />
                                </div>
                            </Link>
                        </li>
                        <Tippy
                            appendTo={() => document.body}
                            interactive={true}
                            visible={remove && show && cartQuantity > 0}
                            offset={[-277, 24]}
                            render={(attrs) => (
                                <div className={cx('add-cart')} tabIndex="-1" {...attrs}>
                                    <Cart />
                                </div>
                            )}
                            onClickOutside={() => handleHideCart()}
                        >
                            <li className={cx('nav-item-right')}>
                                <button className={cx('nav-item-link-cart')} onClick={() => handleCart()}>
                                    <FontAwesomeIcon icon={icon({ name: 'cart-shopping', style: 'solid' })} />
                                    <div className={cx('nav-cart-icon')} data-count={cartQuantity}></div>
                                </button>
                            </li>
                        </Tippy>
                        <li className={cx('nav-item-right')}>
                            {token ? (
                                <Tippy
                                    appendTo={() => document.body}
                                    interactive={true}
                                    delay={[0, 500]}
                                    offset={[0, 15]}
                                    render={(attrs) => (
                                        <div className={cx('menu-user')} tabIndex="-1" {...attrs}>
                                            <MenuUser />
                                        </div>
                                    )}
                                >
                                    <div to="/account/profile" className={cx('nav-item-name')}>
                                        Wellcome: {dataName ? dataName : 'User'}
                                    </div>
                                </Tippy>
                            ) : (
                                <Link to="/account/login" className={cx('nav-item-link')}>
                                    <FontAwesomeIcon
                                        icon={icon({ name: 'user', style: 'solid' })}
                                        className={cx('nav-user-icon')}
                                    />
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NavBarIndex;
