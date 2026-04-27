import React from 'react';
import { Card, CardContent } from '../ui/card';
import { RouteOption } from '@/src/lib/routing';
import { Train, CableCar, TramFront, Bus, Bike, Footprints, Clock, DollarSign } from 'lucide-react';

const ModeIcon = ({ mode, className }: { mode: string, className?: string }) => {
  switch (mode) {
    case 'metro': return <Train className={className} />;
    case 'metrocable': return <CableCar className={className} />;
    case 'tranvia': return <TramFront className={className} />;
    case 'metroplus': return <Bus className={className} />;
    case 'encicla': return <Bike className={className} />;
    case 'walk': return <Footprints className={className} />;
    default: return <Footprints className={className} />;
  }
};

const ModeColor = (mode: string) => {
  switch (mode) {
    case 'metro': return 'text-sitva-green';
    case 'metrocable': return 'text-sitva-red';
    case 'tranvia': return 'text-sitva-green';
    case 'metroplus': return 'text-sitva-blue';
    case 'encicla': return 'text-encicla';
    case 'walk': return 'text-slate-400';
    default: return 'text-slate-400';
  }
};

interface RouteCardProps {
  route: RouteOption;
  isSelected?: boolean;
}

export function RouteCard({ route, isSelected }: RouteCardProps) {
  return (
    <Card className={`mb-4 overflow-hidden border-0 shadow-md ring-1 transition-all duration-200 ${isSelected ? 'ring-sitva-green ring-2 shadow-lg bg-emerald-50/30 transform scale-[1.02]' : 'ring-slate-200/50 hover:bg-slate-50'}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-slate-500" />
            <span className="text-2xl font-bold text-slate-900">{route.duration} <span className="text-sm font-normal text-slate-500">min</span></span>
          </div>
          <div className="flex items-center space-x-1 bg-slate-100 px-2 py-1 rounded-full">
            <DollarSign className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-semibold text-slate-700">{route.cost.toLocaleString('es-CO')}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          {route.modes.map((mode, index) => (
            <React.Fragment key={index}>
              <div className={`p-2 rounded-full bg-slate-50 ${ModeColor(mode)}`}>
                <ModeIcon mode={mode} className="w-5 h-5" />
              </div>
              {index < route.modes.length - 1 && (
                <div className="h-0.5 w-4 bg-slate-200 rounded-full" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="space-y-3 mt-4 pt-4 border-t border-slate-100">
          {route.steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`mt-0.5 ${ModeColor(step.mode)}`}>
                <ModeIcon mode={step.mode} className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-700">{step.instruction}</p>
                {step.line && <p className="text-xs font-medium text-slate-500 mt-0.5">{step.line}</p>}
              </div>
              <span className="text-xs font-medium text-slate-400">{step.duration}m</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
