/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

const LoginPage = () => {
    const { layoutConfig } = useContext(LayoutContext);
    // var 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const [checked, setChecked] = useState(false);


    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const handleSignIn = async () => {
        try {
            const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:YpflsRsy/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');
                return;
            }
    
            // Parse the response JSON
            const data = await response.json();
    
            // Save the authToken in localStorage
            const { authToken, bcnp } = data;
            localStorage.setItem('jwtToken', authToken);
    
            // Optionally save user data (e.g., for use in the app)
            if (bcnp && bcnp.length > 0) {
                localStorage.setItem('user', JSON.stringify(bcnp[0]));
            }
    
            // Redirect to the homepage
            router.push('/');
        } catch (error) {
            console.error('Login error:', error);
            // setError('An unexpected error occurred');
        }
    };
    

    return (
        <div className={containerClassName}>
            <div className="grid">
                <div className="col-12">
                    <div className="card p-fluid">
                        <h5>Sign in to continue</h5>
                        {error && <div className="p-error">{error}</div>} {/* Display error message */}

                        <div className="field">
                            <label htmlFor="email-form">Email</label>
                            <InputText
                                id="email-form"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="pass-form">Password</label>
                            <Password
                                id="pass-form"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                toggleMask
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="field">
                            <Button label="Sign in" onClick={handleSignIn} />
                        </div>

                        <div className="field">
                            <a href="/forgot-password" className="text-primary">Forgot Password?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
