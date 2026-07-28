$(document).ready(function() {
    window.AppToast = {
        show: function(message, type) {
            type = type || 'error'; // default to error
            var $container = $('#toast-container');
            if($container.length === 0) {
                $container = $('<div id="toast-container" class="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none"></div>').appendTo('body');
            }
            
            var icon = type === 'success' ? 'check-circle' : 'alert-circle';
            var borderColor = type === 'success' ? 'border-secondary' : 'border-error';
            var iconColor = type === 'success' ? 'text-secondary' : 'text-error';
            var title = type === 'success' ? 'Success' : 'Attention Needed';

            var toastHtml = `
                <div class="glass-card shadow-2xl p-4 min-w-[320px] max-w-[400px] transform transition-all duration-300 translate-y-10 opacity-0 border-l-4 ${borderColor} pointer-events-auto">
                    <div class="flex gap-3 items-start">
                        <div class="mt-0.5 ${iconColor}">
                            <i data-lucide="${icon}" class="w-5 h-5"></i>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-sm font-bold text-on-surface mb-0.5 font-display">${title}</h4>
                            <p class="text-xs text-on-surface-variant leading-relaxed">${message}</p>
                        </div>
                        <button class="toast-close text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded p-1 transition-colors">
                            <i data-lucide="x" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            `;
            
            var $toast = $(toastHtml);
            $container.append($toast);
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons({ root: $toast[0] });
            }
            
            // Animate in
            setTimeout(function() {
                $toast.removeClass('translate-y-10 opacity-0');
            }, 10);
            
            // Close event
            $toast.find('.toast-close').on('click', function() {
                $toast.addClass('translate-y-10 opacity-0');
                setTimeout(function() { $toast.remove(); }, 300);
            });

            // Auto remove
            setTimeout(function() {
                if($.contains(document, $toast[0])) {
                    $toast.addClass('translate-y-10 opacity-0');
                    setTimeout(function() { $toast.remove(); }, 300);
                }
            }, 5000);
        },
        success: function(msg) { this.show(msg, 'success'); },
        error: function(msg) { this.show(msg, 'error'); }
    };

    // Safely override the native alert to use our beautiful UI
    window.alert = function(msg) {
        window.AppToast.show(msg, 'error');
    };
});
