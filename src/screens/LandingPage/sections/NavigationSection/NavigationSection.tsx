import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

export const NavigationSection = (): JSX.Element => {
  // Navigation links data
  const navLinks = [
    { text: "Iniciar Sesión", path: "/login", isLink: true },
    { text: "Registrarse", path: "#", isLink: false },
    { text: "Inicio", path: "/", isLink: true },
  ];

  return (
    <nav className="w-full h-[135px] bg-white border border-solid border-black flex items-center justify-between px-20">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img
          className="w-[272px] h-[60px] object-cover"
          alt="Logo"
          src="/logo.png"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-10">
        {navLinks.map((link, index) =>
          link.isLink ? (
            <Link
              key={index}
              className="font-medium text-base text-black font-['Inter',Helvetica] leading-6 tracking-[0]"
              to={link.path}
            >
              {link.text}
            </Link>
          ) : (
            <div
              key={index}
              className="font-medium text-base text-black font-['Inter',Helvetica] leading-6 tracking-[0] cursor-pointer"
            >
              {link.text}
            </div>
          ),
        )}

        {/* Action Button */}
        <Button className="bg-black text-white rounded-lg shadow-button-shadow px-6 py-3.5 h-auto">
          <span className="font-medium text-[13px] font-['Inter',Helvetica] leading-[19.5px] tracking-[0]">
            Mas
          </span>
        </Button>
      </div>
    </nav>
  );
};
