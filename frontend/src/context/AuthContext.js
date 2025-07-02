import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const setAuthToken = (token) => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            setToken(token);
        } else {
            delete api.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            setToken(null);
        }
    };

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            setAuthToken(data.token);
            setUser(data.user);
            toast.success(`Welcome back, ${data.user.username}!`);
            return true; // Success
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
            throw err;
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await api.post('/auth/register', userData);
            setAuthToken(data.token);
            setUser(data.user);
            toast.success('Registration successful!');
            return true; // Success
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
            throw err;
        }
    };

    const logout = () => {
        setAuthToken(null);
        setUser(null);
        toast.info('Logged out successfully');
        return true; // Success
    };

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const { data } = await api.get('/auth/me');
                    setUser(data);
                } catch (err) {
                    logout();
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;