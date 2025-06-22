import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const HeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full h-[854px] bg-[url(/image-5.png)] bg-cover bg-center flex flex-col items-center justify-center">
      <Card className="w-[894px] h-[211px] bg-[url(/rectangle-1.svg)] bg-cover border-none rounded-lg mb-12">
        <CardContent className="flex items-center justify-center h-full p-8">
          <h1 className="font-['Inter',Helvetica] font-bold text-white text-5xl text-center tracking-[0] leading-[72px]">
            Gestiona, reserva y organiza tus espacios en un solo lugar
          </h1>
        </CardContent>
      </Card>

      <div className="flex gap-8 mt-4">
        <Button className="px-8 py-5 bg-[#ff9b4f] border border-solid border-black shadow-[8px_11px_2.1px_#0000000d] rounded-lg font-['Inter',Helvetica] font-medium text-white text-xl tracking-[0] leading-[30px]">
          REGISTRARTE
        </Button>

        <Button className="px-8 py-5 bg-[#ff9b4f] border border-solid border-black shadow-[8px_11px_2.1px_#0000000d] rounded-lg font-['Inter',Helvetica] font-medium text-white text-xl tracking-[0] leading-[30px]">
          <a href="login">INICIAR SESION</a>
        </Button>
      </div>
    </section>
  );
};
