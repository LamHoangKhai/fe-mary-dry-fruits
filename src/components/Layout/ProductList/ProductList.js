import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';
import ProductItem from '@/pages/product/ProductItem';
import images from '@/assets';

import { Down } from '@/icons';

const cx = classNames.bind(styles);

const ProductList = () => {
    return (
        <div className={cx('product-list')}>
            <div className={cx('product-filter')}>
                <label>Sort by </label>
                <div className={cx('filter')}>
                    <div className={cx('filter-search')}>
                        <span>Featured</span>
                        <Down />
                    </div>
                    {/* <div className={cx('filter-drop')}>
                        <ul>
                            <li>1</li>
                            <li>1</li>
                        </ul>
                    </div> */}
                </div>
            </div>
            <div className={cx('product-item')}>
                <ProductItem name={'Black Cardamom'} price={500} rating={4} image={images.product_1} />
                <ProductItem name={'Black Cardamom'} price={500} rating={4} image={images.product_1} />
                <ProductItem name={'Black Cardamom'} price={500} rating={4} image={images.product_1} />
            </div>
            <div className={cx('product-item')}>
                <ProductItem name={'Black Cardamom'} price={500} rating={4} image={images.product_1} />
                <ProductItem name={'Black Cardamom'} price={500} rating={4} image={images.product_1} />
                <ProductItem name={'Black Cardamom'} price={500} rating={4} image={images.product_1} />
            </div>
            <div className={cx('product-item')}>
                <ProductItem name={'Black Cardamom'} price={500} rating={4} image={images.product_1} />
                <ProductItem name={'Black Cardamom'} price={500} rating={4} image={images.product_1} />
                <ProductItem name={'Black Cardamom'} price={500} rating={4} image={images.product_1} />
            </div>
            <div className={cx('product-item')}>
                <ProductItem name={'Black Cardamom'} price={500} rating={4} image={images.product_1} />
                <ProductItem name={'Black Cardamom'} price={500} rating={4} image={images.product_1} />
                <ProductItem name={'Black Cardamom'} price={500} rating={4} image={images.product_1} />
            </div>
            <div className={cx('page-change')}>
                <ul className={cx('page-practive')}>
                    <li>&lsaquo;</li>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>&rsaquo;</li>
                </ul>
            </div>
        </div>
    );
};

export default ProductList;