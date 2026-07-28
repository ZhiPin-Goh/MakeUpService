import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Blocker {
  id: string;
  title: string;
  type: 'Vacation' | 'Personal' | 'Maintenance' | 'Medical';
  startDate: string;
  endDate: string;
  notes?: string;
}

const INITIAL_BLOCKERS: Blocker[] = [
  {
    id: "BL-1",
    title: "Annual Vacation",
    type: "Vacation",
    startDate: "2026-10-07",
    endDate: "2026-10-09",
    notes: "Heading out of town. No on-location bookings accepted."
  },
  {
    id: "BL-2",
    title: "Doctor Appointment",
    type: "Medical",
    startDate: "2026-10-12",
    endDate: "2026-10-12",
    notes: "Afternoon blocked from 2:00 PM."
  }
];

export function Schedule() {
  const [blockers, setBlockers] = useState<Blocker[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-15");
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 9, 1)); // Starts at October 2026

  useEffect(() => {
    const saved = localStorage.getItem('luxe_blockers');
    if (saved) {
      setBlockers(JSON.parse(saved));
    } else {
      setBlockers(INITIAL_BLOCKERS);
      localStorage.setItem('luxe_blockers', JSON.stringify(INITIAL_BLOCKERS));
    }
  }, []);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getStartDayOffset = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const startDayOffset = getStartDayOffset(year, month);
  const calendarCells = [];

  const isBlocked = (day: number) => {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return blockers.some(b => {
      // Use simple string comparison or local date comparison to avoid timezone issues
      const checkDateStr = dateStr;
      return checkDateStr >= b.startDate && checkDateStr <= b.endDate;
    });
  };

  const hasBooking = (day: number) => {
    // Hardcoded some decorative bookings to populate our visual dashboard calendar just for Oct 2026
    if (year === 2026 && month === 9) {
      return [10, 15, 20, 22, 24].includes(day);
    }
    return false;
  };

  // Generate blank spaces for offset
  for (let i = 0; i < startDayOffset; i++) {
    calendarCells.push(null);
  }
  // Generate days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push(i);
  }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="max-w-[1440px] mx-auto w-full space-y-8" id="schedule-root">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl text-on-background mb-2" id="schedule-title">Schedule Management</h2>
        <p className="text-on-surface-variant text-sm">Manage your studio availability, schedule client blocks, and log time off.</p>
      </div>

      <div className="max-w-4xl w-full">
        {/* Interactive Calendar widget */}
        <div className="glass-card p-6 bg-surface">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <button onClick={handlePrevMonth} className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <h3 className="text-xl font-display font-semibold text-on-surface w-40 text-center">
                    {monthNames[month]} {year}
                  </h3>
                  <p className="text-xs text-on-surface-variant/70 text-center">Click on any date to inspect details</p>
                </div>
                <button onClick={handleNextMonth} className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-2 text-xs font-semibold">
                <span className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded border border-outline-variant/30">
                  <span className="w-2.5 h-2.5 bg-primary-container rounded-full"></span> Bookings
                </span>
                <span className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded border border-outline-variant/30">
                  <span className="w-2.5 h-2.5 bg-error/70 rounded-full"></span> Blocked
                </span>
              </div>
            </div>

            {/* Calendar Grid Header */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold tracking-widest text-on-surface-variant/70 uppercase mb-3">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Grid Cells */}
            <div className="grid grid-cols-7 gap-2">
              {calendarCells.map((day, idx) => {
                if (day === null) return <div key={`empty-${idx}`} className="aspect-square bg-transparent"></div>;
                
                const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                const isSelected = selectedDate === dateStr;
                const blocked = isBlocked(day);
                const booked = hasBooking(day);

                return (
                  <button
                    key={`day-${day}`}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`aspect-square relative rounded-xl border flex flex-col justify-between p-2 text-sm font-medium transition-all group hover:scale-102 ${
                      isSelected ? 'border-primary bg-primary/5 text-primary scale-102 ring-2 ring-primary-container/20' : 
                      blocked ? 'border-error/20 bg-error/5 text-error hover:bg-error/10' :
                      booked ? 'border-primary-container/20 bg-primary-container/5 text-on-surface hover:bg-primary-container/10' :
                      'border-outline-variant/30 hover:border-outline text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span className="text-xs font-semibold">{day}</span>
                    <div className="flex gap-1 justify-end w-full">
                      {booked && <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>}
                      {blocked && <span className="w-1.5 h-1.5 rounded-full bg-error"></span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
      </div>
    </div>
  );
}

