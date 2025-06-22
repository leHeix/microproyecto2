import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export const Login = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1280px] relative">
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
      </div>
    </div>
  );
};
