import React from "react";
import { Separator } from "./components/ui/separator";

export const NavigationFooter = (): JSX.Element => {
  // Navigation links data
  const quickNavLinks = [
    { title: "Navegación Rápida", isHeader: true },
    { title: "Inicio", isHeader: false },
    { title: "Reservar", isHeader: false },
    { title: "Perfil", isHeader: false },
  ];

  const contactLinks = [
    { title: "Contacto", isHeader: true },
    { title: "Correo:", isHeader: false },
    { title: "Teléfono:", isHeader: false },
    { title: "Dirección: Caracas, Vzla", isHeader: false },
  ];

  const usefulLinks = [
    { title: "Enlaces Utiles", isHeader: true },
    { title: "Normas de uso", isHeader: false },
    { title: "FAQ", isHeader: false },
    { title: "Soporte técnico", isHeader: false },
  ];

  // Social media icons data
  const socialIcons = [
    { src: "/icon.svg", alt: "Icon" },
    { src: "/icon-1.svg", alt: "Icon" },
    { src: "/icon-3.svg", alt: "Icon" },
    { src: "/icon-2.svg", alt: "Icon" },
  ];

  return (
    <footer className="w-full py-12 bg-[#f7f7f7] border border-solid border-black">
      <div className="container mx-auto px-5">
        <Separator className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and social icons */}
          <div className="flex flex-col justify-between">
            <h2 className="font-subheading font-[number:var(--subheading-font-weight)] text-black text-[length:var(--subheading-font-size)] tracking-[var(--subheading-letter-spacing)] leading-[var(--subheading-line-height)] [font-style:var(--subheading-font-style)]">
              UNIESPACIOS
            </h2>

            <div className="flex items-start gap-2 mt-8">
              {socialIcons.map((icon, index) => (
                <div key={index} className="relative w-10 h-10 rounded">
                  <div className="relative w-6 h-6 top-2 left-2">
                    <img
                      className={`absolute ${
                        index === 2
                          ? "w-5 h-3.5 top-[5px] left-0.5"
                          : index === 1
                            ? "w-[18px] h-[18px] top-[3px] left-[3px]"
                            : "w-5 h-5 top-0.5 left-0.5"
                      }`}
                      alt={icon.alt}
                      src={icon.src}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-col gap-6">
            {quickNavLinks.map((link, index) => (
              <div
                key={index}
                className={`font-small-text font-[number:var(--small-text-font-weight)] ${
                  link.isHeader ? "text-black" : "text-[#444444]"
                } text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)] ${
                  index === 0 ? "mt-[-1.00px]" : ""
                }`}
              >
                {link.title}
              </div>
            ))}
          </div>

          {/* Contact Links */}
          <div className="flex flex-col gap-6">
            {contactLinks.map((link, index) => (
              <div
                key={index}
                className={`font-small-text font-[number:var(--small-text-font-weight)] ${
                  link.isHeader ? "text-black" : "text-[#444444]"
                } text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)] ${
                  index === 0 ? "mt-[-1.00px]" : ""
                }`}
              >
                {link.title}
              </div>
            ))}
          </div>

          {/* Useful Links */}
          <div className="flex flex-col gap-6">
            {usefulLinks.map((link, index) => (
              <div
                key={index}
                className={`font-small-text font-[number:var(--small-text-font-weight)] ${
                  link.isHeader ? "text-black" : "text-[#444444]"
                } text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)] ${
                  index === 0 ? "mt-[-1.00px]" : ""
                }`}
              >
                {link.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};