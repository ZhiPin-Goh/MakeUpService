import React, { useState, useEffect } from 'react';
import { MapPin, Calculator, DollarSign, Navigation, ArrowRight, Car, Globe, Map } from 'lucide-react';

interface TravelArea {
  id: string;
  name: string;
  baseFee: number;
  radiusRange: string;
  isActive: boolean;
}

export function TravelFees() {
  const [address, setAddress] = useState('');
  const [selectedAreaId, setSelectedAreaId] = useState('');
  const [areas, setAreas] = useState<TravelArea[]>([]);

  const [distance, setDistance] = useState<number | null>(null);
  const [fee, setFee] = useState<number | null>(null);
  const [travelZoneName, setTravelZoneName] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('luxe_travel_fees');
    if (saved) {
      setAreas(JSON.parse(saved));
    } else {
      setAreas([
        { id: "A-1", name: "Downtown Metro", baseFee: 25.00, radiusRange: "0 - 15 miles", isActive: true },
        { id: "A-2", name: "North District", baseFee: 40.00, radiusRange: "16 - 30 miles", isActive: true },
        { id: "A-3", name: "Westside Hills", baseFee: 35.00, radiusRange: "10 - 25 miles", isActive: true },
        { id: "A-4", name: "Outer Suburbs", baseFee: 80.00, radiusRange: "50+ miles", isActive: false }
      ]);
    }
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address && !selectedAreaId) return;
    
    setIsCalculating(true);
    
    setTimeout(() => {
      let calculatedDistance = address.length ? address.length * 1.5 : 10;
      let calculatedFee = 0;
      let calculatedZoneName = '';
      let selectedArea = areas.find(a => a.id === selectedAreaId);
      
      if (selectedArea) {
        calculatedFee = selectedArea.baseFee;
        calculatedDistance = parseFloat(selectedArea.radiusRange.split('-')[0]) || 15;
        calculatedZoneName = selectedArea.name;
      } else {
        if (calculatedDistance <= 15) {
          calculatedFee = 25;
          calculatedZoneName = 'Downtown Metro';
        } else if (calculatedDistance <= 30) {
          calculatedFee = 40;
          calculatedZoneName = 'North District';
        } else if (calculatedDistance <= 50) {
          calculatedFee = 80;
          calculatedZoneName = 'Outer Suburbs';
        } else {
          calculatedFee = 80 + (calculatedDistance - 50) * 1.5;
          calculatedZoneName = 'Extended Range';
        }
      }
      
      setDistance(calculatedDistance);
      setFee(calculatedFee);
      setTravelZoneName(calculatedZoneName);
      setIsCalculating(false);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto w-full space-y-8" id="travel-calculator-root">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl text-on-background mb-2">Travel Fee Calculator</h2>
          <p className="text-on-surface-variant text-sm">Estimate travel costs based on client location and distance from the studio.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Input Form */}
        <div className="glass-card p-6 md:p-8 bg-surface space-y-6 flex flex-col">
          <div className="flex items-center gap-3 border-b border-surface-container-highest pb-4 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center">
              <Navigation className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-on-surface">Client Location</h3>
              <p className="text-xs text-on-surface-variant">Enter address to calculate travel zone fee.</p>
            </div>
          </div>

          <form onSubmit={handleCalculate} className="space-y-5 flex-1 flex flex-col justify-center">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Service Area (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Map className="w-4 h-4 text-on-surface-variant/50" />
                </div>
                <select
                  value={selectedAreaId}
                  onChange={(e) => {
                    setSelectedAreaId(e.target.value);
                    if (e.target.value) setAddress(''); // Clear address if area is selected
                  }}
                  className="input-glow w-full pl-10 py-3 bg-surface text-sm appearance-none"
                >
                  <option value="">Select a predefined area...</option>
                  {areas.filter(a => a.isActive).map(area => (
                    <option key={area.id} value={area.id}>
                      {area.name} (${area.baseFee.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-px bg-surface-container-highest flex-1"></div>
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">OR</span>
              <div className="h-px bg-surface-container-highest flex-1"></div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Destination Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <MapPin className="w-4 h-4 text-on-surface-variant/50" />
                </div>
                <input
                  type="text"
                  required={!selectedAreaId}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (e.target.value) setSelectedAreaId(''); // Clear area if address is typed
                  }}
                  className="input-glow w-full pl-10 py-3 bg-surface text-sm"
                  placeholder="e.g. 123 Beverly Hills Blvd, CA"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isCalculating || (!address && !selectedAreaId)}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2 mt-4"
            >
              {isCalculating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="w-4 h-4" />
                  Calculate Estimate
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Map Display & Results */}
        <div className="space-y-6">
          
          {/* Map Visualization */}
          <div className="glass-card bg-surface overflow-hidden relative h-[240px] flex items-center justify-center group">
            {/* Mock Map Background grid */}
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: 'radial-gradient(var(--tw-colors-primary) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}></div>
            
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-gradient-to-b from-transparent to-surface-container-lowest/80">
              {distance !== null ? (
                <div className="flex flex-col items-center animate-in zoom-in duration-300">
                  <div className="flex items-center gap-4 text-on-surface-variant mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-lg mb-1">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider">Studio</span>
                    </div>
                    
                    <div className="w-24 border-t-2 border-dashed border-primary/40 relative flex items-center justify-center">
                      <div className="absolute -top-3 bg-surface px-2 text-xs font-mono font-bold text-primary">
                        {distance.toFixed(1)} mi
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-lg mb-1">
                        <Car className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">Client</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-3 px-6">
                  <Globe className="w-10 h-10 text-on-surface-variant/30 mx-auto" />
                  <p className="text-sm font-medium text-on-surface-variant/60">
                    Map visualization will appear when a destination is entered.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Results Summary */}
          <div className="glass-card p-6 md:p-8 bg-surface border-t-4 border-t-primary shadow-xl">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-on-surface-variant/70 mb-4">Estimate Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-surface-container-highest">
                <span className="text-on-surface font-medium">Estimated Distance</span>
                <span className="font-mono text-on-surface-variant">
                  {distance !== null ? `${distance.toFixed(1)} miles` : '--'}
                </span>
              </div>
              
              <div className="flex justify-between items-center pb-4 border-b border-surface-container-highest">
                <span className="text-on-surface font-medium">Travel Zone</span>
                <span className="font-medium text-on-surface-variant">
                  {travelZoneName || '--'}
                </span>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-on-surface">Total Travel Fee</span>
                <div className="flex items-center text-primary font-display font-bold text-3xl">
                  <DollarSign className="w-6 h-6 mr-1" />
                  {fee !== null ? fee.toFixed(2) : '0.00'}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

