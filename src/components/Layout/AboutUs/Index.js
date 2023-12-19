import React from 'react';

import classNames from 'classnames/bind';
import styles from './Index.module.scss';

import Banner from '../Banner/Banner';
import images from '@/assets';
import TitleIndex from '../Main/Title/Title_Index';
import AboutFirst from './AboutFirst/AboutFirst';
import AboutSecond from './AboutUsSecond/AboutSecond';
import AboutThree from './AboutThree/AboutThree';
import BenefitIndex from '../Main/Benefit/Benefit_Index';
import Footer from '../Footer/Footer_Index';
import { World, User, Coffee, Eye } from '@/icons';
import { ArrowRotate } from '@/icons';

const cx = classNames.bind(styles);

const Index = () => {
    return (
        <div className={cx('about-us-container')}>
            <Banner pageMain="all" pageEtra="Rosehip Berries" backGround={images.banner}>
                about us
            </Banner>
            <div className={cx('about-us')}>
                <AboutFirst />
                <TitleIndex heading={'Unique flavors spices'} description={'Quisque volutpat mattis eros.'} />
                <AboutSecond World={World} User={User} title1="Flavors" title2="Export" />
                <AboutSecond World={Coffee} User={Eye} title1="Cultivation" title2="Testing" />
                <TitleIndex
                    heading={'A unique blended taste'}
                    description={'Pellentesque habitant morbi tristique senectus et netus et male.'}
                />
                <AboutThree />
            </div>
            <div className={cx('wrapper')}>
                <TitleIndex heading={'Unique flavors spices'} description={'Quisque volutpat mattis eros.'} />
                <div className={cx('benefit')}>
                    <BenefitIndex
                        title={'Money Back Guarantee'}
                        description={
                            "Our Money Back Guarantee promises a refund if you're not completely satisfied. Shop worry-free with us."
                        }
                        icon={<ArrowRotate />}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Index;
