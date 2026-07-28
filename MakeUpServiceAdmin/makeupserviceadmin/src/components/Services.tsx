import React, { useState, useEffect } from 'react';
import { Plus, Sliders, Clock, DollarSign, Eye, EyeOff, Trash2, Brush, Sparkles, Heart } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in mins
  description: string;
  isActive: boolean;
  category: 'Bridal' | 'Glam' | 'Editorial' | 'Trial';
}

const INITIAL_SERVICES: Service[] = [
  {
    id: "S-1",
    name: "Bridal Makeup",
    price: 350,
    duration: 120,
    description: "Complete bridal makeup session including personalized skin preparation, airbrush contour, premium lash application, and a touch-up kit for your special day.",
    isActive: true,
    category: "Bridal"
  },
  {
    id: "S-2",
    name: "Dinner Makeup & Evening Glam",
    price: 150,
    duration: 60,
    description: "Glamorous makeup application tailored for evening events, galas, and photoshoots. Includes customized eye styling, premium contour, and long-wear setting spray.",
    isActive: true,
    category: "Glam"
  },
  {
    id: "S-3",
    name: "Photoshoot Makeup & Editorial",
    price: 200,
    duration: 90,
    description: "High-definition, camera-ready makeup optimized specifically for studio flash, natural light, or outdoor editorial photography. Focus on flawless complexion.",
    isActive: false,
    category: "Editorial"
  },
  {
    id: "S-4",
    name: "Bridal Consultation & Trial",
    price: 120,
    duration: 90,
    description: "Pre-wedding consultation and trial makeup application to lock in your desired bridal look. We test multiple color palettes and highlighters.",
    isActive: true,
    category: "Trial"
  }
];

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: 100,
    duration: 60,
    description: '',
    category: 'Glam' as Service['category']
  });

  useEffect(() => {
    const saved = localStorage.getItem('luxe_services');
    if (saved) {
      setServices(JSON.parse(saved));
    } else {
      setServices(INITIAL_SERVICES);
      localStorage.setItem('luxe_services', JSON.stringify(INITIAL_SERVICES));
    }
  }, []);

  const saveServices = (newServices: Service[]) => {
    setServices(newServices);
    localStorage.setItem('luxe_services', JSON.stringify(newServices));
  };

  const handleToggleActive = (id: string) => {
    const updated = services.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s);
    saveServices(updated);
  };

  const handleDeleteService = (id: string) => {
    const updated = services.filter(s => s.id !== id);
    saveServices(updated);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'duration' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: Service = {
      id: `S-${services.length + 1}`,
      name: formData.name,
      price: formData.price,
      duration: formData.duration,
      description: formData.description,
      isActive: true,
      category: formData.category
    };
    saveServices([...services, newService]);
    setIsModalOpen(false);
    // Reset Form
    setFormData({
      name: '',
      price: 100,
      duration: 60,
      description: '',
      category: 'Glam'
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto w-full space-y-8" id="services-root">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl text-on-background mb-2" id="services-title">Service Management</h2>
          <p className="text-on-surface-variant text-sm">Manage your studio's offerings, pricing, and active status.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
          id="btn-add-service"
        >
          <Plus className="w-4 h-4" />
          Add New Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="services-grid">
        {services.map((service) => {
          const isCategoryBridal = service.category === 'Bridal';
          const isCategoryGlam = service.category === 'Glam';
          const isCategoryEditorial = service.category === 'Editorial';
          
          return (
            <div 
              key={service.id} 
              className={`glass-card p-6 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                !service.isActive ? 'opacity-65' : ''
              }`}
            >
              {/* Top Accent Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                isCategoryBridal ? 'bg-primary-container' :
                isCategoryGlam ? 'bg-secondary' :
                isCategoryEditorial ? 'bg-tertiary' : 'bg-primary/40'
              }`}></div>

              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`inline-block text-[10px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full ${
                      isCategoryBridal ? 'bg-primary-container/20 text-on-primary-container' :
                      isCategoryGlam ? 'bg-secondary-container text-on-secondary-container' :
                      'bg-surface-container-highest text-on-surface-variant'
                    }`}>
                      {service.category}
                    </span>
                    <h3 className="text-xl mt-2 text-on-surface font-display">{service.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-2xl font-bold text-primary block">${service.price}</span>
                    <span className="text-xs text-on-surface-variant/70 flex items-center justify-end gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {service.duration} mins
                    </span>
                  </div>
                </div>

                <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleToggleActive(service.id)}
                    className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                      service.isActive 
                        ? 'bg-secondary-container/20 text-secondary hover:bg-secondary-container/40' 
                        : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {service.isActive ? (
                      <>
                        <Eye className="w-4 h-4" /> Active
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-4 h-4" /> Inactive
                      </>
                    )}
                  </button>
                </div>
                
                <button 
                  onClick={() => handleDeleteService(service.id)}
                  className="p-2 text-error/70 hover:text-error hover:bg-error-container/30 rounded-lg transition-all"
                  title="Delete Service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Abstract decorative graphic in background */}
              <div className="absolute right-0 bottom-12 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors"></div>
            </div>
          );
        })}
      </div>

      {/* Add Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface border border-outline-variant rounded-xl max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="p-6 border-b border-surface-container-highest bg-surface-container-low flex justify-between items-center">
              <h3 className="text-xl font-display">Create Studio Offering</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Service Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleFormChange}
                  className="input-glow w-full"
                  placeholder="e.g. Masterclass Glam Session"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Base Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    min={0}
                    required
                    value={formData.price}
                    onChange={handleFormChange}
                    className="input-glow w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    name="duration"
                    min={1}
                    required
                    value={formData.duration}
                    onChange={handleFormChange}
                    className="input-glow w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="input-glow w-full py-2 bg-surface"
                >
                  <option value="Bridal">Bridal Offering</option>
                  <option value="Glam">Glam / Evening</option>
                  <option value="Editorial">Editorial / Camera Ready</option>
                  <option value="Trial">Consultation & Trial</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Service Description</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  value={formData.description}
                  onChange={handleFormChange}
                  className="input-glow w-full resize-none py-2"
                  placeholder="Detail what is included, products used, and trial specifications..."
                />
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
                  Publish Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
