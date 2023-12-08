import axios from '@/service/axios';

const loginUser = async (email, password) => {
    const loginUrl = '/api/auth/login';

    const loginData = {
        email: email,
        password: password,
    };

    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.post(loginUrl, loginData, { headers });
        const { access_token, token_type, expires_in } = response;
        return {
            success: true,
            access_token: access_token,
            token_type: token_type,
            expires_in: expires_in,
        };
    } catch (error) {
        if (error.response.status === 401) {
            console.log('Incorrect email or password');
        } else {
            console.log('Authentication error:', error.response);
        }

        return {
            success: false,
            error: error.response ? error.response.data : error.message,
        };
    }
};

const logoutUser = async () => {
    const logoutUrl = '/api/auth/logout';
    const token = localStorage.getItem('jwt');

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    try {
        await axios.post(logoutUrl, {}, { headers });
        return {
            success: true,
        };
    } catch (error) {
        console.error('Logout error:', error.response ? error.response : error.message);
        return {
            success: false,
            error: error.response ? error.response : error.message,
        };
    }
};
export { loginUser, logoutUser };
