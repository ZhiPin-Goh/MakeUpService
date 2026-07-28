// Modular jQuery Architecture for System Settings
var SystemSettingsManager = {
    saveUrl: '',

    init: function(config) {
        this.saveUrl = config.saveUrl;
        this.bindEvents();
    },

    bindEvents: function() {
        var self = this;

        // 1. Left Sidebar Navigation Logic (No Page Reload)
        $('.settings-sidebar-btn').on('click', function(e) {
            e.preventDefault();
            
            // Toggle active styling
            $('.settings-sidebar-btn').removeClass('active bg-primary-container text-on-primary-container font-bold')
                                      .addClass('text-on-surface-variant hover:bg-surface-container hover:text-on-surface');
            $(this).removeClass('text-on-surface-variant hover:bg-surface-container hover:text-on-surface')
                   .addClass('active bg-primary-container text-on-primary-container font-bold');

            // Hide all form panels, show target
            var targetId = $(this).data('target');
            $('.settings-form-container').addClass('hidden'); // standard Tailwind/CSS hidden class
            $(targetId).removeClass('hidden');
        });

        // 2. AJAX Form Submissions
        $('.settings-form').on('submit', function(e) {
            e.preventDefault();
            var $form = $(this);
            var $btn = $form.find('button[type="submit"]');
            var originalText = $btn.html();
            
            // Map inputs to the List<SystemSettings> C# Class Structure
            var payload = [];
            $form.find('input, select, textare').each(function() {
                var $input = $(this);
                var name = $input.attr('name');
                
                if (name) {
                    payload.push({
                        Key: name,
                        Value: $input.val(),
                        Description: $input.data('description') || ''
                    });
                }
            });

            // Visual Feedback (Loading state)
            $btn.prop('disabled', true).html('Saving...');

            // Send payload
            $.ajax({
                url: self.saveUrl,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(payload),
                success: function(response) {
                    alert('Settings saved successfully!');
                    // Optional: show a pretty toast instead of alert
                },
                error: function(xhr, status, error) {
                    alert('Error saving settings: ' + error);
                },
                complete: function() {
                    // Revert button
                    $btn.prop('disabled', false).html(originalText);
                }
            });
        });
    }
};
