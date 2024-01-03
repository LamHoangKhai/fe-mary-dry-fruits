import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Contact_Us.module.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
const cx = classNames.bind(styles);

const ContactLocation = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude });
                        console.log(location);
                    },
                    (err) => {
                        setError(err.message);
                    },
                );
            } else {
                setError('Geolocation is not supported by your browser');
            }
        };

        getLocation();
    }, []);

    return (
        <div className={cx('leaflet-container')}>
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                crossOrigin=""
            />

            {location ? (
                <MapContainer center={[location.latitude, location.longitude]} zoom={18} style={{ height: '500px' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[location.latitude, location.longitude]}>
                        <Popup>Your Location</Popup>
                    </Marker>
                </MapContainer>
            ) : (
                <p>{error || 'Getting location...'}</p>
            )}
        </div>
    );
};

export default ContactLocation;
