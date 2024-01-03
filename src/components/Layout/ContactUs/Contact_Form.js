import { useState } from 'react';
import Button from '@/components/Button/ButtonIndex';
import classNames from 'classnames/bind';
import styles from './Contact_Us.module.scss';
import axios from '@/service/axios';

const cx = classNames.bind(styles);

const ContactForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [content, setContent] = useState('');
    const [isErrors, setIsErrors] = useState({});

    const textErrors = {
        fullName: 'Please do not leave it blank ',
        email: 'Please do not leave it blank and must be email',
        phone: 'Please do not leave blank ',
        content: 'Please do not leave it blank',
    };

    const handleSetValue = (e) => {
        const target = e.target;
        if (!target.value) {
            return;
        }

        const inputName = target.getAttribute('name');

        if (inputName == 'full_name') {
            setFullName(target.value);
            return;
        }
        if (inputName == 'email') {
            setEmail(target.value);
            return;
        }
        if (inputName == 'phone') {
            setPhone(target.value);
            return;
        }

        setContent(target.value);
        return;
    };

    const handleSubmit = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isTrue = {
            fullName: false,
            email: false,
            phone: false,
            content: false,
        };

        isTrue.content = !content ? true : false;

        isTrue.phone = !phone ? true : false;

        isTrue.email = !email || !emailRegex.test(email) ? true : false;

        isTrue.fullName = !fullName ? true : false;

        setIsErrors(isTrue);
        if (phone && fullName && email && content) {
            let res = await axios.post('/api/feedback/feedback', {
                full_name: fullName,
                email,
                phone,
                content,
            });
            console.log(res);
            setContent('');
            setEmail('');
            setFullName('');
            setPhone('');
            setIsErrors({
                fullName: false,
                email: false,
                phone: false,
                content: false,
            });
        }
    };

    return (
        <div className={cx('contact-form-container')}>
            <div className={cx('contact-form-outner')}>
                <input
                    type="text"
                    placeholder="Full Name"
                    className={cx('contact-form-input')}
                    value={fullName}
                    onChange={(e) => handleSetValue(e)}
                    name="full_name"
                />
                {isErrors.fullName ? <span className={cx('errors')}>* {textErrors.fullName}</span> : ''}
            </div>
            <div className={cx('contact-form-outner')}>
                <input
                    type="text"
                    placeholder="Email"
                    className={cx('contact-form-input')}
                    value={email}
                    onChange={(e) => handleSetValue(e)}
                    name="email"
                />
                {isErrors.email ? <span className={cx('errors')}>* {textErrors.email}</span> : ''}
            </div>
            <div className={cx('contact-form-outner')}>
                <input
                    type="text"
                    placeholder="Phone"
                    className={cx('contact-form-input')}
                    value={phone}
                    onChange={(e) => handleSetValue(e)}
                    name="phone"
                />
                {isErrors.phone ? <span className={cx('errors')}>* {textErrors.phone}</span> : ''}
            </div>
            <div className={cx('contact-form-outner')}>
                <textarea
                    className={cx('contact-form-textarea')}
                    placeholder="Message"
                    value={content}
                    onChange={(e) => handleSetValue(e)}
                    name="content"
                ></textarea>
                {isErrors.content ? <span className={cx('errors')}>* {textErrors.content}</span> : ''}
            </div>
            <div className={cx('contact-form-btn')} onClick={() => handleSubmit()}>
                <Button text={'Send'} blackText big />
            </div>
        </div>
    );
};

export default ContactForm;
