// components/Footer.tsx
const Footer = () => {
  return (
    <footer className="text-center p-4 bg-black text-white text-sm">
      <p>© {new Date().getFullYear()} Telemetry | Synthesized by InRequiem</p>
      <nav className="mt-2">
        <a href="/about" className="text-blue-400 hover:underline mx-2">About</a> |
        <a href="/terms" className="text-blue-400 hover:underline mx-2">Terms</a> |
        <a href="https://x.com/inrequiemx" className="text-blue-400 hover:underline mx-2">Contact</a>
      </nav>
    </footer>
  );
};

export default Footer;

