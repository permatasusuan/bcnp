import { useRouter } from 'next/navigation';

export const validateToken = async () => {
    const router = useRouter();
    const token = localStorage.getItem('jwtToken');
    const user = localStorage.getItem('user');

    if (!token) {
        router.push('/auth/login');
        return false;
    }

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
                    const data = await response.json();
                    return data; // Return data or any other logic to validate user
                } else {
                    console.error('Failed to fetch user data');
                    router.push('/auth/login');
                    return false;
                }
            } else {
                console.error('User ID not found in user data');
                router.push('/auth/login');
                return false;
            }
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
            router.push('/auth/login');
            return false;
        }
    } else {
        router.push('/auth/login');
        return false;
    }
};
