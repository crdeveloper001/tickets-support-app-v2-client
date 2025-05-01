import { useState } from 'react';
import axios from 'axios';

const useRegistrationForm = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
        },
        dateOfBirth: '',
        password: '',
        role: 'user',
        isActive: true,
    });
    const resetForm = () => {
        setFormState({
            username: '',
            email: '',
            phoneNumber: '',
            address: {
                street: '',
                city: '',
                state: '',
                zipCode: '',
            },
            dateOfBirth: '',
            password: '',
            role: 'user',
            isActive: true,
        });
        setErrors({});
    };
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formState.email || !validateEmail(formState.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formState.password) {
            newErrors.password = 'Password is required';
        }
        if (!formState.dateOfBirth) {
            newErrors.dateOfBirth = 'Date of birth is required';
        }
        if (!formState.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        }
        if (!formState.address.street || !formState.address.city || !formState.address.state || !formState.address.zipCode) {
            newErrors.address = 'Complete address is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'email') {
            const username = value.split('@')[0];
            setFormState((prevState) => ({
                ...prevState,
                email: value,
                username,
            }));
            if (!validateEmail(value)) {
                setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, email: undefined }));
            }
        } else if (name.includes('address.')) {
            const addressField = name.split('.')[1];
            setFormState((prevState) => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [addressField]: value,
                },
            }));
        } else {
            setFormState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const registerUser = async () => {
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_CREATE_ACCOUNT, formState);
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }





    return {
        formState,
        errors,
        handleChange,
        resetForm,
        validateForm,
        registerUser
    };
};

export default useRegistrationForm;