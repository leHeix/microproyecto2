import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";
import {
  Edit3,
  LogOut,
  Save,
  X,
  Mail,
  User,
  Phone,
  Calendar,
  MapPin,
  Star,
  Clock,
  Loader2,
  Camera,
  AlertCircle,
} from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  created_at?: string;
}

export const Perfil = (): JSX.Element => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    bio: "",
    location: "",
  });

  // Datos de ejemplo para reservas
  const [reservations] = useState([
    {
      id: 1,
      space: "Sala de Reuniones A",
      date: "2024-01-15",
      time: "14:00 - 16:00",
      status: "confirmada",
      rating: 5,
    },
    {
      id: 2,
      space: "Oficina Privada 3",
      date: "2024-01-10",
      time: "09:00 - 17:00",
      status: "completada",
      rating: 4,
    },
    {
      id: 3,
      space: "Espacio Coworking",
      date: "2024-01-20",
      time: "10:00 - 14:00",
      status: "pendiente",
      rating: null,
    },
  ]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        navigate("/login");
        return;
      }

      // Crear perfil básico con datos de auth
      const profile: UserProfile = {
        id: authUser.id,
        email: authUser.email || "",
        name:
          authUser.user_metadata?.name ||
          authUser.user_metadata?.full_name ||
          "",
        avatar_url: authUser.user_metadata?.avatar_url || "",
        phone: authUser.user_metadata?.phone || "",
        bio: "",
        location: "",
        created_at: authUser.created_at,
      };

      setUser(profile);
      setEditForm({
        name: profile.name || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
        location: profile.location || "",
      });
    } catch (error: any) {
      setError("Error al cargar el perfil: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setSaving(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login");
    } catch (error: any) {
      setError("Error al cerrar sesión: " + error.message);
      setSaving(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError("");
    setSuccess("");
    if (!isEditing && user) {
      setEditForm({
        name: user.name || "",
        phone: user.phone || "",
        bio: user.bio || "",
        location: user.location || "",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setError("");

      // Actualizar metadata del usuario en Supabase Auth
      const { error } = await supabase.auth.updateUser({
        data: {
          name: editForm.name,
          phone: editForm.phone,
          bio: editForm.bio,
          location: editForm.location,
        },
      });

      if (error) throw error;

      // Actualizar estado local
      if (user) {
        setUser({
          ...user,
          name: editForm.name,
          phone: editForm.phone,
          bio: editForm.bio,
          location: editForm.location,
        });
      }

      setSuccess("Perfil actualizado exitosamente");
      setIsEditing(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (error: any) {
      setError("Error al actualizar perfil: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada":
        return "bg-green-100 text-green-800 border-green-300";
      case "completada":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-gray-400">Sin calificar</span>;

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating}/5)</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-8 h-8 animate-spin text-[#fd8204]" />
          <span className="text-lg text-gray-600">Cargando perfil...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <Card className="w-96 text-center border-2 border-black shadow-[8px_8px_0px_0px_#000000]">
          <CardContent className="p-6">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Error al cargar perfil
            </h2>
            <p className="text-gray-600 mb-4">
              No se pudo cargar la información del usuario
            </p>
            <Button
              onClick={() => navigate("/login")}
              className="bg-[#fd8204] hover:bg-[#fd8204]/90 text-white border-2 border-black shadow-[4px_4px_0px_0px_#000000]"
            >
              Volver al Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header con información básica */}
        <Card className="overflow-hidden border-2 border-black shadow-[8px_8px_0px_0px_#000000]">
          <div className="bg-gradient-to-r from-[#fd8204] to-[#253a80] h-32"></div>
          <CardContent className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-16">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={user.avatar_url || "/image-12.png"}
                    alt="Profile picture"
                  />
                  <AvatarFallback className="text-2xl font-bold bg-[#fd8204]/20 text-[#fd8204]">
                    {user.name?.charAt(0) || user.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-[#fd8204] hover:bg-[#fd8204]/90 border-2 border-black"
                    variant="secondary"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-black">
                    {user.name || "Usuario"}
                  </h1>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleEditToggle}
                      variant={isEditing ? "outline" : "default"}
                      className={`flex items-center space-x-2 border-2 border-black shadow-[4px_4px_0px_0px_#000000] ${
                        isEditing
                          ? "bg-white text-black hover:bg-gray-50"
                          : "bg-[#fd8204] text-white hover:bg-[#fd8204]/90"
                      }`}
                    >
                      {isEditing ? (
                        <X className="w-4 h-4" />
                      ) : (
                        <Edit3 className="w-4 h-4" />
                      )}
                      <span>{isEditing ? "Cancelar" : "Editar"}</span>
                    </Button>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-2 border-red-500 shadow-[4px_4px_0px_0px_#00000040]"
                      disabled={saving}
                    >
                      {saving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <LogOut className="w-4 h-4" />
                      )}
                      <span>Cerrar Sesión</span>
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600">{user.email}</p>
                {user.created_at && (
                  <p className="text-sm text-gray-500">
                    Miembro desde{" "}
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            {/* Alertas */}
            {error && (
              <div className="mt-4 flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border-2 border-red-200">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="mt-4 flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg border-2 border-green-200">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-sm">{success}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Información del perfil */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-black shadow-[8px_8px_0px_0px_#000000]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-[#fd8204]" />
                  <span>Información Personal</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        Nombre Completo
                      </label>
                      <Input
                        name="name"
                        value={editForm.name}
                        onChange={handleInputChange}
                        placeholder="Tu nombre completo"
                        className="w-full border-2 border-black focus:border-[#fd8204] shadow-[4px_4px_0px_0px_#00000040]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        Teléfono
                      </label>
                      <Input
                        name="phone"
                        value={editForm.phone}
                        onChange={handleInputChange}
                        placeholder="Tu número de teléfono"
                        className="w-full border-2 border-black focus:border-[#fd8204] shadow-[4px_4px_0px_0px_#00000040]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        Ubicación
                      </label>
                      <Input
                        name="location"
                        value={editForm.location}
                        onChange={handleInputChange}
                        placeholder="Tu ciudad o ubicación"
                        className="w-full border-2 border-black focus:border-[#fd8204] shadow-[4px_4px_0px_0px_#00000040]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        Biografía
                      </label>
                      <textarea
                        name="bio"
                        value={editForm.bio}
                        onChange={handleInputChange}
                        placeholder="Cuéntanos sobre ti..."
                        rows={3}
                        className="w-full px-3 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-[#fd8204] focus:border-[#fd8204] shadow-[4px_4px_0px_0px_#00000040]"
                      />
                    </div>
                    <Button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="w-full flex items-center justify-center space-x-2 bg-[#fd8204] hover:bg-[#fd8204]/90 text-white border-2 border-black shadow-[4px_4px_0px_0px_#000000]"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Guardando...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Guardar Cambios</span>
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                    {user.location && (
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    {user.bio && (
                      <div className="mt-4">
                        <h4 className="font-medium text-black mb-2">
                          Sobre mí
                        </h4>
                        <p className="text-gray-600">{user.bio}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Historial de reservas */}
          <div>
            <Card className="border-2 border-black shadow-[8px_8px_0px_0px_#000000]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-[#253a80]" />
                  <span>Mis Reservas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="p-4 border-2 border-gray-200 rounded-lg space-y-2 shadow-[4px_4px_0px_0px_#00000020]"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">
                          {reservation.space}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border-2 ${getStatusColor(
                            reservation.status
                          )}`}
                        >
                          {reservation.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{reservation.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{reservation.time}</span>
                      </div>
                      {reservation.status === "completada" && (
                        <div className="mt-2">
                          {renderStars(reservation.rating)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4 border-2 border-[#253a80] text-[#253a80] hover:bg-[#253a80]/10 shadow-[4px_4px_0px_0px_#00000040]"
                  onClick={() => navigate("/")}
                >
                  Ver Todas las Reservas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
