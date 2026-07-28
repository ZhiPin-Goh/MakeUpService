var StandaloneFormManager = (function ($) {
    var config = {
        formSelector: '',
        submitUrl: '',
        successRedirectUrl: '',
        isFormData: false, // Set true if using file uploads
        isPutOrDelete: false, // Usually false, POST is standard
        additionalPayload: null // Any extra data to append
    };

    function generateIdempotencyKey() {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
        return Math.random().toString();
    }

    function bindEvents() {
        $(config.formSelector).on('submit', function(e) {
            e.preventDefault();
            
            var $form = $(this);
            var $btn = $form.find('button[type="submit"]');
            var originalBtnHtml = $btn.html();
            
            $btn.prop('disabled', true).html('<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> Processing...');
            if (typeof lucide !== 'undefined') lucide.createIcons();

            var ajaxOptions = {
                url: config.submitUrl,
                type: 'POST',
                headers: { 
                    'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val() 
                },
                success: function(res) {
                    if(res.success || res.isSuccess) {
                        window.location.href = config.successRedirectUrl;
                    } else {
                        alert(res.message || res.error || 'An error occurred.');
                    }
                },
                error: function(xhr) {
                    alert('Server error occurred.');
                    console.error(xhr.responseText);
                },
                complete: function() {
                    $btn.prop('disabled', false).html(originalBtnHtml);
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }
            };

            if (config.isFormData) {
                var formData = new FormData(this);
                formData.append('idempotencyKey', generateIdempotencyKey());
                if (config.additionalPayload) {
                    for (var key in config.additionalPayload) {
                        formData.append(key, config.additionalPayload[key]);
                    }
                }
                ajaxOptions.data = formData;
                ajaxOptions.processData = false;
                ajaxOptions.contentType = false;
            } else {
                var payload = {};
                $form.serializeArray().forEach(function(item) { 
                    payload[item.name] = item.value; 
                });
                
                // Convert number fields explicitly if needed based on input type or data-type
                $form.find('input[type="number"], [data-type="number"]').each(function() {
                    var name = $(this).attr('name');
                    if (name && payload.hasOwnProperty(name)) {
                        if (payload[name] === '') {
                            delete payload[name];
                        } else {
                            payload[name] = parseFloat(payload[name]);
                        }
                    }
                });

                if (config.additionalPayload) {
                    $.extend(payload, config.additionalPayload);
                }
                
                ajaxOptions.data = JSON.stringify(payload);
                ajaxOptions.contentType = 'application/json';
                ajaxOptions.headers['X-Idempotency-Key'] = generateIdempotencyKey();
            }

            $.ajax(ajaxOptions);
        });
    }

    return {
        init: function (options) {
            $.extend(true, config, options);
            bindEvents();
        }
    };
})(jQuery);
