var SettingManager = (function ($) {
    var config = { urls: { update: '' } };

    function bindEvents() {
        $('#settings-table').on('click', '.btn-edit', function() {
            $('#Key').val($(this).data('key'));
            $('#Value').val($(this).data('value'));
            $('#Description').val($(this).data('desc'));
            new bootstrap.Modal(document.getElementById('settingModal')).show();
        });

        $('#setting-form').on('submit', function(e) {
            e.preventDefault();
            var payload = {
                Key: $('#Key').val(),
                Value: $('#Value').val(),
                Description: $('#Description').val()
            };
            
            $.ajax({
                url: config.urls.update,
                type: 'POST',
                data: JSON.stringify(payload),
                contentType: 'application/json',
                headers: { 'RequestVerificationToken': $('#anti-forgery-form input').val() },
                success: function(res) {
                    if(res.success) location.reload();
                    else alert(res.message);
                }
            });
        });
    }

    return { init: function (options) { $.extend(config, options); bindEvents(); } };
})(jQuery);
