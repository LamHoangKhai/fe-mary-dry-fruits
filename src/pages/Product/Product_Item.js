import React from 'react';
import { Link } from 'react-router-dom';
import { Star, StarCheck } from '@/icons';

import classNames from 'classnames/bind';
import styles from './Product.module.scss';

const cx = classNames.bind(styles);

function ProductItem({ ...item }) {

    return (
        <div className={cx('product-main')} key={item.id}>
            <div className={cx('product-border-line-1')}></div>
            <div className={cx('product-border-line-2')}></div>
            <div className={cx('product-border-line-3')}></div>
            <div className={cx('product-border-line-4')}></div>
            <div className={cx('product-image')}>
                <Link to={item.link}>
                    <img src={item.image} alt="product" className={cx('product-image-origin')} />
                </Link>
            </div>
            <div className={cx('product-detail')}>
                <div className={cx('product-outner-name')}>
                    <Link to={`/product-detail/${item.id}`} className={cx('product-name')}>
                        {item.name}
                    </Link>
                </div>
                <div className={cx('product-price')}>
                    <span className={cx('product-size')}>Size: 100 gram</span>
                </div>
                <div className={cx('product-price')}>
                    <span className={cx('product-money')}>${item.price}</span>
                </div>
                <div className={cx('product-star')}>
                    <div className={cx('product-star-image')}>
                        {Array.from({ length: 5 }).map((_, index) =>
                            index < item.star ? (
                                <StarCheck key={index} className={cx('check')} />
                            ) : (
                                <Star key={index} className={cx('no-check')} />
                            ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
