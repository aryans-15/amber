import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-between p-4 items-center text-disabled">
      <div className="flex space-x-6">
        <Link to="/about" className="text-xl hover:underline duration-300">
          About
        </Link>
        <Link to="/faq" className="text-xl hover:underline duration-300">
          FAQ
        </Link>
        <a
          href="https://hackumbc.tech"
          target="_blank"
          className="text-xl hover:underline duration-300"
        >
          built for HackUMBC
        </a>
      </div>

      <p className="text-xl">© 2024 amberAI. All rights reserved.</p>
    </div>
  );
}

export default Footer;
