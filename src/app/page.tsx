"use client"
import { ClerkProvider } from '@clerk/nextjs';
import { SignedOut, SignInButton } from '@clerk/clerk-react';
import Link from "next/link";
import React from "react";

const LandingPage = () => {
    return (
        <ClerkProvider>
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 text-center">
                {/* Logo */}
                <div className="mb-6 w-full flex justify-center">
                    <img 
                        className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[400px] object-cover" 
                        src="https://pbs.twimg.com/media/Glt9EvQbgAAoFED?format=jpg&name=large" 
                        alt="VΛCLV" 
                    />
                </div>

                {/* Branding */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest">VΛCLV</h1>
                <p className="text-gray-400 text-xs sm:text-sm mt-2 uppercase">Performance Telemetry without expensive sensors</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-2 uppercase">just your smartphone</p>

                {/* CTA Button */}
                <Link href="/home" className="mt-10 w-full max-w-[200px] px-6 py-3 border border-white text-black bg-white hover:bg-gray-300 transition rounded">
                    Home
                </Link>

                <SignedOut>
                    <SignInButton>
                        <button className="mt-4 w-full max-w-[200px] px-6 py-3 border border-white text-black bg-white hover:bg-gray-300 transition rounded">
                            Sign In
                        </button>
                    </SignInButton>
                </SignedOut>
            </div>
        </ClerkProvider>
    );
};

export default LandingPage;
