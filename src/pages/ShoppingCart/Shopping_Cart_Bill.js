/* eslint-disable no-unused-vars */
import classNames from 'classnames/bind';
import styles from './Shopping_Cart.module.scss';
import images from '@/assets';
import { useShoppingContext } from '@/contexts/Shopping_Context';
import { useState, useEffect } from 'react';
import { Order, PayOrder } from '@/service/Order_Service';
import { dataUser } from '@/service/User_Service';
import { toast, Flip } from 'react-toastify';
import Loading from '@/components/Layout/Loading/Loading';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function ShoppingCartBill() {
    const params = useParams();
    const { totalPrice, cartItems, clearCart } = useShoppingContext();
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState('');

    const [edit, setEdit] = useState(false);

    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');

    const [selectedMethod, setSelectedMethod] = useState('COD');
    const handleMethodChange = (event) => {
        setSelectedMethod(event.target.value);
    };

    const orderItems = cartItems.map((item) => ({
        product_id: item.id,
        price: item.price,
        weight: item.weight,
        quantity: item.addQuantity,
    }));

    const data_order = {
        full_name: fullName,
        address: address,
        phone: phone,
        transaction: 100,
        subtotal: totalPrice,
        order_items: orderItems,
        total: totalPrice,
    };

    function areAllValuesNotEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && !obj[key]) {
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dataUser();
                if (res && res.success === true) {
                    setData(res.response);
                    setAddress(res.response.address);
                    setPhone(res.response.phone);
                    setFullName(res.response.full_name);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handlePayBill = async (totalPrice) => {
        if (!areAllValuesNotEmpty(data_order)) {
            toast.error('Please double check the information to make sure it is not empty', {
                transition: Flip,
                autoClose: 2000,
            });
            return;
        }

        // send api if method COD
        if (selectedMethod === 'COD') {
            if (cartItems.length > 0) {
                try {
                    setLoading(true);

                    const resOrder = await Order(data_order);
                    if (resOrder.orderResponse.status_code === '910') {
                        toast.error(resOrder.orderResponse.message, {
                            transition: Flip,
                            autoClose: 2000,
                        });
                        return;
                    }
                    if (resOrder && resOrder.success === true) {
                        clearCart();
                        setLoading(false);
                        toast.success('Successful purchase', {
                            transition: Flip,
                            autoClose: 2000,
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                toast.error('There are no products in your shopping cart', {
                    transition: Flip,
                    autoClose: 2000,
                });
            }
            return;
        }

        //handle method VNPAY
        if (selectedMethod === 'VNPAY') {
            const newTotal = totalPrice * 20000;
            try {
                const res = await PayOrder(newTotal);
                // handle errors
                if (res.response.status_code === '910') {
                    toast.error(res.response.message, {
                        transition: Flip,
                        autoClose: 2000,
                    });
                    return;
                }

                if (res && res.success === true) {
                    const redirectUrl = res.response.url;
                    if (cartItems.length > 0) {
                        try {
                            const resOrder = await Order(data_order);
                            console.log(resOrder);
                            if (resOrder && resOrder.success === true && resOrder.orderResponse.status_code !== '910') {
                                window.location.href = redirectUrl;
                            } else {
                                if (resOrder.orderResponse.status_code === '910') {
                                    toast.error(resOrder.orderResponse.message, {
                                        transition: Flip,
                                        autoClose: 2000,
                                    });
                                    return;
                                }
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    } else {
                        toast.error('There are no products in your shopping cart', {
                            transition: Flip,
                            autoClose: 2000,
                        });
                    }
                }
            } catch (error) {
                console.log(error);
            }
            return;
        }
    };

    const handleEditInfo = () => {
        setEdit(true);
        setAddress(data.address);
        setPhone(data.phone);
        setFullName(data.full_name);
    };

    const handleCheckPhone = (value) => {
        const cleanedNumber = value.replace(/[^\d+]/g, '');
        if (cleanedNumber.length <= 15) {
            setPhone(cleanedNumber);
        }
    };

    const handleCheckValid = () => {
        if (!fullName || !phone || !address) {
            setAddress(data.address);
            setPhone(data.phone);
            setFullName(data.full_name);
        }
        setEdit(false);
    };

    useEffect(() => {
        setLoading(true);
        if (params.status == 1) {
            toast.success('Successful purchase', {
                transition: Flip,
                autoClose: 2000,
            });
            clearCart();
            return;
        }
        if (params.status == 2) {
            toast.error('Payment errros', {
                transition: Flip,
                autoClose: 2000,
            });
            return;
        }
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            {loading ? <Loading loading={loading} /> : null}
            {edit === false ? (
                <div className={cx('cart-info-user')}>
                    <div className={cx('cart-user')}>
                        <div className={cx('cart-user-heading')}>
                            <p>Order Information</p>
                        </div>
                        <div className={cx('cart-user-detail')}>
                            <span className={cx('cart-user-title')}>Name</span>
                            <span>:</span>
                            <span className={cx('cart-user-result')}>{fullName}</span>
                        </div>
                        <div className={cx('cart-user-detail')}>
                            <span className={cx('cart-user-title')}>Email</span>
                            <span>:</span>
                            <span className={cx('cart-user-result')}>{data.email}</span>
                        </div>
                        <div className={cx('cart-user-detail')}>
                            <span className={cx('cart-user-title')}>Address</span>
                            <span>:</span>
                            <span className={cx('cart-user-result')}>{address}</span>
                        </div>
                        <div className={cx('cart-user-detail')}>
                            <span className={cx('cart-user-title')}>Phone</span>
                            <span>:</span>
                            <span className={cx('cart-user-result')}>{phone}</span>
                        </div>
                        <div className={cx('cart-user-outner-btn')}>
                            <button className={cx('cart-user-btn')} onClick={() => handleEditInfo()}>
                                Change
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('cart-info-user')}>
                    <div className={cx('cart-user')}>
                        <div className={cx('cart-user-heading')}>
                            <p>Order Information</p>
                        </div>
                        <div className={cx('cart-user-detail-edit')}>
                            <span>Name</span>
                            <input
                                value={fullName}
                                className={data.fullName ? cx('cart-user-input-disable') : cx('cart-user-input')}
                                onChange={(e) => setFullName(e.target.value)}
                                disabled={data.full_name ? true : false}
                            />
                        </div>
                        <div className={cx('cart-user-detail-edit')}>
                            <span>Email</span>
                            <input value={data.email} className={cx('cart-user-input-disable')} disabled />
                        </div>
                        <div className={cx('cart-user-detail-edit')}>
                            <span>Address</span>
                            <input
                                value={address}
                                className={cx('cart-user-input')}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className={cx('cart-user-detail-edit')}>
                            <span>Phone</span>
                            <input
                                value={phone}
                                className={cx('cart-user-input')}
                                onChange={(e) => handleCheckPhone(e.target.value)}
                            />
                        </div>
                        <div className={cx('cart-user-outner-btn')}>
                            <button className={cx('cart-user-btn')} onClick={() => handleCheckValid()}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={cx('cart-bill')}>
                <div className={cx('cart-bill-outner')}>
                    <div className={cx('cart-bill-detail')}>
                        <span>Sub Total:</span>
                        <span>
                            <span className={cx('cart-bill-unit')}>$</span>
                            <span>{totalPrice.toFixed(2)}</span>
                        </span>
                    </div>
                    <div className={cx('cart-bill-detail')}>
                        <span>Transport:</span>
                        <span>
                            <span>0</span>
                            <span className={cx('cart-bill-unit')}>$</span>
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
                            <span className={cx('cart-bill-unit')}>$</span>
                            <span>{totalPrice.toFixed(2)}</span>
                        </span>
                    </div>
                    {/* choose method pay */}
                    <h4>Select payment method:</h4>
                    <div className={cx('cart-bill-detail')}>
                        <label>
                            <input
                                type="radio"
                                value="COD"
                                checked={selectedMethod === 'COD'}
                                onChange={handleMethodChange}
                            />
                            Ship COD
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="VNPAY"
                                checked={selectedMethod === 'VNPAY'}
                                onChange={handleMethodChange}
                            />
                            VNPAY
                        </label>
                    </div>

                    <div className={cx('cart-bill-outner-btn')} onClick={() => handlePayBill(totalPrice)}>
                        <button className={cx('cart-bill-btn')}>Pay</button>
                    </div>
                </div>

                <div className={cx('cart-bill-card')}>
                    <img src={images.paypal} alt="payment card" width={'50px'} />
                    <img src={images.visa} alt="payment card" width={'50px'} />
                    <img src={images.mastercard} alt="payment card" width={'50px'} />
                </div>
            </div>
        </>
    );
}

export default ShoppingCartBill;
