var FeeManager = (function ($) {
    var config = { calcUrl: '', searchLocUrl: '' };

    function bindEvents() {
        $('#fee-form').on('submit', function(e) {
            e.preventDefault();
            
            var payload = {
                AreaID: $('#AreaID').val() ? parseInt($('#AreaID').val()) : null,
                ClientAddress: $('#ClientAddress').val()
            };
            
            var $btn = $('#btn-calc');
            $btn.prop('disabled', true).text('Calculating...');
            
            $.ajax({
                url: config.calcUrl,
                type: 'POST',
                data: JSON.stringify(payload),
                contentType: 'application/json',
                headers: { 'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val() },
                success: function(res) {
                    if(res.isSuccess) {
                        $('#res-fee').text('$' + parseFloat(res.travelFee).toFixed(2));
                        $('#res-dist').text(res.distanceKm);
                        $('#fee-result').fadeIn();
                    } else {
                        alert('Error: ' + res.message);
                    }
                },
                complete: function() {
                    $btn.prop('disabled', false).text('Calculate');
                }
            });
        });

        $('#btn-search-loc').on('click', function() {
            var query = $('#ClientAddress').val();
            if(!query) { alert('Enter address to search'); return; }
            
            $.get(config.searchLocUrl + '?query=' + encodeURIComponent(query), function(data) {
                console.log('Location Suggestions:', data);
                alert('Location checked! See console for suggestions array.');
            });
        });
    }

    return { init: function (options) { $.extend(config, options); bindEvents(); } };
})(jQuery);
