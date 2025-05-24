"use client";
import React from "react";

export default function LandingPage() {
  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 relative overflow-hidden w-full py-12 sm:py-16 md:py-20">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full opacity-10 bg-cover bg-center"
          style={{ backgroundImage: "url(https://pbs.twimg.com/media/Glt9EvQbgAAoFED?format=jpg&name=large)" }}
        />

        {/* Header */}
        <header className="text-center py-12 sm:py-16 md:py-20 w-full mt-8 sm:mt-12 md:mt-16">
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-wide font-bold mb-6 sm:mb-8">
            AFTERBURNER
          </h1>
          <p className="text-gray-300 text-base sm:text-xl md:text-2xl max-w-full sm:max-w-2xl mx-auto px-2">
            Ignite your racing performance with Afterburner telemetry system
          </p>
        </header>

        {/* Sections */}
        <div className="w-full max-w-7xl mx-auto space-y-16 sm:space-y-24 md:space-y-32 px-4 sm:px-6 md:px-8">
          <section className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold sm:mb-8 sm:mt-12 md:mt-16">
              Real-Time Telemetry, Precision Perfected
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
              Turn your smartphone into a race-grade telemetry tool. Monitor speed, distance, top speed in real-time. Advanced analytics and lap timing, acceleration, and G-force features coming soon.
            </p>
          </section>

          <section className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold sm:mb-8 mt-8 sm:mt-12 md:mt-16">
              No Sensors? No Problem.
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
              Forget bulky sensors. Afterburner leverages your smartphone's GPS and accelerometer to deliver accurate, real-time data at your fingertips. Pure telemetry, redefined.
            </p>
          </section>

          {/* <section className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 mt-8 sm:mt-12 md:mt-16">
              Gear Up with Valaclava
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover the Requiem of the Radiant Soul collection—a tribute to resilience and brilliance. Explore our premium apparel and accessories, crafted for those who dare to push limits.
            </p>
          </section> */}
        </div>
      </div>
    </>
  );
}
