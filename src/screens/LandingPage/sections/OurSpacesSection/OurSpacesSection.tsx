import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const OurSpacesSection = (): JSX.Element => {
  // Data for the spaces cards
  const spaces = [
    {
      id: 1,
      title: "Aulas",
      description: "Salones cómodos para clases, charlas o reuniones grupales.",
      image: "/imagen-aula.png",
      alt: "Imagen aula",
    },
    {
      id: 2,
      title: "Cubículos",
      description:
        "Espacios silenciosos para estudio individual o en grupo pequeño",
      image: "/imagen-cub-culo.png",
      alt: "Imagen cubículo",
    },
    {
      id: 3,
      title: "Laboratorios",
      description: "Equipados para prácticas académicas con tecnología",
      image: "/imagen-lab.png",
      alt: "Imagen lab",
    },
  ];

  return (
    <section className="w-full max-w-[1156px] mx-auto py-12">
      <h2 className="font-semibold text-4xl text-black tracking-[-0.72px] mb-12">
        Nuestros Espacios
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {spaces.map((space) => (
          <Card key={space.id} className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="flex flex-col gap-6">
                <img
                  className="w-full h-[285px] object-cover"
                  alt={space.alt}
                  src={space.image}
                />
                <div className="flex flex-col gap-6">
                  <h3 className="font-medium text-xl text-black leading-[30px] font-['Inter',Helvetica]">
                    {space.title}
                  </h3>
                  <p className="font-normal text-base text-[#828282] leading-6 font-['Inter',Helvetica]">
                    {space.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
