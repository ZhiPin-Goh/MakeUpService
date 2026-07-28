var AreaManager = (function ($) {
    var config = {
        urls: { create: '', update: '', toggle: '' },
        selectors: {
            modal: '#areaModal',
            form: '#area-form',
            btnOpenCreate: '#btn-open-create-area',
            tableBody: '#areas-table tbody'
        }
    };

    function getAntiForgeryToken() {
        return $('#anti-forgery-form input[name="__RequestVerificationToken"]').val();
    }

    function generateIdempotencyKey() {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function bindEvents() {
        $(config.selectors.btnOpenCreate).on('click', function () {
            openModal(false);
        });

        $(config.selectors.form).on('submit', function (e) {
            e.preventDefault();
            saveArea();
        });

        $(config.selectors.tableBody).on('click', '.btn-edit', function () {
            openModal(true, $(this).data());
        });

        $(config.selectors.tableBody).on('click', '.btn-toggle', function () {
            toggleArea($(this).data('id'));
        });
    }

    function openModal(isEdit, data = null) {
        var $form = $(config.selectors.form);
        $form[0].reset();
        
        if (isEdit && data) {
            $('#areaModalTitle').text('Edit Area');
            $('#AreaID').val(data.id);
            $('#AreaName').val(data.name);
            $('#AreaFee').val(data.fee);
        } else {
            $('#areaModalTitle').text('Create New Area');
            $('#AreaID').val('0');
        }
        var modal = new bootstrap.Modal(document.querySelector(config.selectors.modal));
        modal.show();
    }

    function saveArea() {
        var areaId = parseInt($('#AreaID').val(), 10);
        var isEdit = areaId > 0;
        
        var name = $('#AreaName').val();
        var fee = parseFloat($('#AreaFee').val());
        
        var targetUrl = isEdit ? config.urls.update : config.urls.create;
        var headers = { 'RequestVerificationToken': getAntiForgeryToken() };
        var payload = {};

        // CRITICAL DOUBLE-CHECK HANDLED HERE: 
        // Create expects { Name, Price }
        // Update expects { AreaID, Name, BaseFee }
        if (isEdit) {
            payload = { AreaID: areaId, Name: name, BaseFee: fee };
        } else {
            payload = { Name: name, Price: fee };
            headers['X-Idempotency-Key'] = generateIdempotencyKey();
        }

        var $btn = $('#btn-save-area');
        $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Saving...');

        $.ajax({
            url: targetUrl,
            type: 'POST',
            data: JSON.stringify(payload),
            contentType: 'application/json',
            headers: headers,
            success: function (response) {
                if (response.success) {
                    location.reload();
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function (xhr) {
                alert('Error saving area.');
                console.error(xhr.responseText);
            },
            complete: function () {
                $btn.prop('disabled', false).text('Save Area');
            }
        });
    }

    function toggleArea(id) {
        if (!confirm('Toggle area status?')) return;
        $.ajax({
            url: config.urls.toggle + id,
            type: 'POST',
            headers: { 'RequestVerificationToken': getAntiForgeryToken() },
            success: function (res) {
                if (res.success) location.reload();
                else alert('Error: ' + res.message);
            }
        });
    }

    return {
        init: function (options) {
            $.extend(true, config, options);
            bindEvents();
        }
    };
})(jQuery);
