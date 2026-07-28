import React, { useState, useEffect } from 'react';
import { Search, Mail, MessageSquare, Check, Trash2, Eye, AlertCircle, Sparkles, Plus, X } from 'lucide-react';

interface Inquiry {
  id: string;
  date: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'Pending' | 'Resolved';
}

const INITIAL_FEEDBACKS: Inquiry[] = [
  {
    id: "F-1",
    date: "2026-10-24",
    name: "Eleanor Vance",
    email: "evance@example.com",
    subject: "Bridal Makeup Inquiry",
    message: "I was wondering if you have availability for a large party of 8 bridesmaids on June 12th, 2027. Do you provide secondary artists?",
    status: "Pending"
  },
  {
    id: "F-2",
    date: "2026-10-22",
    name: "Sophia Chen",
    email: "schen@example.com",
    subject: "Post-Service Feedback",
    message: "The makeup lasted all night! Thank you so much for the custom trial. I've recommended your studio to all my coworkers.",
    status: "Resolved"
  },
  {
    id: "F-3",
    date: "2026-10-20",
    name: "Mia Rodriguez",
    email: "m.rodriguez@example.com",
    subject: "Allergy Question",
    message: "Do you use products containing latex or coconut derivatives? I have highly sensitive skin and would love to confirm.",
    status: "Pending"
  }
];

export function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState<Inquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabFilter, setTabFilter] = useState<'All' | 'Pending' | 'Resolved'>('All');
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('luxe_feedbacks');
    if (saved) {
      setFeedbacks(JSON.parse(saved));
    } else {
      setFeedbacks(INITIAL_FEEDBACKS);
      localStorage.setItem('luxe_feedbacks', JSON.stringify(INITIAL_FEEDBACKS));
    }
  }, []);

  const saveFeedbacks = (newFeedbacks: Inquiry[]) => {
    setFeedbacks(newFeedbacks);
    localStorage.setItem('luxe_feedbacks', JSON.stringify(newFeedbacks));
  };

  const handleResolve = (id: string) => {
    const updated = feedbacks.map(f => f.id === id ? { ...f, status: 'Resolved' as const } : f);
    saveFeedbacks(updated);
    if (activeInquiry && activeInquiry.id === id) {
      setActiveInquiry({ ...activeInquiry, status: 'Resolved' });
    }
  };

  const handleDelete = (id: string) => {
    const updated = feedbacks.filter(f => f.id !== id);
    saveFeedbacks(updated);
    if (activeInquiry && activeInquiry.id === id) {
      setActiveInquiry(null);
    }
  };

  const filtered = feedbacks.filter(f => {
    const matchesTab = tabFilter === 'All' || f.status === tabFilter;
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const pendingCount = feedbacks.filter(f => f.status === 'Pending').length;

  return (
    <div className="max-w-[1440px] mx-auto w-full space-y-8" id="feedback-root">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl text-on-background mb-2" id="feedback-title">Feedback & Inquiries</h2>
          <p className="text-on-surface-variant text-sm">Respond to custom client questions, allergen reviews, and wedding package quotes.</p>
        </div>
      </div>

      {/* Filter Tabs and Search Row */}
      <div className="glass-card p-4 flex flex-col md:flex-row gap-4 items-center justify-between" id="feedback-toolbar">
        {/* Toggle Buttons */}
        <div className="flex bg-surface-container-low border border-outline-variant/50 p-1 rounded-xl w-full md:w-auto">
          {(['All', 'Pending', 'Resolved'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setTabFilter(tab)}
              className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors relative ${
                tabFilter === tab 
                  ? 'bg-surface text-primary shadow-sm font-bold border border-outline-variant/30' 
                  : 'text-on-surface-variant opacity-70 hover:opacity-100'
              }`}
            >
              {tab}
              {tab === 'Pending' && pendingCount > 0 && (
                <span className="ml-1.5 bg-error text-white text-[9px] font-bold px-1.5 py-0.25 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-on-surface-variant/50" />
          <input
            type="text"
            placeholder="Search inquiries, sender, subject..."
            className="input-glow w-full pl-10 text-xs py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="feedback-search-input"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="glass-card overflow-hidden" id="feedback-table-container">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-container-highest bg-surface-container-low text-xs font-semibold tracking-widest text-on-surface-variant uppercase">
                <th className="p-4 pl-6">Date</th>
                <th className="p-4">Sender</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Message Preview</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 pr-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest text-sm text-on-surface bg-surface">
              {filtered.length > 0 ? (
                filtered.map((inquiry) => {
                  const isPending = inquiry.status === 'Pending';
                  return (
                    <tr key={inquiry.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                      <td className="p-4 pl-6 font-mono text-xs text-on-surface-variant/80 font-semibold">{inquiry.date}</td>
                      <td className="p-4 font-semibold">
                        <div>{inquiry.name}</div>
                        <div className="text-xs text-on-surface-variant/60 font-normal mt-0.5">{inquiry.email}</div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-primary">{inquiry.subject}</span>
                      </td>
                      <td className="p-4 max-w-xs truncate text-on-surface-variant/90" title={inquiry.message}>
                        {inquiry.message}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          isPending ? 'bg-surface-container-highest text-on-surface-variant' : 'bg-secondary-container text-on-secondary-container'
                        }`}>
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button 
                            onClick={() => setActiveInquiry(inquiry)}
                            className="p-1.5 text-secondary hover:bg-secondary-container/20 rounded transition-colors"
                            title="Read full message"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {isPending && (
                            <button 
                              onClick={() => handleResolve(inquiry.id)}
                              className="p-1.5 text-primary hover:bg-primary-container/20 rounded transition-colors"
                              title="Mark as Resolved"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDelete(inquiry.id)}
                            className="p-1.5 text-on-surface-variant/40 hover:text-error rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-on-surface-variant/50">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-on-surface-variant/30" />
                    No inquiries or messages log in this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface border border-outline-variant rounded-xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="p-6 border-b border-surface-container-highest bg-surface-container-low flex justify-between items-center">
              <h3 className="text-xl font-display flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" /> Client Inquiry Detail
              </h3>
              <button onClick={() => setActiveInquiry(null)} className="text-on-surface-variant hover:text-on-surface">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-xs border-b border-surface-container-highest pb-4">
                <div>
                  <span className="text-on-surface-variant/60 block font-semibold uppercase tracking-wider">Date Received</span>
                  <span className="text-sm font-semibold text-on-surface">{activeInquiry.date}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant/60 block font-semibold uppercase tracking-wider">Status</span>
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mt-1 ${
                    activeInquiry.status === 'Pending' ? 'bg-surface-container-highest text-on-surface-variant' : 'bg-secondary-container text-on-secondary-container'
                  }`}>
                    {activeInquiry.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-on-surface-variant/60 block font-semibold uppercase tracking-wider">Client Details</span>
                  <span className="text-sm font-semibold text-on-surface">{activeInquiry.name}</span>
                  <span className="text-xs text-on-surface-variant block mt-0.5">{activeInquiry.email}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-on-surface-variant/60 block font-semibold uppercase tracking-wider mb-1">Subject Header</span>
                <h4 className="text-md font-semibold text-primary">{activeInquiry.subject}</h4>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
                <span className="text-xs text-on-surface-variant/60 block font-semibold uppercase tracking-wider mb-2">Message Body</span>
                <p className="text-sm text-on-surface-variant leading-relaxed italic">
                  "{activeInquiry.message}"
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-surface-container-highest">
                <button
                  onClick={() => handleDelete(activeInquiry.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-error hover:bg-error-container/20 rounded-lg transition-colors font-semibold"
                >
                  <Trash2 className="w-4 h-4" /> Delete Message
                </button>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveInquiry(null)}
                    className="btn-ghost py-1.5 text-xs px-3"
                  >
                    Close
                  </button>
                  {activeInquiry.status === 'Pending' && (
                    <button 
                      onClick={() => handleResolve(activeInquiry.id)}
                      className="btn-primary py-1.5 text-xs px-3"
                    >
                      Mark as Resolved
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
