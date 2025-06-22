import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { UserContext } from "./context/UserContext";

export const NavigationHeader = (): JSX.Element => {
  const userGlobal = useContext(UserContext);
  const { authenticated } = userGlobal;

  return (
    <header>
        <nav className="w-full h-[135px] bg-white border border-solid border-black flex items-center justify-between px-20">
        {/* Logo */}
        <div className="flex-shrink-0">
            <img
            className="w-[272px] h-[60px] object-cover"
            alt="Logo"
            src="/logo.png"
            />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-10">
            <Link
                key={0}
                className="font-medium text-base text-black font-['Inter',Helvetica] leading-6 tracking-[0]"
                to={"/"}
            >
                Inicio
            </Link>
            {authenticated ? (
                <>
                    <Link
                    key={1}
                    className="font-medium text-base text-black font-['Inter',Helvetica] leading-6 tracking-[0]"
                    to={"/profile"}
                    >
                        Perfil
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        key={1}
                        className="font-medium text-base text-black font-['Inter',Helvetica] leading-6 tracking-[0]"
                        to={"/login"}
                    >
                        Iniciar sesión
                    </Link>
                    <Link
                        key={2}
                        className="font-medium text-base text-black font-['Inter',Helvetica] leading-6 tracking-[0]"
                        to={"/"}
                    >
                        Registrarse
                    </Link>
                </>
            )
            }

            {/* Action Button */}
            <Button className="bg-black text-white rounded-lg shadow-button-shadow px-6 py-3.5 h-auto">
            <span className="font-medium text-[13px] font-['Inter',Helvetica] leading-[19.5px] tracking-[0]">
                Más
            </span>
            </Button>
        </div>
        </nav>
    </header>
  );
};
