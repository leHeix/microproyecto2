import React, { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../../supabase";
import {
  ArrowRight,
  ChevronDown,
  Play,
  Users,
  Calendar,
  MapPin,
} from "lucide-react";

export const HeroSection = (): JSX.Element => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    } catch (error) {
      console.error("Error checking auth:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/register");
    }
  };

  const handleLoginClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const scrollToSpaces = () => {
    const spacesSection = document.getElementById("our-spaces");
    if (spacesSection) {
      spacesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[854px] bg-[url(/image-5.png)] bg-cover bg-center flex flex-col items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Estadísticas rápidas */}
      <div className="relative z-10 grid grid-cols-3 gap-8 mb-12 max-w-md mx-auto">
        <div className="text-center animate-pulse">
          <div className="flex items-center justify-center w-12 h-12 bg-[#fd8204]/20 rounded-lg mx-auto mb-2">
            <Users className="w-6 h-6 text-[#fd8204]" />
          </div>
          <div className="text-2xl font-bold text-white">500+</div>
          <div className="text-xs text-orange-200">Usuarios</div>
        </div>
        <div className="text-center animate-pulse">
          <div className="flex items-center justify-center w-12 h-12 bg-[#253a80]/20 rounded-lg mx-auto mb-2">
            <MapPin className="w-6 h-6 text-[#253a80]" />
          </div>
          <div className="text-2xl font-bold text-white">50+</div>
          <div className="text-xs text-blue-200">Espacios</div>
        </div>
        <div className="text-center animate-pulse">
          <div className="flex items-center justify-center w-12 h-12 bg-[#fd8204]/20 rounded-lg mx-auto mb-2">
            <Calendar className="w-6 h-6 text-[#fd8204]" />
          </div>
          <div className="text-2xl font-bold text-white">1000+</div>
          <div className="text-xs text-orange-200">Reservas</div>
        </div>
      </div>

      {/* Título principal con el estilo original */}
      <Card className="relative z-10 w-[894px] h-[211px] bg-[url(/rectangle-1.svg)] bg-cover border-none rounded-lg mb-12">
        <CardContent className="flex items-center justify-center h-full p-8">
          <h1 className="font-['Inter',Helvetica] font-bold text-white text-5xl text-center tracking-[0] leading-[72px]">
            Gestiona, reserva y organiza tus espacios en un solo lugar
          </h1>
        </CardContent>
      </Card>

      {/* Call to action con estilo original */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-8 mb-16">
        <Button
          onClick={handleRegisterClick}
          className="px-8 py-5 bg-[#fd8204] border-2 border-solid border-black shadow-[8px_11px_2.1px_#0000000d] rounded-lg font-['Inter',Helvetica] font-medium text-white text-xl tracking-[0] leading-[30px] transform hover:scale-105 transition-transform duration-300"
          disabled={loading}
        >
          {isAuthenticated ? "IR AL PERFIL" : "REGISTRARTE"}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>

        <Button
          onClick={handleLoginClick}
          className="px-8 py-5 bg-[#253a80] border-2 border-solid border-black shadow-[8px_11px_2.1px_#0000000d] rounded-lg font-['Inter',Helvetica] font-medium text-white text-xl tracking-[0] leading-[30px] transform hover:scale-105 transition-transform duration-300"
          disabled={loading}
        >
          {isAuthenticated ? "VER PERFIL" : "INICIAR SESIÓN"}
        </Button>
      </div>

      {/* Video demo button */}
      <div className="relative z-10 text-center mb-16">
        <Button
          variant="ghost"
          className="text-white hover:text-[#fd8204] hover:bg-white/10 group transition-all duration-300"
          onClick={() => {
            // Aquí puedes agregar funcionalidad para mostrar un video demo
            console.log("Video demo clicked");
          }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
              <Play className="w-6 h-6 ml-1" />
            </div>
            <div>
              <div className="text-lg font-medium">Ver Demo</div>
              <div className="text-sm text-gray-200">2 min de duración</div>
            </div>
          </div>
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button
          variant="ghost"
          size="sm"
          onClick={scrollToSpaces}
          className="text-white/70 hover:text-white flex flex-col items-center space-y-2 p-2"
        >
          <span className="text-sm">Explorar espacios</span>
          <ChevronDown className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};
