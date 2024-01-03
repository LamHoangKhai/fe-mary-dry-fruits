import classNames from 'classnames/bind';
import styles from './Contact_Us.module.scss';

const cx = classNames.bind(styles);

const ContactItem = ({ icon, title, info }) => {
    return (
        <div className={cx('contact-item-container')}>
            <div className={cx('contact-item-icon')}>{icon}</div>
            <div className={cx('contact-item-title')}>{title}</div>
            <div className={cx('contact-item-info')}>
                <div>{info}</div>
            </div>
        </div>
    );
};

export default ContactItem;
