import { useState } from 'react';
import axios from 'axios';

const useLoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleEmailChange = (e) => {
        setCredentials((prev) => ({ ...prev, email: e.target.value }));
    };

    const handlePasswordChange = (e) => {
        setCredentials((prev) => ({ ...prev, password: e.target.value }));
    };

    const resetFields = () => {
        setCredentials({ email: '', password: '' });
    };

    const authenticateUser = async () => {
        //e.preventDefault();
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_AUTHENTICATE_ACCOUNT, credentials);
            if (response.status === 200) {
                // Handle successful login
                console.log('Login process result:', response.data);
                // Redirect or perform other actions
            }
        }
        catch (error) {
            console.error('Login failed:', error);
            // Handle login failure
        }
    }
    return {
        credentials,
        handleEmailChange,
        handlePasswordChange,
        resetFields,
        authenticateUser
    };
};

export default useLoginPage;
