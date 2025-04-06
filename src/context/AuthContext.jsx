import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axiosInstance from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const verifyToken = useCallback(async (tokenToVerify) => {
        try {
            const response = await axiosInstance.get('/verify-token', {
                headers: {
                    Authorization: `Bearer ${tokenToVerify}`
                }
            });

            if (response.data.success) {
                setUser(response.data.data.user);
                return true;
            }
            return false;
        } catch (err) {
            console.error('Token verification failed:', err);
            return false;
        }
    }, []);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    const isValid = await verifyToken(storedToken);
                    if (!isValid) {
                        logout();
                    }
                }
            } catch (err) {
                console.error('Auth initialization failed:', err);
                logout();
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, [verifyToken]);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post('/login', { email, password });

            if (response.data.success) {
                const { token: newToken, user: userData } = response.data.data;
                localStorage.setItem('token', newToken);
                setToken(newToken);
                setUser(userData);
                return { success: true };
            }
            throw new Error(response.data.message || 'Login failed');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            return { success: false, message: err.response?.data?.message || err.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            loading,
            error,
            verifyToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);