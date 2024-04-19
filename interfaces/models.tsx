export interface AuthInterface {
  username: string;
  password: string;
}
export interface TokenResponse {
  usuario: IProfile;
  rol:string;
  access_token: string;
  refresh_token: string;
}

export interface IProfile {
  cedula: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  id: number;
  user: number; // User ID
}


//ApirError
export interface ApiErrorResponse {
  Message: string;
  error_description: string;
}
export interface IPlantas {
  id: number;
  Disabled: boolean;
  Codigo_Planta: string;  // Código solamente de esta entidad
  Codigo: string; // Código resultante de los padres y la entidad
  Codigo_Area: string;  // Código solamente del padre
  Nombre: string;
  Activo: boolean;
  Id_Area: number;
}
export interface ILote {
  id: number;
  Id_Proyecto: number;
  Codigo_Lote: string;  // Código solamente de esta entidad
  Codigo: string; // Código resultante de los padres y la entidad
  Nombre: string;
  Variedad: string;
  Hectareas?: number;
  Activo?: boolean;
  Usuario: number;
  Areas?: number[];
  Poligonos?: number[];
}
export interface IArea {
  id: number;
  Id_Lote: number;
  Codigo_Area: string;  // Código solamente de esta entidad
  Codigo: string; // Código resultante de los padres y la entidad
  Codigo_Lote: string;  // Código solamente del padre
  Nombre: string;
  Variedad: string;
  Hectareas?: number;
  Activo?: boolean;
  Usuario: number;
  Poligonos?: number[];
}
export interface IUser {
  id: number;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  groups: number[];
  user_permissions: any[];
  cedula: string;
  user: number;
}
export interface IRol{
  id: number;
  name: string,
  permissions?: number[]
}

export interface IPermissions {
  id: number;
  name: string;
  codename: string;
  content_type: number;
}

export interface ILectura {
  id: number;
  Id_Planta: number;

  CantidadInflorescencias: number;
  CantidadFrutonIniciales: number;
  CantidadFrutosMaduración: number;
  CantidadInflorescenciasPerdidas: number;
  Enfermedades: number[];
  Observacion: string;

  FechaVisita: Date;
  FechaRegistro: Date;
  Activo: boolean;
  Id_Usuario: number;
  GUIDLectura: string;
  SyncId: string;
}

export interface IProduccion {
  id: number;
  Id_Area: number;
  Id_Lote: number;
  Cantidad: number;
  Fecha: Date;
  FechaRegistro: Date;
  Activo: boolean;
  Id_Usuario: number;
}
export interface IRegistroClima {
  id: number;
  
  Temp_Air_Mean: number,
  Temp_Air_Min: number,
  Temp_Air_Max: number,
  
  Dew_Temp_Mean: number,
  Dew_Temp_Max: number,
  Dew_Temp_Min: number,
  
  Relat_Hum_Mean: number,
  Relat_Hum_Min: number,
  Relat_Hum_Max: number,
  
  Precipitation: number,
  
  Wind_Speed_Mean: number,
  Wind_Speed_Min: number,
  Wind_Speed_Max: number,
  
  Atmospheric_Pressure_Max: number,
  Atmospheric_Pressure_Min: number,

  Date: Date;
  Activo: boolean;
}

