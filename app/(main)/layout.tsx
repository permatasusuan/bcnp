'use client'
import { Metadata } from 'next';
import Layout from '../../layout/layout';
import useTokenValidation from '../hooks/useTokenValidation';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: '2024',
    description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'PrimeReact SAKAI-REACT',
        url: 'https://sakai.primereact.org/',
        description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
        images: ['https://www.primefaces.org/static/social/sakai-react.png'],
        ttl: 604800
    },
    icons: {
        icon: '/favicon.ico'
    }
};

export default function AppLayout({ children }: AppLayoutProps) {
    const isValid = useTokenValidation(); // Call the custom hook to validate the token
    const router = useRouter(); // Get the router instance

   console.log (isValid)

    if (!isValid) {
        router.push('/auth/login'); // Redirect to login if the token is not valid
    }

    return <Layout>{children}</Layout>;
}
