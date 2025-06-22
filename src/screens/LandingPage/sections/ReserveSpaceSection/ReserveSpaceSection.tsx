import React from "react";
import { Button } from "../../../../components/ui/button";

export const ReserveSpaceSection = (): JSX.Element => {
  return (
    <section className="w-full py-12 bg-[#f7f7f7]">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-[32px] font-semibold tracking-[-0.64px] text-black font-['Inter',Helvetica] mb-6 md:mb-0">
          Reserva tu espacio con nosotros
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="default"
            className="bg-black text-white rounded-lg shadow-button-shadow"
          >
            Reservar
          </Button>

          <Button
            variant="default"
            className="bg-black text-white rounded-lg shadow-button-shadow"
          >
            Calendario de Reservas
          </Button>
        </div>
      </div>
    </section>
  );
};
