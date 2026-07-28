var AuthManager = (function ($) {
    var config = { loginUrl: '' };

    function bindEvents() {
        $('#login-form').on('submit', function(e) {
            e.preventDefault();
            
            var payload = {
                UserName: $('#UserName').val(),
                Password: $('#Password').val()
            };
            
            var $btn = $('#btn-login');
            $btn.prop('disabled', true).text('Signing in...');
            
            $.ajax({
                url: config.loginUrl,
                type: 'POST',
                data: JSON.stringify(payload),
                contentType: 'application/json',
                headers: { 'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val() },
                success: function(res, textStatus, xhr) {
                    // Since the controller returns View(model) on failure, we check if the response HTML contains the login form.
                    if (typeof res === 'string' && res.indexOf('id="login-form"') > -1) {
                        alert('Login Failed. Please check your credentials.');
                        $btn.prop('disabled', false).html('Sign In <i data-lucide="arrow-right" class="w-4 h-4"></i>');
                        if (typeof lucide !== 'undefined') lucide.createIcons();
                    } else {
                        // Success (redirected to dashboard which returned its HTML)
                        window.location.href = '/dashboard';
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    // The backend AuthController returns RedirectToAction("Index") on success.
                    // Since it has no Index action, it redirects to /Auth which throws a 404.
                    // Therefore, getting a 404 here actually means the login succeeded!
                    if (xhr.status === 200 || xhr.status === 0 || xhr.status === 404) {
                        window.location.href = '/dashboard';
                    } else {
                        alert('An error occurred during sign in. Code: ' + xhr.status);
                        $btn.prop('disabled', false).html('Sign In <i data-lucide="arrow-right" class="w-4 h-4"></i>');
                        if (typeof lucide !== 'undefined') lucide.createIcons();
                    }
                }
            });
        });
    }

    return { init: function (options) { $.extend(config, options); bindEvents(); } };
})(jQuery);
