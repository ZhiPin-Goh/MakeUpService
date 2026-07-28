import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Check, X, MapPin, Globe, Compass, Car, DollarSign, RefreshCw } from 'lucide-react';

interface TravelArea {
  id: string;
  name: string;
  baseFee: number;
  radiusRange: string;
  isActive: boolean;
}

const INITIAL_AREAS: TravelArea[] = [
  {
    id: "A-1",
    name: "Downtown Metro",
    baseFee: 25.00,
    radiusRange: "0 - 15 miles",
    isActive: true
  },
  {
    id: "A-2",
    name: "North District",
    baseFee: 40.00,
    radiusRange: "16 - 30 miles",
    isActive: true
  },
  {
    id: "A-3",
    name: "Westside Hills",
    baseFee: 35.00,
    radiusRange: "10 - 25 miles",
    isActive: true
  },
  {
    id: "A-4",
    name: "Outer Suburbs",
    baseFee: 80.00,
    radiusRange: "50+ miles",
    isActive: false
  }
];

export function Areas() {
  const [areas, setAreas] = useState<TravelArea[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFeeValue, setEditFeeValue] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    baseFee: 30,
    radiusRange: '0 - 10 miles'
  });

  useEffect(() => {
    const saved = localStorage.getItem('luxe_travel_fees');
    if (saved) {
      setAreas(JSON.parse(saved));
    } else {
      setAreas(INITIAL_AREAS);
      localStorage.setItem('luxe_travel_fees', JSON.stringify(INITIAL_AREAS));
    }
  }, []);

  const saveAreas = (newAreas: TravelArea[]) => {
    setAreas(newAreas);
    localStorage.setItem('luxe_travel_fees', JSON.stringify(newAreas));
  };

  const handleToggleActive = (id: string) => {
    const updated = areas.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a);
    saveAreas(updated);
  };

  const handleStartEdit = (area: TravelArea) => {
    setEditingId(area.id);
    setEditFeeValue(area.baseFee);
  };

  const handleSaveEdit = (id: string) => {
    const updated = areas.map(a => a.id === id ? { ...a, baseFee: editFeeValue } : a);
    saveAreas(updated);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newArea: TravelArea = {
      id: `A-${areas.length + 1}`,
      name: formData.name,
      baseFee: formData.baseFee,
      radiusRange: formData.radiusRange,
      isActive: true
    };
    saveAreas([...areas, newArea]);
    setIsModalOpen(false);
    setFormData({ name: '', baseFee: 30, radiusRange: '0 - 10 miles' });
  };

  const activeCount = areas.filter(a => a.isActive).length;
  const avgFee = areas.length > 0 ? (areas.reduce((acc, curr) => acc + curr.baseFee, 0) / areas.length) : 0;

  return (
    <div className="max-w-[1440px] mx-auto w-full space-y-8" id="areas-root">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl text-on-background mb-2" id="areas-title">Service Areas</h2>
          <p className="text-on-surface-variant text-sm">Configure your service radiuses and base travel pricing for on-location makeup appointments.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
          id="btn-add-area"
        >
          <Plus className="w-4 h-4" />
          Add Area
        </button>
      </div>

      {/* Stats and Radius visualization Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="areas-bento-grid">
        
        {/* Left Concentric Circles Interactive Map-Styled Card */}
        <div className="glass-card lg:col-span-2 p-6 flex flex-col justify-between overflow-hidden relative min-h-[300px]">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 text-on-surface">
              <Compass className="w-5 h-5 text-primary" /> Coverage Radius Map
            </h3>
            <p className="text-xs text-on-surface-variant/70 mt-1">Concentric coverage tiers centered around Beverly Hills studio.</p>
          </div>

          <div className="flex-1 flex items-center justify-center py-6 relative">
            {/* Concentric rings represent tiers */}
            <div className="w-52 h-52 rounded-full border border-primary-container/20 flex items-center justify-center animate-pulse">
              <div className="w-36 h-36 rounded-full border border-secondary/30 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-primary/40 flex items-center justify-center bg-primary/5">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
            
            {/* Markers on tiers with absolute positions */}
            <div className="absolute top-1/4 right-1/4 text-xs bg-surface border border-outline-variant rounded-full px-2 py-1 flex items-center gap-1 shadow-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-secondary"></span> Downtown (15mi)
            </div>
            <div className="absolute bottom-1/4 left-1/3 text-xs bg-surface border border-outline-variant rounded-full px-2 py-1 flex items-center gap-1 shadow-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span> North Dist (30mi)
            </div>
          </div>

          <div className="text-xs text-on-surface-variant/70 text-center border-t border-surface-container-highest pt-3">
            Travel fees are added automatically based on the client's booking address tier.
          </div>
        </div>

        {/* Right Travel Pricing Metadata Column */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 bg-surface flex flex-col justify-center flex-1">
            <span className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant/60 block mb-2">Service Coverage</span>
            <h3 className="text-4xl font-display font-bold text-on-surface">{activeCount} Areas</h3>
            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">Active service radiuses currently open for online booking requests.</p>
          </div>

          <div className="glass-card p-6 bg-surface flex flex-col justify-center flex-1">
            <span className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant/60 block mb-2">Average Base Rate</span>
            <h3 className="text-4xl font-display font-bold text-primary">${avgFee.toFixed(2)}</h3>
            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed font-sans">Calculated across your currently defined geographic districts.</p>
          </div>
        </div>
      </div>

      {/* List of Travel Tiers / Areas Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-container-highest">
                <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Area Name</th>
                <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Radius Range</th>
                <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider text-right">Base Fee</th>
                <th className="p-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest bg-surface">
              {areas.map((area) => (
                <tr key={area.id} className={`hover:bg-surface-container-lowest transition-colors ${!area.isActive ? 'opacity-65' : ''}`}>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleActive(area.id)}
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full transition-colors ${
                        area.isActive ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-highest text-on-surface-variant'
                      }`}
                    >
                      {area.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center shrink-0">
                        <Car className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-semibold text-on-surface whitespace-nowrap">{area.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-on-surface-variant flex items-center gap-1 whitespace-nowrap">
                      <Compass className="w-3.5 h-3.5 text-primary-container" /> {area.radiusRange}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {editingId === area.id ? (
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-sm font-semibold text-primary font-mono mr-1">$</span>
                        <input
                          type="number"
                          value={editFeeValue}
                          onChange={(e) => setEditFeeValue(Number(e.target.value))}
                          className="input-glow w-20 py-1 px-1.5 font-mono font-bold text-right"
                        />
                      </div>
                    ) : (
                      <span className="text-sm font-mono font-bold text-on-surface">${area.baseFee.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-2">
                      {editingId === area.id ? (
                        <>
                          <button 
                            onClick={() => handleSaveEdit(area.id)}
                            className="p-1.5 text-secondary hover:bg-secondary-container/20 rounded transition-colors"
                            title="Save"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setEditingId(null)}
                            className="p-1.5 text-error hover:bg-error-container/20 rounded transition-colors"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(area)}
                          className="p-1.5 text-on-surface-variant/60 hover:text-primary rounded hover:bg-surface-container transition-all"
                          title="Edit Rate"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-container transition-colors py-2 px-4 rounded-full border border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5"
                  >
                    <Plus className="w-4 h-4" /> Add New Area
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Area Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface border border-outline-variant rounded-xl max-w-sm w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="p-6 border-b border-surface-container-highest bg-surface-container-low flex justify-between items-center">
              <h3 className="text-xl font-display">New Service Region</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Region/Area Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-glow w-full"
                  placeholder="e.g. South Bay Peninsula"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Base Travel Fee ($)</label>
                  <input
                    type="number"
                    name="baseFee"
                    min={0}
                    required
                    value={formData.baseFee}
                    onChange={(e) => setFormData(prev => ({ ...prev, baseFee: Number(e.target.value) }))}
                    className="input-glow w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Radius Range</label>
                  <input
                    type="text"
                    name="radiusRange"
                    required
                    value={formData.radiusRange}
                    onChange={(e) => setFormData(prev => ({ ...prev, radiusRange: e.target.value }))}
                    className="input-glow w-full"
                    placeholder="e.g. 31 - 45 miles"
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-surface-container-highest">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                >
                  Create Area
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
