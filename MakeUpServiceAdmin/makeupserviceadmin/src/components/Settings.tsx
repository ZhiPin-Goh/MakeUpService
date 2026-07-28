import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Calendar, CreditCard, Shield, Trash2, Check, RefreshCw, AlertCircle, Info, Cpu, Map, CalendarDays } from 'lucide-react';

type Tab = 'General Info' | 'AI Model' | 'Travel Fee' | 'Booking Dates';

const SettingRow = ({ label, value, onChange, description, isTextArea = false }: { label: string, value: string, onChange: (val: string) => void, description: string, isTextArea?: boolean }) => (
  <div className="col-span-1 border border-surface-container-highest rounded-xl p-4 bg-surface-container-lowest/50">
    <h4 className="text-sm font-semibold text-on-surface mb-3">{label}</h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">Value</label>
        {isTextArea ? (
          <textarea
            rows={3}
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="input-glow w-full resize-none py-2 bg-surface text-sm"
          />
        ) : (
          <input
            type="text"
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="input-glow w-full bg-surface text-sm"
          />
        )}
      </div>
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">Description (View Only)</label>
        {isTextArea ? (
          <textarea
            rows={3}
            readOnly
            value={description}
            className="input-glow w-full resize-none py-2 bg-surface-container-highest/50 text-on-surface-variant/70 cursor-not-allowed border-transparent focus:ring-0 focus:border-transparent text-sm"
          />
        ) : (
          <input
            type="text"
            readOnly
            value={description}
            className="input-glow w-full bg-surface-container-highest/50 text-on-surface-variant/70 cursor-not-allowed border-transparent focus:ring-0 focus:border-transparent text-sm"
          />
        )}
      </div>
    </div>
  </div>
);

export function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>('General Info');
  const [showToast, setShowToast] = useState(false);
  const [loadingTab, setLoadingTab] = useState<Tab | null>(null);

  // General Info states
  const [studioName, setStudioName] = useState('Shirley Makeup');
  const [studioEmail, setStudioEmail] = useState('hello@shirleymakeup.com');
  const [studioPhone, setStudioPhone] = useState('+1 (555) 123-4567');
  const [timezone, setTimezone] = useState('Pacific Time (PT) - Los Angeles');
  const [address, setAddress] = useState('123 Beauty Blvd, Suite 200, Beverly Hills, CA 90210');

  // AI Model states
  const [aiModel, setAiModel] = useState('3.1flash');
  const [aiTemperature, setAiTemperature] = useState('0.7');
  
  // Travel Fee states
  const [baseFee, setBaseFee] = useState('50');
  const [perMileRate, setPerMileRate] = useState('RM5/1km');
  
  // Booking Dates states
  const [minDaysAdvance, setMinDaysAdvance] = useState('3');
  const [maxDaysAdvance, setMaxDaysAdvance] = useState('90');

  const handleSave = (e: React.FormEvent, tab: Tab) => {
    e.preventDefault();
    setLoadingTab(tab);
    
    // Build the payload matching the C# SystemSettings class structure
    const payload = [];
    if (tab === 'AI Model') {
      payload.push({ Key: 'Geminimodel', Value: aiModel, Description: 'Default AI Model' });
      payload.push({ Key: 'AiTemperature', Value: aiTemperature, Description: 'Temperature parameter' });
    } else if (tab === 'Travel Fee') {
      payload.push({ Key: 'TravelFeePerKm', Value: perMileRate, Description: 'Travel fee calculated per km/mile' });
      payload.push({ Key: 'BaseTravelFee', Value: baseFee, Description: 'Base travel amount' });
    } else if (tab === 'Booking Dates') {
      payload.push({ Key: 'MinimumBookingDate', Value: minDaysAdvance, Description: 'Minimum days to book in advance' });
      payload.push({ Key: 'MaximumBookingDate', Value: maxDaysAdvance, Description: 'Maximum horizon days' });
    } else if (tab === 'General Info') {
      payload.push({ Key: 'StudioName', Value: studioName, Description: 'Name of the studio' });
      payload.push({ Key: 'StudioEmail', Value: studioEmail, Description: 'Contact email' });
      payload.push({ Key: 'StudioPhone', Value: studioPhone, Description: 'Contact phone' });
      payload.push({ Key: 'StudioTimezone', Value: timezone, Description: 'Primary timezone' });
      payload.push({ Key: 'StudioAddress', Value: address, Description: 'Physical address' });
    }

    console.log(`[AJAX POST] Submitting to backend (Array of SystemSettings):`, JSON.stringify(payload, null, 2));

    // Simulate AJAX submission delay
    setTimeout(() => {
      setLoadingTab(null);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  const tabs: { id: Tab; icon: React.FC<any> }[] = [
    { id: 'General Info', icon: Info },
    { id: 'AI Model', icon: Cpu },
    { id: 'Travel Fee', icon: Map },
    { id: 'Booking Dates', icon: CalendarDays },
  ];

  return (
    <div className="max-w-[1440px] mx-auto w-full space-y-8" id="settings-root">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-surface-container-highest pb-6">
        <div>
          <h2 className="text-3xl text-on-background mb-2" id="settings-title">System Settings</h2>
          <p className="text-on-surface-variant text-sm">Manage configuration parameters and preferences for your studio.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
        
        {/* Left Sidebar (Navigation) */}
        <div className="md:col-span-1 lg:col-span-1 flex flex-col gap-2">
          {tabs.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                activeTab === id
                  ? 'bg-primary-container text-on-primary-container shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <Icon className="w-4 h-4" />
              {id}
            </button>
          ))}
        </div>

        {/* Right Panel (Content Area) */}
        <div className="md:col-span-3 lg:col-span-4">
          
          {/* General Info Form */}
          <form 
            onSubmit={(e) => handleSave(e, 'General Info')} 
            className={`space-y-6 ${activeTab === 'General Info' ? 'block' : 'hidden'}`}
          >
            <div className="glass-card p-6 bg-surface space-y-4">
              <h3 className="text-xl font-semibold text-on-surface pb-3 border-b border-surface-container-highest">General Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <SettingRow label="Studio Name" value={studioName} onChange={setStudioName} description="Name of the studio" />
                <SettingRow label="Contact Phone" value={studioPhone} onChange={setStudioPhone} description="Contact phone" />
                <SettingRow label="Support Email Address" value={studioEmail} onChange={setStudioEmail} description="Contact email" />
                <SettingRow label="Primary Timezone" value={timezone} onChange={setTimezone} description="Primary timezone" />
                <SettingRow label="Studio Business Address" value={address} onChange={setAddress} description="Physical address" isTextArea />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" disabled={loadingTab === 'General Info'} className="btn-primary flex items-center gap-2 px-6 py-2.5">
                {loadingTab === 'General Info' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
              </button>
            </div>
          </form>

          {/* AI Model Form */}
          <form 
            onSubmit={(e) => handleSave(e, 'AI Model')} 
            className={`space-y-6 ${activeTab === 'AI Model' ? 'block' : 'hidden'}`}
          >
            <div className="glass-card p-6 bg-surface space-y-4">
              <h3 className="text-xl font-semibold text-on-surface pb-3 border-b border-surface-container-highest">AI Model Settings</h3>
              <p className="text-xs text-on-surface-variant mb-4">Configure the default generative AI model used for auto-responses and client insights.</p>
              
              <div className="grid grid-cols-1 gap-4">
                <SettingRow label="Gemini Model" value={aiModel} onChange={setAiModel} description="Default AI Model" />
                <SettingRow label="Temperature (Creativity)" value={aiTemperature} onChange={setAiTemperature} description="Temperature parameter" />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" disabled={loadingTab === 'AI Model'} className="btn-primary flex items-center gap-2 px-6 py-2.5">
                {loadingTab === 'AI Model' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
              </button>
            </div>
          </form>

          {/* Travel Fee Form */}
          <form 
            onSubmit={(e) => handleSave(e, 'Travel Fee')} 
            className={`space-y-6 ${activeTab === 'Travel Fee' ? 'block' : 'hidden'}`}
          >
            <div className="glass-card p-6 bg-surface space-y-4">
              <h3 className="text-xl font-semibold text-on-surface pb-3 border-b border-surface-container-highest">Travel Fee Configuration</h3>
              <p className="text-xs text-on-surface-variant mb-4">Set default rules for calculating client travel distances and fees.</p>
              
              <div className="grid grid-cols-1 gap-4">
                <SettingRow label="Base Travel Fee ($)" value={baseFee} onChange={setBaseFee} description="Base travel amount" />
                <SettingRow label="Travel Fee Per Km" value={perMileRate} onChange={setPerMileRate} description="Travel fee calculated per km/mile" />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" disabled={loadingTab === 'Travel Fee'} className="btn-primary flex items-center gap-2 px-6 py-2.5">
                {loadingTab === 'Travel Fee' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
              </button>
            </div>
          </form>

          {/* Booking Dates Form */}
          <form 
            onSubmit={(e) => handleSave(e, 'Booking Dates')} 
            className={`space-y-6 ${activeTab === 'Booking Dates' ? 'block' : 'hidden'}`}
          >
            <div className="glass-card p-6 bg-surface space-y-4">
              <h3 className="text-xl font-semibold text-on-surface pb-3 border-b border-surface-container-highest">Booking Dates Configuration</h3>
              <p className="text-xs text-on-surface-variant mb-4">Control how far in advance clients can book appointments.</p>
              
              <div className="grid grid-cols-1 gap-4">
                <SettingRow label="Minimum Booking Date" value={minDaysAdvance} onChange={setMinDaysAdvance} description="Minimum days to book in advance" />
                <SettingRow label="Maximum Horizon (Days)" value={maxDaysAdvance} onChange={setMaxDaysAdvance} description="Maximum horizon days" />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" disabled={loadingTab === 'Booking Dates'} className="btn-primary flex items-center gap-2 px-6 py-2.5">
                {loadingTab === 'Booking Dates' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* Floating Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-300 z-50">
          <div className="w-5 h-5 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold font-sans">Settings saved successfully.</span>
        </div>
      )}

    </div>
  );
}

