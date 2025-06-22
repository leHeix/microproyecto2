import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";

export const Perfil = (): JSX.Element => {
  // Navigation links for footer
  const navigationLinks = [
    { title: "Inicio", href: "#" },
    { title: "Reservar", href: "#" },
    { title: "Perfil", href: "#" },
  ];

  const contactInfo = [
    { title: "Correo:", value: "" },
    { title: "Teléfono:", value: "" },
    { title: "Dirección: Caracas, Vzla", value: "" },
  ];

  const usefulLinks = [
    { title: "Normas de uso", href: "#" },
    { title: "FAQ", href: "#" },
    { title: "Soporte técnico", href: "#" },
  ];

  const socialIcons = [
    { src: "/icon.svg", alt: "Facebook" },
    { src: "/icon-2.svg", alt: "LinkedIn" },
    { src: "/icon-1.svg", alt: "YouTube" },
    { src: "/icon-3.svg", alt: "Instagram" },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1280px] relative">
        {/* Main Content */}
        <main className="flex flex-col md:flex-row gap-16 px-20 py-16">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <Avatar className="w-[435px] h-[435px]">
              <AvatarImage src="/image-12.png" alt="Profile picture" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          </div>

          {/* Profile Information */}
          <div className="flex flex-col gap-8">
            <h1 className="font-medium text-5xl tracking-[-0.96px]">
              Tu Perfil
            </h1>

            <div className="space-y-8 mt-8">
              <div>
                <h2 className="font-medium text-[28px] tracking-[-0.56px]">
                  Nombre:
                </h2>
              </div>

              <div>
                <h2 className="font-medium text-[28px] tracking-[-0.56px]">
                  Correo Electrónico:
                </h2>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-6 mt-8">
              <Button className="bg-black text-white text-xl rounded-lg shadow-button-shadow px-8 py-5 h-auto">
                Editar Perfil
              </Button>

              <Button className="bg-black text-white text-xl rounded-lg shadow-button-shadow px-8 py-5 h-auto">
                Historial de Reservas
              </Button>
            </div>

            <div className="mt-8">
              <Button className="bg-black text-white text-xl rounded-lg shadow-button-shadow px-8 py-5 h-auto w-full md:w-auto">
                Opina acerca nuestros espacios y servicios
              </Button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full bg-[#f7f7f7] border border-solid border-black pt-12 pb-8 px-20">
          <Separator className="mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand and Social */}
            <div className="flex flex-col gap-8">
              <h3 className="font-subheading text-black text-[24px] leading-9">
                UNIESPACIOS
              </h3>

              <div className="flex items-start gap-2">
                {socialIcons.map((icon, index) => (
                  <Card
                    key={index}
                    className="w-10 h-10 rounded flex items-center justify-center"
                  >
                    <CardContent className="p-0 flex items-center justify-center w-6 h-6">
                      <img className="w-5 h-5" alt={icon.alt} src={icon.src} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-6">
              <h4 className="font-small-text font-medium text-black text-base">
                Navegación Rápida
              </h4>

              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-small-text font-medium text-[#444444] text-base"
                >
                  {link.title}
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-6">
              <h4 className="font-small-text font-medium text-black text-base">
                Contacto
              </h4>

              {contactInfo.map((info, index) => (
                <p
                  key={index}
                  className="font-small-text font-medium text-[#444444] text-base"
                >
                  {info.title} {info.value}
                </p>
              ))}
            </div>

            {/* Useful Links */}
            <div className="flex flex-col gap-6">
              <h4 className="font-small-text font-medium text-black text-base">
                Enlaces Utiles
              </h4>

              {usefulLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-small-text font-medium text-[#444444] text-base"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
