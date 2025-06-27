import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./context/UserContext";
import {
  Menu,
  X,
  User,
  LogOut,
  Calendar,
  Settings,
  Home,
  Building,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

export const NavigationHeader = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticated, user, signOut, loading } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const navItems = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Espacios", path: "/#our-spaces", icon: Building },
    { name: "Reservas", path: "/reservas", icon: Calendar },
  ];

  const isActivePath = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (path: string) => {
    if (path.includes("#")) {
      const sectionId = path.split("#")[1];
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => scrollToSection(sectionId), 100);
      } else {
        scrollToSection(sectionId);
      }
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b-2 border-black sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Original */}
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="hover:opacity-80 transition-opacity"
            >
              <img
                className="w-[272px] h-[60px] object-cover"
                alt="Logo uniespacios"
                src="/logo.png"
              />
            </button>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActivePath(item.path)
                      ? "text-[#fd8204] bg-[#fd8204]/10"
                      : "text-black hover:text-[#fd8204] hover:bg-gray-50"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full"></div>
            ) : authenticated && user ? (
              /* Usuario autenticado */
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={user.user_metadata?.avatar_url}
                      alt={user.user_metadata?.name || user.email || "Usuario"}
                    />
                    <AvatarFallback className="bg-[#fd8204]/20 text-[#fd8204] text-sm font-semibold">
                      {(user.user_metadata?.name || user.email || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm font-medium text-black">
                    {user.user_metadata?.name || "Usuario"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* Dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border-2 border-black py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-black">
                        {user.user_metadata?.name || "Usuario"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-black hover:bg-[#fd8204]/10 hover:text-[#fd8204]"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Mi Perfil
                    </button>

                    <button
                      onClick={() => {
                        navigate("/reservas");
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-black hover:bg-[#fd8204]/10 hover:text-[#fd8204]"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Mis Reservas
                    </button>

                    <button
                      onClick={() => {
                        // navigate('/configuracion');
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-black hover:bg-[#fd8204]/10 hover:text-[#fd8204]"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Configuración
                    </button>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Usuario no autenticado */
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className="text-black hover:text-[#fd8204] hover:bg-[#fd8204]/10"
                >
                  Iniciar Sesión
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="bg-[#fd8204] hover:bg-[#fd8204]/90 text-white border-2 border-black shadow-[4px_4px_0px_0px_#000000]"
                >
                  Registrarse
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-black hover:bg-gray-50"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.path)}
                    className={`flex items-center w-full space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActivePath(item.path)
                        ? "text-[#fd8204] bg-[#fd8204]/10"
                        : "text-black hover:text-[#fd8204] hover:bg-gray-50"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                );
              })}

              {!authenticated && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-start text-black hover:text-[#fd8204] hover:bg-[#fd8204]/10"
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/register");
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-[#fd8204] hover:bg-[#fd8204]/90 text-white border-2 border-black shadow-[4px_4px_0px_0px_#000000]"
                  >
                    Registrarse
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Overlay para cerrar menus */}
      {(isUserMenuOpen || isMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};
