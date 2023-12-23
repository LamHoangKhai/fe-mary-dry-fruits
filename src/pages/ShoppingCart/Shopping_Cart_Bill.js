import classNames from 'classnames/bind';
import styles from './Shopping_Cart.module.scss';
import images from '@/assets';
import { useShoppingContext } from '@/contexts/Shopping_Context';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function ShoppingCartBill() {
    const [discount, setDiscount] = useState(10);
    const [total, setTotal] = useState(0);   
    const { totalPrice } = useShoppingContext();

    useEffect(() => {
        setTotal(totalPrice - totalPrice * (discount / 100));
    }, [totalPrice, discount]);

    return (
        <div className={cx('cart-bill')}>
            <div className={cx('cart-bill-outner')}>
                <div className={cx('cart-bill-detail')}>
                    <span>Sub Total:</span>
                    <span>
                        <span>{totalPrice}</span>
                        <span className={cx('cart-bill-unit')}>USD</span>
                    </span>
                </div>
                <div className={cx('cart-bill-detail')}>
                    <span>Transport:</span>
                    <span>
                        <span>0</span>
                        <span className={cx('cart-bill-unit')}>USD</span>
                    </span>
                </div>
                <div className={cx('cart-bill-detail')}>
                    <span>Discount:</span>
                    <span>
                        <span>- {discount}</span>
                        <span className={cx('cart-bill-percent')}>%</span>
                    </span>
                </div>
                <div className={cx('cart-bill-detail')}>
                    <span>Total:</span>
                    <span>
                        <span>{total.toFixed(1)}</span>
                        <span className={cx('cart-bill-unit')}>USD</span>
                    </span>
                </div>
                <div className={cx('cart-bill-outner-btn')}>
                    <button className={cx('cart-bill-btn')}>Pay</button>
                </div>
            </div>

            <div className={cx('cart-bill-card')}>
                <img src={images.paypal} alt="payment card" width={'50px'} />
                <img src={images.visa} alt="payment card" width={'50px'} />
                <img src={images.mastercard} alt="payment card" width={'50px'} />
            </div>
        </div>
    );
}

export default ShoppingCartBill;