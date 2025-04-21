import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About InRequiem</h1>
        
        <p className="text-lg mb-6">
          InRequiem is more than a brand. We are a blend of technology, music, fashion, and speed, 
          creating a unique space where sound, style, and innovation collide. Our mission is to push the boundaries of creativity and performance, offering cutting-edge solutions in synthetic music, high-performance apparel, and revolutionary electronics.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-2">Our Vision</h2>
        <p>We believe in a future where technology fuels self-expression, where music moves with you, and where innovation is at the core of everything you wear and create. InRequiem isn't just a name—it's a philosophy of movement, sound, and limitless potential.</p>
        
        <h2 className="text-2xl mt-6 font-semibold mb-2">Our Pillars</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Innovation:</strong> We push the limits of what's possible in music, fashion, and technology.</li>
          <li><strong>Creativity:</strong> InRequiem is a space for creators, artists, and pioneers who challenge conventions.</li>
          <li><strong>Speed & Performance:</strong> From high-performance apparel to cutting-edge telemetry, we power those who move fast.</li>
          <li><strong>Self-Expression:</strong> Your style. Your sound. Your future—synthesized.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Join the Movement</h2>
        <p>InRequiem is built for the fearless, the pioneers, and the creators. Whether you push limits on the track, in the studio, or in your own unique space, we're here to fuel your passion. The future is now—let's synthesize it together.</p>

        <p className="mt-6">Follow us on <a href="https://x.com/inrequiemx">[X (@InRequiemX)]</a> and stay ahead of the curve.</p>
      </div>
    </div>
  );
};

export default AboutPage;
