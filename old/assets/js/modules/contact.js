// Global modal windows module
var _24Plus = _24Plus || {};

_24Plus.Contact = (function ($) { 
    function bindUi() {
        $('#contact-frm').on('submit', function(){
            var formData = $(this).serialize();
            $.ajax({
                type: 'post',
                url: '/send-email',
                data: formData,
                dataType: 'json',
                success: function() {
                    alert("Emailul a fost trimis cu succes");
                },
                error: function() {    
                    alert("Emailul nu a fost trimis");
                },
            });
        });
    }

    // initialize the UI binders
    function init() {
        try {
            bindUi();
        } catch (ex) {
            console.log(ex);
        }
    }

    return {
        Init: init
    }
})($)

$(function () {
    _24Plus.Contact.Init();
});
