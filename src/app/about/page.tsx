import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About VΛCLV</h1>

        <p className="text-lg mb-6">
          At valaclava, we craft tools for machines quicker than a blink of an eye.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">What do we do?</h2>
        <p>We build systems that observe before acting, follow movement, commerce, and cognition—not just to forecast, but to truly grasp.</p><br />
        <p>Telemetry. Finance. Automata.</p><br />
        <p>Collaborators: Researchers, engineers, traders and race drivers</p>

        <p className="mt-6">contact us via <a href="https://x.com/valaclavahq" target="_blank"><p className="text-base text-gray-400" >X (@valaclavahq)</p></a> </p>
         <p className="mt-6">try our other services at <a href="https://valaclava.netlify.app/" target="_blank"><p className="text-base text-gray-400" >valaclava.in</p></a></p>
      </div>
    </div>
  );
};

export default AboutPage;
