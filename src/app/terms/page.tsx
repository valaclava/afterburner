// app/terms/page.tsx (for App Router) or pages/terms.tsx (for Pages Router)
const TermsPage = () => {
  return (
    <main className="max-w-3xl mx-auto p-6 bg-black">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">Last updated: March 2025</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">1. Introduction</h2>
        <p>Welcome to valaclava's telemetry service. By using our services, you agree to these terms. Please read them carefully.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">2. Responsible Driving & Safety</h2>
        <p>
          We do not encourage speeding on public roads.  
          Always follow traffic laws, drive safely, and ensure that you and your passengers wear helmets and seatbelts at all times.  
          <p className="font-bold">Speed only on tracks or controlled environments where it is legal and safe.</p>
          Reckless driving can endanger lives—be responsible and respect others on the road.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">2. Use of Services</h2>
        <p>Our platform is designed to help you analyze and improve your driving performance.  
           You agree to use our services responsibly and avoid any illegal or reckless driving behavior.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">3. Safety Disclaimer</h2>
        <p>Your safety is our top priority. Always follow these safety guidelines:</p>
        <ul className="list-disc ml-6">
          <li>Wear a helmet and seatbelt at all times while driving.</li>
          <li>Only participate in high-speed driving in controlled environments such as racetracks or private circuits.</li>
          <li>Follow local traffic laws and respect other road users.</li>
          
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">4. Updates to Terms</h2>
        <p>We may update these terms periodically. By continuing to use our services, you accept any modifications.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">5. Contact Us</h2>
        <p>If you have any questions about these terms, please contact us at  
           <a href="https://x.com/valaclavahq" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"> Contact Us</a>.
        </p>
      </section>
    </main>
  );
};

export default TermsPage;
