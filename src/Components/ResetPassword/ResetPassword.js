import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../SignUp/SignUp.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email); // Remove this line once we enable password reset on firebase
        try {
            setError('');
            await resetPassword(email);
            setSuccessMessage('Check your email for instructions to reset your password.');
        } catch (error) {
            setError('Failed to reset password');
        }
    };

    return (
        <div className="home">
            <h1>Reset Password</h1>
            <div className="form-box">
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="home-buttons">
                        <button type="submit" className="home-button">Reset Password</button>
                    </div>
                </form>
                {error && <p>{error}</p>}
                {successMessage && <p>{successMessage}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
