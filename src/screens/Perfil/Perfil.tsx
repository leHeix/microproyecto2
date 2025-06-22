import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";

export const Perfil = (): JSX.Element => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
      }
    });
  }, [navigate]);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1280px] relative">
        {/* Main Content */}
        <main className="flex flex-col md:flex-row gap-16 px-20 py-16">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <Avatar className="w-[435px] h-[435px]">
              <AvatarImage src={user.user_metadata?.avatar_url || "/image-12.png"} alt="Profile picture" />
              <AvatarFallback>{user.email?.charAt(0)}</AvatarFallback>
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
                  Nombre: {user.user_metadata?.name || "No especificado"}
                </h2>
              </div>

              <div>
                <h2 className="font-medium text-[28px] tracking-[-0.56px]">
                  Correo Electrónico: {user.email}
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
      </div>
    </div>
  );
};