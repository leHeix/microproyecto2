import React, { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Users,
  Clock,
  Wifi,
  MonitorSpeaker,
  Coffee,
} from "lucide-react";

export const OurSpacesSection = (): JSX.Element => {
  const navigate = useNavigate();
  const [hoveredSpace, setHoveredSpace] = useState<number | null>(null);

  // Data for the spaces cards with enhanced information
  const spaces = [
    {
      id: 1,
      title: "Aulas",
      description: "Salones cómodos para clases, charlas o reuniones grupales.",
      image: "/imagen-aula.png",
      alt: "Imagen aula",
      capacity: "30-50 personas",
      features: ["Proyector", "Pizarra digital", "Audio", "WiFi"],
      available: true,
    },
    {
      id: 2,
      title: "Cubículos",
      description:
        "Espacios silenciosos para estudio individual o en grupo pequeño",
      image: "/imagen-cub-culo.png",
      alt: "Imagen cubículo",
      capacity: "1-4 personas",
      features: ["Escritorio", "Silla ergonómica", "WiFi", "Toma corriente"],
      available: true,
    },
    {
      id: 3,
      title: "Laboratorios",
      description: "Equipados para prácticas académicas con tecnología",
      image: "/imagen-lab.png",
      alt: "Imagen lab",
      capacity: "15-25 personas",
      features: [
        "Computadoras",
        "Software especializado",
        "Equipos técnicos",
        "WiFi",
      ],
      available: false,
    },
  ];

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-4 h-4" />;
      case "proyector":
      case "pizarra digital":
      case "computadoras":
        return <MonitorSpeaker className="w-4 h-4" />;
      default:
        return <Coffee className="w-4 h-4" />;
    }
  };

  const handleReserveSpace = (spaceId: number) => {
    // Aquí puedes agregar la lógica para reservar un espacio
    console.log(`Reservando espacio ${spaceId}`);
    navigate("/login"); // Por ahora redirige al login
  };

  return (
    <section
      id="our-spaces"
      className="w-full bg-gradient-to-b from-orange-50 to-blue-50 py-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Nuestros Espacios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre la variedad de espacios diseñados para maximizar tu
            productividad y creatividad. Desde aulas amplias hasta laboratorios
            especializados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spaces.map((space) => (
            <Card
              key={space.id}
              className={`group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-black ${
                hoveredSpace === space.id ? "scale-105" : ""
              }`}
              onMouseEnter={() => setHoveredSpace(space.id)}
              onMouseLeave={() => setHoveredSpace(null)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    className="w-full h-[280px] object-cover group-hover:scale-110 transition-transform duration-300"
                    alt={space.alt}
                    src={space.image}
                  />
                  {!space.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold border-2 border-black">
                        No Disponible
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border-2 border-black ${
                        space.available
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {space.available ? "Disponible" : "Ocupado"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-2xl font-bold text-black">
                      {space.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {space.description}
                  </p>

                  <div className="flex items-center mb-4 text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{space.capacity}</span>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-black mb-2">
                      Características:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {space.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-sm text-gray-600"
                        >
                          {getFeatureIcon(feature)}
                          <span className="ml-2">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleReserveSpace(space.id)}
                      disabled={!space.available}
                      className={`w-full border-2 border-black shadow-[4px_4px_0px_0px_#000000] ${
                        space.available
                          ? "bg-[#fd8204] hover:bg-[#fd8204]/90 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <CalendarDays className="w-4 h-4 mr-2" />
                      {space.available ? "Reservar Ahora" : "No Disponible"}
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-2 border-[#253a80] text-[#253a80] hover:bg-[#253a80]/10 shadow-[4px_4px_0px_0px_#00000040]"
                      onClick={() => {
                        // Aquí puedes agregar funcionalidad para ver más detalles
                        console.log(`Ver detalles de ${space.title}`);
                      }}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Ver Horarios
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-[#253a80] rounded-2xl p-8 text-white border-2 border-black shadow-[8px_8px_0px_0px_#000000]">
            <h3 className="text-2xl font-bold mb-4">
              ¿No encuentras el espacio perfecto?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Contáctanos y te ayudaremos a encontrar la solución ideal para tus
              necesidades específicas. Tenemos opciones personalizables.
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-[#fd8204] text-white hover:bg-[#fd8204]/90 border-2 border-black shadow-[4px_4px_0px_0px_#000000] font-medium"
              onClick={() => {
                // Scroll a la sección de contacto o abrir modal
                console.log("Contactar para espacios personalizados");
              }}
            >
              Solicitar Espacio Personalizado
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
