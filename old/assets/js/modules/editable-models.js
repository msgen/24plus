var _24Plus = _24Plus || {};
_24Plus.Admin = _24Plus.Admin || {};

_24Plus.Admin.EditableModel = (function ($) {

    function bindUi() {
        var $body = $("body");

        $('.editable').editable({
            mode: 'inline',
            error: function (response, newValue) {
                if (response.status === 500) {
                    alert('Nu am putut executa actiunea!');
                }
            }
        });
        
        $body.on("click", ".editable", function (e) {
            e.stopPropagation();

            var $this = $(this);
            //// Check for existing widget
            if(!$this.data("editable")){
                // Create instance and invoke it 
                /* Otherwise, the x-editable widget's click handler will  already take over here */
                //$this.editable({ container: "body" });
                $this.editable("toggle");
            }
           
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