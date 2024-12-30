/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '@/layout/context/layoutcontext';

const Dashboard = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('jwtToken'); // Replace with your JWT storage mechanism
            if (!token) {
                router.push('/auth/login');
                return;
            }

            try {
                // Example validation logic
                const response = await fetch('/api/auth/validate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    router.push('/auth/login');
                }
            } catch (error) {
                console.error('JWT validation failed:', error);
                router.push('/auth/login');
            }
        };

        validateToken();
    }, [router]);

    return (
        <div className="grid">
            <div className="col-12 lg:col-12 xl:col-12">
                <div className="card mb-0">
                    Dashboard
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
