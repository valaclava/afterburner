import React from "react";
import Footer from "../components/Footer";

const GuidePage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">InRequiem Guide</h1>
        
        {/* <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
          <p>Welcome to InRequiem, where technology, music, fashion, and speed collide. This guide will help you navigate and make the most of our services.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Our Services</h2>
          <ul className="list-disc ml-6">
            <li><strong>🚀 Telemetry:</strong> Real-time performance data to track and enhance your racing experience.</li>
            <li><strong>🎵 Synthetic Music:</strong> Experience the future of sound with our AI-generated music solutions.</li>
            <li><strong>👕 High-Performance Apparel:</strong> Fashion engineered for speed, performance, and self-expression.</li>
            <li><strong>⚙️ Cutting-Edge Electronics:</strong> Innovative tech built to push boundaries in performance and connectivity.</li>
          </ul>
        </section> */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">How to Use Our Product</h2>
          <p>1. intall app or open it on your browser, set up your profile, and start tracking your performance.</p>
          {/* <p>2. **Music** – Immerse yourself in AI-crafted soundscapes designed for speed and creativity.</p>
          <p>3. **Fashion & Gear** – Elevate your style with high-performance apparel and futuristic designs.</p> */}
        </section>
      
        <section className="mb-8 border-t border-gray-700 pt-6">
          <h2 className="text-2xl font-semibold mb-2">Join the Crew</h2>
          <p>
            InRequiem is more than a brand—it’s a culture. Whether you're a racer, artist, or innovator. 
            Follow us on <a href="https://x.com/InRequiemX">X @InRequiemX</a> and stay ahead of the curve.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default GuidePage;
