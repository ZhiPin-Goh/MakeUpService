/**
 * Booking Management Module
 * Architecture based on Revealing Module Pattern.
 */
var BookingManager = (function ($) {
    var config = {
        urls: {
            create: '',
            toggleStatus: '',
            details: ''
        },
        selectors: {
            createModal: '#createBookingModal',
            createForm: '#create-booking-form',
            statusModal: '#statusModal',
            statusForm: '#status-form',
            btnOpenCreate: '#btn-open-create-modal',
            tableBody: '#bookings-table tbody'
        }
    };

    /**
     * Get Anti-Forgery Token
     */
    function getAntiForgeryToken() {
        return $('input[name="__RequestVerificationToken"]').val();
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
            var $form = $(config.selectors.createForm);
            $form[0].reset();
            var modal = new bootstrap.Modal(document.querySelector(config.selectors.createModal));
            modal.show();
        });

        // Submit Create Form
        $(config.selectors.createForm).on('submit', function (e) {
            e.preventDefault();
            createBooking();
        });

        // Open Status Modal (Delegated)
        $(config.selectors.tableBody).on('click', '.btn-update-status', function () {
            var bookingId = $(this).data('id');
            var currentStatus = $(this).data('status');
            
            $('#status-booking-id').val(bookingId);
            $('#status-select').val(currentStatus);
            
            var modal = new bootstrap.Modal(document.querySelector(config.selectors.statusModal));
            modal.show();
        });

        // Submit Status Form
        $(config.selectors.statusForm).on('submit', function (e) {
            e.preventDefault();
            updateStatus();
        });

        // View Details (Delegated)
        $(config.selectors.tableBody).on('click', '.btn-details', function () {
            var bookingId = $(this).data('id');
            viewDetails(bookingId);
        });
    }

    /**
     * Create Booking (AJAX POST JSON)
     */
    function createBooking() {
        var $form = $(config.selectors.createForm);
        var formData = $form.serializeArray();
        var payload = {};
        
        // Convert form array to object
        $.each(formData, function() {
            payload[this.name] = this.value;
        });

        var $btn = $('#btn-save-booking');
        var originalText = $btn.text();
        $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-1"></i> Saving...');

        // IMPORTANT: The backend expects [FromBody] JSON payload and X-Idempotency-Key header.
        $.ajax({
            url: config.urls.create,
            type: 'POST',
            data: JSON.stringify(payload),
            contentType: 'application/json; charset=utf-8',
            headers: {
                'RequestVerificationToken': getAntiForgeryToken(),
                'X-Idempotency-Key': generateIdempotencyKey()
            },
            success: function (response) {
                if (response.success) {
                    alert('Booking created successfully: ' + response.message);
                    var modalEl = document.querySelector(config.selectors.createModal);
                    bootstrap.Modal.getInstance(modalEl).hide();
                    location.reload();
                } else {
                    alert('Error: ' + (response.error || response.message));
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
     * Update Booking Status (AJAX POST JSON)
     */
    function updateStatus() {
        var bookingId = parseInt($('#status-booking-id').val(), 10);
        var status = $('#status-select').val();

        var payload = {
            BookingID: bookingId,
            Status: status
        };

        var $btn = $('#btn-save-status');
        var originalText = $btn.text();
        $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-1"></i> Updating...');

        // IMPORTANT: The backend expects [FromBody] ToggleBookingVm
        $.ajax({
            url: config.urls.toggleStatus,
            type: 'POST',
            data: JSON.stringify(payload),
            contentType: 'application/json; charset=utf-8',
            headers: {
                'RequestVerificationToken': getAntiForgeryToken()
            },
            success: function (response) {
                if (response.success) {
                    alert('Status updated successfully.');
                    var modalEl = document.querySelector(config.selectors.statusModal);
                    bootstrap.Modal.getInstance(modalEl).hide();
                    location.reload();
                } else {
                    alert('Error: ' + (response.error || response.message));
                }
            },
            error: function (xhr) {
                alert('An error occurred while updating status.');
                console.error(xhr.responseText);
            },
            complete: function () {
                $btn.prop('disabled', false).text(originalText);
            }
        });
    }

    /**
     * View Details
     */
    function viewDetails(id) {
        $.ajax({
            url: config.urls.details + id,
            type: 'GET',
            success: function (response) {
                if (response.success === false) {
                    alert('Error: ' + response.message);
                    return;
                }
                // Assuming successful response returns data object
                console.log('Booking Details:', response);
                alert('Details fetched. Open console to view data.');
                // In a real application, you would populate a modal here with the detailed response.
            },
            error: function (xhr) {
                alert('Failed to load details.');
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
