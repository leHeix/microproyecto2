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

  // ...existing code...
  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1280px] relative">
        {/* Main Content */}
        <main className="flex flex-col md:flex-row items-center justify-center min-h-screen">
          {/* Profile Image */}
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-12">
            <Avatar className="w-40 h-40 md:w-48 md:h-48">
              <AvatarImage src={user.user_metadata?.avatar_url || "/image-12.png"} alt="Profile picture" />
              <AvatarFallback>{user.email?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          {/* Profile Information */}
          <div>
            <h1 className="text-3xl font-bold mb-4">Tu Perfil</h1>
            <p className="text-lg mb-2">Nombre: {user.user_metadata?.name || "No especificado"}</p>
            <p className="text-lg mb-6">Correo Electrónico: {user.email}</p>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <Button className="bg-black text-white px-4 py-2 rounded-md text-base">Editar Perfil</Button>
              <Button className="bg-black text-white px-4 py-2 rounded-md text-base">Historial de Reservas</Button>
            </div>
            <Button className="bg-black text-white px-4 py-2 rounded-md w-full text-base">
              Opina acerca nuestros espacios y servicios
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};
