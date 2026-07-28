var NotificationManager = (function ($) {
    var config = { unreadUrl: '', readUrl: '' };

    function loadUnreadCount() {
        $.get(config.unreadUrl, function(res) {
            if(res.count !== undefined) $('#unread-count').text(res.count);
        });
    }

    function bindEvents() {
        loadUnreadCount();
        
        $('#notification-table').on('click', '.btn-read', function() {
            var id = $(this).data('id');
            var $row = $(this).closest('tr');
            
            $('#notifModal').modal('show');
            $('#notif-modal-content').html('Loading...');
            
            // CRITICAL DOUBLE-CHECK: POST `int notificationID` without [FromBody].
            $.ajax({
                url: config.readUrl,
                type: 'POST',
                data: { notificationID: id },
                headers: { 'RequestVerificationToken': $('#anti-forgery-form input').val() },
                success: function(htmlResponse) {
                    $('#notif-modal-content').html(htmlResponse);
                    $row.find('.status-col').text('Read');
                    loadUnreadCount();
                }
            });
        });
    }

    return { init: function (options) { $.extend(config, options); bindEvents(); } };
})(jQuery);
