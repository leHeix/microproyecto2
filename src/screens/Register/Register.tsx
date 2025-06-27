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
import {
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Loader2,
  CheckCircle,
} from "lucide-react";

export const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const [validations, setValidations] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
  });

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const newValidations = {
      name: formData.name.trim().length >= 2,
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword:
        formData.password === formData.confirmPassword &&
        formData.confirmPassword.length > 0,
    };

    setValidations(newValidations);

    if (!newValidations.name) {
      setError("El nombre debe tener al menos 2 caracteres");
      return false;
    }

    if (!newValidations.email) {
      setError("Por favor ingresa un email válido");
      return false;
    }

    if (!newValidations.password) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    if (!newValidations.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }

    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");

    // Validaciones en tiempo real
    const newValidations = { ...validations };
    switch (name) {
      case "name":
        newValidations.name = value.trim().length >= 2;
        break;
      case "email":
        newValidations.email = validateEmail(value);
        break;
      case "password":
        newValidations.password = validatePassword(value);
        newValidations.confirmPassword =
          value === formData.confirmPassword &&
          formData.confirmPassword.length > 0;
        break;
      case "confirmPassword":
        newValidations.confirmPassword =
          value === formData.password && value.length > 0;
        break;
    }
    setValidations(newValidations);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            full_name: formData.name,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Verificar si el usuario necesita confirmar el email
        if (!data.session) {
          setSuccess(
            "¡Registro exitoso! Te hemos enviado un enlace de confirmación a tu email. Por favor, revisa tu bandeja de entrada y confirma tu cuenta antes de iniciar sesión."
          );
        } else {
          setSuccess("¡Registro exitoso! Ya puedes usar tu cuenta.");
        }

        setFormData({ email: "", password: "", name: "", confirmPassword: "" });
        setValidations({
          email: false,
          password: false,
          confirmPassword: false,
          name: false,
        });

        // Redirigir al login después de un momento
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      } else {
        setError(
          "Error inesperado durante el registro. Por favor, intenta de nuevo."
        );
      }
    } catch (error: any) {
      // Manejo específico de errores de Supabase
      if (error.message?.includes("User already registered")) {
        setError("Este email ya está registrado. ¿Deseas iniciar sesión?");
      } else if (error.message?.includes("Invalid email")) {
        setError(
          "El formato del email no es válido. Por favor, verifica e intenta de nuevo."
        );
      } else if (error.message?.includes("Password should be at least")) {
        setError("La contraseña debe tener al menos 6 caracteres.");
      } else if (error.message?.includes("Signup is disabled")) {
        setError(
          "El registro está temporalmente deshabilitado. Por favor, contacta al administrador."
        );
      } else if (
        error.message?.includes("Network error") ||
        error.message?.includes("Failed to fetch")
      ) {
        setError(
          "Error de conexión. Por favor, verifica tu conexión a internet e intenta de nuevo."
        );
      } else if (error.status === 422) {
        setError(
          "Los datos proporcionados no son válidos. Por favor, revisa la información e intenta de nuevo."
        );
      } else {
        setError(
          error.message ||
            "Error durante el registro. Por favor, intenta de nuevo."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/profile`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      setError("Error al registrarse con Google: " + error.message);
      setIsLoading(false);
    }
  };

  const getInputClassName = (
    field: keyof typeof validations,
    hasValue: boolean
  ) => {
    const baseClass =
      "pl-10 h-12 border-2 transition-colors shadow-[4px_4px_0px_0px_#00000040]";
    if (!hasValue) {
      return `${baseClass} border-black focus:border-[#fd8204]`;
    }
    return validations[field]
      ? `${baseClass} border-green-500 focus:border-green-500`
      : `${baseClass} border-red-500 focus:border-red-500`;
  };

  // Debug: Log current validation state
  const allValidationsValid = Object.values(validations).every((v) => v);
  console.log(
    "🔍 Current validations:",
    validations,
    "All valid:",
    allValidationsValid
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Formulario */}
        <Card className="w-full max-w-md mx-auto shadow-2xl border-2 border-black">
          <CardHeader className="space-y-2 text-center pb-6">
            <CardTitle className="text-3xl font-bold text-black">
              Crear Cuenta
            </CardTitle>
            <p className="text-gray-600">
              Únete a nosotros y accede a todos nuestros espacios
            </p>
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
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">{success}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  name="name"
                  type="text"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={getInputClassName(
                    "name",
                    formData.name.length > 0
                  )}
                  disabled={isLoading}
                  required
                />
                {formData.name.length > 0 && validations.name && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                )}
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  name="email"
                  type="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={getInputClassName(
                    "email",
                    formData.email.length > 0
                  )}
                  disabled={isLoading}
                  required
                />
                {formData.email.length > 0 && validations.email && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                )}
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña (mín. 6 caracteres)"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${getInputClassName(
                    "password",
                    formData.password.length > 0
                  )} pr-20`}
                  disabled={isLoading}
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  {formData.password.length > 0 && validations.password && (
                    <CheckCircle className="text-green-500 w-4 h-4" />
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`${getInputClassName(
                    "confirmPassword",
                    formData.confirmPassword.length > 0
                  )} pr-20`}
                  disabled={isLoading}
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  {formData.confirmPassword.length > 0 &&
                    validations.confirmPassword && (
                      <CheckCircle className="text-green-500 w-4 h-4" />
                    )}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Indicadores de requisitos de contraseña */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      validations.password ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={
                      validations.password ? "text-green-600" : "text-gray-500"
                    }
                  >
                    Mínimo 6 caracteres
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      validations.confirmPassword
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={
                      validations.confirmPassword
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    Las contraseñas coinciden
                  </span>
                </div>
              </div>

              {/* Debug info - remove in production */}
              {process.env.NODE_ENV === "development" && (
                <div className="text-xs text-gray-500 p-2 bg-gray-100 rounded space-y-2">
                  <div>
                    Debug: Validaciones {JSON.stringify(validations)} | Botón
                    habilitado:{" "}
                    {!isLoading && allValidationsValid ? "Sí" : "No"}
                  </div>

                  {/* Botón de test temporal */}
                  <Button
                    type="button"
                    onClick={async () => {
                      console.log("🧪 TESTING REGISTRATION WITHOUT VALIDATION");
                      setIsLoading(true);
                      setError("");

                      try {
                        const testData = {
                          email: formData.email || "test@example.com",
                          password: formData.password || "123456",
                          name: formData.name || "Test User",
                        };

                        console.log("📧 Test registration with:", testData);

                        const { data, error } = await supabase.auth.signUp({
                          email: testData.email,
                          password: testData.password,
                          options: {
                            data: {
                              name: testData.name,
                              full_name: testData.name,
                            },
                          },
                        });

                        console.log("📨 Test result:", { data, error });

                        if (error) {
                          setError(`Test Error: ${error.message}`);
                        } else {
                          setSuccess("Test Registration Successful!");
                        }
                      } catch (error: any) {
                        console.error("❌ Test error:", error);
                        setError(`Test Exception: ${error.message}`);
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    disabled={isLoading}
                  >
                    🧪 TEST REGISTER (Debug)
                  </Button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-[#fd8204] hover:bg-[#fd8204]/90 text-white font-medium border-2 border-black shadow-[4px_4px_0px_0px_#000000] transition-all duration-200"
                disabled={isLoading || !allValidationsValid}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  "Crear Cuenta"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 font-medium">
                  O regístrate con
                </span>
              </div>
            </div>

            <Button
              onClick={handleGoogleRegister}
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
              <span className="text-gray-600">¿Ya tienes una cuenta?</span>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-[#fd8204] hover:text-[#fd8204]/80 font-medium transition-colors ml-1"
                disabled={isLoading}
              >
                Inicia Sesión
              </button>
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
