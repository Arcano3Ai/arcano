/**
 * src/types/commutes.ts
 * Definiciones de tipos para el widget modular de Commutes & Destinos de Google Maps Platform.
 */

export type TravelMode = 'DRIVING' | 'TRANSIT' | 'BICYCLING' | 'WALKING';

export type DistanceMeasurementType = 'METRIC' | 'IMPERIAL';

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface CommuteDestination {
  id: string;
  name: string;
  placeId?: string;
  label: string;
  travelMode: TravelMode;
  distance?: string;
  duration?: string;
  durationSeconds?: number;
  url: string;
  location?: LatLngLiteral;
  bounds?: google.maps.LatLngBounds;
  marker?: google.maps.Marker;
  polylines?: {
    innerStroke: google.maps.Polyline;
    outerStroke: google.maps.Polyline;
  };
}

export interface InitialDestinationInput {
  placeId?: string;
  name: string;
  location?: LatLngLiteral;
  travelMode?: TravelMode;
}

export interface CommutesWidgetConfig {
  apiKey?: string;
  origin: LatLngLiteral;
  originName?: string;
  initialDestinations?: InitialDestinationInput[];
  defaultTravelMode?: TravelMode;
  distanceMeasurementType?: DistanceMeasurementType;
  maxDestinations?: number;
  biasBoundDistance?: number;
  zoom?: number;
  mapId?: string;
  theme?: 'dark' | 'light' | 'arcano';
}
