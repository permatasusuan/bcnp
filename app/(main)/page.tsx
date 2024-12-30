/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '@/layout/context/layoutcontext';

const Dashboard = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

   
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
