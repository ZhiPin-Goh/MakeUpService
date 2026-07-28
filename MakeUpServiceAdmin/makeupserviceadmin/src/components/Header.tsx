import { Search, Bell, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle: () => void;
  isCollapsed: boolean;
}

export function Header({ onMenuToggle, isCollapsed }: HeaderProps) {
  return (
    <header 
      id="main-header" 
      className={`h-[72px] fixed top-0 right-0 w-full ${isCollapsed ? 'md:w-full' : 'md:w-[calc(100%-260px)]'} bg-surface/90 backdrop-blur-md border-b border-outline-variant shadow-sm z-30 px-6 flex justify-between items-center transition-all duration-300`}
    >
      <div className="flex items-center gap-6 h-full">
        {/* Menu Toggle */}
        <button 
          onClick={onMenuToggle}
          className="p-2 -ml-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded-lg"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-on-surface-variant/50" />
          <input 
            type="text" 
            placeholder="Search bookings, clients..." 
            className="input-glow pl-9 py-2 w-64 rounded-full bg-surface-container-low border-outline-variant/50 focus:bg-surface"
          />
        </div>
        
        {/* Horizontal Nav (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 h-full">
          <NavLink 
            to="/" 
            className={({ isActive }) => `h-full flex items-center text-sm font-medium transition-colors ${
              isActive ? 'text-primary border-b-2 border-primary font-semibold' : 'text-on-surface-variant hover:text-primary border-b-2 border-transparent'
            }`}
          >
            Dashboard
          </NavLink>
        </nav>
      </div>

      {/* Trailing Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low rounded-full">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
        </button>
        
        <div className="h-6 w-px bg-outline-variant/50 mx-1 hidden sm:block"></div>
        
        <button className="w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant overflow-hidden hover:opacity-90 transition-opacity">
          <img 
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Shirley&backgroundColor=f0bd8b" 
            alt="User profile" 
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
