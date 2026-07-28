import React, { useState, useEffect } from 'react';
import { Clock, Plus, Trash2, ShieldAlert, Edit2, X, CheckCircle2 } from 'lucide-react';

interface Blocker {
  id: string;
  title: string;
  type: 'Vacation' | 'Personal' | 'Maintenance' | 'Medical';
  startDate: string;
  endDate: string;
  notes?: string;
}

export function ScheduleBlockers() {
  const [blockers, setBlockers] = useState<Blocker[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    title: '',
    type: 'Vacation' as Blocker['type'],
    startDate: '',
    endDate: '',
    notes: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('luxe_blockers');
    if (saved) {
      try {
        setBlockers(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load blockers');
      }
    }
  }, []);

  const saveBlockers = (newBlockers: Blocker[]) => {
    setBlockers(newBlockers);
    localStorage.setItem('luxe_blockers', JSON.stringify(newBlockers));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      const updated = blockers.map(b => b.id === isEditing ? {
        ...b,
        title: formState.title,
        type: formState.type,
        startDate: formState.startDate,
        endDate: formState.endDate || formState.startDate,
        notes: formState.notes
      } : b);
      saveBlockers(updated);
      setIsEditing(null);
    } else {
      const newBlocker: Blocker = {
        id: `BL-${Date.now()}`,
        title: formState.title,
        type: formState.type,
        startDate: formState.startDate,
        endDate: formState.endDate || formState.startDate,
        notes: formState.notes
      };
      saveBlockers([...blockers, newBlocker]);
    }
    setFormState({ title: '', type: 'Vacation', startDate: '', endDate: '', notes: '' });
  };

  const handleEdit = (blocker: Blocker) => {
    setIsEditing(blocker.id);
    setFormState({
      title: blocker.title,
      type: blocker.type,
      startDate: blocker.startDate,
      endDate: blocker.endDate,
      notes: blocker.notes || ''
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setFormState({ title: '', type: 'Vacation', startDate: '', endDate: '', notes: '' });
  };

  const handleDelete = (id: string) => {
    const updated = blockers.filter(b => b.id !== id);
    saveBlockers(updated);
  };

  return (
    <div className="max-w-[1440px] mx-auto w-full space-y-8" id="schedule-blockers-root">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl text-on-background mb-2">Schedule Blockers</h2>
          <p className="text-on-surface-variant text-sm">Manage your studio availability, schedule time off, and block dates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Time Off Lists */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-6 bg-surface">
            <h3 className="text-lg font-semibold text-on-surface mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Active Time-Off & Blockers
            </h3>
            
            <div className="space-y-3">
              {blockers.length > 0 ? (
                blockers.map((blocker) => (
                  <div key={blocker.id} className="flex justify-between items-center p-4 rounded-xl border border-outline-variant/40 bg-surface-container-lowest/50 hover:bg-surface-container-low/30 transition-all">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          blocker.type === 'Vacation' ? 'bg-primary-container/20 text-on-primary-container' :
                          blocker.type === 'Medical' ? 'bg-error-container/30 text-error' :
                          'bg-surface-container-highest text-on-surface-variant'
                        }`}>
                          {blocker.type}
                        </span>
                        <h4 className="text-sm font-semibold text-on-surface">{blocker.title}</h4>
                      </div>
                      <p className="text-xs text-on-surface-variant/70 mt-1">
                        {blocker.startDate} {blocker.endDate !== blocker.startDate && `to ${blocker.endDate}`}
                      </p>
                      {blocker.notes && (
                        <p className="text-xs text-on-surface-variant mt-1.5 italic">"{blocker.notes}"</p>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(blocker)}
                        className="p-2 text-on-surface-variant/50 hover:text-primary hover:bg-primary-container/30 rounded-lg transition-colors"
                        title="Edit Blocker"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(blocker.id)}
                        className="p-2 text-on-surface-variant/50 hover:text-error hover:bg-error-container/30 rounded-lg transition-colors"
                        title="Delete Blocker"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-8 text-on-surface-variant/50">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-on-surface-variant/30" />
                  No blocked dates logged. The studio schedule is fully open.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div>
          <div className="glass-card p-6 bg-surface sticky top-24">
            <h3 className="text-lg font-semibold text-on-surface mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-primary" /> {isEditing ? 'Edit Blocker' : 'Block Schedule'}
            </h3>
            <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
              Use this form to mark periods as busy or off-duty. Clients will not be able to book you on these days.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Reason / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Masterclass Training"
                  value={formState.title}
                  onChange={(e) => setFormState(prev => ({ ...prev, title: e.target.value }))}
                  className="input-glow w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Blocker Type</label>
                <select
                  value={formState.type}
                  onChange={(e) => setFormState(prev => ({ ...prev, type: e.target.value as Blocker['type'] }))}
                  className="input-glow w-full bg-surface py-2"
                >
                  <option value="Vacation">Vacation Time Off</option>
                  <option value="Personal">Personal Block</option>
                  <option value="Maintenance">Studio Maintenance</option>
                  <option value="Medical">Medical / Health Break</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={formState.startDate}
                    onChange={(e) => setFormState(prev => ({ ...prev, startDate: e.target.value }))}
                    className="input-glow w-full text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">End Date</label>
                  <input
                    type="date"
                    value={formState.endDate}
                    onChange={(e) => setFormState(prev => ({ ...prev, endDate: e.target.value }))}
                    className="input-glow w-full text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Private Notes</label>
                <textarea
                  rows={3}
                  placeholder="Details for internal team view..."
                  value={formState.notes}
                  onChange={(e) => setFormState(prev => ({ ...prev, notes: e.target.value }))}
                  className="input-glow w-full resize-none text-xs py-2"
                />
              </div>

              <div className="flex gap-2 pt-2">
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 py-2.5 text-xs uppercase tracking-wider border border-outline-variant rounded-lg text-on-surface-variant font-semibold hover:bg-surface-container"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="btn-primary flex-1 py-2.5 text-xs uppercase tracking-wider"
                >
                  {isEditing ? 'Save Changes' : 'Apply Blocker'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
