import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import images from '@/assets';

const cx = classNames.bind(styles);

function SliderItem({ banners }) {
    const [slide, setSlide] = useState(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
    };

    const previous = () => {
        if (slide) {
            slide.slickPrev();
           
        }
    };

    const next = () => {
        if (slide) {
            slide.slickNext();
        }
    };

    const banner = [images.slider_1,images.br_image_2]

    return (
        <div>
            <Slider ref={(c) => setSlide(c)} {...settings}>
                {banners.map((item, index) => {
                    return (
                        <div key={index} className={cx('slider-wrapper')}>
                            <div className={cx('slider-outner-image')}>
                                <img src={item.image} alt={`Slider ${index + 1}`} className={cx('slider-image')}/>
                            </div>
                            <div className={cx('slider-content')}>
                                <div className={cx('slider-heading')}>{item.title}</div>
                                <div className={cx('slider-text')}>{item.description}</div>
                                {/* <div className={cx('slider-discount')}>
                                    USE COUPON:
                                    <span className={cx('slider-coupon')}>{item.discount}</span>
                                </div> */}
                            </div>
                        </div>
                    );
                })}
            </Slider>
            <div className={cx('slider-directional')}>
                <button className={cx('slider-back')} onClick={previous}></button>
                <button className={cx('slider-next')} onClick={next}></button>
            </div>
        </div>
    );
}

export default SliderItem;