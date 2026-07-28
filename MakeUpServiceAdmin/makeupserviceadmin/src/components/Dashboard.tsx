import { ArrowUpRight, ArrowDownRight, Users, CheckCircle2, DollarSign, AlertCircle, Calendar as CalendarIcon, ArrowRight, MoreVertical, Brush } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <div className="max-w-[1440px] mx-auto w-full space-y-12">
      {/* Page Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-3xl text-on-background mb-2">Dashboard Overview</h2>
          <p className="text-on-surface-variant text-sm">Welcome back. Here's what's happening at the studio today.</p>
        </div>
        <div className="flex items-center gap-2 bg-surface border border-outline-variant rounded-lg p-1 shadow-sm">
          <button className="p-1.5 hover:bg-surface-container rounded text-on-surface-variant transition-colors">
            <CalendarIcon className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-on-surface px-3">Oct 24, 2026</span>
        </div>
      </header>

      {/* Top Metrics Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <MetricCard 
          title="Today's Bookings" 
          value="8" 
          trend="+12%" 
          trendUp={true} 
          icon={Users} 
          colorClass="text-primary bg-primary-container/20"
        />
        <MetricCard 
          title="Pending Approvals" 
          value="5" 
          trend="-2%" 
          trendUp={false} 
          icon={CheckCircle2}
          colorClass="text-tertiary bg-tertiary-container/20"
        />
        <MetricCard 
          title="Upcoming Bookings" 
          value="14" 
          trend="+5%" 
          trendUp={true} 
          icon={CalendarIcon}
          colorClass="text-secondary bg-secondary-container/20"
        />
        <MetricCard 
          title="Unread Feedback" 
          value="3" 
          trend="Action Needed" 
          trendUp={false} 
          icon={AlertCircle}
          colorClass="text-error bg-error-container/50"
          isAlert
        />
        <MetricCard 
          title="Monthly Revenue" 
          value="$12,450" 
          trend="+8%" 
          trendUp={true} 
          icon={DollarSign}
          colorClass="text-on-surface bg-surface-container-highest"
        />
      </section>

      {/* Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Schedule Panel */}
          <div className="glass-card flex flex-col overflow-hidden">
            <div className="p-6 border-b border-surface-container-highest flex justify-between items-center bg-surface-bright/50">
              <h3 className="text-xl">Upcoming Schedule</h3>
              <Link to="/schedule" className="text-sm font-semibold text-primary hover:text-primary-container flex items-center gap-1 transition-colors">
                View Calendar <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-6 flex flex-col gap-3 bg-surface">
              <ScheduleItem 
                time="09:00" 
                ampm="AM"
                client="Emma Thompson" 
                service="Bridal Trial Makeup" 
                status="Confirmed" 
                duration="90 min" 
              />
              <ScheduleItem 
                time="11:30" 
                ampm="AM"
                client="Sarah Jenkins" 
                service="Event Glam - Full Face" 
                status="Confirmed" 
                duration="60 min" 
              />
              <ScheduleItem 
                time="02:00" 
                ampm="PM"
                client="Mia Rodriguez" 
                service="Photoshoot Touch-ups" 
                status="Pending" 
                duration="120 min" 
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Revenue Chart Panel */}
          <div className="glass-card flex flex-col bg-surface overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-surface-container-highest bg-surface-bright/50">
              <h3 className="text-xl">Revenue</h3>
              <button className="text-on-surface-variant hover:text-on-surface transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 relative min-h-[220px] flex flex-col justify-end">
               {/* Mock Chart Area */}
              <div className="absolute inset-0 flex items-end justify-between px-8 pt-8 pb-10">
                {/* Grid Lines */}
                <div className="absolute inset-x-6 bottom-10 border-b border-outline-variant/30"></div>
                <div className="absolute inset-x-6 bottom-1/2 border-b border-outline-variant/30 translate-y-4"></div>
                
                {/* Bars */}
                <div className="w-10 bg-surface-container-high rounded-t h-[40%] hover:bg-primary-container/40 transition-colors"></div>
                <div className="w-10 bg-surface-container-high rounded-t h-[65%] hover:bg-primary-container/40 transition-colors"></div>
                <div className="w-10 bg-surface-container-high rounded-t h-[50%] hover:bg-primary-container/40 transition-colors"></div>
                <div className="w-10 bg-primary-container rounded-t h-[85%] shadow-[0_0_20px_rgba(212,163,115,0.4)]"></div>
                <div className="w-10 bg-surface-container-high rounded-t h-[70%] hover:bg-primary-container/40 transition-colors"></div>
              </div>
              {/* Axis labels */}
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mt-auto pt-4 border-t border-outline-variant/30">
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span className="text-primary">Sep</span>
                <span>Oct</span>
              </div>
            </div>
          </div>
          
          {/* Top Services Panel */}
          <div className="glass-card flex flex-col bg-surface overflow-hidden">
            <div className="p-6 border-b border-surface-container-highest flex justify-between items-center bg-surface-bright/50">
              <h3 className="text-xl">Top Services</h3>
              <Link to="/services" className="text-sm font-semibold text-primary hover:text-primary-container flex items-center gap-1 transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-6 flex flex-col gap-3">
              <ServiceListItem name="Bridal Trial Makeup" bookings={24} trend="+12%" trendUp={true} />
              <ServiceListItem name="Event Glam - Full Face" bookings={18} trend="+5%" trendUp={true} />
              <ServiceListItem name="Photoshoot Touch-ups" bookings={12} trend="-2%" trendUp={false} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ title, value, trend, trendUp, icon: Icon, colorClass, isAlert }: any) {
  return (
    <div className="glass-card p-6 flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        {!isAlert ? (
          <span className={`text-xs font-semibold px-2 py-1 rounded bg-surface-container flex items-center gap-1 ${trendUp ? 'text-secondary' : 'text-error'}`}>
            {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend}
          </span>
        ) : (
          <span className="text-xs font-semibold px-2 py-1 rounded bg-error-container/30 text-error">
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-on-surface-variant mb-1">{title}</h3>
      <p className="font-display text-4xl text-on-background font-bold tracking-tight">{value}</p>
      
      {/* Decorative background flare */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary-container/10 rounded-full blur-2xl group-hover:bg-primary-container/20 transition-colors duration-500"></div>
    </div>
  );
}

function ScheduleItem({ time, ampm, client, service, status, duration }: any) {
  const isConfirmed = status === 'Confirmed';
  
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-outline-variant/40 hover:bg-surface-container-lowest transition-all cursor-pointer group">
      <div className="w-14 h-14 rounded-lg bg-surface-container-low border border-outline-variant/50 flex flex-col items-center justify-center text-on-surface group-hover:border-primary-container/50 group-hover:bg-primary/5 transition-colors">
        <span className="text-sm font-semibold text-primary leading-none">{time}</span>
        <span className="text-[10px] font-medium text-on-surface-variant uppercase mt-1">{ampm}</span>
      </div>
      
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-on-surface">{client}</h4>
        <p className="text-xs text-on-surface-variant mt-0.5">{service}</p>
      </div>
      
      <div className="hidden sm:flex flex-col items-end gap-1.5">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
          isConfirmed 
            ? 'bg-secondary-container text-on-secondary-container' 
            : 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
        }`}>
          {status}
        </span>
        <span className="text-xs text-on-surface-variant">{duration}</span>
      </div>
    </div>
  );
}

function ServiceListItem({ name, bookings, trend, trendUp }: any) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-outline-variant/40 hover:bg-surface-container-lowest transition-all cursor-pointer group">
      <div className="w-12 h-12 rounded-lg bg-surface-container-low border border-outline-variant/50 flex flex-col items-center justify-center text-on-surface group-hover:border-primary-container/50 group-hover:bg-primary/5 transition-colors">
        <Brush className="w-5 h-5 text-primary" />
      </div>
      
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-on-surface line-clamp-1">{name}</h4>
        <p className="text-xs text-on-surface-variant mt-0.5">{bookings} bookings</p>
      </div>
      
      <div className="flex flex-col items-end gap-1.5">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
          trendUp 
            ? 'bg-secondary-container text-on-secondary-container' 
            : 'bg-surface-container-highest text-on-surface-variant'
        }`}>
          {trend}
        </span>
      </div>
    </div>
  );
}
