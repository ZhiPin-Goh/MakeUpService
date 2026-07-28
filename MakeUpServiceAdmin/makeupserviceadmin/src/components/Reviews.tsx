import React, { useState, useEffect } from 'react';
import { Star, Check, EyeOff, MessageSquare, AlertCircle, Trash2, Heart, ShieldAlert } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  service: string;
  status: 'Pending' | 'Visible' | 'Hidden';
  replyText?: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: "R-1",
    author: "Emma Thompson",
    rating: 5,
    date: "2026-10-23",
    service: "Bridal Makeup",
    content: "Absolutely loved my bridal makeup! It survived tears, dancing, and high humidity beautifully. The airbrush prep was flawless.",
    status: "Pending"
  },
  {
    id: "R-2",
    author: "Sarah Jenkins",
    rating: 5,
    date: "2026-10-21",
    service: "Dinner Makeup",
    content: "The best makeup studio in the city, hands down. I received endless compliments on my evening glam! Will book again.",
    status: "Visible",
    replyText: "Thank you so much Sarah! It was an absolute pleasure working with you."
  },
  {
    id: "R-3",
    author: "Jessica Liu",
    rating: 3,
    date: "2026-10-18",
    service: "Photoshoot Makeup",
    content: "The makeup artist was polite and punctual, but the foundation match felt a bit too warm for my undertones under studio lights.",
    status: "Pending"
  }
];

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [replyInputId, setReplyInputId] = useState<string | null>(null);
  const [replyValue, setReplyValue] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('luxe_reviews');
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('luxe_reviews', JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  const saveReviews = (newReviews: Review[]) => {
    setReviews(newReviews);
    localStorage.setItem('luxe_reviews', JSON.stringify(newReviews));
  };

  const handleStatusChange = (id: string, newStatus: Review['status']) => {
    const updated = reviews.map(r => r.id === id ? { ...r, status: newStatus } : r);
    saveReviews(updated);
  };

  const handlePostReply = (id: string) => {
    if (!replyValue.trim()) return;
    const updated = reviews.map(r => r.id === id ? { ...r, replyText: replyValue, status: 'Visible' as const } : r);
    saveReviews(updated);
    setReplyValue('');
    setReplyInputId(null);
  };

  const handleDelete = (id: string) => {
    const updated = reviews.filter(r => r.id !== id);
    saveReviews(updated);
  };

  const filteredReviews = reviews.filter(r => {
    if (statusFilter === 'All') return true;
    return r.status === statusFilter;
  });

  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : "0.0";
  const pendingCount = reviews.filter(r => r.status === 'Pending').length;

  return (
    <div className="max-w-[1440px] mx-auto w-full space-y-8" id="reviews-root">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl text-on-background mb-2" id="reviews-title">Review Moderation</h2>
          <p className="text-on-surface-variant text-sm">Approve, respond, and audit feedback left by clients on service catalogs.</p>
        </div>
        
        {/* Dropdown Filters */}
        <div className="flex gap-3">
          <select
            className="input-glow text-xs font-semibold py-2 px-3 bg-surface border-outline-variant cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            id="reviews-status-filter"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending Approval</option>
            <option value="Visible">Visible on Public Page</option>
            <option value="Hidden">Hidden</option>
          </select>
        </div>
      </div>

      {/* Review Metrics Header Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="reviews-stats-row">
        <div className="glass-card p-6 bg-surface">
          <span className="text-xs uppercase tracking-widest font-bold text-on-surface-variant/60">Average Rating</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-4xl font-display font-bold text-primary">{avgRating}</h3>
            <span className="text-sm font-semibold text-secondary flex items-center gap-0.5">
              <Star className="w-4 h-4 fill-primary text-primary" /> out of 5
            </span>
          </div>
        </div>

        <div className="glass-card p-6 bg-surface">
          <span className="text-xs uppercase tracking-widest font-bold text-on-surface-variant/60">Pending Moderation</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-4xl font-display font-bold text-on-surface">{pendingCount} Reviews</h3>
            {pendingCount > 0 && (
              <span className="text-xs font-bold uppercase tracking-wider text-error bg-error-container/30 px-2 py-0.5 rounded-full">
                Needs Review
              </span>
            )}
          </div>
        </div>

        <div className="glass-card p-6 bg-surface">
          <span className="text-xs uppercase tracking-widest font-bold text-on-surface-variant/60">Public Reviews</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-4xl font-display font-bold text-secondary">
              {reviews.filter(r => r.status === 'Visible').length}
            </h3>
            <span className="text-xs text-on-surface-variant/70">Published reviews</span>
          </div>
        </div>
      </div>

      {/* Stream of Reviews */}
      <div className="space-y-6" id="reviews-list">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => {
            const isPending = review.status === 'Pending';
            const isHidden = review.status === 'Hidden';

            return (
              <div 
                key={review.id}
                className={`glass-card p-6 relative bg-surface border transition-all duration-300 ${
                  isHidden ? 'opacity-50' : ''
                }`}
              >
                {/* Header */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="text-lg font-semibold font-display text-on-surface">{review.author}</h4>
                    <p className="text-xs text-on-surface-variant/70 mt-1">
                      Reviewed: <span className="font-semibold text-primary">{review.service}</span> • {review.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < review.rating ? 'fill-primary text-primary' : 'text-surface-container-highest'
                          }`} 
                        />
                      ))}
                    </div>
                    {/* Badge Status */}
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ml-2 ${
                      review.status === 'Visible' ? 'bg-secondary-container text-on-secondary-container' :
                      review.status === 'Hidden' ? 'bg-error-container/30 text-error' :
                      'bg-surface-container-highest text-on-surface-variant'
                    }`}>
                      {review.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <p className="text-sm text-on-surface leading-relaxed my-4 text-on-surface-variant">
                  "{review.content}"
                </p>

                {/* Render Reply if it exists */}
                {review.replyText && (
                  <div className="bg-surface-container-low/60 border border-outline-variant/30 rounded-xl p-4 ml-6 mb-4 flex gap-3">
                    <MessageSquare className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-on-surface block">Your Response (Studio Owner):</span>
                      <p className="text-xs text-on-surface-variant mt-1 italic">"{review.replyText}"</p>
                    </div>
                  </div>
                )}

                {/* Reply Form Trigger */}
                {replyInputId === review.id && (
                  <div className="ml-6 mb-4 mt-3 space-y-2 max-w-xl animate-in slide-in-from-top-2 duration-200">
                    <textarea
                      rows={2}
                      value={replyValue}
                      onChange={(e) => setReplyValue(e.target.value)}
                      placeholder="Type your client response..."
                      className="input-glow w-full py-1.5 text-xs"
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setReplyInputId(null)}
                        className="btn-ghost py-1 text-xs px-2.5"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handlePostReply(review.id)}
                        className="btn-primary py-1 text-xs px-2.5"
                      >
                        Publish Reply
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions Moderation bar */}
                <div className="pt-4 border-t border-surface-container-highest flex justify-between items-center">
                  <div className="flex gap-2">
                    {isPending && (
                      <>
                        <button 
                          onClick={() => handleStatusChange(review.id, 'Visible')}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-secondary-container/20 text-secondary hover:bg-secondary-container/40 rounded-lg transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button 
                          onClick={() => handleStatusChange(review.id, 'Hidden')}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold hover:bg-error-container/30 text-error rounded-lg transition-colors"
                        >
                          <EyeOff className="w-3.5 h-3.5" /> Hide
                        </button>
                      </>
                    )}

                    {!isPending && (
                      <button 
                        onClick={() => handleStatusChange(review.id, review.status === 'Visible' ? 'Hidden' : 'Visible')}
                        className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors"
                      >
                        {review.status === 'Visible' ? 'Hide from Feed' : 'Publish to Feed'}
                      </button>
                    )}

                    {!review.replyText && replyInputId !== review.id && (
                      <button 
                        onClick={() => { setReplyInputId(review.id); setReplyValue(''); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold hover:bg-surface-container text-on-surface-variant rounded-lg transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-primary" /> Reply
                      </button>
                    )}
                  </div>

                  <button 
                    onClick={() => handleDelete(review.id)}
                    className="p-1.5 text-on-surface-variant/50 hover:text-error rounded-lg transition-colors"
                    title="Delete Review Log"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })
        ) : (
          <div className="glass-card p-12 text-center text-on-surface-variant/50">
            <ShieldAlert className="w-8 h-8 mx-auto mb-2 text-on-surface-variant/30" />
            No reviews matching your filters.
          </div>
        )}
      </div>

    </div>
  );
}
