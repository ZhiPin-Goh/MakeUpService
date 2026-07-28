var ScheduleBlockerManager = (function ($) {
    var config = { urls: { create: '', deleteUrl: '' } };

    function bindEvents() {
        $('#btn-open-blocker').on('click', function() {
            $('#blocker-form')[0].reset();
            new bootstrap.Modal(document.getElementById('blockerModal')).show();
        });

        $('#blocker-form').on('submit', function(e) {
            e.preventDefault();
            var payload = {
                StartDate: $('#StartDate').val(),
                EndDate: $('#EndDate').val() || null,
                IsFullDay: $('#IsFullDay').is(':checked'),
                Reason: $('#Reason').val()
            };
            
            $.ajax({
                url: config.urls.create,
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

        $('#blocker-table').on('click', '.btn-delete', function() {
            if(!confirm('Delete this blocker?')) return;
            $.ajax({
                url: config.urls.deleteUrl + $(this).data('id'),
                type: 'DELETE',
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
