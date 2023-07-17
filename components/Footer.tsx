import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F0F0F] py-4 text-center w-full ">
      <p className="text-white text-sm">
        Projeto feito usando{" "}
        <a
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          React
        </a>{" "}
        e{" "}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:underline"
        >
          Next.js
        </a>
      </p>
    </footer>
  );
};

export default Footer;
