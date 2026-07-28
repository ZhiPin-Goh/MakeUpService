/**
 * Banner Management Module
 * Architecture based on Revealing Module Pattern.
 */
var BannerManager = (function ($) {
    var config = {
        urls: {
            create: '',
            update: '',
            toggleStatus: ''
        },
        selectors: {
            modal: '#bannerModal',
            form: '#banner-form',
            btnOpenCreate: '#btn-open-create-modal',
            tableBody: '#banners-table tbody'
        }
    };

    /**
     * Get Anti-Forgery Token
     */
    function getAntiForgeryToken() {
        return $('#anti-forgery-form input[name="__RequestVerificationToken"]').val();
    }

    /**
     * Generate Idempotency Key (UUID)
     */
    function generateIdempotencyKey() {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Bind UI Events
     */
    function bindEvents() {
        // Open Create Modal
        $(config.selectors.btnOpenCreate).on('click', function () {
            openModal(false);
        });

        // Submit Form (Create or Update)
        $(config.selectors.form).on('submit', function (e) {
            e.preventDefault();
            saveBanner();
        });

        // Delegate Edit button click
        $(config.selectors.tableBody).on('click', '.btn-edit', function () {
            var data = $(this).data();
            openModal(true, data);
        });

        // Delegate Toggle button click
        $(config.selectors.tableBody).on('click', '.btn-toggle', function () {
            var bannerId = $(this).data('id');
            toggleBanner(bannerId);
        });
    }

    function openModal(isEdit, data = null) {
        var $form = $(config.selectors.form);
        $form[0].reset();
        
        if (isEdit && data) {
            $('#modalTitle').text('Edit Banner');
            $('#BannerID').val(data.id);
            $('#Title').val(data.title);
            $('#TargetUrl').val(data.url);
            $('#SortOrder').val(data.sortOrder);
            
            $('#sortOrderContainer').show();
            $('#ImageUrl').prop('required', false);
            $('#imageHelpText').text('Leave blank to keep existing image.');
        } else {
            $('#modalTitle').text('Create New Banner');
            $('#BannerID').val('0');
            
            $('#sortOrderContainer').hide();
            $('#ImageUrl').prop('required', true);
            $('#imageHelpText').text('');
        }
        
        var modal = new bootstrap.Modal(document.querySelector(config.selectors.modal));
        modal.show();
    }

    /**
     * Save Banner (AJAX POST with FormData)
     */
    function saveBanner() {
        var $form = $(config.selectors.form);
        var formData = new FormData($form[0]);
        var bannerId = parseInt($('#BannerID').val(), 10);
        var isEdit = bannerId > 0;
        
        var targetUrl = isEdit ? config.urls.update : config.urls.create;
        
        var headers = {
            'RequestVerificationToken': getAntiForgeryToken()
        };

        // Inject Idempotency key for creation as requested by backend
        if (!isEdit) {
            headers['X-Idempotency-Key'] = generateIdempotencyKey();
        }

        var $btn = $('#btn-save-banner');
        var originalText = $btn.text();
        $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-1"></i> Saving...');

        // IMPORTANT: The backend expects [FromForm] so processData & contentType must be false.
        $.ajax({
            url: targetUrl,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: headers,
            success: function (response) {
                if (response.success) {
                    alert('Success: ' + response.message);
                    var modalEl = document.querySelector(config.selectors.modal);
                    bootstrap.Modal.getInstance(modalEl).hide();
                    location.reload();
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function (xhr) {
                alert('An error occurred. Please check your inputs.');
                console.error(xhr.responseText);
            },
            complete: function () {
                $btn.prop('disabled', false).text(originalText);
            }
        });
    }

    /**
     * Toggle Banner Status
     */
    function toggleBanner(id) {
        if (!confirm('Are you sure you want to toggle the status of this banner?')) return;

        $.ajax({
            url: config.urls.toggleStatus + id,
            type: 'POST',
            headers: {
                'RequestVerificationToken': getAntiForgeryToken()
            },
            success: function (response) {
                if (response.success) {
                    alert('Status updated successfully.');
                    location.reload();
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function (xhr) {
                alert('An error occurred while updating status.');
                console.error(xhr.responseText);
            }
        });
    }

    // Public API
    return {
        init: function (options) {
            $.extend(true, config, options);
            bindEvents();
        }
    };
})(jQuery);
