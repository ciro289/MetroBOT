import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { loadStations, Station } from '@/src/lib/stations';

export function MapPlaceholder() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStations().then(data => {
      // Just take a few to show on the placeholder
      setStations(data.slice(0, 15));
      setLoading(false);
    });
  }, []);

  return (
    <div className="relative w-full h-full bg-[#E5E3DF] overflow-hidden flex items-center justify-center">
      {/* Abstract Map Pattern Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Fake Map Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-sitva-green/10 rounded-full blur-2xl" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-sitva-blue/10 rounded-full blur-2xl" />
      
      {/* Real Stations from CSV (Visual Representation) */}
      {!loading && stations.map((station, i) => (
        <div 
          key={i}
          className="absolute flex flex-col items-center group cursor-pointer"
          style={{
            // Just spreading them out for the placeholder since X/Y are large local coords
            left: `${10 + (i * 7) % 80}%`,
            top: `${10 + (i * i * 3) % 80}%`
          }}
        >
          <div className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center mb-1 transition-transform group-hover:scale-110 ${
            station.sistema === 'Metro' ? 'bg-sitva-green' : 
            station.sistema === 'Cable' ? 'bg-sitva-red' : 'bg-sitva-blue'
          }`}>
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div className="opacity-0 group-hover:opacity-100 bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-slate-700 shadow-sm transition-opacity whitespace-nowrap">
            {station.nombre}
          </div>
        </div>
      ))}

      {/* Center Marker */}
      <div className="relative flex flex-col items-center">
        <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center mb-2">
          <Navigation className="w-6 h-6 text-sitva-green fill-sitva-green/20" />
        </div>
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-sm font-medium text-slate-700">
          Ubicación Actual (Medellín)
        </div>
      </div>

      {/* Info Badge */}
      <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-lg backdrop-blur flex items-center gap-2 shadow-sm border border-white/50">
        <Info className="w-4 h-4 text-sitva-blue" />
        <span className="text-[10px] font-medium text-slate-600">CSV Data Loaded: {stations.length} stations found</span>
      </div>

      {/* Locate Me Button */}
      <div className="absolute bottom-32 right-4 z-10 md:bottom-10">
        <Button size="icon" className="w-12 h-12 rounded-full shadow-lg bg-white text-slate-700 hover:bg-slate-50">
          <Navigation className="w-5 h-5 transition-transform hover:rotate-45" />
        </Button>
      </div>
    </div>
  );
}
