import React, { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';
import ProductItem from '@/pages/product/Product_Item';
import axios from '@/service/axios';

import { Down } from '@/icons';

const cx = classNames.bind(styles);

const ProductList = ({ categoryId }) => {
    const [product, setProduct] = useState([]);
    const [drop, setDrop] = useState(false);
    const [lastPage, setLastPage] = useState(Array.from({ length: 1 }, (_, index) => index + 1));
    const [currentPage, setCurrentPage] = useState(1);
    const [oldCategoryID, setOldCategoryID] = useState(0);

    const handleDrop = () => {
        setDrop(!drop);
    };

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchData = async (categoryId, currentPage) => {
        try {
            let page = categoryId !== oldCategoryID ? 1 : currentPage;
            const res = await axios.post('api/product/allproduct', { category: categoryId, page });
            const lastPage = res.data.last_page;
            const data = res.data.data || res.data;
            setProduct(data);
            setLastPage(Array.from({ length: lastPage }, (_, index) => index + 1));
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        if (categoryId !== oldCategoryID) {
            fetchData(categoryId, 1);
            setCurrentPage(1);
            setOldCategoryID(categoryId);
            return;
        }
        fetchData(categoryId, currentPage);
    }, [categoryId, currentPage]);

    return (
        <div className={cx('product-list')}>
            <div className={cx('product-filter')}>
                <label>Sort by </label>
                <div className={cx('filter')}>
                    <div className={cx('filter-search')} onClick={handleDrop}>
                        <span>Featured</span>
                        <Down />
                    </div>
                    {drop && (
                        <div className={cx('filter-drop')}>
                            <ul>
                                <li>Best selling</li>
                                <li>Alphabetically, A-Z</li>
                                <li>Alphabetically, Z-A</li>
                                <li>Price, low to high</li>
                                <li>Price, high to low</li>
                                <li>Date, old to new</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className={cx('current')}>
                <div className={cx('page-current')}>
                    <div className={cx('product-item')}>
                        {product.map((item, index) => {
                            return (
                                <div className={cx('grid-item')} key={index}>
                                    <ProductItem
                                        name={item.name}
                                        price={item.price}
                                        rating={item.star}
                                        image={item.image}
                                        id={item.id}
                                        star={item.star}
                                        link={'/product-detail/' + item.id}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={cx('page-change')}>
                <ul className={cx('page-practive')}>
                    <li className={cx('left')} onClick={() => changePage(currentPage - 1)}>
                        &lsaquo;
                    </li>

                    {lastPage.map((pageNumber) => (
                        <li
                            onClick={() => changePage(pageNumber)}
                            key={pageNumber}
                            className={cx({ choose: pageNumber === currentPage })}
                        >
                            {pageNumber}
                        </li>
                    ))}

                    <li className={cx('right')} onClick={() => changePage(currentPage + 1)}>
                        &rsaquo;
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductList;