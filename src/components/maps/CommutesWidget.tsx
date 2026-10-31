"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Car,
  Bus,
  Bike,
  Footprints,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  X,
  Loader2,
  Navigation,
} from "lucide-react";
import { loadGoogleMaps } from "@/lib/googleMapsLoader";
import { mapStyles } from "@/lib/mapStyles";
import { useLanguage } from "@/context/LanguageContext";
import {
  CommuteDestination,
  CommutesWidgetConfig,
  TravelMode,
  InitialDestinationInput,
  LatLngLiteral,
} from "@/types/commutes";

const MAX_NUM_DESTINATIONS = 10;
const BIAS_BOUND_DISTANCE = 0.5; // ~50 km
const MIN_IN_SECONDS = 60;
const HOUR_IN_SECONDS = 3600;

const MARKER_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// SVG Pin Path oficial de Google Maps
const PIN_SVG_PATH =
  "M10 27c-.2 0-.2 0-.5-1-.3-.8-.7-2-1.6-3.5-1-1.5-2-2.7-3-3.8-2.2-2.8-3.9-5-3.9-8.8C1 4.9 5 1 10 1s9 4 9 8.9c0 3.9-1.8 6-4 8.8-1 1.2-1.9 2.4-2.8 3.8-1 1.5-1.4 2.7-1.6 3.5-.3 1-.4 1-.6 1Z";

export interface CommutesWidgetProps extends Partial<CommutesWidgetConfig> {
  className?: string;
  title?: string;
  subtitle?: string;
}

export const CommutesWidget: React.FC<CommutesWidgetProps> = ({
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  origin = { lat: 25.8129896, lng: -100.1340545 },
  originName = "Santuario Arcano",
  initialDestinations = [],
  defaultTravelMode = "DRIVING",
  distanceMeasurementType = "METRIC",
  maxDestinations = MAX_NUM_DESTINATIONS,
  biasBoundDistance = BIAS_BOUND_DISTANCE,
  zoom = 14,
  theme = "arcano",
  className = "",
  title,
  subtitle,
}) => {
  const { dict } = useLanguage();
  const displayTitle = title || dict.commutes.mainTitle;
  const displaySubtitle = subtitle || dict.commutes.mainSubtitle;

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Instancias de Google Maps
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const bikeLayerRef = useRef<google.maps.BicyclingLayer | null>(null);
  const transitLayerRef = useRef<google.maps.TransitLayer | null>(null);
  const originMarkerRef = useRef<google.maps.Marker | null>(null);

  // Estado React
  const [destinations, setDestinations] = useState<CommuteDestination[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Modal de agregar/editar destino
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"ADD" | "EDIT">("ADD");
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [travelMode, setTravelMode] = useState<TravelMode>(defaultTravelMode);
  const [modalError, setModalError] = useState<string | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Scroll controls state
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  // Colores según tema
  const isArcano = theme === "arcano";
  const colors = {
    activeStroke: isArcano ? "#c6a052" : "#1a73e8",
    activeOuterStroke: isArcano ? "#0d0d12" : "#185abc",
    inactiveStroke: isArcano ? "#4a4a58" : "#9aa0a6",
    inactiveOuterStroke: isArcano ? "#1f1f28" : "#dadce0",
    originPin: isArcano ? "#dfb76c" : "#ea4335",
    activePin: isArcano ? "#c6a052" : "#ea4335",
    inactivePin: isArcano ? "#2d2d3a" : "#f1f3f4",
    inactiveLabel: isArcano ? "#dfb76c" : "#3c4043",
  };

  /**
   * Formateador de tiempo humano
   */
  const formatDuration = (seconds?: number): string => {
    if (!seconds) return "";
    if (seconds < MIN_IN_SECONDS) return "< 1 min";
    if (seconds > HOUR_IN_SECONDS * 10) return "10+ horas";
    const hours = Math.floor(seconds / HOUR_IN_SECONDS);
    const minutes = Math.floor((seconds % HOUR_IN_SECONDS) / 60);
    const hText = hours > 0 ? `${hours} h` : "";
    const mText = minutes > 0 ? `${minutes} min` : "";
    return [hText, mText].filter(Boolean).join(" ");
  };

  /**
   * Generar URL para abrir en Google Maps
   */
  const generateGoogleMapsUrl = (
    destName: string,
    placeId?: string,
    mode: TravelMode = "DRIVING",
    loc?: LatLngLiteral
  ) => {
    const base = "https://www.google.com/maps/dir/?api=1";
    const org = `&origin=${origin.lat},${origin.lng}`;
    const destinationQuery = loc
      ? `${loc.lat},${loc.lng}`
      : encodeURIComponent(destName);
    let dst = `&destination=${destinationQuery}`;
    if (placeId) {
      dst += `&destination_place_id=${placeId}`;
    }
    const tm = `&travelmode=${mode.toLowerCase()}`;
    return `${base}${org}${dst}${tm}`;
  };

  /**
   * Configura las capas del mapa según el modo de transporte activo
   */
  const updateMapLayers = useCallback((mode: TravelMode) => {
    if (!mapInstanceRef.current || !bikeLayerRef.current || !transitLayerRef.current) return;

    if (mode === "BICYCLING") {
      transitLayerRef.current.setMap(null);
      bikeLayerRef.current.setMap(mapInstanceRef.current);
    } else if (mode === "TRANSIT") {
      bikeLayerRef.current.setMap(null);
      transitLayerRef.current.setMap(mapInstanceRef.current);
    } else {
      bikeLayerRef.current.setMap(null);
      transitLayerRef.current.setMap(null);
    }
  }, []);

  /**
   * Crear o actualizar marcador de origen
   */
  const createOriginMarker = useCallback(
    (loc: LatLngLiteral) => {
      if (!mapInstanceRef.current) return;
      if (originMarkerRef.current) {
        originMarkerRef.current.setMap(null);
      }

      originMarkerRef.current = new google.maps.Marker({
        position: loc,
        map: mapInstanceRef.current,
        title: originName,
        label: {
          text: "●",
          color: "#ffffff",
          fontSize: "18px",
          fontFamily: "Arial, sans-serif",
        },
        icon: {
          path: PIN_SVG_PATH,
          fillColor: colors.originPin,
          fillOpacity: 1,
          strokeColor: "#040405",
          strokeWeight: 1.5,
          scale: 1.3,
          anchor: new google.maps.Point(15, 29),
          labelOrigin: new google.maps.Point(10, 9),
        },
        zIndex: 200,
      });
    },
    [colors.originPin, originName]
  );

  /**
   * Calcular ruta con DirectionsService
   */
  const calculateRoute = useCallback(
    async (
      placeId: string | undefined,
      placeName: string,
      mode: TravelMode,
      label: string,
      destId: string,
      targetLocation?: LatLngLiteral
    ): Promise<CommuteDestination | null> => {
      if (!directionsServiceRef.current || !mapInstanceRef.current) return null;

      let destinationTarget: google.maps.DirectionsRequest["destination"];
      if (placeId) {
        destinationTarget = { placeId };
      } else if (targetLocation) {
        destinationTarget = targetLocation;
      } else {
        destinationTarget = placeName;
      }

      const request: google.maps.DirectionsRequest = {
        origin: origin,
        destination: destinationTarget,
        travelMode: google.maps.TravelMode[mode],
        unitSystem:
          distanceMeasurementType === "METRIC"
            ? google.maps.UnitSystem.METRIC
            : google.maps.UnitSystem.IMPERIAL,
      };

      try {
        const response = await directionsServiceRef.current.route(request);
        const route = response.routes[0];
        if (!route) return null;

        const leg = route.legs[0];
        const path = route.overview_path;
        const bounds = route.bounds;
        const location = {
          lat: leg.end_location.lat(),
          lng: leg.end_location.lng(),
        };

        // Polylines (inactivas por defecto)
        const innerStroke = new google.maps.Polyline({
          path,
          strokeColor: colors.inactiveStroke,
          strokeOpacity: 0.85,
          strokeWeight: 3,
          zIndex: 10,
          map: mapInstanceRef.current,
        });

        const outerStroke = new google.maps.Polyline({
          path,
          strokeColor: colors.inactiveOuterStroke,
          strokeOpacity: 0.9,
          strokeWeight: 6,
          zIndex: 5,
          map: mapInstanceRef.current,
        });

        // Marcador destino
        const marker = new google.maps.Marker({
          position: location,
          map: mapInstanceRef.current,
          title: placeName,
          label: {
            text: label,
            color: colors.inactiveLabel,
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
          },
          icon: {
            path: PIN_SVG_PATH,
            fillColor: colors.inactivePin,
            fillOpacity: 1,
            strokeColor: "#1f1f28",
            strokeWeight: 1,
            scale: 1.2,
            anchor: new google.maps.Point(15, 29),
            labelOrigin: new google.maps.Point(10, 9),
          },
          zIndex: 50,
        });

        return {
          id: destId,
          name: placeName,
          placeId,
          label,
          travelMode: mode,
          distance: leg.distance?.text || "",
          duration: formatDuration(leg.duration?.value),
          durationSeconds: leg.duration?.value,
          url: generateGoogleMapsUrl(placeName, placeId, mode),
          location,
          bounds,
          marker,
          polylines: { innerStroke, outerStroke },
        };
      } catch (err) {
        console.error("Error al calcular ruta de destino:", err);
        return null;
      }
    },
    [colors, distanceMeasurementType, origin]
  );

  /**
   * Seleccionar una ruta activa
   */
  const handleSelectRoute = useCallback(
    (index: number) => {
      if (!mapInstanceRef.current || destinations.length === 0) return;

      // 1. Desactivar ruta anterior
      destinations.forEach((item, idx) => {
        if (!item.polylines || !item.marker) return;

        if (idx === index) {
          // Activar ruta seleccionada
          item.polylines.innerStroke.setOptions({
            strokeColor: colors.activeStroke,
            strokeOpacity: 1,
            strokeWeight: 4,
            zIndex: 105,
          });
          item.polylines.outerStroke.setOptions({
            strokeColor: colors.activeOuterStroke,
            strokeOpacity: 0.95,
            strokeWeight: 8,
            zIndex: 100,
          });

          item.marker.setIcon({
            path: PIN_SVG_PATH,
            fillColor: colors.activePin,
            fillOpacity: 1,
            strokeColor: "#040405",
            strokeWeight: 1.5,
            scale: 1.3,
            anchor: new google.maps.Point(15, 29),
            labelOrigin: new google.maps.Point(10, 9),
          });
          item.marker.setLabel({
            text: item.label,
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "bold",
          });
          item.marker.setZIndex(150);

          if (item.bounds) {
            mapInstanceRef.current?.fitBounds(item.bounds);
          }
          updateMapLayers(item.travelMode);
        } else {
          // Inactivar otras
          item.polylines.innerStroke.setOptions({
            strokeColor: colors.inactiveStroke,
            strokeOpacity: 0.7,
            strokeWeight: 3,
            zIndex: 10,
          });
          item.polylines.outerStroke.setOptions({
            strokeColor: colors.inactiveOuterStroke,
            strokeOpacity: 0.8,
            strokeWeight: 6,
            zIndex: 5,
          });

          item.marker.setIcon({
            path: PIN_SVG_PATH,
            fillColor: colors.inactivePin,
            fillOpacity: 1,
            strokeColor: "#1f1f28",
            strokeWeight: 1,
            scale: 1.1,
            anchor: new google.maps.Point(15, 29),
            labelOrigin: new google.maps.Point(10, 9),
          });
          item.marker.setLabel({
            text: item.label,
            color: colors.inactiveLabel,
            fontSize: "13px",
            fontWeight: "bold",
          });
          item.marker.setZIndex(50);
        }
      });

      setActiveIndex(index);
    },
    [colors, destinations, updateMapLayers]
  );

  /**
   * Inicializar Mapa y Destinos
   */
  useEffect(() => {
    let isMounted = true;

    async function init() {
      if (!apiKey) {
        setErrorStatus(
          "No se ha configurado la clave de Google Maps (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)."
        );
        setIsLoading(false);
        return;
      }

      try {
        await loadGoogleMaps({ apiKey, libraries: ["places", "geometry"] });

        if (!isMounted || !mapContainerRef.current) return;

        const mapOptions: google.maps.MapOptions = {
          center: origin,
          zoom: zoom,
          styles: mapStyles[theme] || mapStyles.arcano,
          fullscreenControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: true,
          disableDefaultUI: false,
        };

        const map = new google.maps.Map(mapContainerRef.current, mapOptions);
        mapInstanceRef.current = map;
        placesServiceRef.current = new google.maps.places.PlacesService(map);
        directionsServiceRef.current = new google.maps.DirectionsService();
        bikeLayerRef.current = new google.maps.BicyclingLayer();
        transitLayerRef.current = new google.maps.TransitLayer();

        createOriginMarker(origin);

        // Destinos iniciales si existen
        if (initialDestinations.length > 0) {
          const loadedDestinations: CommuteDestination[] = [];
          for (let i = 0; i < initialDestinations.length; i++) {
            const initItem = initialDestinations[i];
            const label = MARKER_LETTERS[i % MARKER_LETTERS.length];
            const mode = initItem.travelMode || defaultTravelMode;
            const dest = await calculateRoute(
              initItem.placeId,
              initItem.name,
              mode,
              label,
              `init-${i}`,
              initItem.location
            );
            if (dest) loadedDestinations.push(dest);
          }

          if (isMounted && loadedDestinations.length > 0) {
            setDestinations(loadedDestinations);
            const lastIdx = loadedDestinations.length - 1;
            setActiveIndex(lastIdx);
            setTimeout(() => handleSelectRoute(lastIdx), 300);
          }
        }

        setIsLoading(false);
      } catch (err: any) {
        console.error("Error al cargar Google Maps:", err);
        if (isMounted) {
          setErrorStatus(err?.message || "Error al inicializar Google Maps.");
          setIsLoading(false);
        }
      }
    }

    init();

    return () => {
      isMounted = false;
      // Cleanup de polylines y marcadores
      destinations.forEach((d) => {
        d.marker?.setMap(null);
        d.polylines?.innerStroke.setMap(null);
        d.polylines?.outerStroke.setMap(null);
      });
      if (originMarkerRef.current) {
        originMarkerRef.current.setMap(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]);

  /**
   * Conectar Autocomplete de Google Places al abrir el modal
   */
  useEffect(() => {
    if (!isModalOpen || !inputRef.current || !window.google?.maps?.places) return;

    const bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(origin.lat - biasBoundDistance, origin.lng - biasBoundDistance),
      new google.maps.LatLng(origin.lat + biasBoundDistance, origin.lng + biasBoundDistance)
    );

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      bounds,
      fields: ["place_id", "geometry", "name", "formatted_address"],
    });

    autocompleteRef.current = autocomplete;

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place || !place.geometry) {
        setModalError(dict.commutes.validPlaceError);
        return;
      }
      setSelectedPlace(place);
      setModalError(null);
    });

    return () => {
      if (listener) google.maps.event.removeListener(listener);
    };
  }, [isModalOpen, biasBoundDistance, origin.lat, origin.lng, dict.commutes.validPlaceError]);

  /**
   * Control de scroll del carrusel de tarjetas
   */
  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [destinations]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const offset = direction === "left" ? -280 : 280;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  /**
   * Abrir modal para Agregar
   */
  const handleOpenAddModal = () => {
    if (destinations.length >= maxDestinations) {
      alert(`Límite alcanzado: máximo ${maxDestinations} destinos.`);
      return;
    }
    setModalMode("ADD");
    setSelectedPlace(null);
    setModalError(null);
    setTravelMode(defaultTravelMode);
    setIsModalOpen(true);
  };

  /**
   * Abrir modal para Editar
   */
  const handleOpenEditModal = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const dest = destinations[idx];
    if (!dest) return;

    setModalMode("EDIT");
    setEditingIndex(idx);
    setTravelMode(dest.travelMode);
    setSelectedPlace({
      name: dest.name,
      place_id: dest.placeId,
    } as google.maps.places.PlaceResult);
    setModalError(null);
    setIsModalOpen(true);
  };

  /**
   * Guardar nuevo destino o cambios
   */
  const handleSaveModal = async () => {
    if (!selectedPlace || !selectedPlace.place_id || !selectedPlace.name) {
      setModalError(dict.commutes.validPlaceError);
      return;
    }

    if (modalMode === "ADD") {
      // Verificar duplicados
      const isDuplicate = destinations.some((d) => d.placeId === selectedPlace.place_id);
      if (isDuplicate) {
        setModalError(dict.commutes.duplicateError);
        return;
      }

      const nextLetter = MARKER_LETTERS[destinations.length % MARKER_LETTERS.length];
      const newDest = await calculateRoute(
        selectedPlace.place_id,
        selectedPlace.name,
        travelMode,
        nextLetter,
        `dest-${Date.now()}`
      );

      if (newDest) {
        const nextList = [...destinations, newDest];
        setDestinations(nextList);
        setIsModalOpen(false);
        const newIdx = nextList.length - 1;
        setTimeout(() => handleSelectRoute(newIdx), 150);
      } else {
        setModalError(dict.commutes.routeError);
      }
    } else if (modalMode === "EDIT" && editingIndex !== null) {
      const current = destinations[editingIndex];
      if (!current) return;

      // Limpiar mapa anterior
      current.marker?.setMap(null);
      current.polylines?.innerStroke.setMap(null);
      current.polylines?.outerStroke.setMap(null);

      const updatedDest = await calculateRoute(
        selectedPlace.place_id,
        selectedPlace.name,
        travelMode,
        current.label,
        current.id
      );

      if (updatedDest) {
        const updatedList = [...destinations];
        updatedList[editingIndex] = updatedDest;
        setDestinations(updatedList);
        setIsModalOpen(false);
        setTimeout(() => handleSelectRoute(editingIndex), 150);
      } else {
        setModalError(dict.commutes.routeError);
      }
    }
  };

  /**
   * Eliminar destino
   */
  const handleDeleteDestination = () => {
    if (editingIndex === null) return;
    const current = destinations[editingIndex];
    if (current) {
      current.marker?.setMap(null);
      current.polylines?.innerStroke.setMap(null);
      current.polylines?.outerStroke.setMap(null);
    }

    const filtered = destinations.filter((_, i) => i !== editingIndex);
    setDestinations(filtered);
    setIsModalOpen(false);

    if (filtered.length > 0) {
      const nextIdx = Math.max(0, editingIndex - 1);
      setTimeout(() => handleSelectRoute(nextIdx), 150);
    } else {
      setActiveIndex(null);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setCenter(origin);
        mapInstanceRef.current.setZoom(zoom);
      }
    }
  };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-charcoal-border bg-charcoal/80 backdrop-blur-md shadow-2xl flex flex-col ${className}`}
    >
      {/* Encabezado del Widget */}
      <div className="p-4 sm:p-6 border-b border-charcoal-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-sans font-medium">
            <Navigation className="w-3.5 h-3.5" />
            <span>{dict.commutes.badgeTitle}</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-parchment font-light mt-1">
            {displayTitle}
          </h3>
          <p className="text-xs sm:text-sm text-parchment-dim mt-0.5 max-w-xl">
            {displaySubtitle}
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold hover:bg-gold-light text-obsidian-deep font-sans font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-gold/20 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{dict.commutes.addDestinationBtn}</span>
        </button>
      </div>

      {/* Contenedor del Mapa */}
      <div className="relative w-full h-[360px] sm:h-[460px] bg-obsidian-deep">
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-obsidian/90 text-parchment gap-3">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
            <span className="text-sm font-sans tracking-wide">
              {dict.commutes.loadingMap}
            </span>
          </div>
        )}

        {errorStatus && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-obsidian/95 p-6 text-center text-parchment gap-4">
            <AlertCircle className="w-10 h-10 text-wine" />
            <div className="max-w-md">
              <h4 className="font-serif text-lg text-parchment font-normal mb-1">
                {dict.commutes.apiKeyErrorTitle}
              </h4>
              <p className="text-xs text-parchment-dim">{errorStatus}</p>
              <div className="mt-4 p-3 bg-charcoal rounded-lg border border-charcoal-border text-left text-[11px] font-mono text-gold-light">
                NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key
              </div>
            </div>
          </div>
        )}

        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Panel Inferior: Carrusel de Destinos o Estado Vacío */}
      <div className="p-4 bg-charcoal-dark/95 border-t border-charcoal-border min-h-[120px]">
        {destinations.length === 0 ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-charcoal-border/80 bg-obsidian/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-sans font-medium text-parchment">
                  {dict.commutes.emptyTitle}
                </h4>
                <p className="text-xs text-parchment-dim">
                  {dict.commutes.emptySubtitle}
                </p>
              </div>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 rounded-lg bg-charcoal border border-gold/40 hover:border-gold text-gold hover:text-gold-light text-xs font-sans font-semibold tracking-wider transition-colors"
            >
              {dict.commutes.addPointBtn}
            </button>
          </div>
        ) : (
          <div className="relative group">
            {/* Botones de navegación del carrusel */}
            {canScrollLeft && (
              <button
                onClick={() => handleScroll("left")}
                aria-label="Desplazar a la izquierda"
                className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-obsidian/90 border border-charcoal-border text-parchment hover:text-gold hover:border-gold/50 flex items-center justify-center shadow-lg transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {canScrollRight && (
              <button
                onClick={() => handleScroll("right")}
                aria-label="Desplazar a la derecha"
                className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-obsidian/90 border border-charcoal-border text-parchment hover:text-gold hover:border-gold/50 flex items-center justify-center shadow-lg transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {/* Lista horizontal */}
            <div
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth py-1"
            >
              {destinations.map((dest, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div
                    key={dest.id}
                    onClick={() => handleSelectRoute(idx)}
                    className={`flex-shrink-0 w-64 sm:w-72 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isActive
                        ? "bg-obsidian border-gold shadow-lg shadow-gold/10 ring-1 ring-gold/40"
                        : "bg-charcoal/60 border-charcoal-border hover:border-parchment-dim/40 hover:bg-charcoal"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                            isActive
                              ? "bg-gold text-obsidian-deep"
                              : "bg-charcoal-border text-parchment-dim"
                          }`}
                        >
                          {dest.label}
                        </span>

                        <div className="flex items-center gap-1.5 text-xs text-parchment-dim">
                          {dest.travelMode === "DRIVING" && <Car className="w-3.5 h-3.5" />}
                          {dest.travelMode === "TRANSIT" && <Bus className="w-3.5 h-3.5" />}
                          {dest.travelMode === "BICYCLING" && <Bike className="w-3.5 h-3.5" />}
                          {dest.travelMode === "WALKING" && <Footprints className="w-3.5 h-3.5" />}
                          <span className="font-mono text-[11px]">{dest.distance}</span>
                        </div>
                      </div>

                      {/* Botones de acción de la tarjeta */}
                      <div className="flex items-center gap-1">
                        <a
                          href={dest.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title={dict.commutes.openInMaps}
                          className="p-1 rounded text-parchment-dim hover:text-gold transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={(e) => handleOpenEditModal(idx, e)}
                          title={dict.commutes.editDestination}
                          className="p-1 rounded text-parchment-dim hover:text-parchment transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2.5">
                      <h5
                        className="text-xs sm:text-sm font-sans font-medium text-parchment truncate"
                        title={dest.name}
                      >
                        {dest.name}
                      </h5>
                      <div className="mt-1 flex items-baseline justify-between">
                        <span className="text-[11px] text-parchment-dim">{dict.commutes.estimatedTime}</span>
                        <span
                          className={`text-sm sm:text-base font-serif font-bold ${
                            isActive ? "text-gold" : "text-parchment"
                          }`}
                        >
                          {dest.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Botón rápido para agregar más en el carrusel */}
              {destinations.length < maxDestinations && (
                <button
                  onClick={handleOpenAddModal}
                  className="flex-shrink-0 w-32 h-[100px] border border-dashed border-charcoal-border hover:border-gold/50 rounded-xl flex flex-col items-center justify-center gap-1.5 text-parchment-dim hover:text-gold transition-all bg-obsidian/20 hover:bg-gold/5"
                >
                  <Plus className="w-5 h-5" />
                  <span className="text-xs font-sans font-medium">{dict.commutes.addPointBtn}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal Accesible para Agregar / Editar Destino */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-deep/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-charcoal border border-charcoal-border rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-parchment-dim hover:text-parchment transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl text-parchment font-light">
              {modalMode === "ADD" ? dict.commutes.modalAddTitle : dict.commutes.modalEditTitle}
            </h3>
            <p className="text-xs text-parchment-dim mt-1">
              {dict.commutes.modalSearchSubtitle}
            </p>

            <div className="mt-4 space-y-4">
              {/* Input Autocomplete */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gold font-sans font-semibold mb-1">
                  {dict.commutes.locationLabel}
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  defaultValue={selectedPlace?.name || ""}
                  placeholder={dict.commutes.locationPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian border border-charcoal-border text-parchment placeholder-parchment-dim/50 text-sm focus:outline-none focus:border-gold transition-colors"
                  autoFocus
                />
                {modalError && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{modalError}</span>
                  </p>
                )}
              </div>

              {/* Selector de Modo de Transporte */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gold font-sans font-semibold mb-2">
                  {dict.commutes.travelModeLabel}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(
                    [
                      { id: "DRIVING", label: dict.commutes.modes.driving, icon: Car },
                      { id: "TRANSIT", label: dict.commutes.modes.transit, icon: Bus },
                      { id: "BICYCLING", label: dict.commutes.modes.bicycling, icon: Bike },
                      { id: "WALKING", label: dict.commutes.modes.walking, icon: Footprints },
                    ] as const
                  ).map((mode) => {
                    const Icon = mode.icon;
                    const isSelected = travelMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setTravelMode(mode.id)}
                        className={`py-2 px-1 rounded-lg border text-xs font-sans flex flex-col items-center gap-1 transition-all ${
                          isSelected
                            ? "bg-gold text-obsidian-deep font-semibold border-gold shadow-md"
                            : "bg-obsidian border-charcoal-border text-parchment-dim hover:text-parchment hover:border-parchment-dim/40"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{mode.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Barra de Acciones del Modal */}
            <div className="mt-6 pt-4 border-t border-charcoal-border flex items-center justify-between">
              {modalMode === "EDIT" ? (
                <button
                  type="button"
                  onClick={handleDeleteDestination}
                  className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{dict.commutes.deleteBtn}</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-parchment-dim hover:text-parchment transition-colors font-sans"
                >
                  {dict.commutes.cancelBtn}
                </button>
                <button
                  type="button"
                  onClick={handleSaveModal}
                  className="px-4 py-2 rounded-lg bg-gold hover:bg-gold-light text-obsidian-deep text-xs font-sans font-semibold tracking-wide transition-all shadow-md active:scale-95"
                >
                  {modalMode === "ADD" ? dict.commutes.calculateRouteBtn : dict.commutes.saveChangesBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommutesWidget;
