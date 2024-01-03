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
import MenuPage from '../Menu/Menu_Page';
import MenuLaptop from '../Menu/Menu_Laptop';
import { loginUser, dataUser } from '@/service/User_Service';

const cx = classNames.bind(styles);

function NavBarIndex() {
    const [show, setShow] = useState(false);
    const { cartQuantity, remove, showPoper, dataName, setDataName } = useShoppingContext();
    const [laptop, setLaptop] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem('jwt');

    useEffect(() => {
        const handleResize = () => {
            setLaptop(window.innerWidth < 1300);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const fetchData = async () => {
            try {
                const res = await dataUser();
                if (res && res.success === true) {
                    setDataName(res.response.full_name);
                }
            } catch (error) {}
        };

        fetchData();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

                        {laptop ? (
                            <Tippy
                                appendTo={() => document.body}
                                interactive={true}
                                delay={[0, 500]}
                                offset={[5, 5]}
                                render={(attrs) => (
                                    <div className={cx('menu-page')} tabIndex="-1" {...attrs}>
                                        <MenuLaptop />
                                    </div>
                                )}
                            >
                                <li className={cx('nav-item-left')}>
                                    <Link to="#" className={cx('nav-item-link')}>
                                        PAGES
                                    </Link>
                                </li>
                            </Tippy>
                        ) : (
                            <>
                                <li className={cx('nav-item-left')}>
                                    <Link to="/about" className={cx('nav-item-link')}>
                                        ABOUT US
                                    </Link>
                                </li>
                                <Tippy
                                    appendTo={() => document.body}
                                    interactive={true}
                                    delay={[0, 500]}
                                    offset={[5, 5]}
                                    render={(attrs) => (
                                        <div className={cx('menu-page')} tabIndex="-1" {...attrs}>
                                            <MenuPage />
                                        </div>
                                    )}
                                >
                                    <li className={cx('nav-item-left')}>
                                        <Link to="#" className={cx('nav-item-link')}>
                                            PAGES
                                        </Link>
                                    </li>
                                </Tippy>
                            </>
                        )}
                    </ul>
                    <ul className={cx('nav-list-right')}>
                       
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
