export const Endpoints = {
  BaseURL: process.env.REACT_APP_API_BASE_URL || process.env.API_BASE_URL,
  Api: "/api",
  login: "/auth/login/",
  register: "/auth/register/",
  Token: "/auth/refresh/",
  perfil: "/auth/porfile/",
  lotes: "/lotes/",
  áreas: "/areas/",
  enfermedad: "/enfermedades/",
  variedad: "/variedades/",
  Poligonos: "/geolotes/",
  Lectura: "/lecturas/",
  Plantas: "/plantas/",
  WeatherData:'/weather/data/',
  WeatherSync:'/weather/sync/',
  ImportUsers:'/auth/register/import',
  Users:'/auth/users',
  Roles:'/auth/roles',
  Produccion: "/produccion/",
  PlantasFotoUpload:"plantas/fotos/upload/",
  Permissions:"/auth/permissions",
  PrediccionesClima: "/predicciones/clima",
  PrediccionesCosecha: "/predicciones/cosechas",
  PrediccionesActualizar: "/predicciones/actualizar",
};
