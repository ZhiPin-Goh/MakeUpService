import React, { useState, useEffect } from 'react';
import { Bell, Calendar, CreditCard, Star, Info, Check, Trash2, ShieldAlert, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'Booking' | 'Payment' | 'Review' | 'System';
  title: string;
  body: string;
  timeAgo: string;
  isRead: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "N-1",
    type: "Booking",
    title: "New Booking Request",
    body: "Elena Rostova submitted a request for Bridal Makeup on Oct 24, 2026.",
    timeAgo: "2 mins ago",
    isRead: false
  },
  {
    id: "N-2",
    type: "Payment",
    title: "Payment Received",
    body: "$500.00 deposit has been processed for Booking #B-1024.",
    timeAgo: "1 hour ago",
    isRead: false
  },
  {
    id: "N-3",
    type: "Review",
    title: "New Review Received",
    body: "Sarah Jenkins left a 5-star review: 'The best makeup studio in the city...'",
    timeAgo: "3 hours ago",
    isRead: false
  },
  {
    id: "N-4",
    type: "System",
    title: "Core Platform Update",
    body: "The Shirley Makeup portal underwent routine security and speed enhancements.",
    timeAgo: "Yesterday",
    isRead: true
  }
];

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('luxe_notifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      setNotifications(INITIAL_NOTIFICATIONS);
      localStorage.setItem('luxe_notifications', JSON.stringify(INITIAL_NOTIFICATIONS));
    }
  }, []);

  const saveNotifications = (newNotifications: Notification[]) => {
    setNotifications(newNotifications);
    localStorage.setItem('luxe_notifications', JSON.stringify(newNotifications));
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    saveNotifications(updated);
  };

  const handleToggleRead = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = notifications.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n);
    saveNotifications(updated);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = notifications.filter(n => n.id !== id);
    saveNotifications(updated);
    if (selectedNotification?.id === id) {
      setSelectedNotification(null);
    }
  };

  const openNotification = (notif: Notification) => {
    setSelectedNotification(notif);
    if (!notif.isRead) {
      const updated = notifications.map(n => n.id === notif.id ? { ...n, isRead: true } : n);
      saveNotifications(updated);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-[768px] mx-auto w-full space-y-8" id="notifications-root">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-surface-container-highest pb-6">
        <div>
          <h2 className="text-3xl text-on-background mb-2" id="notifications-title">Notifications</h2>
          <p className="text-on-surface-variant text-sm">Stay updated with live booking requests, client reviews, and invoice payments.</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-primary-container/10 hover:bg-primary-container/20 text-primary-container rounded-lg transition-colors shrink-0"
            id="btn-mark-all-read"
          >
            <Check className="w-3.5 h-3.5" /> Mark All as Read
          </button>
        )}
      </div>

      {/* List Container */}
      <div className="space-y-4" id="notifications-list">
        {notifications.length > 0 ? (
          notifications.map((notif) => {
            const Icon = 
              notif.type === 'Booking' ? Calendar :
              notif.type === 'Payment' ? CreditCard :
              notif.type === 'Review' ? Star : Info;

            const iconBg = 
              notif.type === 'Booking' ? 'bg-primary-container/20 text-primary-container' :
              notif.type === 'Payment' ? 'bg-secondary-container text-on-secondary-container' :
              notif.type === 'Review' ? 'bg-tertiary-container text-on-tertiary-container' :
              'bg-surface-container-highest text-on-surface-variant';

            return (
              <div
                key={notif.id}
                onClick={() => openNotification(notif)}
                className={`glass-card p-5 flex gap-4 border transition-all duration-300 relative group overflow-hidden cursor-pointer hover:border-primary-container/60 ${
                  notif.isRead ? 'opacity-70 bg-surface/50' : 'border-primary-container/30 ring-1 ring-primary-container/10 bg-surface'
                }`}
              >
                {/* Visual Unread Ring */}
                {!notif.isRead && (
                  <span className="absolute top-5 right-5 w-2 h-2 rounded-full bg-primary-container"></span>
                )}

                {/* Left Icon Block */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Right Text Block */}
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-sm font-semibold text-on-surface truncate">{notif.title}</h4>
                    <span className="text-[10px] text-on-surface-variant/60 font-medium shrink-0">{notif.timeAgo}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-1 line-clamp-2">{notif.body}</p>
                  
                  <div className="flex gap-4 mt-3.5 pt-3 border-t border-surface-container-highest/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleToggleRead(e, notif.id)}
                      className="text-[11px] font-semibold text-on-surface-variant hover:text-primary transition-colors"
                    >
                      {notif.isRead ? 'Mark as Unread' : 'Mark as Read'}
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, notif.id)}
                      className="text-[11px] font-semibold text-error/80 hover:text-error transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>

                {/* Inline Delete Button (Desktop shortcut) */}
                <button
                  onClick={(e) => handleDelete(e, notif.id)}
                  className="absolute right-4 bottom-4 p-1.5 text-on-surface-variant/30 hover:text-error hover:bg-error-container/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        ) : (
          <div className="glass-card p-12 text-center text-on-surface-variant/50">
            <ShieldAlert className="w-8 h-8 mx-auto mb-2 text-on-surface-variant/30" />
            No new alerts at this time. Enjoy the quiet!
          </div>
        )}
      </div>

      {/* Notification Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setSelectedNotification(null)}>
          <div 
            className="bg-surface border border-outline-variant rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-surface-container-highest flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  selectedNotification.type === 'Booking' ? 'bg-primary-container/20 text-primary-container' :
                  selectedNotification.type === 'Payment' ? 'bg-secondary-container text-on-secondary-container' :
                  selectedNotification.type === 'Review' ? 'bg-tertiary-container text-on-tertiary-container' :
                  'bg-surface-container-highest text-on-surface-variant'
                }`}>
                  {selectedNotification.type === 'Booking' && <Calendar className="w-5 h-5" />}
                  {selectedNotification.type === 'Payment' && <CreditCard className="w-5 h-5" />}
                  {selectedNotification.type === 'Review' && <Star className="w-5 h-5" />}
                  {selectedNotification.type === 'System' && <Info className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-semibold text-on-surface">{selectedNotification.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">{selectedNotification.timeAgo}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedNotification(null)}
                className="p-1.5 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-on-surface leading-relaxed">
                {selectedNotification.body}
              </p>
            </div>
            <div className="p-4 bg-surface-container-lowest border-t border-surface-container-highest flex justify-end gap-3">
              <button 
                onClick={(e) => handleDelete(e, selectedNotification.id)}
                className="px-4 py-2 text-sm font-semibold text-error hover:bg-error-container/20 rounded-lg transition-colors"
              >
                Delete Notification
              </button>
              <button 
                onClick={() => setSelectedNotification(null)}
                className="px-4 py-2 text-sm font-semibold bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
