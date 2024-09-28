import { useState } from "react";

function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center p-4 items-center">
      <div className="w-fit flex space-x-6 text-disabled">
        <a href="#" className="text-xl hover:underline duration-300">
          About
        </a>
        <a href="#" className="text-xl hover:underline duration-300">
          Help
        </a>
        <a href="#" className="text-xl hover:underline duration-300">
          built for HackUMBC
        </a>
      </div>
    </div>
  );
}

export default Footer;
