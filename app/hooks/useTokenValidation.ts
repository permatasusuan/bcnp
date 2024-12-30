import { useState, useEffect } from 'react';

const useTokenValidation = (): boolean => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const token = localStorage.getItem('jwtToken');
    const user = localStorage.getItem('user');

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setIsValid(false);
            } else {
                if (user) {
                    try {
                        const _user = JSON.parse(user);
                        const uid = _user?.id;
                        if (uid) {
                            const url = `https://x8ki-letl-twmt.n7.xano.io/api:YpflsRsy/auth/me?uid=${uid}`;
                            const response = await fetch(url, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`,
                                },
                            });
                            if (response.ok) {
                                setIsValid(true);
                            } else {
                                setIsValid(false);
                            }
                        } else {
                            setIsValid(false);
                        }
                    } catch (error) {
                        setIsValid(false);
                    }
                } else {
                    setIsValid(false);
                }

            }
        };
        validateToken();
    }, []); // Empty dependency array ensures this runs only once on component mount

    return isValid;
};

export default useTokenValidation;
