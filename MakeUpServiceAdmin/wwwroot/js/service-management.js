/**
 * Service Management Module
 * Utilizes the Revealing Module Pattern for clean architecture.
 */
var ServiceManager = (function ($) {
    // Private variables
    var config = {
        urls: {
            search: '',
            create: '',
            update: '',
            toggle: ''
        },
        selectors: {
            modal: '#serviceModal',
            form: '#service-form',
            btnOpenCreate: '#btn-open-create-modal',
            filterForm: '#filter-form',
            tableBody: '#services-table tbody'
        }
    };

    /**
     * Generate a UUID for Idempotency Key
     */
    function generateUUID() {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Get Anti-Forgery Token from the page
     */
    function getAntiForgeryToken() {
        return $('input[name="__RequestVerificationToken"]').val();
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
            saveService();
        });

        // Event Delegation for Edit & Toggle Actions (Assuming dynamic table rows)
        $(config.selectors.tableBody).on('click', '.btn-edit', function () {
            var serviceData = $(this).data();
            openModal(true, serviceData);
        });

        $(config.selectors.tableBody).on('click', '.btn-toggle', function () {
            var id = $(this).data('id');
            toggleService(id);
        });
        
        // Search Filter Submission
        $(config.selectors.filterForm).on('submit', function (e) {
            // Handled natively by MVC if it's a GET, or via AJAX if desired.
            // For this implementation, we allow natural GET form submission.
            // If AJAX is needed: e.preventDefault(); performSearch();
        });
    }

    /**
     * Open Modal for Create or Edit
     */
    function openModal(isEdit, data = null) {
        var $form = $(config.selectors.form);
        $form[0].reset();
        
        if (isEdit && data) {
            $('#modalTitle').text('Edit Service');
            $('#ServiceID').val(data.id);
            $('#Name').val(data.name);
            $('#Description').val(data.description);
            $('#Price').val(data.price);
            $('#EstimatedDurationMinutes').val(data.duration);
        } else {
            $('#modalTitle').text('Create New Service');
            $('#ServiceID').val('0');
        }
        
        var modalInstance = new bootstrap.Modal(document.querySelector(config.selectors.modal));
        modalInstance.show();
    }

    /**
     * Save Service (AJAX POST)
     */
    function saveService() {
        var $form = $(config.selectors.form);
        var formData = new FormData($form[0]);
        var serviceId = parseInt($('#ServiceID').val(), 10);
        var isEdit = serviceId > 0;
        
        var targetUrl = isEdit ? config.urls.update : config.urls.create;
        
        // Append Idempotency Key if it's a create action
        if (!isEdit) {
            formData.append('idempotencyKey', generateUUID());
        }

        // Disable button and show loading state
        var $btn = $('#btn-save-service');
        var originalText = $btn.text();
        $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-1"></i> Saving...');

        $.ajax({
            url: targetUrl,
            type: 'POST',
            data: formData,
            processData: false, // CRITICAL: Prevent jQuery from converting FormData to string
            contentType: false, // CRITICAL: Let browser set multipart/form-data boundary
            headers: {
                'RequestVerificationToken': getAntiForgeryToken()
            },
            success: function (response) {
                if (response.success) {
                    // Show success notification (assuming toastr or similar exists)
                    alert('Success: ' + response.message);
                    
                    // Close modal and reload page/data
                    var modalEl = document.querySelector(config.selectors.modal);
                    var modalInstance = bootstrap.Modal.getInstance(modalEl);
                    modalInstance.hide();
                    location.reload(); 
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function (xhr, status, error) {
                alert('An error occurred while saving the service.');
                console.error(error);
            },
            complete: function () {
                $btn.prop('disabled', false).text(originalText);
            }
        });
    }

    /**
     * Toggle Service Status (AJAX POST)
     */
    function toggleService(id) {
        if (!confirm('Are you sure you want to toggle the status of this service?')) {
            return;
        }

        $.ajax({
            url: config.urls.toggle + id,
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
            error: function (xhr, status, error) {
                alert('An error occurred while updating the status.');
                console.error(error);
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
