import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

export const Login = (): JSX.Element => {
  // Navigation links data
  const navigationLinks = [
    { title: "Inicio", url: "#" },
    { title: "Reservar", url: "#" },
    { title: "Perfil", url: "#" },
  ];

  // Contact information data
  const contactInfo = [
    { title: "Correo:", value: "" },
    { title: "Teléfono:", value: "" },
    { title: "Dirección: Caracas, Vzla", value: "" },
  ];

  // Useful links data
  const usefulLinks = [
    { title: "Normas de uso", url: "#" },
    { title: "FAQ", url: "#" },
    { title: "Soporte técnico", url: "#" },
  ];

  // Social media icons data
  const socialIcons = [
    { src: "/icon.svg", alt: "Icon" },
    { src: "/icon-2.svg", alt: "Icon" },
    { src: "/icon-3.svg", alt: "Icon" },
    { src: "/icon-1.svg", alt: "Icon" },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1280px] relative">
        {/* Header */}
        <header className="w-full h-[135px] flex items-center justify-between px-20 border border-solid border-black">
          <img
            className="w-[272px] h-[60px] object-cover"
            alt="Uniespacios"
            src="/logo.png"
          />

          <nav className="flex items-center gap-8">
            <Link
              className="font-medium text-black text-base leading-6"
              to="/login"
            >
              Iniciar Sesión
            </Link>
            <div className="font-medium text-black text-base leading-6">
              Registrarse
            </div>
            <div className="font-medium text-black text-base leading-6">
              <a href="/">Inicio</a>
            </div>
            <Button className="bg-black text-white rounded-lg shadow-button-shadow text-[13px]">
              Mas
            </Button>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex flex-row justify-between px-20 mt-16">
          {/* Login Form */}
          <div className="flex flex-col w-[597px]">
            <h1 className="font-medium text-5xl tracking-[-0.96px] mb-12">
              Iniciar Sesión
            </h1>

            <div className="space-y-6">
              <div className="relative">
                <Input
                  className="h-[74px] rounded-[14px] border-2 border-solid border-black shadow-[0px_4px_4px_#00000040] pl-2"
                  placeholder="correo eléctronico"
                />
              </div>

              <div className="relative">
                <Input
                  className="h-[74px] rounded-[14px] border-2 border-solid border-black shadow-[0px_4px_4px_#00000040] pl-2"
                  type="password"
                  placeholder="contraseña"
                />
              </div>

              <Button className="w-[342px] h-[74px] bg-black text-white rounded-lg shadow-button-shadow text-xl flex items-center justify-center gap-2 mt-8">
                Inicia Sesión
              </Button>

              <Button className="w-[342px] h-[74px] bg-black text-white rounded-lg shadow-button-shadow text-xl flex items-center justify-center gap-2 mt-8">
                Inicia Sesión con Google
                <img
                  className="w-[34px] h-[34px] object-cover"
                  alt="Cromo"
                  src="/cromo-1.png"
                />
              </Button>

              <div className="mt-4 text-base">
                <span className="text-black">No tienes una cuenta? </span>
                <span className="text-[#0037ff] cursor-pointer">
                  Registrate
                </span>
              </div>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="flex-shrink-0">
            <img
              className="w-[550px] h-[492px] object-cover"
              alt="Image"
              src="/image-10.png"
            />
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full mt-32 bg-[#f7f7f7] border border-solid border-black py-12">
          <div className="px-20">
            <Separator className="mb-12" />

            <div className="flex justify-between">
              {/* Brand and Social */}
              <div className="space-y-8">
                <h2 className="font-subheading text-[24px] text-black">
                  UNIESPACIOS
                </h2>

                <div className="flex items-start gap-2">
                  {socialIcons.map((icon, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded flex items-center justify-center"
                    >
                      <div className="relative w-6 h-6">
                        <img
                          className="absolute w-5 h-5 top-0.5 left-0.5"
                          alt={icon.alt}
                          src={icon.src}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-6">
                <h3 className="font-small-text text-black">
                  Navegación Rápida
                </h3>
                {navigationLinks.map((link, index) => (
                  <div key={index} className="font-small-text text-[#444444]">
                    {link.title}
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="font-small-text text-black">Contacto</h3>
                {contactInfo.map((info, index) => (
                  <div key={index} className="font-small-text text-[#444444]">
                    {info.title} {info.value}
                  </div>
                ))}
              </div>

              {/* Useful Links */}
              <div className="space-y-6">
                <h3 className="font-small-text text-black">Enlaces Utiles</h3>
                {usefulLinks.map((link, index) => (
                  <div key={index} className="font-small-text text-[#444444]">
                    {link.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
