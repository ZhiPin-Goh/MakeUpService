import { 
  LayoutDashboard, 
  Calendar, 
  Brush, 
  Car, 
  Clock, 
  Star, 
  MessageSquare, 
  Bell, 
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  X,
  ShieldAlert,
  MapPin
} from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function Sidebar({ isOpen, isCollapsed, onClose, onLogout }: SidebarProps) {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Calendar, label: 'Bookings', path: '/bookings' },
    { icon: Brush, label: 'Services', path: '/services' },
    { icon: MapPin, label: 'Areas', path: '/areas' },
    { icon: Car, label: 'Travel Fees', path: '/travel-fees' },
    { icon: Clock, label: 'Schedule', path: '/schedule' },
    { icon: ShieldAlert, label: 'Blockers', path: '/blockers' },
    { icon: Star, label: 'Reviews', path: '/reviews' },
    { icon: MessageSquare, label: 'Feedbacks', path: '/feedbacks' },
    { icon: Bell, label: 'Notifications', path: '/notifications', badge: 3 },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden transition-all"
          onClick={onClose}
        />
      )}

      <aside 
        id="sidebar" 
        className={`
          fixed left-0 top-0 h-screen bg-background border-r border-outline-variant z-50 py-6 flex flex-col w-[260px]
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'md:-translate-x-full' : 'md:translate-x-0'}
        `}
      >
        {/* Brand Header */}
        <div className="px-6 mb-8 flex flex-col items-start gap-1 relative">
          <div className="w-10 h-10 rounded-full bg-surface border border-outline-variant flex items-center justify-center mb-3 shadow-sm">
            <Brush className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-primary leading-none">Shirley Makeup</h1>
          <p className="text-xs font-medium text-on-surface-variant opacity-70 uppercase tracking-wider mt-1">Admin Portal</p>
          
          {/* Close button on mobile */}
          <button 
            onClick={onClose}
            className="absolute top-1 right-4 p-2 md:hidden text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded-lg"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Action */}
        <div className="px-6 mb-8">
          <Link 
            to="/bookings" 
            onClick={onClose}
            className="btn-primary w-full inline-flex justify-center items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Booking
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3">
          <ul className="flex flex-col gap-1">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li key={idx}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ${
                      isActive
                        ? 'bg-surface-container-high border-l-4 border-primary text-primary font-semibold shadow-sm'
                        : 'text-on-surface-variant opacity-70 hover:bg-surface-container hover:opacity-100 hover:text-on-surface border-l-4 border-transparent'
                    }`}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
                        <span className="text-sm">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-error text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Actions */}
        <div className="px-3 mt-auto pt-4 border-t border-outline-variant/50">
          <ul className="flex flex-col gap-1">
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant opacity-70 hover:bg-surface-container transition-colors">
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Support</span>
              </button>
            </li>
            <li>
              <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-error opacity-80 hover:bg-error-container/50 transition-colors">
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
