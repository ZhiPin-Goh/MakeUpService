import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Plus, MoreHorizontal, Calendar, Users, DollarSign, MapPin, Check, X, Clock, AlertCircle } from 'lucide-react';

interface Booking {
  id: string;
  customerName: string;
  email: string;
  service: string;
  date: string;
  time: string;
  pax: number;
  location: string;
  totalPrice: number;
  status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled';
}

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "B-1024",
    customerName: "Elena Rostova",
    email: "elena.r@example.com",
    service: "Bridal Makeup",
    date: "2026-10-24",
    time: "08:00 AM",
    pax: 4,
    location: "The Plaza Hotel, Suite 402",
    totalPrice: 1250,
    status: "Pending"
  },
  {
    id: "B-1023",
    customerName: "Sarah Jenkins",
    email: "sjenkins@example.com",
    service: "Dinner Makeup",
    date: "2026-10-22",
    time: "02:00 PM",
    pax: 1,
    location: "Studio A",
    totalPrice: 150,
    status: "Approved"
  },
  {
    id: "B-1022",
    customerName: "Mia Chen",
    email: "mia.chen@example.com",
    service: "Photoshoot Makeup",
    date: "2026-10-20",
    time: "10:00 AM",
    pax: 2,
    location: "Vogue Studios, Brooklyn",
    totalPrice: 450,
    status: "Completed"
  },
  {
    id: "B-1021",
    customerName: "Chloe Dupont",
    email: "chloe.dupont@example.com",
    service: "Bridal Makeup",
    date: "2026-10-18",
    time: "01:00 PM",
    pax: 1,
    location: "Studio B",
    totalPrice: 350,
    status: "Cancelled"
  }
];

export function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    service: 'Bridal Makeup',
    date: '',
    time: '09:00 AM',
    pax: 1,
    location: '',
    totalPrice: 350,
  });

  useEffect(() => {
    const saved = localStorage.getItem('luxe_bookings');
    if (saved) {
      setBookings(JSON.parse(saved));
    } else {
      setBookings(INITIAL_BOOKINGS);
      localStorage.setItem('luxe_bookings', JSON.stringify(INITIAL_BOOKINGS));
    }
  }, []);

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('luxe_bookings', JSON.stringify(newBookings));
  };

  const handleStatusChange = (id: string, newStatus: Booking['status']) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    saveBookings(updated);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const next = { ...prev, [name]: name === 'pax' || name === 'totalPrice' ? Number(value) : value };
      // Auto price logic
      if (name === 'service') {
        if (value === 'Bridal Makeup') next.totalPrice = 350;
        else if (value === 'Dinner Makeup') next.totalPrice = 150;
        else if (value === 'Photoshoot Makeup') next.totalPrice = 200;
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `B-${1000 + bookings.length + 1}`;
    const newBooking: Booking = {
      id: newId,
      ...formData,
      status: 'Pending'
    };
    saveBookings([newBooking, ...bookings]);
    setIsModalOpen(false);
    // Reset form
    setFormData({
      customerName: '',
      email: '',
      service: 'Bridal Makeup',
      date: '',
      time: '09:00 AM',
      pax: 1,
      location: '',
      totalPrice: 350,
    });
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchesService = serviceFilter === 'All' || b.service === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  return (
    <div className="max-w-[1440px] mx-auto w-full space-y-8" id="bookings-root">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl text-on-background mb-2" id="bookings-title">Booking Management</h2>
          <p className="text-on-surface-variant text-sm">View, filter, approve, and schedule client bookings.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
          id="btn-add-booking"
        >
          <Plus className="w-4 h-4" />
          Add Booking
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row gap-4 items-center justify-between" id="bookings-filters-container">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-on-surface-variant/60" />
          <input
            type="text"
            placeholder="Search booking ID, customer, service..."
            className="input-glow w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="bookings-search-input"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select 
            className="input-glow text-sm cursor-pointer py-2 px-3 bg-surface border-outline-variant"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            id="bookings-filter-status"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select 
            className="input-glow text-sm cursor-pointer py-2 px-3 bg-surface border-outline-variant"
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            id="bookings-filter-service"
          >
            <option value="All">All Services</option>
            <option value="Bridal Makeup">Bridal Makeup</option>
            <option value="Dinner Makeup">Dinner Makeup</option>
            <option value="Photoshoot Makeup">Photoshoot Makeup</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="glass-card overflow-hidden" id="bookings-table-container">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-container-highest bg-surface-container-low text-xs font-semibold tracking-widest text-on-surface-variant uppercase">
                <th className="p-4 pl-6">ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Service</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4 text-center">Pax</th>
                <th className="p-4">Location</th>
                <th className="p-4 text-right">Total Price</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 pr-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest text-sm text-on-surface bg-surface">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="p-4 pl-6 font-mono text-xs font-semibold text-primary">{booking.id}</td>
                    <td className="p-4">
                      <div className="font-semibold">{booking.customerName}</div>
                      <div className="text-xs text-on-surface-variant/70">{booking.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2.5 py-1 text-xs rounded-md bg-surface-container-low font-medium text-on-surface-variant">
                        {booking.service}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{booking.date}</div>
                      <div className="text-xs text-on-surface-variant/80 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {booking.time}
                      </div>
                    </td>
                    <td className="p-4 text-center font-medium">{booking.pax}</td>
                    <td className="p-4 text-xs max-w-xs truncate" title={booking.location}>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-primary-container shrink-0" />
                        <span>{booking.location}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono font-semibold text-on-surface">
                      ${booking.totalPrice.toFixed(2)}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        booking.status === 'Approved' ? 'bg-secondary-container text-on-secondary-container' :
                        booking.status === 'Completed' ? 'bg-primary-container/20 text-primary-container' :
                        booking.status === 'Cancelled' ? 'bg-error-container/30 text-error' :
                        'bg-surface-container-highest text-on-surface-variant'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {booking.status === 'Pending' && (
                          <>
                            <button 
                              onClick={() => handleStatusChange(booking.id, 'Approved')}
                              className="p-1 text-secondary hover:bg-secondary-container/30 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleStatusChange(booking.id, 'Cancelled')}
                              className="p-1 text-error hover:bg-error-container/30 rounded-lg transition-colors"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {booking.status === 'Approved' && (
                          <button 
                            onClick={() => handleStatusChange(booking.id, 'Completed')}
                            className="px-2 py-1 text-xs bg-primary-container/10 hover:bg-primary-container/20 text-primary-container rounded font-semibold transition-colors"
                          >
                            Complete
                          </button>
                        )}
                        {booking.status === 'Completed' && (
                          <span className="text-xs text-on-surface-variant/50">Done</span>
                        )}
                        {booking.status === 'Cancelled' && (
                          <button 
                            onClick={() => handleStatusChange(booking.id, 'Pending')}
                            className="text-xs text-primary underline"
                          >
                            Re-open
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-12 text-center text-on-surface-variant/60">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-on-surface-variant/40" />
                    No bookings found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface border border-outline-variant rounded-xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="p-6 border-b border-surface-container-highest bg-surface-container-low flex justify-between items-center">
              <h3 className="text-xl font-display">New Booking Request</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Customer Name</label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    value={formData.customerName}
                    onChange={handleFormChange}
                    className="input-glow w-full"
                    placeholder="e.g. Jessica Miller"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    className="input-glow w-full"
                    placeholder="jessica@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Service Type</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleFormChange}
                    className="input-glow w-full py-2 bg-surface"
                  >
                    <option value="Bridal Makeup">Bridal Makeup</option>
                    <option value="Dinner Makeup">Dinner Makeup</option>
                    <option value="Photoshoot Makeup">Photoshoot Makeup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Pax Count</label>
                  <input
                    type="number"
                    name="pax"
                    min={1}
                    max={20}
                    value={formData.pax}
                    onChange={handleFormChange}
                    className="input-glow w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleFormChange}
                    className="input-glow w-full py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Time</label>
                  <input
                    type="text"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleFormChange}
                    className="input-glow w-full"
                    placeholder="e.g. 09:00 AM"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Location Details</label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleFormChange}
                    className="input-glow w-full"
                    placeholder="Hotel Name, suite, or studio address"
                  />
                </div>
                <div className="col-span-2">
                  <div className="bg-surface-container-low p-3.5 rounded-lg border border-outline-variant flex justify-between items-center">
                    <span className="text-sm font-semibold text-on-surface-variant">Calculated Total Price:</span>
                    <span className="text-lg font-mono font-bold text-primary">${formData.totalPrice.toFixed(2)}</span>
                  </div>
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
                  Request Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
