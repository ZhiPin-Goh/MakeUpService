var FeedbackManager = (function ($) {
    var config = { detailsUrl: '', resolveUrl: '' };
    var currentFeedbackId = 0;

    function bindEvents() {
        $('#feedback-table').on('click', '.btn-view', function() {
            var id = $(this).data('id');
            currentFeedbackId = id;
            var isResolved = $(this).data('resolved');
            
            $('#feedbackModal').modal('show');
            $('#feedback-modal-content').html('<div class="text-center">Loading...</div>');
            
            // Double Check: backend uses `feedBackID` (camel case B)
            $.get(config.detailsUrl + '?feedBackID=' + id, function(data) {
                $('#feedback-modal-content').html(data);
                if(isResolved) $('#btn-resolve').hide();
                else $('#btn-resolve').show();
            });
        });

        $('#btn-resolve').on('click', function() {
            if(!currentFeedbackId) return;
            
            var $btn = $(this);
            $btn.prop('disabled', true).text('Resolving...');

            // CRITICAL DOUBLE-CHECK: POST method has `(int feedbackID)` without `[FromBody]`.
            // Sending as x-www-form-urlencoded
            $.ajax({
                url: config.resolveUrl,
                type: 'POST',
                data: { feedbackID: currentFeedbackId },
                headers: { 'RequestVerificationToken': $('#anti-forgery-form input').val() },
                success: function(res) {
                    if(res.success) location.reload();
                    else alert('Error: ' + res.message);
                },
                complete: function() { $btn.prop('disabled', false).text('Mark as Resolved'); }
            });
        });
    }

    return { init: function (options) { $.extend(config, options); bindEvents(); } };
})(jQuery);
