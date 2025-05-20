import Link from 'next/link';
import React from 'react'
import { FaExternalLinkAlt } from "react-icons/fa";
import Footer from '../components/Footer';

function Shop() {
    return (
        <>
            <div className="flex flex-col bg-black items-center justify-center text-center">
                <h1 className="text-3xl font-bold">Valaclava Collection</h1>
                <p className="text-gray-600 mt-2">Fast life</p>

                {/* Visit Store Button */}
                <Link
                    href="https://my-store-1060ee3.creator-spring.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 hover:text-sky-400 transition duration-300 ease-in-out"
                >
                    Visit Store
                    <FaExternalLinkAlt className="w-4 h-4" />
                </Link>
                <h4 className='text-xl py-4 font-bold'>Requiem of the Radiant Soul Collection</h4>
                <a className="py-10" href="https://my-store-1060ee3.creator-spring.com/listing/requiem-of-the-radiant-soul?product=212&variation=5819">
                    <img src="https://mockup-api.teespring.com/v3/image/5gmbpR1X5wDebkZsUlvJbMwJSNY/800/800.jpg" alt="" />
                </a>
                <a href="https://my-store-1060ee3.creator-spring.com/listing/requiem-of-the-radiant-soul?product=933&variation=103893">
                    <img  src="https://mockup-api.teespring.com/v3/image/WKB0HJBdtGFPvHpUy-pznDux6mA/1200/1200.jpg" alt="" />
                </a>
                <a className="py-10" href="https://my-store-1060ee3.creator-spring.com/listing/requiem-of-the-radiant-soul?product=2048&variation=105583">
                    <img  src="https://mockup-api.teespring.com/v3/image/Rk3-I8UOSTc03G9HoqegXYt_7CQ/800/800.jpg" alt="" />
                </a>
            </div>

            <Footer />
        </>
    )
}

export default Shop
