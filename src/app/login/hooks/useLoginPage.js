import { useState } from 'react';
import axios from 'axios';

const useLoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    const handleEmailChange = (e) => {
        setCredentials((prev) => ({ ...prev, email: e.target.value }));
    };

    const handlePasswordChange = (e) => {
        setCredentials((prev) => ({ ...prev, password: e.target.value }));
    };

    const resetFields = () => {
        setCredentials({ email: '', password: '' });
        setError(null); // Reset error state as well
    };

    const authenticateUser = async () => {
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_AUTHENTICATE_ACCOUNT, credentials);
            if (response.status === 200) {
                console.log('Login process result:', response.data);
                setError(null); // Clear any previous errors
                // Redirect or perform other actions
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Authentication failed. Please check your credentials and try again.');
        }
    };

    return {
        credentials,
        error,
        handleEmailChange,
        handlePasswordChange,
        resetFields,
        authenticateUser
    };
};

export default useLoginPage;
