import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { AlertCircle, Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Por favor completa todos los campos");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Por favor ingresa un email válido");
      return false;
    }

    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      if (data.user) {
        setSuccess("¡Inicio de sesión exitoso!");
        setTimeout(() => navigate("/profile"), 1500);
      }
    } catch (error: any) {
      if (error.message === "Invalid login credentials") {
        setError("Credenciales incorrectas. Verifica tu email y contraseña.");
      } else if (error.message.includes("Email not confirmed")) {
        setError("Por favor confirma tu email antes de iniciar sesión.");
      } else {
        setError(error.message || "Error al iniciar sesión");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/profile`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setError("Error al iniciar sesión con Google: " + error.message);
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError("Ingresa tu email para recuperar la contraseña");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        formData.email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (error) throw error;

      setSuccess("Se envió un enlace de recuperación a tu email");
    } catch (error: any) {
      setError("Error al enviar el enlace de recuperación: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Formulario */}
        <Card className="w-full max-w-md mx-auto shadow-2xl border-2 border-black">
          <CardHeader className="space-y-2 text-center pb-6">
            <CardTitle className="text-3xl font-bold text-black">
              Iniciar Sesión
            </CardTitle>
            <p className="text-gray-600">Ingresa a tu cuenta para continuar</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border-2 border-red-200">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg border-2 border-green-200">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-sm">{success}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  name="email"
                  type="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 h-12 border-2 border-black focus:border-[#fd8204] transition-colors shadow-[4px_4px_0px_0px_#00000040]"
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 h-12 border-2 border-black focus:border-[#fd8204] transition-colors shadow-[4px_4px_0px_0px_#00000040]"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Enlace de olvidé mi contraseña */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-[#253a80] hover:text-[#253a80]/80 transition-colors"
                  disabled={isLoading}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#fd8204] hover:bg-[#fd8204]/90 text-white font-medium border-2 border-black shadow-[4px_4px_0px_0px_#000000] transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 font-medium">
                  O continúa con
                </span>
              </div>
            </div>

            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full h-12 border-2 border-black hover:bg-[#253a80]/10 transition-colors duration-200 shadow-[4px_4px_0px_0px_#00000040]"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <img className="w-5 h-5 mr-2" alt="Google" src="/cromo-1.png" />
              )}
              Continuar con Google
            </Button>

            <div className="text-center">
              <span className="text-gray-600">¿No tienes una cuenta?</span>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-[#fd8204] hover:text-[#fd8204]/80 font-medium transition-colors ml-1"
                disabled={isLoading}
              >
                Regístrate gratis
              </button>
            </div>

            {/* Enlaces adicionales */}
            <div className="text-center pt-4 border-t border-gray-200">
              <div className="flex justify-center space-x-4 text-sm">
                <button
                  onClick={() => navigate("/")}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Volver al inicio
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => console.log("Ayuda")}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Ayuda
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Imagen */}
        <div className="hidden lg:block">
          <img
            className="w-full h-auto max-w-lg mx-auto rounded-2xl shadow-2xl border-2 border-black"
            alt="Espacios de trabajo"
            src="/image-10.png"
          />
        </div>
      </div>
    </div>
  );
};
