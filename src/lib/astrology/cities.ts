export interface CityLocation {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  defaultOffset: number; // UTC offset in hours
}

export const CITIES_DATABASE: CityLocation[] = [
  // España
  { name: 'Madrid', country: 'España', latitude: 40.4168, longitude: -3.7038, timezone: 'Europe/Madrid', defaultOffset: 1 },
  { name: 'Barcelona', country: 'España', latitude: 41.3879, longitude: 2.1699, timezone: 'Europe/Madrid', defaultOffset: 1 },
  { name: 'Valencia', country: 'España', latitude: 39.4699, longitude: -0.3763, timezone: 'Europe/Madrid', defaultOffset: 1 },
  { name: 'Sevilla', country: 'España', latitude: 37.3891, longitude: -5.9845, timezone: 'Europe/Madrid', defaultOffset: 1 },
  { name: 'Zaragoza', country: 'España', latitude: 41.6488, longitude: -0.8891, timezone: 'Europe/Madrid', defaultOffset: 1 },
  { name: 'Málaga', country: 'España', latitude: 36.7213, longitude: -4.4214, timezone: 'Europe/Madrid', defaultOffset: 1 },
  { name: 'Bilbao', country: 'España', latitude: 43.2630, longitude: -2.9350, timezone: 'Europe/Madrid', defaultOffset: 1 },

  // México
  { name: 'Ciudad de México', country: 'México', latitude: 19.4326, longitude: -99.1332, timezone: 'America/Mexico_City', defaultOffset: -6 },
  { name: 'Guadalajara', country: 'México', latitude: 20.6597, longitude: -103.3496, timezone: 'America/Mexico_City', defaultOffset: -6 },
  { name: 'Monterrey', country: 'México', latitude: 25.6866, longitude: -100.3161, timezone: 'America/Monterrey', defaultOffset: -6 },
  { name: 'Puebla', country: 'México', latitude: 19.0414, longitude: -98.2063, timezone: 'America/Mexico_City', defaultOffset: -6 },
  { name: 'Cancún', country: 'México', latitude: 21.1619, longitude: -86.8515, timezone: 'America/Cancun', defaultOffset: -5 },
  { name: 'Tijuana', country: 'México', latitude: 32.5149, longitude: -117.0382, timezone: 'America/Tijuana', defaultOffset: -8 },

  // Argentina
  { name: 'Buenos Aires', country: 'Argentina', latitude: -34.6037, longitude: -58.3816, timezone: 'America/Argentina/Buenos_Aires', defaultOffset: -3 },
  { name: 'Córdoba', country: 'Argentina', latitude: -31.4201, longitude: -64.1888, timezone: 'America/Argentina/Cordoba', defaultOffset: -3 },
  { name: 'Rosario', country: 'Argentina', latitude: -32.9468, longitude: -60.6393, timezone: 'America/Argentina/Buenos_Aires', defaultOffset: -3 },
  { name: 'Mendoza', country: 'Argentina', latitude: -32.8895, longitude: -68.8458, timezone: 'America/Argentina/Mendoza', defaultOffset: -3 },

  // Colombia
  { name: 'Bogotá', country: 'Colombia', latitude: 4.7110, longitude: -74.0721, timezone: 'America/Bogota', defaultOffset: -5 },
  { name: 'Medellín', country: 'Colombia', latitude: 6.2476, longitude: -75.5658, timezone: 'America/Bogota', defaultOffset: -5 },
  { name: 'Cali', country: 'Colombia', latitude: 3.4516, longitude: -76.5320, timezone: 'America/Bogota', defaultOffset: -5 },
  { name: 'Barranquilla', country: 'Colombia', latitude: 10.9685, longitude: -74.7813, timezone: 'America/Bogota', defaultOffset: -5 },

  // Chile
  { name: 'Santiago', country: 'Chile', latitude: -33.4489, longitude: -70.6693, timezone: 'America/Santiago', defaultOffset: -3 },
  { name: 'Valparaíso', country: 'Chile', latitude: -33.0472, longitude: -71.6127, timezone: 'America/Santiago', defaultOffset: -3 },

  // Perú
  { name: 'Lima', country: 'Perú', latitude: -12.0464, longitude: -77.0428, timezone: 'America/Lima', defaultOffset: -5 },
  { name: 'Cusco', country: 'Perú', latitude: -13.5319, longitude: -71.9675, timezone: 'America/Lima', defaultOffset: -5 },

  // USA & Rest of World
  { name: 'Nueva York', country: 'Estados Unidos', latitude: 40.7128, longitude: -74.0060, timezone: 'America/New_York', defaultOffset: -5 },
  { name: 'Miami', country: 'Estados Unidos', latitude: 25.7617, longitude: -80.1918, timezone: 'America/New_York', defaultOffset: -5 },
  { name: 'Los Ángeles', country: 'Estados Unidos', latitude: 34.0522, longitude: -118.2437, timezone: 'America/Los_Angeles', defaultOffset: -8 },
  { name: 'Londres', country: 'Reino Unido', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London', defaultOffset: 0 },
  { name: 'París', country: 'Francia', latitude: 48.8566, longitude: 2.3522, timezone: 'Europe/Paris', defaultOffset: 1 },
  { name: 'Roma', country: 'Italia', latitude: 41.9028, longitude: 12.4964, timezone: 'Europe/Rome', defaultOffset: 1 },
  { name: 'Tokio', country: 'Japón', latitude: 35.6762, longitude: 139.6503, timezone: 'Asia/Tokyo', defaultOffset: 9 },
  { name: 'Sídney', country: 'Australia', latitude: -33.8688, longitude: 151.2093, timezone: 'Australia/Sydney', defaultOffset: 10 },
  { name: 'Montevideo', country: 'Uruguay', latitude: -34.9011, longitude: -56.1645, timezone: 'America/Montevideo', defaultOffset: -3 },
  { name: 'Quito', country: 'Ecuador', latitude: -0.1807, longitude: -78.4678, timezone: 'America/Guayaquil', defaultOffset: -5 },
  { name: 'Caracas', country: 'Venezuela', latitude: 10.4806, longitude: -66.9036, timezone: 'America/Caracas', defaultOffset: -4 },
  { name: 'La Paz', country: 'Bolivia', latitude: -16.5000, longitude: -68.1500, timezone: 'America/La_Paz', defaultOffset: -4 },
  { name: 'San José', country: 'Costa Rica', latitude: 9.9281, longitude: -84.0907, timezone: 'America/Costa_Rica', defaultOffset: -6 },
  { name: 'Panamá', country: 'Panamá', latitude: 8.9824, longitude: -79.5199, timezone: 'America/Panama', defaultOffset: -5 },
];

export function searchCities(query: string): CityLocation[] {
  if (!query || query.trim().length === 0) return CITIES_DATABASE.slice(0, 10);
  const clean = query.toLowerCase().trim();
  return CITIES_DATABASE.filter(
    c => c.name.toLowerCase().includes(clean) || c.country.toLowerCase().includes(clean)
  ).slice(0, 10);
}
